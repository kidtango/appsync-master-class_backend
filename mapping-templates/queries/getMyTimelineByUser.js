import { util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

export function request(ctx) {
  console.log('🚀 ~ file: getMyTimelineByUser.js:5 ~ request ~ ctx:', ctx)
  const { identity, arguments: args } = ctx

  if (args.limit > 10) util.error('Item limit must be less than 10')

  return ddb.query({
    query: { userId: { eq: identity.username } },
    limit: args.limit,
  })
}

export function response(ctx) {
  console.log('🚀 ~ file: getMyTimelineByUser.js:16 ~ response ~ ctx:', ctx)
  const { result = {} } = ctx
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type)
  }

  return result?.items || []
}
