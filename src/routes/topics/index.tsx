import { createFileRoute } from '@tanstack/react-router'
import { TopicCard } from '#/components/ui/TopicCard'
import { getAllTopicMetas } from '#/topics/registry'

export const Route = createFileRoute('/topics/')({
  head: () => ({
    meta: [{ title: 'Topics | Concept Lab' }],
  }),
  component: TopicsIndexPage,
})

function TopicsIndexPage() {
  const topics = getAllTopicMetas()

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-medium tracking-tight">Topics</h1>
      <p className="mt-3 text-text-muted">
        Interactive lessons on technical concepts.
      </p>

      <ul className="mt-12 divide-y divide-border border-y border-border">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <TopicCard topic={topic} />
          </li>
        ))}
      </ul>
    </section>
  )
}
