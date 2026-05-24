export type DataTypeEntry = {
  id: string
  label: string
  examples: string
  engines: string[]
}

export const DATA_TYPES: DataTypeEntry[] = [
  {
    id: 'transactional',
    label: 'Transactional',
    examples: 'User profiles, bank balances',
    engines: ['PostgreSQL', 'MySQL'],
  },
  {
    id: 'analytical',
    label: 'Analytical',
    examples: 'Massive clickstream logs',
    engines: ['ClickHouse'],
  },
  {
    id: 'semi-structured',
    label: 'Semi-structured',
    examples: 'Flexible JSON product catalogs',
    engines: ['MongoDB'],
  },
  {
    id: 'timeseries',
    label: 'Real-time / time-series',
    examples: 'User sessions, IoT metrics',
    engines: ['Redis'],
  },
]

export const ALL_ENGINES = [
  'PostgreSQL',
  'MySQL',
  'ClickHouse',
  'MongoDB',
  'Redis',
] as const
