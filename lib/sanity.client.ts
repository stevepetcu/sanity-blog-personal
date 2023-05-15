import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  type Post,
  postBySlugQuery, PostPin, postPinsListQuery,
  postSlugsQuery, postSummariesListByTagQuery,
  postSummariesListQuery, PostSummary,
  type Settings,
  settingsQuery
} from 'lib/sanity.queries'
import _ from 'lodash'
import { createClient } from 'next-sanity'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null

export async function getSettings(): Promise<Settings> {
  if (client) {
    return (await client.fetch(settingsQuery)) || {}
  }
  return {}
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  if (client) {
    const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}

export async function getPostBySlug(slug: string): Promise<Post> {
  if (client) {
    return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
  }
  return {} as any
}

export async function getPostSummariesList(
  tags?: string[],
  token?: string | null
): Promise<PostSummary[]> {
  if (projectId) {
    // TODO: do I need to create this client here?
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined
    })

    return tags.length > 0 ?
      await client.fetch(postSummariesListByTagQuery(tags)) :
      await client.fetch(postSummariesListQuery)
  }

  return []
}

export async function getPostPinsList(
  token?: string | null
): Promise<PostPin[]> {
  if (projectId) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined
    })
    return await client.fetch(postPinsListQuery)
  }

  return []
}
