import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  console.log('🚀 ~ file: getRetweet.js:4 ~ request ~ ctx:', ctx)
  const { source } = ctx

  const tweetId = source.retweetOf

  return ddb.query({
    query: {
      GSI1_PK: { eq: tweetId },
    },
    index: 'GSI1_PK',
  })
}

export function response(ctx) {
  console.log('🚀 ~ file: getRetweet.js:19 ~ response ~ ctx:', ctx)
  const { result } = ctx

  return result?.items[0]
}
