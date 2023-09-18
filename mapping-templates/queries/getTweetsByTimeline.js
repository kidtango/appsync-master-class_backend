import { util } from '@aws-appsync/utils'

export function request(ctx) {
  const { prev } = ctx
  // Refencing TweetsTable from global substitues in template
  const TweetsTable = '#TweetsTable#'

  return {
    operation: 'BatchGetItem',
    tables: {
      [TweetsTable]: {
        keys: prev.result.map((timeline) =>
          util.dynamodb.toMapValues({ id: timeline.tweetId })
        ),
        consistentRead: false,
      },
    },
  }
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type)
  }

  const TweetsTable = '#TweetsTable#'

  return {
    tweets: ctx.result.data[TweetsTable],
    nextToken: '',
  }
}
