import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  const {
    source: { id },
    identity: { username },
  } = ctx

  return ddb.query({
    query: {
      tweetId: { eq: id },
      userId: { eq: username },
    },
  })
}

export function response(ctx) {
  const { result } = ctx

  return result?.items.length > 0
}
