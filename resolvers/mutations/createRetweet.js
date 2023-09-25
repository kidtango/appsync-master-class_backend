import * as ddb from '@aws-appsync/utils/dynamodb'
import { util } from '@aws-appsync/utils'

export function request(ctx) {
  const {
    identity: { username },
    arguments: { tweetId },
  } = ctx

  const TweeterTable = '#TweeterTable#'

  const creator = `PROFILE|${username}`
  const retweetId = `RETWEET|${tweetId}`
  const timestamp = util.time.nowISO8601()

  const reTweet = {
    createdAt: timestamp,
    __typename: 'Retweet',
    GSI1_PK: retweetId,
    GSI1_SK: creator,
    GSI2_PK: 'TWEET',
    GSI2_SK: retweetId,
  }

  const transactWriteCommand = {
    operation: 'TransactWriteItems',
    transactItems: [
      {
        table: TweeterTable,
        operation: 'PutItem',
        key: util.dynamodb.toMapValues({ PK: creator, SK: retweetId }),
        attributeValues: util.dynamodb.toMapValues(reTweet),
        condition: { expression: 'attribute_not_exists(SK)' },
      },
      {
        table: TweeterTable,
        operation: 'UpdateItem',
        key: util.dynamodb.toMapValues({ PK: creator, SK: tweetId }),
        update: {
          expression: 'ADD retweets :one',
          expressionValues: {
            ':one': util.dynamodb.toDynamoDB(1),
          },
        },
      },
    ],
  }
  console.log(
    '🚀 ~ file: createRetweet.js:49 ~ request ~ transactWriteCommand:',
    transactWriteCommand
  )

  return transactWriteCommand
}

export const response = (ctx) => {
  console.log('🚀 ~ file: createRetweet.js:36 ~ response ~ ctx:', ctx)

  const {
    result: { cancellationReasons = null, keys = [] },
  } = ctx

  if (cancellationReasons) {
    return util.error(
      cancellationReasons[0]?.message,
      cancellationReasons[0]?.type
    )
  }

  return keys.length > 0
}
