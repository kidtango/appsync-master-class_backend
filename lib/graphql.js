require('isomorphic-fetch')
const AWS = require('aws-sdk/global')
const { AWSAppSyncClient, AUTH_TYPE } = require('aws-appsync')
const { GraphQL, registerFragment } = require('./graphql')

const { GRAPHQL_API_URL, REGION } = process.env
const config = {
  url: GRAPHQL_API_URL,
  region: REGION,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: AWS.config.credentials,
  },
  disableOffline: true,
}
const appsyncClient = new AWSAppSyncClient(config)

async function mutate(query, variables) {
  await appsyncClient.mutate({
    mutation: query,
    variables,
  })
}

module.exports = { mutate }
