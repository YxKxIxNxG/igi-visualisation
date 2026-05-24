import type { TopicMeta } from '#/topics/types'

type TopicHeroProps = {
  topic: TopicMeta
}

export function TopicHero({ topic }: TopicHeroProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-16 pt-16">
      <p className="text-sm text-text-subtle capitalize">{topic.category}</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
        {topic.title}
      </h1>
      <p className="mt-4 text-text-muted">{topic.description}</p>
      <p className="mt-6 text-sm text-text-subtle">
        {topic.estimatedMinutes} min · {topic.difficulty}
      </p>
    </section>
  )
}
