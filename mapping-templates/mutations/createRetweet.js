import { util } from '@aws-appsync/utils'

export function request(ctx) {
  const {
    arguments: { tweetId },
    identity: { username },
    prev: { result = [] },
  } = ctx

  const tweetsCreator = result[0]?.creator

  const TweetsTable = '#TweetsTable#'
  const UsersTable = '#UsersTable#'
  const RetweetsTable = '#RetweetsTable#'
  const TimelinesTable = '#TimelinesTable#'

  const id = util.autoUlid()
  const timestamp = util.time.nowEpochSeconds()

  const newTweet = {
    __typename: 'Retweet',
    creator: username,
    createdAt: timestamp,
    retweetOf: tweetId,
  }

  const TransactWriteCommand = {
    operation: 'TransactWriteItems',
    transactItems: [
      {
        table: TweetsTable,
        operation: 'PutItem',
        key: util.dynamodb.toMapValues({ id }),
        attributeValues: util.dynamodb.toMapValues(newTweet),
      },
      {
        table: RetweetsTable,
        operation: 'PutItem',
        key: {
          userId: util.dynamodb.toDynamoDB(username),
          tweetId: util.dynamodb.toDynamoDB(tweetId),
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
      {
        table: UsersTable,
        operation: 'UpdateItem',
        key: {
          id: util.dynamodb.toDynamoDB(username),
        },
        update: {
          expression: 'ADD tweetsCount :one',
          expressionValues: {
            ':one': util.dynamodb.toDynamoDB(1),
          },
        },
      },
    ],
  }

  // Add tweet to timeline if it doesn't belong to logged in user
  if (tweetsCreator !== username) {
    const updateTimeline = {
      table: TimelinesTable,
      operation: 'PutItem',
      key: util.dynamodb.toMapValues({ userId: username }),
      attributeValues: util.dynamodb.toMapValues({
        tweetId: id,
        retweetOf: tweetId,
        timestamp,
      }),
    }

    TransactWriteCommand.transactItems.push(updateTimeline)
  }

  return TransactWriteCommand
}

export function response(ctx) {
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
