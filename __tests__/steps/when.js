const AWS = require('aws-sdk')
require('dotenv').config()
const velocityTemplate = require('amplify-velocity-template')
const velocityMapper = require('amplify-appsync-simulator/lib/velocity/value-mapper/mapper')
const fs = require('fs')
const { sendRequest } = require('../lib/graphql')

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
  console.log('🚀 ~ file: when.js:72 ~ result:', result)
  return velocityTemplate.parse(result)
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

module.exports = {
  we_invoke_confirmUserSignup,
  a_user_signs_up,
  we_invoke_an_appsync_template,
  a_user_calls_getMyProfile,
}
