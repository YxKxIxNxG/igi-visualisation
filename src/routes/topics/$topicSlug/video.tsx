import { createFileRoute, notFound } from '@tanstack/react-router'
import { DataOrchestrationVideo } from '#/topics/data-orchestration/components/DataOrchestrationVideo'
import { getTopicMetaBySlug } from '#/topics/registry'

type VideoSearch = {
  clean?: string
  autoplay?: string
}

export const Route = createFileRoute('/topics/$topicSlug/video')({
  validateSearch: (search: Record<string, unknown>): VideoSearch => ({
    clean: typeof search.clean === 'string' ? search.clean : undefined,
    autoplay: typeof search.autoplay === 'string' ? search.autoplay : undefined,
  }),
  loader: ({ params }) => {
    const topic = getTopicMetaBySlug(params.topicSlug)
    if (!topic || topic.slug !== 'data-orchestration') throw notFound()
    return topic
  },
  head: () => ({
    meta: [{ title: 'Data Orchestration — Video | Concept Lab' }],
  }),
  component: VideoPage,
})

function VideoPage() {
  const { clean, autoplay } = Route.useSearch()

  return (
    <DataOrchestrationVideo
      hideChrome={clean === '1'}
      autoplay={autoplay === '1'}
    />
  )
}
