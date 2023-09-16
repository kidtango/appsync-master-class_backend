import { util } from '@aws-appsync/utils'

export function request(ctx) {
  console.log('🚀 ~ file: timelinePage.tweets.js:4 ~ request ~ ctx:', ctx)

  // return {
  //   operation: 'BatchGetItem',
  //   tables: {
  //     tweetsTable: {
  //       keys: tweets.map((tweet) =>
  //         util.dynamoDb.toMapValues({ id: tweet.id })
  //       ),
  //       consistentRead: false,
  //     },
  //   },
  // }
}

export function response(ctx) {
  console.log('🚀 ~ file: timelinePage.tweets.js:26 ~ response ~ ctx:', ctx)
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type)
  }

  return []
}
