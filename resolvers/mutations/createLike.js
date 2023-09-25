import { util } from '@aws-appsync/utils'

export function request(ctx) {
  console.log('🚀 ~ file: createLike.js:5 ~ request ~ ctx:', ctx)
  const {
    identity: {
      username,
      claims: { name },
    },
    arguments: { tweetId },
  } = ctx

  const TweeterTable = '#TweeterTable#'

  const likerId = `PROFILE|${username}`
  const likeId = `LIKE|${tweetId}`

  const likeKeys = { PK: likerId, SK: likeId }
  const createdAt = util.time.nowISO8601()

  const newLike = {
    createdAt,
    GSI1_PK: tweetId,
    GSI1_SK: `LIKE|${likerId}`,
    GSI2_PK: 'LIKE',
    GSI2_SK: tweetId,
    __typename: 'Like',
    likerName: name,
  }

  const transactWriteCommand = {
    operation: 'TransactWriteItems',
    transactItems: [
      {
        table: TweeterTable,
        operation: 'PutItem',
        key: util.dynamodb.toMapValues(likeKeys),
        attributeValues: util.dynamodb.toMapValues(newLike),
        condition: { expression: 'attribute_not_exists(SK)' },
      },
      {
        table: TweeterTable,
        operation: 'UpdateItem',
        key: util.dynamodb.toMapValues({ PK: likerId, SK: tweetId }),
        update: {
          expression: 'ADD likes :one',
          expressionValues: {
            ':one': util.dynamodb.toDynamoDB(1),
          },
        },
      },
    ],
  }

  return transactWriteCommand
}

export const response = (ctx) => {
  console.log('🚀 ~ file: createLike.js:38 ~ response ~ ctx:', ctx)

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
