import { util, runtime } from '@aws-appsync/utils'

export function request(ctx) {
  console.log('🚀 ~ file: getTweetsByTweetId.js:4 ~ request ~ ctx:', ctx)
  const { items = [] } = ctx.source

  if (items.length === 0) {
    return runtime.earlyReturn(items)
  }

  const TweetsTable = '#TweetsTable#'
  const distinct = (value, index, self) => self.indexOf(value) === index

  const deduppedTweets = items
    .map((item) => item.retweetOf || item.tweetId)
    .filter(distinct)

  const batchGetCommand = {
    operation: 'BatchGetItem',
    tables: {
      [TweetsTable]: {
        keys: deduppedTweets.map((tweetId) => {
          return util.dynamodb.toMapValues({ id: tweetId })
        }),
        consistentRead: false,
      },
    },
  }

  return batchGetCommand
}

export function response(ctx) {
  console.log('🚀 ~ file: getTweetsByTweetId.js:29 ~ response ~ ctx:', ctx)
  const {
    result: { data = [] },
  } = ctx
  const TweetsTable = '#TweetsTable#'

  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type)
  }

  return data[TweetsTable] || {}
}
