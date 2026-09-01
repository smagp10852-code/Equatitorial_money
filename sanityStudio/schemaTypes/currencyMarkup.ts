import { defineType, defineField } from "sanity";

export default defineType({

  name: "currencyMarkup",
  title: "Currency Markup",
  type: "document",

  fields: [

    defineField({
      name: "currencyCode",
      title: "Currency Code",
      type: "string",
      description: "Example: USD, EUR, AED",

      validation: Rule =>
        Rule.required()
          .min(3)
          .max(3)
          .uppercase()
    }),

    defineField({
      name: "buyMarkup",
      title: "Buy Markup (₹ added)",
      type: "number",
      description:
        "Jab CUSTOMER currency BUY kare (hum sell karte hain) — bank/market rate mein ye amount ADD hoga. Profit ke liye rate upar jayega.",
      initialValue: 0,

      validation: Rule =>
        Rule.required().min(0)
    }),

    defineField({
      name: "sellMarkup",
      title: "Sell Markup (₹ subtracted)",
      type: "number",
      description:
        "Jab CUSTOMER currency SELL kare (hum buy karte hain) — bank/market rate se ye amount MINUS hoga.",
      initialValue: 0,

      validation: Rule =>
        Rule.required().min(0)
    }),

    defineField({
      name: "cardRate",
      title: "Forex Card Rate (₹ — final rate)",
      type: "number",
      description:
        "Yahan jo number daaloge, wahi EXACT rate frontend pe dikhega — koi calculation ya market-rate addition nahi hoga. Isko khud decide karke seedha final rate ki tarah bharo.",
      initialValue: 0,

      validation: Rule =>
        Rule.required().min(0)
    }),

    defineField({
      name: "isActive",
      title: "Is Active",
      description: "Off karne par is currency ka markup UI mein apply nahi hoga, raw API rate dikhega.",
      type: "boolean",
      initialValue: true
    })

  ],

  preview: {
    select: {
      title: "currencyCode",
      buy: "buyMarkup",
      sell: "sellMarkup",
      card: "cardRate",
      active: "isActive"
    },
    prepare({ title, buy, sell, card, active }) {
      return {
        title: `${title || "—"} ${active === false ? "(Inactive)" : ""}`.trim(),
        subtitle: `We Sell: +₹${buy || 0}   |   We Buy: −₹${sell || 0}   |   Card: ₹${card || 0}`
      };
    }
  }

});