export const toCurrency = (currency?: string | number) => {
  if (!currency || typeof currency === typeof undefined) return undefined;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(currency));
};