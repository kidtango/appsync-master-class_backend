require('dotenv').config()
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const {
  GetCommand,
  DynamoDBDocumentClient,
  DeleteCommand,
} = require('@aws-sdk/lib-dynamodb')
const http = require('axios')
const fs = require('fs')

const { USERS_TABLE, REGION } = process.env
const client = new DynamoDBClient({ region: REGION })
const docClient = DynamoDBDocumentClient.from(client)

const user_exists_in_UsersTable = async (id) => {
  console.log(`looking for user [${id}] in table [${USERS_TABLE}]`)

  const command = new GetCommand({ TableName: USERS_TABLE, Key: { id } })
  const resp = await docClient.send(command)

  expect(resp.Item).toBeTruthy()

  return resp.Item
}

const delete_test_data = async (id) => {
  console.log(`deleting record with [${id}] in table [${USERS_TABLE}]`)

  const command = new DeleteCommand({ TableName: USERS_TABLE, Key: { id } })

  return await docClient.send(command)
}

const user_can_upload_image_to_url = async ({
  uploadUrl,
  contentType,
  filePath,
}) => {
  const data = fs.readFileSync(filePath)

  const res = await http({
    method: 'put',
    url: uploadUrl.getImageUploadUrl,
    headers: { 'Content-Type': contentType },
    data,
  })

  return res
}

const user_can_download_image_from = async (url) => {
  const resp = await http(url)

  return resp.data
}

module.exports = {
  user_exists_in_UsersTable,
  delete_test_data,
  user_can_upload_image_to_url,
  user_can_download_image_from,
}
