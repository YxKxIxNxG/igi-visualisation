import { useRef, useState } from 'react'
import { registerGsap, gsap, useGSAP } from '#/lib/gsap/setup'
import { DATA_TYPES } from '#/topics/data-orchestration/data'
import { EngineLogo } from '#/topics/data-orchestration/components/EngineLogo'
import { engineBrandColor } from '#/topics/data-orchestration/engineLogos'
import {
  APP_NODE,
  ENGINE_OFFSETS,
  TYPE_NODES,
  pathFromAppToType,
  pathFromTypeToEngine,
} from '#/topics/data-orchestration/layout'
import {
  appHubRestingShadow,
  focusTypeInteractive,
  initStageState,
  resetStageHighlight,
} from '#/topics/data-orchestration/orchestrationTimeline'

type DataOrchestrationStageProps = {
  stageRef?: React.RefObject<HTMLDivElement | null>
  interactive?: boolean
  className?: string
}

export function DataOrchestrationStage({
  stageRef: externalRef,
  interactive = true,
  className = '',
}: DataOrchestrationStageProps) {
  const internalRef = useRef<HTMLDivElement>(null)
  const rootRef = externalRef ?? internalRef
  const [activeType, setActiveType] = useState<string | null>(null)

  useGSAP(
    () => {
      registerGsap()
      const root = rootRef.current
      if (!root) return
      initStageState(root)
    },
    { scope: rootRef },
  )

  const handleTypeFocus = (typeId: string) => {
    if (!interactive) return
    const root = rootRef.current
    if (!root) return
    setActiveType(typeId)
    focusTypeInteractive(root, typeId)
  }

  const handleTypeLeave = () => {
    if (!interactive || !rootRef.current) return
    setActiveType(null)
    gsap.killTweensOf(rootRef.current.querySelectorAll('[data-packet]'))
    resetStageHighlight(rootRef.current)
  }

  return (
    <div
      ref={rootRef}
      className={`orchestration-stage relative h-full w-full overflow-hidden ${className}`}
      aria-label="Data orchestration diagram"
    >
      <div
        data-stage-bg
        className="pointer-events-none absolute inset-0 opacity-0"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,255,255,0.06)_0%,transparent_55%)]" />
        <div
          data-stage-aurora
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 42%, rgba(65,105,225,0.08), rgba(255,204,1,0.06), rgba(255,68,56,0.06), rgba(71,162,72,0.06), rgba(65,105,225,0.08))',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          {TYPE_NODES.map((node) => (
            <linearGradient
              key={`grad-${node.id}`}
              id={`flow-grad-${node.id}`}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
              <stop offset="45%" stopColor={node.accent} stopOpacity="0.55" />
              <stop offset="100%" stopColor={node.accent} stopOpacity="0.95" />
            </linearGradient>
          ))}
        </defs>

        {TYPE_NODES.map((node) => {
          const type = DATA_TYPES.find((t) => t.id === node.id)!
          const mainPath = pathFromAppToType(node.x, node.y)
          return (
            <g key={node.id}>
              <path
                id={`flow-${node.id}`}
                data-flow-path={node.id}
                d={mainPath}
                fill="none"
                stroke={`url(#flow-grad-${node.id})`}
                strokeWidth="0.4"
                strokeDasharray="400"
                vectorEffect="non-scaling-stroke"
              />
              {type.engines.map((_, ei) => {
                const off = ENGINE_OFFSETS[node.id]?.[ei]
                if (!off) return null
                return (
                  <path
                    key={ei}
                    id={`flow-${node.id}-e${ei}`}
                    data-flow-path={node.id}
                    d={pathFromTypeToEngine(node.x, node.y, off.x, off.y)}
                    fill="none"
                    stroke={node.accent}
                    strokeOpacity="0.4"
                    strokeWidth="0.22"
                    strokeDasharray="200"
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}
            </g>
          )
        })}

        <circle
          data-sprawl-ring
          cx="50"
          cy="42"
          r="38"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="0.28"
          strokeDasharray="4 3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {TYPE_NODES.map((node) => (
        <span
          key={`packet-${node.id}`}
          data-packet={node.id}
          className="pointer-events-none absolute h-2.5 w-2.5 rounded-full opacity-0"
          style={{
            left: `${APP_NODE.x}%`,
            top: `${APP_NODE.y}%`,
            backgroundColor: node.accent,
            boxShadow: `0 0 16px ${node.accent}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <div
        data-app-hub
        className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/25 bg-bg/85 backdrop-blur-xl"
        style={{
          left: `${APP_NODE.x}%`,
          top: `${APP_NODE.y}%`,
          boxShadow: appHubRestingShadow(),
          width: 'clamp(150px, 18vw, 220px)',
          height: 'clamp(150px, 18vw, 220px)',
        }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-text-subtle">
          Core
        </span>
        <span className="mt-1.5 text-center text-sm font-medium leading-tight text-text sm:text-base">
          Modern
          <br />
          Application
        </span>
      </div>

      {TYPE_NODES.map((node) => {
        const type = DATA_TYPES.find((t) => t.id === node.id)!
        const isActive = activeType === node.id
        return (
          <button
            key={node.id}
            type="button"
            data-type-card={node.id}
            onClick={() => handleTypeFocus(node.id)}
            onMouseEnter={() => interactive && handleTypeFocus(node.id)}
            onMouseLeave={handleTypeLeave}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: 'clamp(200px, 20vw, 280px)',
            }}
          >
            <div
              className="relative rounded-2xl border bg-bg/75 p-5 backdrop-blur-xl transition-all duration-500"
              style={{
                borderColor: isActive ? `${node.accent}99` : 'rgba(255,255,255,0.1)',
                boxShadow: isActive
                  ? `0 0 48px ${node.accent}40, inset 0 1px 0 rgba(255,255,255,0.08)`
                  : 'inset 0 1px 0 rgba(255,255,255,0.05)',
                transform: isActive ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              <div
                className="mb-3 h-0.5 w-10 rounded-full"
                style={{ backgroundColor: node.accent }}
              />
              <p className="text-xs font-medium uppercase tracking-wider text-text-subtle">
                {type.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {type.examples}
              </p>
            </div>
          </button>
        )
      })}

      {TYPE_NODES.flatMap((node) => {
        const type = DATA_TYPES.find((t) => t.id === node.id)!
        return type.engines.map((engine, ei) => {
          const off = ENGINE_OFFSETS[node.id]?.[ei]
          if (!off) return null
          const ex = node.x + off.x * 0.14
          const ey = node.y + off.y * 0.14
          return (
            <div
              key={`${node.id}-${engine}`}
              data-engine-node
              data-for={node.id}
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-xl border bg-bg/80 px-3.5 py-2.5 backdrop-blur-md"
              style={{
                left: `${ex}%`,
                top: `${ey}%`,
                borderColor: engineBrandColor(engine, 0.4),
                boxShadow: `0 0 24px ${engineBrandColor(engine, 0.12)}`,
              }}
            >
              <EngineLogo engine={engine} size={26} variant="brand" />
              <span className="font-mono text-xs text-text">{engine}</span>
            </div>
          )
        })
      })}
    </div>
  )
}
