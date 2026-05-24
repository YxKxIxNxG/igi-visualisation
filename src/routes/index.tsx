import { Link, createFileRoute } from '@tanstack/react-router'
import { TopicCard } from '#/components/ui/TopicCard'
import { getAllTopicMetas } from '#/topics/registry'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const topics = getAllTopicMetas()

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-20">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Interactive explainers for technical concepts
        </h1>
        <p className="mt-4 max-w-xl text-text-muted">
          Scroll-driven walkthroughs for grant reviewers and engineers.
        </p>
        <div className="mt-8 flex gap-6 text-sm">
          <Link
            to="/topics/data-orchestration"
            className="text-text underline underline-offset-4"
          >
            Data orchestration
          </Link>
          <Link
            to="/topics"
            className="text-text-muted transition-colors hover:text-text"
          >
            All topics
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="mb-6 text-sm font-medium text-text-subtle">Topics</h2>
        <ul className="divide-y divide-border border-y border-border">
          {topics.map((topic) => (
            <li key={topic.slug}>
              <TopicCard topic={topic} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
