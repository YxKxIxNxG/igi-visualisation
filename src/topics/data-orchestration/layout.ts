export type NodeLayout = {
  id: string
  x: number
  y: number
  accent: string
}

/** Percent-based positions on the stage (0–100) */
export const APP_NODE = { x: 50, y: 42 }

export const TYPE_NODES: NodeLayout[] = [
  { id: 'transactional', x: 18, y: 22, accent: '#4169E1' },
  { id: 'analytical', x: 82, y: 22, accent: '#FFCC01' },
  { id: 'timeseries', x: 18, y: 78, accent: '#FF4438' },
  { id: 'semi-structured', x: 82, y: 78, accent: '#47A248' },
]

export const ENGINE_OFFSETS: Record<string, { x: number; y: number }[]> = {
  transactional: [
    { x: -42, y: 72 },
    { x: 42, y: 72 },
  ],
  analytical: [{ x: 0, y: 68 }],
  'semi-structured': [{ x: 0, y: 68 }],
  timeseries: [{ x: 0, y: 68 }],
}

export function pathFromAppToType(typeX: number, typeY: number) {
  const ax = APP_NODE.x
  const ay = APP_NODE.y
  const cx1 = ax + (typeX - ax) * 0.35
  const cy1 = ay - 8
  const cx2 = typeX - (typeX - ax) * 0.35
  const cy2 = typeY - 6
  return `M ${ax} ${ay} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${typeX} ${typeY}`
}

export function pathFromTypeToEngine(
  typeX: number,
  typeY: number,
  offsetX: number,
  offsetY: number,
) {
  const ex = typeX + offsetX * 0.14
  const ey = typeY + offsetY * 0.14
  return `M ${typeX} ${typeY + 4} Q ${typeX} ${ey - 4}, ${ex} ${ey}`
}
