import { TopicHero } from '#/components/layout/TopicHero'
import { ScrollySection, ScrollyStep } from '#/components/scrolly/ScrollySection'
import { Callout } from '#/components/ui/Callout'
import { getTopicBySlug } from '#/topics/registry'
import {
  IgiFlowDiagram,
  buildIgiTimeline,
} from '#/topics/igi/components/IgiFlowDiagram'

export function IgiTopic() {
  const topic = getTopicBySlug('igi')
  if (!topic) return null

  return (
    <article>
      <TopicHero topic={topic} />

      <ScrollySection
        title="How IGI fits the review pipeline"
        subtitle="Scroll to walk through each stage."
        stage={<IgiFlowDiagram />}
        onBuildTimeline={buildIgiTimeline}
      >
        <ScrollyStep index={0} title="Submission enters the pipeline">
          <p>
            An applicant submits a proposal. For reviewers, this is the intake
            record. For engineers, it is the first immutable event in the audit
            trail.
          </p>
          <Callout title="Reviewer lens" variant="default">
            Check that required fields and eligibility gates are satisfied before
            deep review begins.
          </Callout>
        </ScrollyStep>

        <ScrollyStep index={1} title="IGI review layer">
          <p>
            IGI adds a structured evaluation pass — scoring against defined
            criteria rather than ad-hoc judgment. This is where consistency
            across reviewers is enforced.
          </p>
          <Callout variant="technical">
            The review layer typically exposes a deterministic scoring function
            with weighted dimensions, making outcomes reproducible and
            auditable.
          </Callout>
        </ScrollyStep>

        <ScrollyStep index={2} title="Criteria alignment">
          <p>
            Each criterion maps to evidence in the submission. Reviewers see
            rubric checkpoints; engineers see schema-validated inputs tied to
            scoring weights.
          </p>
        </ScrollyStep>

        <ScrollyStep index={3} title="Outcome & traceability">
          <p>
            The final outcome — fund, revise, or reject — carries the full
            decision path. Both audiences benefit: reviewers get defensible
            rationale; engineers get queryable decision logs.
          </p>
        </ScrollyStep>
      </ScrollySection>

      <section className="mx-auto max-w-3xl border-t border-border px-6 py-16">
        <h2 className="text-sm font-medium text-text-subtle">Summary</h2>
        <ul className="mt-4 space-y-2 text-sm text-text-muted">
          <li>IGI standardizes review so outcomes are consistent and auditable.</li>
          <li>Reviewers work from rubrics; engineers work from schemas and logs.</li>
          <li>Every stage leaves a trace for grant compliance.</li>
        </ul>
        <p className="mt-8 text-xs text-text-subtle">
          Placeholder content — replace with your IGI definitions and criteria.
        </p>
      </section>
    </article>
  )
}
