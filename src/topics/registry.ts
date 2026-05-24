import type { Topic, TopicMeta } from '#/topics/types'
import { DataOrchestrationTopic } from '#/topics/data-orchestration/DataOrchestrationTopic'
import { IgiTopic } from '#/topics/igi/IgiTopic'

const topicMetas: TopicMeta[] = [
  {
    slug: 'data-orchestration',
    title: 'Data Orchestration',
    description:
      'Why modern applications need many storage engines — and where orchestration fits.',
    category: 'technical',
    difficulty: 'intro',
    audience: 'mixed',
    estimatedMinutes: 6,
    tags: ['data', 'databases', 'orchestration'],
    status: 'draft',
  },
  {
    slug: 'igi',
    title: 'IGI Explained',
    description:
      'An interactive walkthrough of the IGI framework — plain-language overview for reviewers, with technical depth for engineers.',
    category: 'grants',
    difficulty: 'intermediate',
    audience: 'mixed',
    estimatedMinutes: 8,
    tags: ['igi', 'grants', 'review'],
    status: 'draft',
  },
]

const topicComponents: Record<string, Topic['component']> = {
  'data-orchestration': DataOrchestrationTopic,
  igi: IgiTopic,
}

export const topics: Topic[] = topicMetas.map((meta) => ({
  ...meta,
  component: topicComponents[meta.slug],
}))

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug)
}

export function getTopicMetaBySlug(slug: string): TopicMeta | undefined {
  return topicMetas.find((t) => t.slug === slug)
}

export function getTopicComponent(slug: string): Topic['component'] | undefined {
  return topicComponents[slug]
}

export function getAllTopicMetas(): TopicMeta[] {
  return topicMetas
}
