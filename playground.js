const context = {
  arguments: { tweetId: '1234' },
  environmentVariables: {},
  identity: {
    claims: {
      sub: 'ddf8eac9-82c7-4799-9bdb-aafb3398055d',
      email_verified: false,
      iss: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_LzzZUx8Mk',
      'cognito:username': 'ddf8eac9-82c7-4799-9bdb-aafb3398055d',
      origin_jti: '9c7d5a22-e7f1-4197-9fac-6855feaee258',
      aud: '62sb2bkebgomggsm9ka6ti2qka',
      event_id: '33a90e93-5ed0-4f8d-ba35-9878ce08aaf8',
      token_use: 'id',
      auth_time: 1694747885,
      name: 'Lulu Sadie ogsa',
      exp: 1694810332,
      iat: 1694806733,
      jti: 'bdde3bf1-8119-4e16-8c3a-855a55fd2020',
      email: 'Lulu-Sadie-ogsa@appsyncmasterclass.com',
    },
    defaultAuthStrategy: 'ALLOW',
    groups: null,
    issuer: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_LzzZUx8Mk',
    sourceIp: ['47.221.136.144'],
    sub: 'ddf8eac9-82c7-4799-9bdb-aafb3398055d',
    username: 'ddf8eac9-82c7-4799-9bdb-aafb3398055d',
  },
  source: {
    createdAt: '2023-09-15T03:59:36.211Z',
    creator: 'ddf8eac9-82c7-4799-9bdb-aafb3398055d',
    replies: 0,
    __typename: 'Tweet',
    text: 'test',
    id: '01HABFX08KEP4W1WJT1TQBKC14',
    retweets: 0,
    likes: 0,
  },
  result: {
    items: [
      {
        likesCount: 0,
        createdAt: '2023-09-15T03:14:56.703Z',
        tweetsCount: 2,
        name: 'Lulu Sadie ogsa',
        followersCount: 0,
        screenName: 'LuluSadie ogsaVIzaWH9BO',
        id: 'ddf8eac9-82c7-4799-9bdb-aafb3398055d',
        followingCount: 0,
      },
    ],
    nextToken: null,
    scannedCount: 1,
    startedAt: null,
  },
  request: {
    headers: {
      'x-forwarded-for': '47.221.136.144, 130.176.65.68',
      'sec-ch-ua-mobile': '?0',
      'cloudfront-viewer-country': 'US',
      'cloudfront-is-tablet-viewer': 'false',
      'x-amzn-requestid': 'e03931da-a1b1-4540-ba70-ff91fd1391a2',
      via: '2.0 9c1a63b3c113da5e21aa59ce0f49731e.cloudfront.net (CloudFront)',
      'cloudfront-forwarded-proto': 'https',
      origin: 'https://us-east-1.console.aws.amazon.com',
      'content-length': '311',
      'x-forwarded-proto': 'https',
      'accept-language': 'en-US,en;q=0.9,und;q=0.8',
      host: 'r6g6p3mqj5c6fmbmdj7rrnnpjq.appsync-api.us-east-1.amazonaws.com',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
      'cloudfront-is-mobile-viewer': 'false',
      accept: 'application/json, text/plain, */*',
      'cloudfront-viewer-asn': '19108',
      'cloudfront-is-smarttv-viewer': 'false',
      'x-amzn-appsync-is-vpce-request': 'false',
      'accept-encoding': 'gzip, deflate, br',
      referer: 'https://us-east-1.console.aws.amazon.com/',
      'x-amzn-remote-ip': '47.221.136.144',
      'content-type': 'application/json',
      'sec-fetch-mode': 'cors',
      'x-amzn-trace-id': 'Root=1-6504b8cd-39c5c89a302f2aa23cc98dfe',
      'x-amz-cf-id': 'IwAFyqnukpgF5ulg20xeOAcus4aHEFa-9istR9nNiY-l-i0VJazFsQ==',
      authorization:
        'eyJraWQiOiJOSnExNjI0RU1QYzY2YjdFbytKZnpyNndTNFZDK0R4XC95NGcybU1Ob3FQbz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkZGY4ZWFjOS04MmM3LTQ3OTktOWJkYi1hYWZiMzM5ODA1NWQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX0x6elpVeDhNayIsImNvZ25pdG86dXNlcm5hbWUiOiJkZGY4ZWFjOS04MmM3LTQ3OTktOWJkYi1hYWZiMzM5ODA1NWQiLCJvcmlnaW5fanRpIjoiOWM3ZDVhMjItZTdmMS00MTk3LTlmYWMtNjg1NWZlYWVlMjU4IiwiYXVkIjoiNjJzYjJia2ViZ29tZ2dzbTlrYTZ0aTJxa2EiLCJldmVudF9pZCI6IjMzYTkwZTkzLTVlZDAtNGY4ZC1iYTM1LTk4NzhjZTA4YWFmOCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjk0NzQ3ODg1LCJuYW1lIjoiTHVsdSBTYWRpZSBvZ3NhIiwiZXhwIjoxNjk0ODEwMzMyLCJpYXQiOjE2OTQ4MDY3MzMsImp0aSI6ImJkZGUzYmYxLTgxMTktNGUxNi04YzNhLTg1NWE1NWZkMjAyMCIsImVtYWlsIjoiTHVsdS1TYWRpZS1vZ3NhQGFwcHN5bmNtYXN0ZXJjbGFzcy5jb20ifQ.CRsxzpFCvugl0I4sj8JSEGevNIXbavSGKg6aV4qYzQg4yA_JHHkZc5za8f3s_37Rj1AXozVjicjv3b3cPgtcr9kj0Efvl1sy9v6os1UA8RyHxfdp4V7LLFETH2TJyItvKTYnfQLBaISrvtK8QIdSQA5TjCBoSq-WKvJlDuBTQVhYaad49ALTX7JK-S6Twipkgh2SPY3RtdwKoAq3b82d2WnvtV6FNWtzJa6qqiPeI3LOyTo41F5CLOH-Ml4Rb-H_V_OwG1bZYkEtKIWj9XarIqYXV13SVEoY0JHRM68-qoUWJFM8FtQ6Qahe5UcAUwMDbT1_5d145TaH2Nf4Xrcb8A',
      'sec-fetch-dest': 'empty',
      'x-amz-user-agent': 'AWS-Console-AppSync/',
      'sec-ch-ua-platform': '"Windows"',
      'cloudfront-is-desktop-viewer': 'true',
      'sec-fetch-site': 'cross-site',
      'sec-ch-ua':
        '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
      'x-forwarded-port': '443',
    },
    domainName: null,
  },
  info: {
    fieldName: 'profile',
    parentTypeName: 'Tweet',
    variables: {},
  },
  error: null,
  prev: null,
  stash: {},
  outErrors: [],
  env: {},
}

const util = require('@aws-appsync/utils')

function request(ctx) {
  const {
    arguments: { tweetId },
    identity: { username },
  } = ctx
  const TweetsTable = '#TweetsTable#'
  const UsersTable = '#UsersTable#'
  const LikesTable = '#LikesTable#'

  // batch write
  // create record in likesTable
  // increment likedCount in tweetsTable
  // increment likedCount in usersTable
  const operation = {
    operation: 'TransactWriteItems',
    transactItems: [
      {
        table: LikesTable,
        operation: 'PutItem',
        key: {
          userId: util.dynamodb.toDynamoDB(username),
          tweetId: util.dynamodb.toDynamoDB(tweetId),
        },
      },
    ],
  }
  console.log('🚀 ~ file: createLike.js:30 ~ request ~ operation:', operation)

  return operation
}

function response(ctx) {
  console.log('🚀 ~ file: createLike.js:9 ~ response ~ ctx:', ctx)
}

request(context)
