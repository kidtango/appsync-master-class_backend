require('dotenv').config()

const we_invoke_confirmUserSignup = async (userName, email, name) => {
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

module.exports = { we_invoke_confirmUserSignup }
