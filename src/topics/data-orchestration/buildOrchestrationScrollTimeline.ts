import { gsap } from '#/lib/gsap/setup'
import {
  buildStageFocus,
  buildStageIntro,
  buildStageSprawl,
} from '#/topics/data-orchestration/orchestrationTimeline'

const FOCUS_TYPES = [
  'transactional',
  'analytical',
  'semi-structured',
  'timeseries',
] as const

export function buildOrchestrationScrollTimeline(root: Element): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })

  buildStageIntro(tl, root)

  let cursor = 2.8
  FOCUS_TYPES.forEach((typeId) => {
    buildStageFocus(tl, root, typeId, cursor)
    tl.to(
      root.querySelectorAll(`[data-engine-node][data-for="${typeId}"]`),
      { opacity: 0, scale: 0, duration: 0.3 },
      cursor + 3.2,
    )
    tl.to(
      root.querySelectorAll(`[data-packet="${typeId}"]`),
      { opacity: 0, duration: 0.25 },
      cursor + 3.2,
    )
    cursor += 3.6
  })

  buildStageSprawl(tl, root, cursor + 0.4)
  return tl
}

export function buildOrchestrationScrollTimelineCallback(root: Element) {
  return (tl: gsap.core.Timeline) => {
    const master = buildOrchestrationScrollTimeline(root)
    tl.add(master)
  }
}
