export async function getRates(baseCurrency: string) {

  const res = await fetch(`/api/rates?from=${baseCurrency}`, {
    cache: "no-store",
  });

  const data = await res.json();

  return {
    success: true,
    base: data.base,
    rates: data.rates || {},
    markups: data.markups || {},
    lastUpdated: data.lastUpdated || null,
  };

}