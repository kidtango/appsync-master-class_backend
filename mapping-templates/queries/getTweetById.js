import * as ddb from '@aws-appsync/utils/dynamodb'
import { util } from '@aws-appsync/utils'

export function request(ctx) {
  console.log('🚀 ~ file: getTweetById.js:4 ~ request ~ ctx:', ctx)
  const {
    arguments: { tweetId = '' },
  } = ctx

  return ddb.query({
    query: {
      id: { eq: tweetId },
    },
  })
}

export function response(ctx) {
  console.log('🚀 ~ file: getTweetById.js:17 ~ response ~ ctx:', ctx)
  const { result } = ctx

  if (result.items.length === 0) util.error('Tweet not found')

  return result?.items
}
