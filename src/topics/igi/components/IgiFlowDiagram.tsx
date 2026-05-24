import { useRef } from 'react'
import { registerGsap, gsap, useGSAP } from '#/lib/gsap/setup'

const stroke = 'rgba(255, 255, 255, 0.35)'
const fill = '#0a0a0a'

export function IgiFlowDiagram() {
  const svgRef = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      registerGsap()
      const svg = svgRef.current
      if (!svg) return

      gsap.set(svg.querySelectorAll('[data-node]'), {
        opacity: 0.3,
        transformOrigin: 'center center',
      })
      gsap.set(svg.querySelectorAll('[data-flow]'), {
        strokeDashoffset: 120,
        opacity: 0.2,
      })

      return () => {
        gsap.killTweensOf(svg.querySelectorAll('[data-node], [data-flow]'))
      }
    },
    { scope: svgRef },
  )

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 280"
      className="mx-auto w-full max-w-sm"
      aria-label="IGI process flow diagram"
    >
      <path
        data-flow="1"
        d="M 80 80 L 200 80"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        strokeDasharray="120"
      />
      <path
        data-flow="2"
        d="M 200 80 L 320 80"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        strokeDasharray="120"
      />
      <path
        data-flow="3"
        d="M 200 80 L 200 200"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        strokeDasharray="120"
      />

      <g data-node="applicant" transform="translate(40, 56)">
        <rect width="80" height="48" fill={fill} stroke={stroke} strokeWidth="1" />
        <text
          x="40"
          y="28"
          textAnchor="middle"
          fill="#a1a1a1"
          fontSize="11"
          fontFamily="Inter, sans-serif"
        >
          Applicant
        </text>
      </g>

      <g data-node="review" transform="translate(160, 56)">
        <rect width="80" height="48" fill={fill} stroke={stroke} strokeWidth="1" />
        <text
          x="40"
          y="28"
          textAnchor="middle"
          fill="#a1a1a1"
          fontSize="11"
          fontFamily="Inter, sans-serif"
        >
          IGI Review
        </text>
      </g>

      <g data-node="outcome" transform="translate(280, 56)">
        <rect width="80" height="48" fill={fill} stroke={stroke} strokeWidth="1" />
        <text
          x="40"
          y="28"
          textAnchor="middle"
          fill="#a1a1a1"
          fontSize="11"
          fontFamily="Inter, sans-serif"
        >
          Outcome
        </text>
      </g>

      <g data-node="criteria" transform="translate(160, 176)">
        <rect width="80" height="48" fill={fill} stroke={stroke} strokeWidth="1" />
        <text
          x="40"
          y="28"
          textAnchor="middle"
          fill="#a1a1a1"
          fontSize="11"
          fontFamily="Inter, sans-serif"
        >
          Criteria
        </text>
      </g>
    </svg>
  )
}

export function buildIgiTimeline(tl: gsap.core.Timeline) {
  tl.to('[data-node="applicant"]', { opacity: 1, duration: 0.4 }, 0)
    .to('[data-flow="1"]', { strokeDashoffset: 0, opacity: 1, duration: 0.5 }, 0.2)
    .to('[data-node="review"]', { opacity: 1, duration: 0.4 }, 0.5)
    .to('[data-flow="3"]', { strokeDashoffset: 0, opacity: 1, duration: 0.5 }, 0.7)
    .to('[data-node="criteria"]', { opacity: 1, duration: 0.4 }, 0.9)
    .to('[data-flow="2"]', { strokeDashoffset: 0, opacity: 1, duration: 0.5 }, 1.1)
    .to('[data-node="outcome"]', { opacity: 1, duration: 0.4 }, 1.3)
}
