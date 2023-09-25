import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  console.log('🚀 ~ file: getLikes.js:4 ~ request ~ ctx:', ctx)
  const {
    arguments: { userId, limit = 10, nextToken },
  } = ctx

  if (limit > 20) util.error('Limit must be less than 20')

  return ddb.query({
    query: {
      PK: { eq: userId },
      SK: { beginsWith: 'LIKE' },
    },
    nextToken,
    limit,
  })
}

export function response(ctx) {
  console.log('🚀 ~ file: getLikes.js:19 ~ response ~ ctx:', ctx)
  const { result } = ctx

  return {
    likes: result.items,
    nextToken: result.nextToken,
  }
}
