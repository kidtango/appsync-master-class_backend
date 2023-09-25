import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  console.log('🚀 ~ file: getTweetById.js:4 ~ request ~ ctx:', ctx)
  const {
    source: { SK = '', PK = '' },
  } = ctx

  const tweetId = SK.substring(SK.indexOf('|') + 1)

  return ddb.query({
    query: {
      PK: { eq: PK },
      SK: { eq: tweetId },
    },
  })
}

export function response(ctx) {
  console.log('🚀 ~ file: getTweetById.js:22 ~ response ~ ctx:', ctx)
  const { result } = ctx

  return result.items[0]
}
