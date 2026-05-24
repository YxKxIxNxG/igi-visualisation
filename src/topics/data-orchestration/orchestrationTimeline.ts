import { gsap } from '#/lib/gsap/setup'
import { DATA_TYPES } from '#/topics/data-orchestration/data'
import { APP_NODE, TYPE_NODES } from '#/topics/data-orchestration/layout'

export function initStageState(root: Element) {
  gsap.set(root.querySelector('[data-stage-bg]'), { opacity: 0 })
  gsap.set(root.querySelector('[data-app-hub]'), { scale: 0.55, opacity: 0 })
  gsap.set(root.querySelectorAll('[data-type-card]'), {
    opacity: 0,
    scale: 0.82,
    y: 24,
  })
  gsap.set(root.querySelectorAll('[data-flow-path]'), {
    strokeDashoffset: 400,
    opacity: 0,
  })
  gsap.set(root.querySelectorAll('[data-engine-node]'), {
    opacity: 0,
    scale: 0,
  })
  gsap.set(root.querySelectorAll('[data-packet]'), {
    opacity: 0,
    left: `${APP_NODE.x}%`,
    top: `${APP_NODE.y}%`,
  })
  gsap.set(root.querySelector('[data-sprawl-ring]'), { scale: 0.75, opacity: 0 })
}

export function buildStageIntro(tl: gsap.core.Timeline, root: Element) {
  const aurora = root.querySelector('[data-stage-aurora]')

  tl.to(root.querySelector('[data-stage-bg]'), { opacity: 1, duration: 1.2 }, 0)
    .to(
      root.querySelector('[data-app-hub]'),
      { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.5)' },
      0.35,
    )
    .to(
      root.querySelectorAll('[data-type-card]'),
      { opacity: 0.45, scale: 1, y: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out' },
      0.9,
    )
    .to(
      root.querySelectorAll('[data-flow-path]'),
      { opacity: 0.18, strokeDashoffset: 320, duration: 0.7, stagger: 0.06 },
      1.2,
    )

  if (aurora) {
    tl.to(aurora, { rotation: 360, duration: 90, repeat: -1, ease: 'none' }, 0)
  }
}

export function buildStageFocus(
  tl: gsap.core.Timeline,
  root: Element,
  typeId: string,
  at: number | string,
) {
  const type = DATA_TYPES.find((t) => t.id === typeId)
  if (!type) return

  const card = root.querySelector(`[data-type-card="${typeId}"]`)
  const paths = root.querySelectorAll(`[data-flow-path="${typeId}"]`)
  const engines = root.querySelectorAll(`[data-engine-node][data-for="${typeId}"]`)
  const packets = root.querySelectorAll(`[data-packet="${typeId}"]`)
  const allCards = root.querySelectorAll('[data-type-card]')
  const node = TYPE_NODES.find((n) => n.id === typeId)

  tl.to(allCards, { opacity: 0.18, scale: 0.95, duration: 0.45 }, at)
    .to(card, { opacity: 1, scale: 1.05, duration: 0.55, ease: 'power2.out' }, at)
    .to(
      paths,
      { opacity: 0.95, strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' },
      `${at}+=0.08`,
    )
    .to(
      engines,
      { opacity: 1, scale: 1, duration: 0.55, stagger: 0.14, ease: 'back.out(2.2)' },
      `${at}+=0.32`,
    )

  if (node) {
    tl.to(
      root.querySelector('[data-app-hub]'),
      {
        boxShadow: `0 0 70px ${node.accent}55, 0 0 140px ${node.accent}22`,
        scale: 1.06,
        duration: 0.55,
      },
      at,
    )

    const packet = packets[0]
    if (packet) {
      tl.set(packet, { left: `${APP_NODE.x}%`, top: `${APP_NODE.y}%`, opacity: 0 }, at)
        .to(packet, { opacity: 1, duration: 0.25 }, `${at}+=0.4`)
        .to(
          packet,
          {
            left: `${node.x}%`,
            top: `${node.y}%`,
            duration: 1.4,
            ease: 'power1.inOut',
            repeat: 2,
            yoyo: true,
            repeatDelay: 0.15,
          },
          `${at}+=0.45`,
        )
    }

    tl.to(
      paths,
      { strokeDashoffset: -400, duration: 1.6, repeat: 2, ease: 'none' },
      `${at}+=0.5`,
    )
  }
}

export function buildStageSprawl(tl: gsap.core.Timeline, root: Element, at: number | string) {
  tl.to(root.querySelectorAll('[data-type-card]'), { opacity: 0.9, scale: 1, duration: 0.65 }, at)
    .to(
      root.querySelectorAll('[data-flow-path]'),
      { opacity: 0.55, strokeDashoffset: 0, duration: 0.85 },
      at,
    )
    .to(
      root.querySelectorAll('[data-engine-node]'),
      { opacity: 1, scale: 1, duration: 0.55, stagger: 0.07, ease: 'back.out(1.9)' },
      `${at}+=0.25`,
    )
    .to(
      root.querySelector('[data-sprawl-ring]'),
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
      `${at}+=0.55`,
    )
    .to(
      root.querySelector('[data-app-hub]'),
      { boxShadow: '0 0 90px rgba(255,255,255,0.1)', scale: 1, duration: 0.6 },
      at,
    )
    .to(root.querySelectorAll('[data-packet]'), { opacity: 0, duration: 0.35 }, at)
}

export function focusTypeInteractive(root: Element, typeId: string) {
  gsap.killTweensOf(root.querySelectorAll('[data-packet], [data-flow-path]'))
  gsap.set(root.querySelectorAll('[data-packet]'), {
    opacity: 0,
    left: `${APP_NODE.x}%`,
    top: `${APP_NODE.y}%`,
  })

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
  buildStageFocus(tl, root, typeId, 0)
  return () => tl.kill()
}

export function resetStageHighlight(root: Element) {
  gsap.to(root.querySelectorAll('[data-type-card]'), {
    opacity: 0.45,
    scale: 1,
    duration: 0.45,
  })
  gsap.to(root.querySelector('[data-app-hub]'), {
    boxShadow: appHubRestingShadow(),
    scale: 1,
    duration: 0.45,
  })
  gsap.to(root.querySelectorAll('[data-flow-path]'), {
    opacity: 0.18,
    strokeDashoffset: 320,
    duration: 0.45,
  })
  gsap.to(root.querySelectorAll('[data-engine-node]'), {
    opacity: 0,
    scale: 0,
    duration: 0.35,
  })
}

export function appHubRestingShadow() {
  return '0 0 48px rgba(255,255,255,0.07)'
}
