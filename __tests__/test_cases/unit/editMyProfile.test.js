const given = require('../../steps/given')
const when = require('../../steps/when')
const Chance = require('chance').Chance()
const path = require('path')
const AWS = require('aws-sdk')
const client = new AWS.AppSync({ region: 'us-east-1' })
const fs = require('fs')

describe('#editMyProfile', () => {
  it('returns VTL for editing my profile', async () => {
    const templatePath = path.resolve(
      __dirname,
      '../../../mapping-templates/mutations/editMyProfile.request.vtl'
    )
    const template = fs.readFileSync(templatePath, { encoding: 'utf-8' })

    const context = JSON.stringify({
      arguments: {
        newProfile: {
          name: 'Nadia Updated',
          imageUrl: 'imageUrl.com',
          backgroundImageUrl: 'backgroundImageUrl.com',
          bio: 'bio101',
          location: 'location101',
          website: 'website101',
          birthdate: '09-15-1982',
        },
      },
      source: {},
      result: {},
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

    expect(result.operation).toEqual('UpdateItem')
    expect(result.key).toEqual({ id: { S: 'Nadia' } })
    expect(result.update.expressionValues).toEqual({
      ':name': { S: 'Nadia Updated' },
      ':imageUrl': { S: 'imageUrl.com' },
      ':backgroundImageUrl': { S: 'backgroundImageUrl.com' },
      ':bio': { S: 'bio101' },
      ':location': { S: 'location101' },
      ':website': { S: 'website101' },
      ':birthdate': { S: '09-15-1982' },
    })
  })
})
