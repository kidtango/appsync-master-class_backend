require('dotenv').config()
const given = require('../../steps/given')
const then = require('../../steps/then')
const when = require('../../steps/when')

describe('Given an authenticated user', () => {
  let user, profile
  beforeAll(async () => {
    user = await given.an_authenticated_user()
  })

  it('The user can fetch his profile with getMyProfile', async () => {
    profile = await when.a_user_calls_getMyProfile(user)

    expect(profile).toMatchObject({
      id: user.username,
      name: user.name,
      createdAt: expect.stringMatching(
        /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/g
      ),
      // tweets
      followersCount: 0,
      followingCount: 0,
      likesCount: 0,
    })
  })

  it('The user can edit his profile with editMyProfile', async () => {
    const input = {
      name: 'New Name',
    }

    const updatedProfile = await when.a_user_calls_editMyProfile({
      user,
      input,
    })

    expect(updatedProfile.name).toEqual(input.name)
  })
})
