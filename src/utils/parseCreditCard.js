
export default function parseCreditCard(card) {
  if (!card) return '';
  return `${card.brand} xxxx xxxx xxxx ${card.last4} ${card.exp_month}/${card.exp_year.toString().substring(2, 4)}`;
}
