import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  console.log('🚀 ~ file: getTweetsForUser.js:4 ~ request ~ ctx:', ctx)
  const {
    arguments: { userId },
  } = ctx

  const PK = userId

  return ddb.query({
    query: {
      PK: { eq: PK },
    },
  })
}

export function response(ctx) {
  console.log('🚀 ~ file: getTweetsForUser.js:19 ~ response ~ ctx:', ctx)
  const { result } = ctx

  const tweets = result.items.filter((item) => item.GSI2_PK === 'TWEET')
  const profile = result.items.filter((item) => item.GSI2_PK === 'PROFILE')[0]
  console.log(
    '🚀 ~ file: getTweetsForUser.js:24 ~ response ~ profile:',
    profile
  )

  return {
    tweets,
    nextToken: result.nextToken,
    profile,
  }
}
