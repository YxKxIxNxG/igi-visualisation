import { useRef } from 'react'
import type { ReactNode } from 'react'
import { registerGsap, gsap, useGSAP, ScrollTrigger } from '#/lib/gsap/setup'

type ScrollyStepProps = {
  index: number
  title: string
  children: ReactNode
}

export function ScrollyStep({ index, title, children }: ScrollyStepProps) {
  return (
    <article
      className="scrolly-step min-h-[60vh] py-12"
      data-step={index}
      data-active="false"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="step-indicator h-px w-6 bg-border transition-all" />
        <span className="text-xs text-text-subtle">{index + 1}</span>
      </div>
      <h3 className="step-title mb-2 text-lg font-medium tracking-tight text-text-muted transition-colors">
        {title}
      </h3>
      <div className="max-w-md text-sm leading-relaxed text-text-muted">{children}</div>
    </article>
  )
}

type ScrollySectionProps = {
  title: string
  subtitle?: string
  stage: ReactNode
  children: ReactNode
  onBuildTimeline?: (tl: gsap.core.Timeline) => void
}

export function ScrollySection({
  title,
  subtitle,
  stage,
  children,
  onBuildTimeline,
}: ScrollySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      registerGsap()

      const section = sectionRef.current
      const steps = stepsRef.current?.querySelectorAll('.scrolly-step')
      if (!section || !steps?.length) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ paused: true })
        onBuildTimeline?.(tl)

        steps.forEach((step, i) => {
          gsap.fromTo(
            step,
            { opacity: 0.35 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: step,
                start: 'top center',
                end: 'bottom center',
                toggleActions: 'play none none reverse',
                onEnter: () => setActiveStep(steps, i),
                onEnterBack: () => setActiveStep(steps, i),
              },
            },
          )

          if (tl.duration() > 0) {
            ScrollTrigger.create({
              trigger: step,
              start: 'top center',
              end: 'bottom center',
              onEnter: () => tl.tweenTo(getStepProgress(tl, i, steps.length)),
              onEnterBack: () => tl.tweenTo(getStepProgress(tl, i, steps.length)),
            })
          }
        })

        if (stageRef.current) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            pin: stageRef.current,
            pinSpacing: false,
          })
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        steps.forEach((step) => {
          step.setAttribute('data-active', 'false')
          gsap.set(step, { opacity: 1 })
        })
        if (steps[0]) steps[0].setAttribute('data-active', 'true')
        onBuildTimeline?.(gsap.timeline())
      })

      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [onBuildTimeline] },
  )

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12">
        <h2 className="text-xl font-medium tracking-tight">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-sm text-text-muted">{subtitle}</p>
        )}
      </header>

      <div className="grid gap-16 lg:grid-cols-2">
        <div
          ref={stageRef}
          className="relative flex h-[min(480px,65vh)] items-start justify-center self-start overflow-y-auto lg:sticky lg:top-16"
        >
          <div className="absolute inset-0 border border-border" />
          <div className="relative z-10 w-full p-6">{stage}</div>
        </div>

        <div ref={stepsRef}>{children}</div>
      </div>
    </section>
  )
}

function setActiveStep(steps: NodeListOf<Element>, activeIndex: number) {
  steps.forEach((step, i) => {
    step.setAttribute('data-active', i === activeIndex ? 'true' : 'false')
  })
}

function getStepProgress(
  tl: gsap.core.Timeline,
  stepIndex: number,
  totalSteps: number,
) {
  if (totalSteps <= 1) return tl.duration()
  return (stepIndex / (totalSteps - 1)) * tl.duration()
}
