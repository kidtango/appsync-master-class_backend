const AWS = require('aws-sdk')
require('dotenv').config()
const velocityTemplate = require('amplify-velocity-template')
const velocityMapper = require('amplify-appsync-simulator/lib/velocity/value-mapper/mapper')
const fs = require('fs')
const { sendRequest } = require('../lib/graphql')
const { GraphQLClient } = require('graphql-request')
const { editMyProfile } = require('../graphql/graphQLStatments')

const myProfileFragment = `
fragment myProfileFields on MyProfile {
  id
  name
  screenName
  imageUrl
  backgroundImageUrl
  bio
  location
  website
  birthdate
  createdAt
  followersCount
  followingCount
  tweetsCount
  likesCounts  
}`

const iTweetFragment = `
fragment iTweetFields on ITweet {
  ... on Tweet {
    ... tweetFields
  }

  ... on Retweet {
    ... retweetFields
  }

  ... on Reply {
    ... replyFields
  }
}`

const we_invoke_confirmUserSignup = async ({ userName, email, name }) => {
  const handler = require('../../functions/confirm-user-signup')

  const context = {}
  const event = {
    version: '1',
    region: process.env.REGION,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userName,
    triggerSource: 'PostConfirmation_ConfirmSignUp',
    request: {
      userAttributes: {
        sub: userName,
        'cognito:email_alias': email,
        'cognito:user_status': 'CONFIRMED',
        email_verified: 'false',
        name,
        email,
      },
    },
    response: {},
  }

  await handler.handler(event, context)
}

const a_user_signs_up = async ({ password, name, email }) => {
  const cognito = new AWS.CognitoIdentityServiceProvider({
    region: process.env.REGION,
  })

  const userPoolId = process.env.COGNITO_USER_POOL_ID
  const clientId = process.env.WEB_COGNITO_USER_POOL_CLIENT_ID

  const signUpResp = await cognito
    .signUp({
      ClientId: clientId,
      Username: email,
      Password: password,
      UserAttributes: [{ Name: 'name', Value: name }],
    })
    .promise()

  const userName = signUpResp.UserSub

  await cognito
    .adminConfirmSignUp({ UserPoolId: userPoolId, Username: userName })
    .promise()

  console.log(`[${email}] - user has signed up [${userName}]`)

  return {
    userName,
    name,
    email,
  }
}

const we_invoke_an_appsync_template = ({ templatePath, context }) => {
  const template = fs.readFileSync(templatePath, { encoding: 'utf-8' })
  const ast = velocityTemplate.parse(template)
  const compiler = new velocityTemplate.Compile(ast, {
    valueMapper: velocityMapper.map,
  })
  const result = compiler.render(context)
}

const a_user_calls_getMyProfile = async (user) => {
  const getMyProfile = `query MyQuery {
    getMyProfile {
      name
      id
      createdAt
      likesCount
      followersCount
      followingCount
      location
      tweetsCount
    }
  }`

  const url = process.env.API_URL
  const auth = user.accessToken

  const { getMyProfile: profile = {} } = await sendRequest({
    url,
    query: getMyProfile,
    auth,
  })

  return profile
}

const a_user_calls_editMyProfile = async ({ user, input }) => {
  const variables = { input }
  const endpoint = process.env.API_URL

  const token = user.accessToken

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `${token}`,
    },
  })
  const { editMyProfile: updatedProfile = {} } = await graphQLClient.request(
    editMyProfile,
    variables
  )

  return updatedProfile
}

module.exports = {
  we_invoke_confirmUserSignup,
  a_user_signs_up,
  we_invoke_an_appsync_template,
  a_user_calls_getMyProfile,
  a_user_calls_editMyProfile,
}
