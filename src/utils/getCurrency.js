
// Temporary method to retreive currency
export default function getCurrency(products) {
  if (!products) return '';

  Object.entries(products).forEach(([key, value]) => {
    if (value) return value.item.currency;
  });

  return '';
}
