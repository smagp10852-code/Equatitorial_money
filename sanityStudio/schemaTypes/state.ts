import { defineType, defineField } from "sanity";

export default defineType({
  name: "state",
  title: "State / Destination",
  type: "document",

  fields: [

    // ================= BASIC =================
    defineField({
      name: "name",
      title: "State Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // ================= COUNTRY LINK =================
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
      validation: (Rule) => Rule.required(),
    }),

    // ================= HERO IMAGE =================
    defineField({
      name: "mainImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),

    // ================= DESCRIPTION =================
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
    }),

    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
    }),

    // ================= GALLERY =================
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    }),

    // ================= FEATURED =================
    defineField({
      name: "featured",
      title: "Featured Destination?",
      type: "boolean",
    }),

  ],
});
