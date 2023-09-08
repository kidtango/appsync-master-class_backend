const AWS = require('aws-sdk')
require('dotenv').config()

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

module.exports = { we_invoke_confirmUserSignup, a_user_signs_up }
