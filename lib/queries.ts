// ======================================================
// INDIA STATES (Reference based filtering)
// ======================================================

export const indiaStatesQuery = `
*[
  _type == "state" &&
  defined(country) &&
  country->type == "india"
]
| order(name asc)
{
  _id,
  name,
  "slug": slug.current
}
`;


// ======================================================
// INTERNATIONAL COUNTRIES WITH STATES
// ======================================================

export const internationalCountriesQuery = `
*[
  _type == "country" &&
  type == "international"
]
| order(name asc)
{
  _id,
  name,
  "slug": slug.current,

  "states": *[
    _type == "state" &&
    references(^._id)
  ]
  | order(name asc)
  {
    _id,
    name,
    "slug": slug.current
  }
}
`;


// ======================================================
// HOME TOURS (Latest 6 Tours)
// ======================================================

export const homeToursQuery = `
*[
  _type == "tour"
]
| order(_createdAt desc)[0...6]
{
  _id,
  title,
  "slug": slug.current,
  price,
  duration,
  shortDescription,

  "image": mainImage.asset->url,

  category
}
`;


// ======================================================
// CURRENCY MARKUP
// ======================================================

export const currencyMarkupQuery = `
*[
  _type == "currencyMarkup" &&
  isActive == true
]
{
  _id,
  currencyCode,
  buyMarkup,
  sellMarkup
}
`;


// ======================================================
// HERO SLIDER
// ======================================================

export const heroQuery = `
*[_type == "hero"]
| order(order asc)
{
  _id,
  subtitle,
  title,
  description,
  "image": image.asset->url,
  primaryBtnText,
  secondaryBtnText
}
`;