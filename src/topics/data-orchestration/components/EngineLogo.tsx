import { getEngineLogo, engineBrandColor } from '#/topics/data-orchestration/engineLogos'

type EngineLogoProps = {
  engine: string
  size?: number
  variant?: 'brand' | 'mono'
  className?: string
}

/** Inline SVG logo for HTML layouts (scrolly list, badges) */
export function EngineLogo({
  engine,
  size = 16,
  variant = 'brand',
  className,
}: EngineLogoProps) {
  const icon = getEngineLogo(engine)
  if (!icon) return null

  const fill =
    variant === 'brand' ? engineBrandColor(engine) : 'currentColor'

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-label={icon.title}
    >
      <title>{icon.title}</title>
      <path d={icon.path} fill={fill} />
    </svg>
  )
}

type EngineBadgeProps = {
  engine: string
  dataFor?: string
  compact?: boolean
  className?: string
}

export function EngineBadge({
  engine,
  dataFor,
  compact = false,
  className = '',
}: EngineBadgeProps) {
  const color = engineBrandColor(engine, 0.35)

  return (
    <span
      data-engine={engine}
      {...(dataFor ? { 'data-for': dataFor } : {})}
      className={`inline-flex items-center gap-1.5 border px-2 py-1 ${className}`}
      style={{ borderColor: color }}
    >
      <EngineLogo engine={engine} size={compact ? 14 : 16} variant="brand" />
      {!compact && (
        <span className="font-mono text-[10px] text-text-muted">{engine}</span>
      )}
    </span>
  )
}

type EngineLogoSvgProps = {
  engine: string
  x: number
  y: number
  size?: number
  variant?: 'brand' | 'mono'
  /** Extra attributes for GSAP targeting */
  dataFor?: string
}

/** SVG `<g>` logo for the video stage diagram */
export function EngineLogoSvg({
  engine,
  x,
  y,
  size = 18,
  variant = 'brand',
  dataFor,
}: EngineLogoSvgProps) {
  const icon = getEngineLogo(engine)
  if (!icon) return null

  const scale = size / 24
  const fill =
    variant === 'brand' ? engineBrandColor(engine) : 'rgba(250,250,250,0.9)'

  return (
    <g
      data-engine={engine}
      {...(dataFor ? { 'data-for': dataFor } : {})}
      transform={`translate(${x}, ${y}) scale(${scale})`}
    >
      <path d={icon.path} fill={fill} />
    </g>
  )
}

type EngineTileSvgProps = {
  engine: string
  x: number
  y: number
  width?: number
  height?: number
  dataFor?: string
  showLabel?: boolean
}

/** Logo tile with optional label — used in the video diagram */
export function EngineTileSvg({
  engine,
  x,
  y,
  width = 84,
  height = 36,
  dataFor,
  showLabel = true,
}: EngineTileSvgProps) {
  const border = engineBrandColor(engine, 0.45)
  const logoSize = showLabel ? 16 : 20
  const logoX = showLabel ? 8 : (width - logoSize) / 2
  const logoY = showLabel ? 6 : (height - logoSize) / 2

  return (
    <g
      data-engine={engine}
      {...(dataFor ? { 'data-for': dataFor } : {})}
      transform={`translate(${x}, ${y})`}
    >
      <rect
        width={width}
        height={height}
        fill="#0a0a0a"
        stroke={border}
        strokeWidth="1"
      />
      <EngineLogoSvg
        engine={engine}
        x={logoX}
        y={logoY}
        size={logoSize}
        variant="brand"
      />
      {showLabel && (
        <text
          x={28}
          y={22}
          fill="#a1a1a1"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
        >
          {engine}
        </text>
      )}
    </g>
  )
}
