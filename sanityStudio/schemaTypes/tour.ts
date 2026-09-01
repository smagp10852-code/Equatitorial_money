import { defineType, defineField } from "sanity";

export default defineType({
  name: "tour",
  title: "Tour",
  type: "document",

  fields: [

    /* ================= BASIC INFO ================= */

    defineField({
      name: "title",
      title: "Tour Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "overview",
      title: "Overview Description",
      type: "text",
      rows: 6,
    }),

    /* ================= DESTINATION ================= */

    defineField({
      name: "state",
      title: "State / Destination",
      type: "reference",
      to: [{ type: "state" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tourType",
      title: "Tour Type",
      type: "string",
      options: {
        list: [
          { title: "India Tour", value: "india" },
          { title: "International Tour", value: "international" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    /* ================= CATEGORY ================= */

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Trending", value: "trending" },
          { title: "Popular", value: "popular" },
        ],
      },
    }),

    defineField({
      name: "featured",
      title: "Featured Tour?",
      type: "boolean",
      initialValue: false,
    }),

    /* ================= TRIP DETAILS ================= */

    defineField({
      name: "duration",
      title: "Duration (e.g. 6N/7D)",
      type: "string",
    }),

    defineField({
      name: "startPoint",
      title: "Start Point",
      type: "string",
    }),

    defineField({
      name: "endPoint",
      title: "End Point",
      type: "string",
    }),

    defineField({
      name: "price",
      title: "Starting Price",
      type: "number",
    }),

    /* ================= IMAGES ================= */

    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    }),

    /* ================= ITINERARY ================= */

    defineField({
      name: "itinerary",
      title: "Day Wise Itinerary",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Day Title",
              type: "string",
            },
            {
              name: "details",
              title: "Details",
              type: "text",
              rows: 4,
            },
          ],
        },
      ],
    }),

    /* ================= EXTRA INFO ================= */

    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "inclusions",
      title: "Inclusions",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "exclusions",
      title: "Exclusions",
      type: "array",
      of: [{ type: "string" }],
    }),

  ],
});
