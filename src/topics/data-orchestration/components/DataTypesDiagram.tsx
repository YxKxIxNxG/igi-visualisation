import { useRef } from 'react'
import { registerGsap, gsap, useGSAP } from '#/lib/gsap/setup'
import { ALL_ENGINES, DATA_TYPES } from '#/topics/data-orchestration/data'
import { EngineBadge } from '#/topics/data-orchestration/components/EngineLogo'

export function DataTypesDiagram() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      registerGsap()
      const root = rootRef.current
      if (!root) return

      gsap.set(root.querySelector('[data-layer="problem"]'), { opacity: 1 })
      gsap.set(root.querySelectorAll('[data-row]'), { opacity: 0.15, y: 6 })
      gsap.set(root.querySelectorAll('[data-engine]'), { opacity: 0.15, scale: 0.96 })
      gsap.set(root.querySelector('[data-layer="sprawl"]'), { opacity: 0 })
      gsap.set(root.querySelectorAll('[data-sprawl-engine]'), { opacity: 0.2 })

      const rowEls = root.querySelectorAll('[data-row]')
      rowEls.forEach((row) => {
        const onEnter = () => {
          gsap.to(rowEls, { opacity: 0.2, duration: 0.2 })
          gsap.to(row, { opacity: 1, duration: 0.2 })
          gsap.to(row.querySelectorAll('[data-engine]'), {
            opacity: 1,
            scale: 1,
            duration: 0.2,
          })
        }
        const onLeave = () => {
          gsap.to(rowEls, { opacity: 0.35, y: 0, duration: 0.2 })
        }
        row.addEventListener('mouseenter', onEnter)
        row.addEventListener('mouseleave', onLeave)
      })

      return () => {
        rowEls.forEach((row) => {
          row.replaceWith(row.cloneNode(true))
        })
      }
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} className="w-full select-none" aria-label="Data types and storage engines">
      <header
        data-layer="problem"
        className="mb-6 border border-border px-3 py-2 text-center text-xs text-text-subtle"
      >
        Modern application
      </header>

      <ul className="space-y-3">
        {DATA_TYPES.map((type) => (
          <li
            key={type.id}
            data-row={type.id}
            className="grid cursor-default grid-cols-[1fr_auto] items-center gap-3 border border-border px-3 py-2.5 transition-colors hover:border-border"
          >
            <div>
              <p className="text-xs font-medium text-text">{type.label}</p>
              <p className="mt-0.5 text-[11px] text-text-subtle">{type.examples}</p>
            </div>
            <div className="flex flex-wrap justify-end gap-1.5">
              {type.engines.map((engine) => (
                <EngineBadge key={engine} engine={engine} dataFor={type.id} />
              ))}
            </div>
          </li>
        ))}
      </ul>

      <footer data-layer="sprawl" className="mt-6 border-t border-border pt-4">
        <p className="text-[11px] text-text-subtle">
          {ALL_ENGINES.length} storage engines for one application
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {ALL_ENGINES.map((engine) => (
            <span key={engine} data-sprawl-engine={engine}>
              <EngineBadge engine={engine} compact />
            </span>
          ))}
        </div>
      </footer>
    </section>
  )
}

export function buildDataTypesTimeline(tl: gsap.core.Timeline) {
  const rows = DATA_TYPES.map((t) => `[data-row="${t.id}"]`).join(',')

  tl.to('[data-layer="problem"]', { opacity: 1, duration: 0.3 }, 0)
    .to(rows, { opacity: 0.35, y: 0, duration: 0.4, stagger: 0.08 }, 0.1)

  DATA_TYPES.forEach((type, i) => {
    const t = 0.5 + i * 0.35
    const row = `[data-row="${type.id}"]`
    const engines = type.engines
      .map((e) => `[data-engine="${e}"][data-for="${type.id}"]`)
      .join(',')

    tl.to(rows, { opacity: 0.12, duration: 0.2 }, t)
      .to(row, { opacity: 1, duration: 0.25 }, t)
      .to(engines, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06 }, t + 0.05)
  })

  const lastT = 0.5 + DATA_TYPES.length * 0.35
  tl.to(rows, { opacity: 0.85, duration: 0.4 }, lastT)
    .to('[data-engine]', { opacity: 0.9, scale: 1, duration: 0.35, stagger: 0.04 }, lastT)
    .to('[data-layer="sprawl"]', { opacity: 1, duration: 0.35 }, lastT + 0.1)
    .to('[data-sprawl-engine]', { opacity: 1, duration: 0.3, stagger: 0.05 }, lastT + 0.15)
}
