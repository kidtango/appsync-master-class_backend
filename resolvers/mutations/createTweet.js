import * as ddb from '@aws-appsync/utils/dynamodb'
import { util } from '@aws-appsync/utils'

export function request(ctx) {
  console.log('🚀 ~ file: createTweet.js:4 ~ request ~ ctx:', ctx)
  const {
    identity: { username },
    arguments: { text },
  } = ctx

  const creator = `PROFILE|${username}`
  const id = `TWEET|${util.autoUlid()}`

  const key = { PK: creator, SK: id }
  const timestamp = util.time.nowISO8601()

  const item = {
    text,
    createdAt: timestamp,
    replies: 0,
    likes: 0,
    retweeted: 0,
    liked: false,
    retweets: 0,
    __typename: 'Tweet',
    creator,
    GSI1_PK: id,
    GSI1_SK: creator,
    GSI2_PK: 'TWEET',
    GSI2_SK: id,
  }

  const condition = { id: { attributeExists: false } }
  return ddb.put({ key, item, condition })
}

export const response = (ctx) => {
  console.log('🚀 ~ file: createTweet.js:30 ~ response ~ ctx:', ctx)

  return ctx.result
}
