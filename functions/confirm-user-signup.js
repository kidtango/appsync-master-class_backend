const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { PutCommand, DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb')

const chance = require('chance').Chance()

const { TWEETER_TABLE } = process.env

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

    const id = `PROFILE|${event.userName}`
    const screenName = `${name.replace(/[^a-zA-Z0-9]/, '')}${suffix}`
    const user = {
      PK: id,
      SK: id,
      GSI2_PK: 'PROFILE',
      GSI2_SK: id,
      name,
      screenName,
      createdAt: new Date().toJSON(),
      followersCount: 0,
      followingCount: 0,
      tweetsCount: 0,
      likesCount: 0,
      __typename: 'Profile',
    }

    const command = new PutCommand({
      TableName: TWEETER_TABLE,
      Item: user,
      ConditionExpression: 'attribute_not_exists(id)',
    })

    await docClient.send(command)

    return event
  }

  return event
}
