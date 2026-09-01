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
      name: "cardMarkup",
      title: "Forex Card Rate (₹ added)",
      type: "number",
      description:
        "Forex Card load karte waqt ka rate — bank/market rate mein ye amount ADD hoga. Cash (Buy) markup se alag rakh sakte ho.",
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
      card: "cardMarkup",
      active: "isActive"
    },
    prepare({ title, buy, sell, card, active }) {
      return {
        title: `${title || "—"} ${active === false ? "(Inactive)" : ""}`.trim(),
        subtitle: `We Sell: +₹${buy || 0}   |   We Buy: −₹${sell || 0}   |   Card: +₹${card || 0}`
      };
    }
  }

});