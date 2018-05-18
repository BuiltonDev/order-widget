
// Temporary method to retreive currency
export default function getCurrency(products) {
  if (!products) return null;

  Object.entries(products).forEach(([key, value]) => {
    if (value) return value.item.currency;
  });

  return null;
}
