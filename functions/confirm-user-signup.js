const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { PutCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb')

const chance = require('chance').Chance()

const { USERS_TABLE } = process.env

module.exports.handler = async (event) => {
  const client = new DynamoDBClient({ region: 'us-east-1' })
  const docClient = DynamoDBDocumentClient.from(client)

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

    const command = new PutCommand({
      TableName: USERS_TABLE,
      Item: user,
      ConditionExpression: 'attribute_not_exists(id)',
    })

    await docClient.send(command)

    return event
  }

  return event
}
