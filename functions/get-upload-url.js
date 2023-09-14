import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3')
const S3 = require('aws-sdk/clients/s3')
const s3 = new S3({ useAccelerateEndpoint: true })
const ulid = require('ulid')

module.exports.handler = async (event) => {
  const client = new S3Client({ region: process.env.REGION })
  console.log(event)
  const { arguments: args, identity = {} } = event

  const { BUCKET_NAME, REGION } = process.env

  const id = ulid.ulid()
  let key = `${identity?.username}/${id}`

  const extension = args.extension

  if (extension) {
    if (extension.startsWith('.')) {
      key += extension
    } else {
      key += `.${extension}`
    }
  }

  const contentType = args.contentType || 'image/jpeg'
  if (!contentType.startsWith('image/')) {
    throw new Error('content type should be an image')
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    ACL: 'public-read',
    ContentType: contentType,
  }

  const command = new PutObjectCommand(params)
  return getSignedUrl(client, command, { expiresIn: 3600 })
}
