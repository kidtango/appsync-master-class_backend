const S3 = require('aws-sdk/clients/s3')
const s3 = new S3({ useAccelerateEndpoint: true })
const ulid = require('ulid')

module.exports.handler = async (event) => {
  console.log(event)
  const { arguments, identity = {} } = event

  const { BUCKET_NAME } = process.env

  const id = ulid.ulid()
  let key = `${identity?.username}/${id}`

  const extension = arguments.extension

  if (extension) {
    if (extension.startsWith('.')) {
      key += extension
    } else {
      key += `.${extension}`
    }
  }

  const contentType = event.arguments.contentType || 'image/jpeg'
  if (!contentType.startsWith('image/')) {
    throw new Error('content type should be an image')
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    ACL: 'public-read',
    ContentType: contentType,
  }

  const signedUrl = s3.getSignedUrl('putObject', params)
  return signedUrl
}
