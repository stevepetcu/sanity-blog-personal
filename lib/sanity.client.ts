import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api';
import {
  type Post,
  postBySlugQuery,
  PostPin,
  postPinsListQuery,
  postSlugsQuery,
  postSummariesListByTagQuery,
  postSummariesListQuery,
  PostSummary,
  type Settings,
  settingsQuery,
  tagsQuery,
} from 'lib/sanity.queries';
import { createClient } from 'next-sanity';

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export async function getSettings(): Promise<Settings> {
  if (!client) {
    throw Error('Project id is missing.');
  }

  return await client.fetch<Settings>(settingsQuery);
}

export async function getAllPostSlugs(): Promise<Pick<Post, 'slug'>[]> {
  if (client) {
    const slugs = (await client.fetch<string[]>(postSlugsQuery)) || [];
    return slugs.map((slug) => ({ slug }));
  }
  return [];
}

export async function getAllTags(): Promise<Post['tags']> {
  if (client) {
    return (await client.fetch<Post['tags']>(tagsQuery())) || [];
  }

  return [];
}

export async function getLatestTags(
  resultsCount: number,
  excludeTags: string[]
): Promise<Post['tags']> {
  if (client) {
    return (await client.fetch<Post['tags']>(tagsQuery(resultsCount, excludeTags))) || [];
  }

  return [];
}

export async function getPostBySlug(slug: string): Promise<Post> {
  if (client) {
    return (await client.fetch<Post>(postBySlugQuery, { slug })) || ({} as any);
  }
  return {} as any;
}

export async function getPostSummariesList(
  tags?: string[],
  token?: string | null
): Promise<PostSummary[]> {
  if (projectId) {
    // TODO: do I need to create this client here?
    //  Update: we need to do this if we have a token,
    //  but I think it could be more efficient by checking
    //  and only creating a new client when a token is passed in.
    //  The same applies to the other functions in this file.
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined,
    });

    return tags.length > 0
      ? await client.fetch<PostSummary[]>(postSummariesListByTagQuery(tags))
      : await client.fetch<PostSummary[]>(postSummariesListQuery);
  }

  return [];
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
      token: token || undefined,
    });
    return await client.fetch<PostPin[]>(postPinsListQuery);
  }

  return [];
}
