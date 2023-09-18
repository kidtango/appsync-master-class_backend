import { util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  const {
    arguments: { tweetId },
    identity: { username },
  } = ctx
  const TweetsTable = '#TweetsTable#'
  const UsersTable = '#UsersTable#'
  const LikesTable = '#LikesTable#'

  const operation = {
    operation: 'TransactWriteItems',
    transactItems: [
      {
        table: LikesTable,
        operation: 'PutItem',
        key: {
          userId: util.dynamodb.toDynamoDB(username),
          tweetId: util.dynamodb.toDynamoDB(tweetId),
        },
        condition: {
          expression: 'attribute_not_exists(tweetId)',
        },
      },
      {
        table: TweetsTable,
        operation: 'UpdateItem',
        key: util.dynamodb.toMapValues({ id: tweetId }),
        update: {
          expression: 'ADD likes :one',
          expressionValues: {
            ':one': util.dynamodb.toDynamoDB(1),
          },
        },
      },
      {
        table: UsersTable,
        operation: 'UpdateItem',
        key: util.dynamodb.toMapValues({ id: username }),
        update: {
          expression: 'ADD likesCount :one',
          expressionValues: {
            ':one': util.dynamodb.toDynamoDB(1),
          },
        },
      },
    ],
  }

  return operation
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
