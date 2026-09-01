import { defineType, defineField } from "sanity";

export default defineType({
  name: "country",
  title: "Country",
  type: "document",

  fields: [

    // ================= BASIC =================
    defineField({
      name: "name",
      title: "Country Name",
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

    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "India", value: "india" },
          { title: "International", value: "international" },
        ],
        layout: "radio",
      },
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

  ],
});
