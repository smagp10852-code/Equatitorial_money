import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Slides",
  type: "document",

  fields: [

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "primaryBtnText",
      title: "Primary Button Text",
      type: "string",
    }),

    defineField({
      name: "secondaryBtnText",
      title: "Secondary Button Text",
      type: "string",
    }),

    defineField({
      name: "order",
      title: "Slide Order",
      type: "number",
    }),

  ],
});