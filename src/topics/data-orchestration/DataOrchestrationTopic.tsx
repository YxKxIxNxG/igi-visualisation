import { Link } from '@tanstack/react-router'
import { TopicHero } from '#/components/layout/TopicHero'
import { Callout } from '#/components/ui/Callout'
import { getTopicBySlug } from '#/topics/registry'
import {
  OrchestrationExperience,
  OrchestrationStep,
} from '#/topics/data-orchestration/components/OrchestrationExperience'

export function DataOrchestrationTopic() {
  const topic = getTopicBySlug('data-orchestration')
  if (!topic) return null

  return (
    <article>
      <TopicHero topic={topic} />

      <section className="mx-auto max-w-3xl border-b border-border px-6 pb-8">
        <Link
          to="/topics/$topicSlug/video"
          params={{ topicSlug: 'data-orchestration' }}
          search={{ autoplay: '1' }}
          className="text-sm text-text underline underline-offset-4"
        >
          Open video mode — record this section (~28s)
        </Link>
      </section>

      <OrchestrationExperience
        title="Why does the data orchestration problem arise?"
        subtitle="Scroll to reveal each data shape and the engine built for it — or hover the cards to explore freely."
      >
        <OrchestrationStep index={0} title="One application, many data shapes">
          <p>
            Modern applications do not produce a single kind of data. They mix
            workloads with different access patterns, consistency needs, and
            scale — which is where orchestration becomes necessary.
          </p>
        </OrchestrationStep>

        <OrchestrationStep index={1} title="Transactional data">
          <p>
            <strong className="font-medium text-text">Transactional data</strong>{' '}
            — user profiles, bank balances — needs strong consistency and
            row-level updates. Teams reach for relational databases.
          </p>
          <Callout variant="technical">
            PostgreSQL and MySQL optimize for ACID transactions and structured
            schemas.
          </Callout>
        </OrchestrationStep>

        <OrchestrationStep index={2} title="Analytical data">
          <p>
            <strong className="font-medium text-text">Analytical data</strong>{' '}
            — massive clickstream logs — is append-heavy and scanned in bulk.
            Row stores struggle; column-oriented engines win.
          </p>
          <Callout variant="technical">
            ClickHouse is built for high-volume aggregations over event data.
          </Callout>
        </OrchestrationStep>

        <OrchestrationStep index={3} title="Semi-structured data">
          <p>
            <strong className="font-medium text-text">Semi-structured data</strong>{' '}
            — flexible JSON product catalogs — has evolving fields per record.
            Rigid tables become painful to migrate.
          </p>
          <Callout variant="technical">
            MongoDB stores documents with schema flexibility at scale.
          </Callout>
        </OrchestrationStep>

        <OrchestrationStep index={4} title="Real-time and time-series data">
          <p>
            <strong className="font-medium text-text">Real-time / time-series data</strong>{' '}
            — user sessions, IoT metrics — demands sub-millisecond reads and
            TTL-based expiry.
          </p>
          <Callout variant="technical">
            Redis keeps hot state in memory with simple key semantics.
          </Callout>
        </OrchestrationStep>

        <OrchestrationStep index={5} title="The sprawl">
          <p>
            To store and process each type well, you end up running PostgreSQL,
            MySQL, ClickHouse, MongoDB, and Redis — often more. Moving data
            between them is the orchestration problem.
          </p>
        </OrchestrationStep>
      </OrchestrationExperience>
    </article>
  )
}
