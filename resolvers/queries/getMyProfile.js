import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  console.log('🚀 ~ file: getMyProfile.js:4 ~ ctx:', ctx)
  const {
    identity: { username },
  } = ctx

  const PK = `PROFILE|${username}`

  return ddb.query({
    query: {
      PK: { eq: PK },
    },
  })
}

export function response(ctx) {
  console.log('🚀 ~ file: getTweetById.js:17 ~ response ~ ctx:', ctx)
  const { result } = ctx

  return result?.items[0]
}
