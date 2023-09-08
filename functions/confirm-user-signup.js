const DynamoDB = require('aws-sdk/clients/dynamodb')
const DocumentClient = new DynamoDB.DocumentClient({ region: 'us-east-1' })
const chance = require('chance').Chance()

const { USERS_TABLE } = process.env

module.exports.handler = async (event) => {
  console.log(event)

  if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
    const name = event.request.userAttributes['name']

    const suffix = chance.string({
      lenght: 8,
      caseing: 'upper',
      alpha: true,
      numeric: true,
    })
    const screenName = `${name.replace(/[^a-zA-Z0-9]/, '')}${suffix}`
    const user = {
      id: event.userName,
      name,
      screenName,
      createdAt: new Date().toJSON(),
      followersCount: 0,
      followingCount: 0,
      tweetsCount: 0,
      likesCount: 0,
    }

    await DocumentClient.put({
      TableName: USERS_TABLE,
      Item: user,
      ConditionExpression: 'attribute_not_exists(id)',
    }).promise()

    return event
  }

  return event
}
