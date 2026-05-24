import { useRef, useState } from 'react'
import { registerGsap, gsap, useGSAP } from '#/lib/gsap/setup'
import { DataOrchestrationStage } from '#/topics/data-orchestration/components/DataOrchestrationStage'
import {
  attachTimelineControls,
  buildVideoTimeline,
} from '#/topics/data-orchestration/buildVideoTimeline'
import { VIDEO_DURATION } from '#/topics/data-orchestration/videoScript'

type DataOrchestrationVideoProps = {
  hideChrome?: boolean
  autoplay?: boolean
}

export function DataOrchestrationVideo({
  hideChrome = false,
  autoplay = false,
}: DataOrchestrationVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const playingRef = useRef(false)
  const controlsRef = useRef<ReturnType<typeof attachTimelineControls> | null>(
    null,
  )

  const [caption, setCaption] = useState('')
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(false)

  const updateCaption = (text: string) => {
    const el = captionRef.current
    if (!el) {
      setCaption(text)
      return
    }
    gsap.to(el, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setCaption(text)
        gsap.to(el, { opacity: 1, duration: 0.35 })
      },
    })
  }

  useGSAP(
    () => {
      registerGsap()
      const stage = stageRef.current
      if (!stage) return

      const tl = buildVideoTimeline({
        root: stage,
        onCaption: updateCaption,
        onProgress: setProgress,
      })
      tlRef.current = tl
      controlsRef.current = attachTimelineControls(tl, playingRef)

      tl.eventCallback('onComplete', () => {
        playingRef.current = false
        setPlaying(false)
      })

      if (autoplay) {
        playingRef.current = true
        setPlaying(true)
        tl.play()
      }

      return () => {
        tl.kill()
      }
    },
    { scope: rootRef, dependencies: [autoplay] },
  )

  const togglePlay = () => {
    if (!controlsRef.current) return
    if (playingRef.current) {
      controlsRef.current.pause()
      setPlaying(false)
    } else {
      controlsRef.current.play()
      setPlaying(true)
    }
  }

  const restart = () => {
    controlsRef.current?.restart()
    setPlaying(true)
  }

  const enterFullscreen = () => {
    rootRef.current?.requestFullscreen?.()
  }

  const padding = hideChrome ? 'p-0' : 'px-6 py-10'

  return (
    <div className={`mx-auto w-full max-w-[1600px] ${padding}`}>
      {!hideChrome && (
        <header className="mb-6">
          <p className="text-sm text-text-subtle">Video mode · cinematic · ~28s</p>
          <h1 className="mt-1 text-2xl font-medium tracking-tight">
            Data orchestration — section 1
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Hit Play or open with{' '}
            <code className="text-text">?autoplay=1&amp;clean=1</code> to record
            a clean clip for your video.
          </p>
        </header>
      )}

      <div
        ref={rootRef}
        className={`video-stage relative w-full overflow-hidden bg-bg ${
          hideChrome ? 'h-screen' : 'h-[min(88vh,920px)] border border-white/10'
        }`}
      >
        <DataOrchestrationStage stageRef={stageRef} interactive={false} />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/90 to-transparent px-8 pb-10 pt-24 sm:px-12">
          <p
            ref={captionRef}
            className="min-h-[4rem] max-w-4xl text-xl font-medium leading-snug tracking-tight text-text sm:text-2xl lg:text-3xl"
          >
            {caption}
          </p>
        </div>

        {!hideChrome && (
          <div className="absolute right-5 top-5 font-mono text-xs text-text-subtle">
            {formatTime(progress * VIDEO_DURATION)} / {formatTime(VIDEO_DURATION)}
          </div>
        )}
      </div>

      {!hideChrome && (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={togglePlay}
            className="border border-border px-5 py-2.5 text-sm text-text transition-colors hover:bg-white/[0.04]"
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            onClick={restart}
            className="border border-border px-5 py-2.5 text-sm text-text-muted transition-colors hover:bg-white/[0.04]"
          >
            Restart
          </button>
          <button
            type="button"
            onClick={enterFullscreen}
            className="border border-border px-5 py-2.5 text-sm text-text-muted transition-colors hover:bg-white/[0.04]"
          >
            Fullscreen
          </button>
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(progress * 1000)}
            onChange={(e) => {
              const ratio = Number(e.target.value) / 1000
              controlsRef.current?.seek(ratio)
              setProgress(ratio)
            }}
            className="h-1 min-w-[160px] flex-1 cursor-pointer accent-white"
            aria-label="Timeline scrubber"
          />
        </div>
      )}
    </div>
  )
}

function formatTime(seconds: number) {
  const s = Math.floor(seconds)
  const ms = Math.floor((seconds % 1) * 10)
  return `${s}.${ms}s`
}
