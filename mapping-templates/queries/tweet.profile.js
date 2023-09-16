import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  const { creator } = ctx.source

  return ddb.query({
    query: { id: { eq: creator } },
  })
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type)
  }

  const { result, identity, source } = ctx

  const typename =
    identity.username === source.creator ? 'MyProfile' : 'OtherProfile'

  const profile = {
    ...result.items[0],
    __typename: typename,
  }

  return profile
}
