const items = [
  {
    PK: 'USER|123',
    SK: 'REGULAR',
    userId: 'USER|123',
    GSI: 'user',
    __typename: 'user',
  },
  {
    PK: 'USER|123',
    SK: 'TWEET|123',
    text: 'tweet 1',
    GSI: 'tweet',
    entity: 'TWEET',
    __typename: 'tweet',
    GS2: 'TWEET|123',
  },
  {
    PK: 'USER|123',
    SK: 'TWEET|345',
    text: 'tweet 2',
    GSI: 'tweet',
    __typename: 'tweet',
  },
  {
    PK: 'USER|123',
    SK: 'RETWEET|123',
    GSI: 'retweet',
    __typename: 'retweet',
    GS2: 'TWEET|123',
  },
]

const tweets = items.filter((item) => item.__typename === 'retweet')
console.log('🚀 ~ file: playground.js:32 ~ tweets:', tweets)
