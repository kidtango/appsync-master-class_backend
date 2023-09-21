import { util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  const { userId, limit = 20, nextToken } = ctx.arguments

  if (limit > 20) util.error('Item limit must be less than 20')

  const queryCommand = ddb.query({
    query: { userId: { eq: userId } },
    limit,
    nextToken,
    consistentRead: false,
    select: 'ALL_ATTRIBUTES',
  })

  return queryCommand
}

export function response(ctx) {
  const {
    result: { items = [], nextToken },
  } = ctx

  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type)
  }

  const res = { items, nextToken }

  return res
}
