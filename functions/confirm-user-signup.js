const DynamoDB = require('aws-sdk/clients/dynamodb')
const DocumentClient = new DynamoDB.DocumentClient()
const chance = require('chance').Chance()

const { USER_TABLE } = process.env

module.exports.handler = async (event) => {
  if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
    const { name } = event.request.userAttributes
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
      Tablename: USER_TABLE,
      Item: user,
      ConditionExpression: 'attribute_not_exists(id)',
    }).promise()

    return event
  }

  return event
}
