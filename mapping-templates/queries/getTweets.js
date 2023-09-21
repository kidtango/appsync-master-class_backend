import { util, runtime } from '@aws-appsync/utils'

export function request(ctx) {
  const { items = [] } = ctx.source

  if (items.length === 0) {
    return runtime.earlyReturn(items)
  }

  const TweetsTable = '#TweetsTable#'

  const batchGetCommand = {
    operation: 'BatchGetItem',
    tables: {
      [TweetsTable]: {
        keys: items.map((item) =>
          util.dynamodb.toMapValues({ id: item.tweetId })
        ),
        consistentRead: false,
      },
    },
  }

  return batchGetCommand
}

export function response(ctx) {
  const {
    result: { data = [] },
  } = ctx
  const TweetsTable = '#TweetsTable#'

  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type)
  }

  return data[TweetsTable] || {}
}
