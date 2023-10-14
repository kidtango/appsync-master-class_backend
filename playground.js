const adSummary = 'ADSUMMARY'
const XML = 'XML'
const none = 'NONE'
const comment = 'COMMENT'
const rendition = 'RENDITION'
const low = 'LOW'

const items = [
  {
    PK: 'QCSESSION|vast123',
    SK: '1|ADSUMMARY|XML',
    entityType: adSummary,
    category: XML,
    subCategory: none,
    sessionId: 1,
  },
  {
    PK: 'QCSESSION|vast123',
    SK: '1|ADSUMMARY|RENDITION|LOW_1',
    entityType: adSummary,
    category: XML,
    subCategory: none,
    sessionId: 1,
  },
  {
    PK: 'QCSESSION|vast123',
    SK: '1|COMMENT|XML',
    entityType: comment,
    category: XML,
    subCategory: none,
    sessionId: 1,
  },
  {
    PK: 'QCSESSION|vast123',
    SK: '1|COMMENT|RENDITION|LOW_1',
    entityType: comment,
    category: rendition,
    subCategory: low,
    sessionId: 1,
  },
  {
    PK: 'QCSESSION|vast456',
    SK: '2|ADSUMMARY|XML',
    entityType: adSummary,
    category: XML,
    subCategory: none,
    sessionId: 2,
  },
  {
    PK: 'QCSESSION|vast456',
    SK: '2|ADSUMMARY|RENDITION|LOW_1',
    entityType: adSummary,
    category: XML,
    subCategory: none,
    sessionId: 2,
  },
  {
    PK: 'QCSESSION|vast456',
    SK: '2|COMMENT|XML',
    entityType: comment,
    category: XML,
    subCategory: none,
    sessionId: 2,
  },
  {
    PK: 'QCSESSION|vast456',
    SK: '2|COMMENT|RENDITION|LOW_1',
    entityType: comment,
    category: rendition,
    subCategory: low,
    sessionId: 2,
  },
]

const sessionIds = [1, 2]

const organizedSessions = sessionIds.reduce((acc, sessionId) => {
  acc[sessionId] = items.filter((item) => item.sessionId === sessionId)
  return acc
}, {})
console.log(
  '🚀 ~ file: playground.js:74 ~ organizedSessions ~ organizedSessions:',
  organizedSessions
)

const qcResults = {
  xml: {
    adSummary: {},
    comments: [],
  },
  reditions: [
    { adSummary: {}, comments: [] },
    { adSummary: {}, comments: [] },
  ],
}
