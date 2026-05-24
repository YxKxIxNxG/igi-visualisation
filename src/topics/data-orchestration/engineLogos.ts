import {
  siClickhouse,
  siMongodb,
  siMysql,
  siPostgresql,
  siRedis,
  type SimpleIcon,
} from 'simple-icons'
import { ALL_ENGINES } from '#/topics/data-orchestration/data'

export type EngineName = (typeof ALL_ENGINES)[number]

/** Brand SVG paths from Simple Icons (https://simpleicons.org) */
export const ENGINE_LOGOS: Record<EngineName, SimpleIcon> = {
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  ClickHouse: siClickhouse,
  MongoDB: siMongodb,
  Redis: siRedis,
}

export function getEngineLogo(name: string): SimpleIcon | undefined {
  return ENGINE_LOGOS[name as EngineName]
}

export function engineBrandColor(name: string, alpha = 1): string {
  const icon = getEngineLogo(name)
  if (!icon) return `rgba(255,255,255,${alpha})`
  if (alpha >= 1) return `#${icon.hex}`
  const r = parseInt(icon.hex.slice(0, 2), 16)
  const g = parseInt(icon.hex.slice(2, 4), 16)
  const b = parseInt(icon.hex.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}
