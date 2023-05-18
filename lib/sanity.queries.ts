import { groq } from 'next-sanity'
import { Slug } from 'sanity'
import { Crop, Hotspot } from 'sanity/src/core/form/inputs/files/ImageToolInput/imagetool'

// TODO: figure out how to type all the things and disallow "any"

const postViewFields = groq`
  _id,
  title,
  "slug": slug.current,
  summary,
  coverImage,
  content,
  footnotes,
  tags,
  "author": author->{name, picture},
  publishedAt,
  "updatedAt": _updatedAt,
`

const postPinFields = groq`
  _id,
  title,
  "slug": slug.current,
  coverImage,
  tags,
`

const postSummaryFields = groq`
  _id,
  title,
  "slug": slug.current,
  summary,
  coverImage,
  tags,
  "author": author->{name, picture},
  publishedAt,
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current) && publishedAt <= now()][].slug.current
`

export const postPinsListQuery = groq`
*[_type == "post" && publishedAt <= now()] | order(_updatedAt desc) {
  ${postPinFields}
}
`

export const postSummariesListQuery = groq`
*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) [0...10] {
  ${postSummaryFields}
}
`

export const postSummariesListByTagQuery = (tags: string[]) => {
  let tagsQuery = ''
  tags.map((tag, index) => {
    if (index !== tags.length - 1) {
      tagsQuery += `"${tag}" in tags || `
    } else {
      tagsQuery += `"${tag}" in tags`
    }
  })

  return groq`
*[_type == "post" && publishedAt <= now() && ${tagsQuery}] | order(publishedAt desc) [0...10] {
  ${postSummaryFields}
}
`
}

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
  ${postViewFields}
}
`

export interface BlogImage {
  caption: any // blocks
  alt: string
  placement: 'top' | 'right' | 'bottom' | 'left'
  asset?: {
    _ref: string
  }
  crop?: Crop
  hotspot?: Hotspot
}

export interface Author {
  name: string
  picture: {
    name: string
    asset: {
      _ref: string
    },
    crop?: Crop
    hotspot?: Hotspot
  }
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
  coverImage?: BlogImage
  tags
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
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
