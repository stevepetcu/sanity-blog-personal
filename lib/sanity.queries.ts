import { groq } from 'next-sanity';
import { Slug } from 'sanity';
import {
  Crop,
  Hotspot,
} from 'sanity/src/core/form/inputs/files/ImageToolInput/imagetool';

// TODO: figure out how to type all the things and disallow "any"

const postViewFields = groq`
  _id,
  title,
  "slug": slug.current,
  summary,
  coverImage,
  embeddedWebsiteUrl,
  content,
  footnotes,
  "tags": tags[]->name,
  "author": author->{firstName, picture},
  publishedAt,
  "updatedAt": _updatedAt,
`;

const postPinFields = groq`
  _id,
  title,
  "slug": slug.current,
  summary,
  "tags": tags[]->name,
  publishedAt,
  "updatedAt": _updatedAt,
`;

const postSummaryFields = groq`
  _id,
  title,
  "slug": slug.current,
  summary,
  coverImage,
  "tags": tags[]->name,
  "author": author->{firstName, picture},
  publishedAt,
  "updatedAt": _updatedAt,
`;

const settingsFullDataFields = groq`
  _id,
  title,
  description,
  ogImage,
  "admin": admin->{firstName, lastName, handles}
`;

export const settingsQuery = groq`*[_type == "settings"][0] {
  ${settingsFullDataFields}
}`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current) && publishedAt <= now()][].slug.current
`;

// TODO: order by "popularity" (of the post)
export const tagsQuery = (resultsCount = 0, excludeTags = []) => {
  if (!excludeTags.length) {
    return groq`*[_type == "tag"] | order(_updatedAt desc)[0..${resultsCount - 1}].name`;
  }

  let tagsQuery = '';
  excludeTags.map((tag, index) => {
    if (index !== excludeTags.length - 1) {
      tagsQuery += `"${tag}" != name && `;
    } else {
      tagsQuery += `"${tag}" != name`;
    }
  });

  return groq`*[_type == "tag" && ${tagsQuery}] | order(_updatedAt desc)[0..${resultsCount - 1}].name`;
};

export const postPinsListQuery = groq`
*[_type == "post" && isPinned == true && publishedAt <= now()] | order(_updatedAt desc) {
  ${postPinFields}
}
`;

export const postSummariesListQuery = groq`
*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) [0...50] {
  ${postSummaryFields}
}
`;

export const postSummariesListByTagQuery = (tags: string[]) => {
  let tagsQuery = '';
  tags.map((tag, index) => {
    if (index !== tags.length - 1) {
      tagsQuery += `"${tag}" in tags[]->name || `;
    } else {
      tagsQuery += `"${tag}" in tags[]->name`;
    }
  });

  return tagsQuery.length
    ? groq`
*[_type == "post" && publishedAt <= now() && ${tagsQuery}] | order(publishedAt desc) [0...50] {
  ${postSummaryFields}
}
`
    : postSummariesListQuery;
};

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
  ${postViewFields}
}
`;

export interface BlogImage {
  caption: any // blocks
  alt: string
  // Reminder: "left" and "right" don't look great on my content width, but
  // the biggest issue is that the image height for an aspect ratio of 9:16
  // looks huge on smaller devices, where the image is placed above/below
  // the text. To fix this, I could try sending the device information over
  // to the server to generate the image size based on that, but it would be
  // complicated and still not work in a response way (e.g., flipping the
  // device on its side). Not worth it for what it looks like anyway.
  placement: 'top' | 'bottom'
  asset?: {
    _ref: string
  }
  crop?: Crop
  hotspot?: Hotspot
}

export interface Author {
  firstName: string
  lastName?: string
  picture: {
    name: string
    asset: {
      _ref: string
    }
    crop?: Crop
    hotspot?: Hotspot
  }
  handles?: {
    website: string
    name: string
  }[]
}

export interface PostSection {
  _key: string
  heading?: string
  anchor?: Slug
  body: any // blocks
  sectionImage?: BlogImage
}

export interface Post {
  _id: string
  title: string
  slug: string
  summary: string
  coverImage?: BlogImage
  embeddedWebsiteUrl?: string
  content: PostSection[]
  footnotes: any // blocks
  tags: string[]
  author: Author
  publishedAt: string
  updatedAt: string
}

export interface PostPin {
  _id: string
  title: string
  slug: string
  summary: string
  tags
  publishedAt: string
  updatedAt: string
}

export interface PostSummary {
  _id: string
  title: string
  slug: string
  summary: string
  coverImage?: BlogImage
  tags: string[]
  author: Author
  publishedAt: string
  updatedAt: string
}

export interface Settings {
  title: string
  description: any[]
  admin: Author
  ogImage?: {
    title?: string
  }
}
