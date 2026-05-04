export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  slug,
  shortDescription,
  icon,
  features,
  "coverImage": coverImage.asset->url
}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  client,
  category,
  shortDescription,
  tags,
  results,
  year,
  "coverImage": coverImage.asset->url
}`;

export const allProjectsQuery = `*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  client,
  category,
  shortDescription,
  tags,
  results,
  year,
  featured,
  "coverImage": coverImage.asset->url
}`;

export const featuredTestimonialsQuery = `*[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...6] {
  _id,
  author,
  role,
  company,
  quote,
  rating,
  "avatar": avatar.asset->url
}`;

export const latestInsightsQuery = `*[_type == "post"] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  excerpt,
  category,
  tags,
  publishedAt,
  readingTime,
  featured,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coalesce(coverImage.alt, coverImage.asset->altText),
  "mobileCoverImage": mobileCoverImage.asset->url,
  "mobileCoverImageAlt": coalesce(mobileCoverImage.alt, mobileCoverImage.asset->altText),
  "author": author->{
    name,
    role,
    "avatar": avatar.asset->url
  }
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  _updatedAt,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "alt": coalesce(alt, asset->altText)
    }
  },
  category,
  tags,
  publishedAt,
  readingTime,
  seo{
    metaTitle,
    metaDesc,
    keywords,
    "shareImage": shareImage.asset->url,
    "shareImageAlt": coalesce(shareImage.alt, shareImage.asset->altText)
  },
  faqs[]{
    question,
    answer
  },
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coalesce(coverImage.alt, coverImage.asset->altText),
  "mobileCoverImage": mobileCoverImage.asset->url,
  "mobileCoverImageAlt": coalesce(mobileCoverImage.alt, mobileCoverImage.asset->altText),
  "author": author->{
    name,
    role,
    bio,
    "avatar": avatar.asset->url
  }
}`;

export const postSeoBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  category,
  tags,
  publishedAt,
  _updatedAt,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coalesce(coverImage.alt, coverImage.asset->altText),
  "mobileCoverImage": mobileCoverImage.asset->url,
  "mobileCoverImageAlt": coalesce(mobileCoverImage.alt, mobileCoverImage.asset->altText),
  seo{
    metaTitle,
    metaDesc,
    keywords,
    "shareImage": shareImage.asset->url,
    "shareImageAlt": coalesce(shareImage.alt, shareImage.asset->altText)
  },
  "author": author->{
    name
  }
}`;

export const relatedPostsQuery = `*[_type == "post" && category == $category && _id != $currentId] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  readingTime,
  "coverImage": coverImage.asset->url
}`;

export const sitemapPostsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  "slug": slug.current,
  _updatedAt,
  publishedAt
}`;

export const founderQuery = `*[_type == "teamMember" && isFounder == true][0] {
  _id,
  name,
  role,
  bio,
  vision,
  skills,
  linkedin,
  twitter,
  "avatar": avatar.asset->url,
  "heroImage": heroImage.asset->url
}`;

export const companyInfoQuery = `*[_type == "companyInfo"][0] {
  _id,
  mission,
  vision,
  story,
  values,
  founded,
  teamSize,
  "heroImage": heroImage.asset->url
}`;
