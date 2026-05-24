import { Link } from '@tanstack/react-router'
import type { TopicMeta } from '#/topics/types'

type TopicCardProps = {
  topic: TopicMeta
}

export function TopicCard({ topic }: TopicCardProps) {
  const isAvailable = topic.status !== 'coming-soon'

  const content = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-medium text-text">{topic.title}</h3>
        {isAvailable && (
          <span className="shrink-0 text-sm text-text-subtle">
            {topic.estimatedMinutes} min
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-text-muted">{topic.description}</p>
      {!isAvailable && (
        <p className="mt-1 text-xs text-text-subtle">Coming soon</p>
      )}
    </>
  )

  if (!isAvailable) {
    return <article className="py-5 opacity-50">{content}</article>
  }

  return (
    <Link
      to="/topics/$topicSlug"
      params={{ topicSlug: topic.slug }}
      className="block py-5 transition-colors hover:bg-white/[0.02]"
    >
      {content}
    </Link>
  )
}
