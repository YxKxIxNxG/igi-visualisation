import type { MutableRefObject } from 'react'
import { gsap } from '#/lib/gsap/setup'
import {
  buildStageFocus,
  buildStageIntro,
  buildStageSprawl,
  initStageState,
} from '#/topics/data-orchestration/orchestrationTimeline'
import { VIDEO_BEATS, VIDEO_DURATION } from '#/topics/data-orchestration/videoScript'

type BuildVideoTimelineOptions = {
  root: Element
  onCaption: (text: string) => void
  onProgress: (ratio: number) => void
}

const FOCUS_SEQUENCE = [
  { typeId: 'transactional', at: 5 },
  { typeId: 'analytical', at: 9 },
  { typeId: 'semi-structured', at: 13 },
  { typeId: 'timeseries', at: 17 },
] as const

export function buildVideoTimeline(
  options: BuildVideoTimelineOptions,
): gsap.core.Timeline {
  const { root, onCaption, onProgress } = options

  initStageState(root)

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.out' },
    onUpdate: () => onProgress(tl.progress()),
  })

  VIDEO_BEATS.forEach((beat) => {
    tl.call(() => onCaption(beat.caption), [], beat.at)
  })

  buildStageIntro(tl, root)

  FOCUS_SEQUENCE.forEach(({ typeId, at }) => {
    buildStageFocus(tl, root, typeId, at)
  })

  buildStageSprawl(tl, root, 21.5)
  tl.to({}, { duration: VIDEO_DURATION - 21.5 - 1.2 })

  return tl
}

export function attachTimelineControls(
  tl: gsap.core.Timeline,
  playingRef: MutableRefObject<boolean>,
) {
  return {
    play: () => {
      playingRef.current = true
      tl.play()
    },
    pause: () => {
      playingRef.current = false
      tl.pause()
    },
    restart: () => {
      playingRef.current = true
      tl.restart()
    },
    seek: (ratio: number) => {
      tl.progress(ratio)
    },
  }
}
