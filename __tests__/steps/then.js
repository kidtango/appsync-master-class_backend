require('dotenv').config()
const AWS = require('aws-sdk')

const user_exists_in_UsersTable = async (id) => {
  const { USERS_TABLE, REGION } = process.env

  const DynamoDB = new AWS.DynamoDB.DocumentClient({ region: REGION })

  console.log(`looking for user [${id}] in table [${USERS_TABLE}]`)

  const resp = await DynamoDB.get({
    TableName: USERS_TABLE,
    Key: { id },
  }).promise()

  expect(resp.Item).toBeTruthy()

  return resp.Item
}

const delete_test_data = async (id) => {
  const { USERS_TABLE, REGION } = process.env

  const DynamoDB = new AWS.DynamoDB.DocumentClient({ region: REGION })

  console.log(`deleting record with [${id}] in table [${USERS_TABLE}]`)

  await DynamoDB.delete({
    TableName: USERS_TABLE,
    Key: { id },
  }).promise()
}

module.exports = { user_exists_in_UsersTable, delete_test_data }
