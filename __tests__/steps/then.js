require('dotenv').config()
const AWS = require('aws-sdk')
const http = require('axios')
const fs = require('fs')

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

const user_can_upload_image_to_url = async ({
  uploadUrl,
  contentType,
  filePath,
}) => {
  console.log('🚀 ~ file: then.js:41 ~ contentType:', contentType)

  const data = fs.readFileSync(filePath)

  const res = await http({
    method: 'put',
    url: uploadUrl.getImageUploadUrl,
    headers: { 'Content-Type': contentType },
    data,
  })
}

module.exports = {
  user_exists_in_UsersTable,
  delete_test_data,
  user_can_upload_image_to_url,
}
