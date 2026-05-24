import { useRef, type ReactNode } from 'react'
import { registerGsap, gsap, useGSAP, ScrollTrigger } from '#/lib/gsap/setup'
import { DataOrchestrationStage } from '#/topics/data-orchestration/components/DataOrchestrationStage'
import { buildOrchestrationScrollTimeline } from '#/topics/data-orchestration/buildOrchestrationScrollTimeline'

type OrchestrationStepProps = {
  index: number
  title: string
  children: ReactNode
}

export function OrchestrationStep({ index, title, children }: OrchestrationStepProps) {
  return (
    <article
      className="orchestration-step flex min-h-[88vh] items-center py-10"
      data-step={index}
      data-active="false"
    >
      <div className="orchestration-step-panel w-full rounded-2xl border border-white/10 bg-bg/75 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="step-indicator h-px w-8 bg-border transition-all duration-500" />
          <span className="text-xs uppercase tracking-widest text-text-subtle">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="step-title mb-3 text-xl font-medium tracking-tight text-text-muted transition-colors duration-500">
          {title}
        </h3>
        <div className="text-sm leading-relaxed text-text-muted sm:text-[15px]">{children}</div>
      </div>
    </article>
  )
}

type OrchestrationExperienceProps = {
  title: string
  subtitle?: string
  children: ReactNode
}

export function OrchestrationExperience({
  title,
  subtitle,
  children,
}: OrchestrationExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageShellRef = useRef<HTMLDivElement>(null)
  const stageRootRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      registerGsap()

      const section = sectionRef.current
      const stageRoot = stageRootRef.current
      const steps = stepsRef.current?.querySelectorAll('.orchestration-step')
      if (!section || !stageRoot || !steps?.length) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference) and (max-width: 1023px)', () => {
        const tl = buildOrchestrationScrollTimeline(stageRoot)
        tl.progress(0.12)

        steps.forEach((step, i) => {
          gsap.set(step, { opacity: 1, y: 0 })
          ScrollTrigger.create({
            trigger: step,
            start: 'top 75%',
            end: 'bottom 25%',
            onEnter: () => {
              setActiveStep(steps, i)
              tl.tweenTo(getStepProgress(tl, i, steps.length))
            },
            onEnterBack: () => {
              setActiveStep(steps, i)
              tl.tweenTo(getStepProgress(tl, i, steps.length))
            },
          })
        })
      })

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
        const tl = buildOrchestrationScrollTimeline(stageRoot)

        steps.forEach((step, i) => {
          gsap.fromTo(
            step,
            { opacity: 0.4, y: 12 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: step,
                start: 'top 72%',
                end: 'bottom 28%',
                toggleActions: 'play none none reverse',
                onEnter: () => setActiveStep(steps, i),
                onEnterBack: () => setActiveStep(steps, i),
              },
            },
          )

          ScrollTrigger.create({
            trigger: step,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => tl.tweenTo(getStepProgress(tl, i, steps.length)),
            onEnterBack: () => tl.tweenTo(getStepProgress(tl, i, steps.length)),
          })
        })

        if (stageShellRef.current) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            pin: stageShellRef.current,
            pinSpacing: false,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          })
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        steps.forEach((step, i) => {
          step.setAttribute('data-active', i === 0 ? 'true' : 'false')
          gsap.set(step, { opacity: 1, y: 0 })
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="orchestration-experience relative">
      <header className="relative z-10 mx-auto max-w-3xl px-6 pb-8 pt-4">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">{title}</h2>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-sm text-text-muted sm:text-base">{subtitle}</p>
        )}
        <p className="mt-4 text-xs text-text-subtle">
          Scroll to choreograph the diagram · hover cards to explore
        </p>
      </header>

      <div className="relative">
        <div
          ref={stageShellRef}
          className="orchestration-stage-shell relative h-[min(92vh,960px)] w-full lg:absolute lg:inset-x-0 lg:top-0"
        >
          <div className="absolute inset-0 border-y border-white/[0.06] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
          <DataOrchestrationStage stageRef={stageRootRef} interactive />
        </div>

        <div
          ref={stepsRef}
          className="orchestration-steps relative z-20 mx-auto w-full max-w-3xl px-6 lg:ml-auto lg:mr-0 lg:max-w-none lg:w-[min(440px,36vw)] lg:px-8 xl:px-12"
        >
          {children}
        </div>
      </div>
    </section>
  )
}

function setActiveStep(steps: NodeListOf<Element>, activeIndex: number) {
  steps.forEach((step, i) => {
    step.setAttribute('data-active', i === activeIndex ? 'true' : 'false')
  })
}

function getStepProgress(tl: gsap.core.Timeline, stepIndex: number, totalSteps: number) {
  if (totalSteps <= 1) return tl.duration()
  return (stepIndex / (totalSteps - 1)) * tl.duration()
}
