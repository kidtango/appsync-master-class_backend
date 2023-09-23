// decrement retweets from tweet
// delete retweet
//

import { util } from '@aws-appsync/utils'

export function request(ctx) {
  const {
    arguments: { tweetId },
    identity: { username },
    prev: { result = [] },
  } = ctx

  const TweetsTable = '#TweetsTable#'
  const UsersTable = '#UsersTable#'
  const RetweetsTable = '#RetweetsTable#'
  const TimelinesTable = '#TimelinesTable#'

  const tweetCreator = result[0]?.creator
  const retweetOf = result[0]?.retweetOf

  const transactionWriteCommand = {
    operation: 'TransactWriteItems',
    transactItems: [
      {
        table: TweetsTable,
        operation: 'DeleteItem',
        key: util.dynamodb.toMapValues({ id: tweetId }),
      },
      {
        table: RetweetsTable,
        operation: 'DeleteItem',
        key: util.dynamodb.toMapValues({ tweetId, userId: username }),
      },
      {
        table: UsersTable,
        operation: 'UpdateItem',
        key: {
          id: util.dynamodb.toDynamoDB(username),
        },
        update: {
          expression: 'ADD tweetsCount :one',
          expressionValues: {
            ':one': util.dynamodb.toDynamoDB(-1),
          },
        },
      },
      {
        table: TweetsTable,
        operation: 'UpdateItem',
        key: util.dynamodb.toMapValues({ id: tweetId }),
        update: {
          expression: 'ADD retweets :one',
          expressionValues: {
            ':one': util.dynamodb.toDynamoDB(1),
          },
        },
      },
    ],
  }

  if (tweetCreator !== username) {
    const updateTimeline = {
      table: TimelinesTable,
      operation: 'DeleteItem',
      key: util.dynamodb.toMapValues({ userId: username, tweetId }),
    }

    transactionWriteCommand.transactItems.push(updateTimeline)
  }

  return transactionWriteCommand
}
