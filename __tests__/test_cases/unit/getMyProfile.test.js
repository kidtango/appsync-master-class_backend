const given = require('../../steps/given')
const when = require('../../steps/when')
const Chance = require('chance').Chance()
const path = require('path')
const AWS = require('aws-sdk')
const client = new AWS.AppSync({ region: 'us-east-1' })
const fs = require('fs')

describe('#getMyProfile', () => {
  it('Should use username as id', async () => {
    const templatePath = path.resolve(
      __dirname,
      '../../../mapping-templates/queries/getMyProfile.request.vtl'
    )
    const template = fs.readFileSync(templatePath, { encoding: 'utf-8' })

    const context = JSON.stringify({
      arguments: {
        firstname: 'Shaggy',
        age: 4,
      },
      source: {},
      result: {
        breed: 'Miniature Schnauzer',
        color: 'black_grey',
      },
      identity: {
        sub: 'uuid',
        issuer: ' https://cognito-idp.{region}.amazonaws.com/{userPoolId}',
        username: 'Nadia',
        claims: {},
        sourceIp: ['x.x.x.x'],
        defaultAuthStrategy: 'ALLOW',
      },
    })

    const response = await client
      .evaluateMappingTemplate({ template, context })
      .promise()
    const result = JSON.parse(response.evaluationResult)
  })
})
