const { gql } = require('graphql-request')

const myProfileFragment = gql`
  fragment myProfileFields on MyProfile {
    id
    name
    screenName
    imageUrl
    backgroundImageUrl
    bio
    location
    website
    birthdate
    createdAt
    followersCount
    followingCount
    tweetsCount
    likesCount
  }
`

const otherProfileFragment = gql`
  fragment otherProfileFields on OtherProfile {
    id
    name
    screenName
    imageUrl
    backgroundImageUrl
    bio
    location
    website
    birthdate
    createdAt
    followersCount
    followingCount
    tweetsCount
    likesCounts
    following
    followedBy
  }
`

const iProfileFragment = gql`
  fragment iProfileFields on IProfile {
    ... on MyProfile {
      ...myProfileFields
    }

    ... on OtherProfile {
      ...otherProfileFields
    }
  }
  ${myProfileFragment}
  ${otherProfileFragment}
`

const tweetFragment = gql`
  fragment tweetFields on Tweet {
    id
    profile {
      ...iProfileFields
    }
    createdAt
    text
    replies
    likes
    retweets
    retweeted
    liked
  }
  ${iProfileFragment}
`

const retweetFragment = gql`
  fragment retweetFields on Retweet {
    id
    profile {
      ...iProfileFields
    }
    createdAt
    retweetOf {
      ... on Tweet {
        ...tweetFields
      }

      ... on Reply {
        ...replyFields
      }
    }
  }
  ${iProfileFragment}
`
const replyFragment = gql`
  fragment replyFields on Reply {
    id
    profile {
      ...iProfileFields
    }
    createdAt
    text
    replies
    likes
    retweets
    retweeted
    liked
    inReplyToTweet {
      id
      profile {
        ...iProfileFields
      }
      createdAt
      ... on Tweet {
        replies
      }
      ... on Reply {
        replies
      }
    }
    inReplyToUsers {
      ...iProfileFields
    }
  }
  ${iProfileFragment}
`

const iTweetFragment = gql`
  fragment iTweetFields on ITweet {
    ... on Tweet {
      ...tweetFields
    }

    ... on Retweet {
      ...retweetFields
    }

    ... on Reply {
      ...replyFields
    }
  }
  ${tweetFragment}
  ${retweetFragment}
  ${replyFragment}
`

const editMyProfile = gql`
  mutation editMyProfile($input: ProfileInput!) {
    editMyProfile(newProfile: $input) {
      ...myProfileFields
    }
  }
  ${myProfileFragment}
`

module.exports = { editMyProfile }
