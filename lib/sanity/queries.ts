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
  body,
  category,
  tags,
  publishedAt,
  readingTime,
  "coverImage": coverImage.asset->url,
  "author": author->{
    name,
    role,
    bio,
    "avatar": avatar.asset->url
  }
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
