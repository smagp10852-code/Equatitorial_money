import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity.client";
import { currencyMarkupQuery } from "@/lib/queries";

type MarkupType = {
  buyMarkup: number;
  sellMarkup: number;
  cardRate: number;
};

export async function GET(req: NextRequest) {
  try {

    /* =========================
       1️⃣ BASE CURRENCY
    ========================== */

    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from")?.toUpperCase() || "INR";

    /* =========================
       2️⃣ FETCH MARKET RATES
       (ExchangeRate-API v6 — temporary provider until XE is live)
    ========================== */

    const apiKey = process.env.EXCHANGE_RATE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "EXCHANGE_RATE_API_KEY missing in environment",
        },
        { status: 500 }
      );
    }

    const apiRes = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`,
      {
        cache: "no-store",
      }
    );

    if (!apiRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Exchange API request failed",
        },
        { status: 500 }
      );
    }

    const apiData = await apiRes.json();

    if (apiData.result !== "success") {
      return NextResponse.json(
        {
          success: false,
          error: apiData["error-type"] || "Invalid currency or API response",
        },
        { status: 400 }
      );
    }

    // v6 endpoint returns "conversion_rates" (not "rates")
    const marketRates: Record<string, number> =
      apiData?.conversion_rates || {};

    /* =========================
       3️⃣ FETCH SANITY MARKUPS
    ========================== */

    const markupData = await sanityClient.fetch(currencyMarkupQuery);

    const markups: Record<string, MarkupType> = {};

    if (Array.isArray(markupData)) {

      markupData.forEach((item: any) => {

        const code = item?.currencyCode?.toUpperCase();

        if (!code) return;

        markups[code] = {
          buyMarkup: Number(item.buyMarkup) || 0,
          sellMarkup: Number(item.sellMarkup) || 0,
          cardRate: Number(item.cardRate) || 0,
        };

      });

    }

    /* =========================
       4️⃣ FINAL RESPONSE
    ========================== */

    return NextResponse.json({
      success: true,
      base: apiData.base_code,
      rates: marketRates,
      markups,
      lastUpdated:
        apiData.time_last_update_utc ||
        new Date().toISOString(),
    });

  } catch (error) {

    console.error("Rates API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );

  }
}



/* =========================================================
   🚀 XE API VERSION (FUTURE USE)
   Same structure as open.er-api
   Just uncomment and comment above code
========================================================= */
// import { NextRequest, NextResponse } from "next/server";
// import { sanityClient } from "@/lib/sanity.client";
// import { currencyMarkupQuery } from "@/lib/queries";
// import { currencyList } from "@/lib/currencyList";

// type MarkupType = {
//   buyMarkup: number;
//   sellMarkup: number;
//   cardRate: number;
// };

// export async function GET(req: NextRequest) {
//   try {

//     /* =========================
//        1️⃣ BASE CURRENCY
//     ========================== */

//     const { searchParams } = new URL(req.url);
//     const from = searchParams.get("from")?.toUpperCase() || "INR";


//     /* =========================
//        2️⃣ XE API CREDENTIALS
//     ========================== */

//     const accountId = process.env.XE_ACCOUNT_ID;
//     const apiKey = process.env.XE_API_KEY;

//     if (!accountId || !apiKey) {

//       return NextResponse.json(
//         {
//           success: false,
//           error: "XE credentials missing",
//         },
//         { status: 500 }
//       );

//     }


//     /* =========================
//        3️⃣ TARGET CURRENCIES
//        Build the FULL list dynamically from lib/currencyList.ts
//        (currently 100+ currencies) instead of a hardcoded 10 —
//        so every currency shown on the site gets a real XE rate.
//     ========================== */

//     const toCurrencies = currencyList
//       .map((c) => c.code)
//       .filter((code) => code !== from)
//       .join(",");


//     /* =========================
//        4️⃣ FETCH XE RATES
//     ========================== */

//     const xeRes = await fetch(
//       `https://xecdapi.xe.com/v1/convert_from.json/?from=${from}&to=${toCurrencies}`,
//       {
//         headers: {
//           Authorization:
//             "Basic " +
//             Buffer.from(`${accountId}:${apiKey}`).toString("base64"),
//         },
//         cache: "no-store",
//       }
//     );

//     if (!xeRes.ok) {

//       const text = await xeRes.text();

//       console.error("XE API ERROR:", text);

//       return NextResponse.json(
//         {
//           success: false,
//           error: "Failed to fetch XE rates",
//         },
//         { status: 500 }
//       );

//     }

//     const xeData = await xeRes.json();


//     /* =========================
//        5️⃣ FORMAT XE RESPONSE
//     ========================== */

//     const marketRates: Record<string, number> = {};

//     if (Array.isArray(xeData?.to)) {

//       xeData.to.forEach((item: any) => {

//         const currency = item?.quotecurrency;

//         if (!currency) return;

//         marketRates[currency] = Number(item.mid) || 0;

//       });

//     }


//     /* =========================
//        6️⃣ FETCH SANITY MARKUPS
//     ========================== */

//     const markupData = await sanityClient.fetch(currencyMarkupQuery);

//     const markups: Record<string, MarkupType> = {};

//     if (Array.isArray(markupData)) {

//       markupData.forEach((item: any) => {

//         const code = item?.currencyCode?.toUpperCase();

//         if (!code) return;

//         markups[code] = {
//           buyMarkup: Number(item.buyMarkup) || 0,
//           sellMarkup: Number(item.sellMarkup) || 0,
//           cardRate: Number(item.cardRate) || 0,
//         };

//       });

//     }


//     /* =========================
//        7️⃣ FINAL RESPONSE
//     ========================== */

//     return NextResponse.json({
//       success: true,
//       base: from,
//       rates: marketRates,
//       markups,
//       lastUpdated: new Date().toISOString(),
//     });

//   } catch (error) {

//     console.error("XE API ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         error: "Internal server error",
//       },
//       { status: 500 }
//     );

//   }
// }