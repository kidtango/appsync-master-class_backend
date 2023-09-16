import { util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  const { userId, limit = 20, nextToken } = ctx.arguments

  return ddb.query({
    index: 'byCreator',
    query: { creator: { eq: userId } },
    limit,
    nextToken,
  })
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type)
  }
  return { tweets: ctx.result.items, nextToken: ctx.result.nextToken }
}
