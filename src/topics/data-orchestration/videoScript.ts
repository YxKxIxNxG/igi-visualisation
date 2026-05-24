export type VideoBeat = {
  id: string
  caption: string
  /** Seconds into the master timeline when this caption appears */
  at: number
}

export const VIDEO_BEATS: VideoBeat[] = [
  {
    id: 'intro',
    caption:
      'Why does the data orchestration problem arise in the first place?',
    at: 0,
  },
  {
    id: 'context',
    caption:
      'We deal with very different types of data across modern applications.',
    at: 2.2,
  },
  {
    id: 'transactional',
    caption:
      'Transactional data — user profiles, bank balances — needs PostgreSQL or MySQL.',
    at: 5.5,
  },
  {
    id: 'analytical',
    caption:
      'Analytical data — massive clickstream logs — lands in ClickHouse.',
    at: 9.5,
  },
  {
    id: 'semi-structured',
    caption:
      'Semi-structured data — flexible JSON product catalogs — fits MongoDB.',
    at: 13.5,
  },
  {
    id: 'timeseries',
    caption:
      'Real-time and time-series data — sessions, IoT metrics — lives in Redis.',
    at: 17.5,
  },
  {
    id: 'sprawl',
    caption:
      'One application. Five storage engines. Moving data between them — that is orchestration.',
    at: 22,
  },
]

/** Total runtime for one loop (seconds) */
export const VIDEO_DURATION = 28
