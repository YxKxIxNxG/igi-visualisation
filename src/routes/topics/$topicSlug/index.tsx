import { createFileRoute, notFound } from '@tanstack/react-router'
import { getTopicComponent, getTopicMetaBySlug } from '#/topics/registry'

export const Route = createFileRoute('/topics/$topicSlug/')({
  loader: ({ params }) => {
    const topic = getTopicMetaBySlug(params.topicSlug)
    if (!topic) throw notFound()
    return topic
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.title} | Concept Lab` },
      { name: 'description', content: loaderData.description },
    ],
  }),
  component: TopicPage,
})

function TopicPage() {
  const topic = Route.useLoaderData()
  const TopicComponent = getTopicComponent(topic.slug)

  if (!TopicComponent) throw notFound()

  return <TopicComponent />
}
