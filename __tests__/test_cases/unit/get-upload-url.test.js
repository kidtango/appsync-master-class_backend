const when = require('../../steps/when')
const chance = require('chance').Chance()
require('dotenv').config()

describe('When getImageUploadUrl runs', () => {
  it('runs', async () => {
    const username = chance.guid()

    const signUrl = await when.we_invoke_getImageUploadUrl({
      username,
      extension: '.png',
      contentType: 'image/png',
    })
    console.log(
      '🚀 ~ file: get-upload-url.test.js:12 ~ it.each ~ signUrl:',
      signUrl
    )
  })
})
