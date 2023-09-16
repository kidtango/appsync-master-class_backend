const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const {
  TransactWriteCommand,
  DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb')

const { ulid } = require('ulid')
const { TweetTypes } = require('../lib/constant')

const { TIMELINES_TABLE_NAME, TWEETS_TABLE_NAME, USERS_TABLE } = process.env

const handler = async (event) => {
  console.log(event)
  const client = new DynamoDBClient({ region: 'us-east-1' })
  const docClient = DynamoDBDocumentClient.from(client)

  const { text } = event.arguments
  const { username } = event.identity
  const id = ulid()
  const timestamp = new Date().toJSON()

  const newTweet = {
    __typename: TweetTypes.TWEET,
    id,
    text,
    creator: username,
    createdAt: timestamp,
    replies: 0,
    likes: 0,
    retweets: 0,
  }
  const newTimeLine = {
    userId: username,
    tweetId: id,
    timestamp,
  }

  const input = {
    TransactItems: [
      {
        Put: {
          TableName: TWEETS_TABLE_NAME,
          Item: newTweet,
        },
      },
      {
        Put: {
          TableName: TIMELINES_TABLE_NAME,
          Item: newTimeLine,
        },
      },
      {
        Update: {
          TableName: USERS_TABLE,
          Key: {
            id: username,
          },
          UpdateExpression: 'ADD tweetsCount :one',
          ExpressionAttributeValues: {
            ':one': 1,
          },
          ConditionExpress: 'attribute_not_exists(id)',
        },
      },
    ],
  }

  const command = new TransactWriteCommand(input)
  await docClient.send(command)

  return newTweet
}

module.exports = { handler }
