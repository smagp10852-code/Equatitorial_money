# Changes Made (Currency Buy/Sell Fix)

## 1. `app/api/rates/route.ts`
- Switched live rate source from `open.er-api.com` to `ExchangeRate-API v6`
  (`https://v6.exchangerate-api.com/v6/{KEY}/latest/{BASE}`) using the key
  in `.env.local` (`EXCHANGE_RATE_API_KEY`).
- Fixed field name: v6 response uses `conversion_rates`, not `rates`.
- The XE API block at the bottom is left commented, untouched — for future
  use when XE goes live. Just uncomment it and set `XE_ACCOUNT_ID` /
  `XE_API_KEY` in env when ready.

## 2. `.env.local` (new file, gitignored — NOT pushed to GitHub)
```
EXCHANGE_RATE_API_KEY=8a5e7e29956319ee337af832
NEXT_PUBLIC_SANITY_PROJECT_ID=2kw18cdi
NEXT_PUBLIC_SANITY_DATASET=production
```
⚠️ You must add these same variables to your hosting platform's env
settings (Vercel, etc.) — `.env.local` never gets deployed.

## 3. `components/forex/ForexBuySell.tsx`
- Markup was not being applied at all before — now:
  - Buy tab → `rate = market rate + buyMarkup` (customer buys from us → we sell → rate up)
  - Sell tab → `rate = market rate − sellMarkup` (customer sells to us → we buy → rate down)
- Fixed a bug where Sell tab always looked up the `to` currency's rate
  instead of the `from` currency — now uses whichever currency is
  actually foreign in each tab.
- If a currency has no markup set in Sanity, raw API rate is shown
  (markup defaults to 0).

## 4. `sanityStudio/schemaTypes/currencyMarkup.ts`
- Clearer field descriptions (in Hinglish) explaining buy = added,
  sell = subtracted.
- Better list preview: `"We Sell: +₹X | We Buy: −₹Y"`, with an
  `(Inactive)` tag when toggled off.

---

## ⚠️ Things you still need to do yourself (need your Sanity login — I can't do these)

### A) Redeploy Sanity Studio
Your hosted studio (sanity.io/@o1elegV88/...) is running an OLDER schema
version (single "Markup Value" field) — that's why Buy/Sell weren't
showing. The schema in this repo already has separate Buy/Sell fields.
Just needs deploying:
```bash
cd sanityStudio
npx sanity login      # if not already logged in
npx sanity deploy
```

### B) Re-enter markup values for existing docs
The 3 existing documents (USD, EUR, AED) were created under the OLD
schema and have data in the old `markupValue` field — not in the new
`buyMarkup` / `sellMarkup` fields. After redeploying, open each of the
3 docs in Studio and fill in Buy Markup + Sell Markup manually (quick,
just 3 currencies), then Publish.

### C) Add env vars to your deployment
`EXCHANGE_RATE_API_KEY` (and Sanity project id/dataset if not already
set there) need to be added in your hosting platform's environment
variables settings — not just in `.env.local`.
