import type { ComponentType } from 'react'

export type TopicCategory = 'grants' | 'investors' | 'technical'
export type TopicDifficulty = 'intro' | 'intermediate' | 'advanced'
export type TopicAudience = 'reviewers' | 'engineers' | 'mixed'

export type TopicMeta = {
  slug: string
  title: string
  description: string
  category: TopicCategory
  difficulty: TopicDifficulty
  audience: TopicAudience
  estimatedMinutes: number
  tags: string[]
  status: 'ready' | 'draft' | 'coming-soon'
}

export type Topic = TopicMeta & {
  component: ComponentType
}

export type ScrollyStepConfig = {
  id: string
  title: string
  body: string
  /** Optional GSAP timeline label to seek when this step is active */
  label?: string
}
