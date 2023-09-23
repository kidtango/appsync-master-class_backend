import * as ddb from '@aws-appsync/utils/dynamodb'
import { util } from '@aws-appsync/utils'

export function request(ctx) {
  console.log('🚀 ~ file: getTweetsByCreator.js:5 ~ request ~ ctx:', ctx)
  const {
    arguments: { userId = '', nextToken, limit = 20 },
  } = ctx

  if (!userId) util.error('User ID is required')
  if (limit > 20) util.error('Limit must be less than 20')

  console.log('userId', userId)
  console.log('ctx', ctx)

  return ddb.query({
    query: {
      creator: { eq: userId },
    },
    index: 'byCreator',
    nextToken,
    limit,
  })
}

export function response(ctx) {
  console.log('🚀 ~ file: getTweetsByCreator.js:18 ~ response ~ ctx:', ctx)
  const { result } = ctx

  // if (result.items.length === 0) util.error('Tweet not found')

  return {
    tweets: result.items,
    nextToken: result.nextToken,
  }
}
