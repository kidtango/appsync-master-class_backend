import { util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  const {
    identity: { username },
    arguments: { limit = 10, nextToken },
  } = ctx

  if (limit > 10) util.error('Item limit must be less than 10')

  const queryCommand = ddb.query({
    query: { userId: { eq: username } },
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
