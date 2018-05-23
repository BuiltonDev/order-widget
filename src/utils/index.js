import moment from 'moment';

function parseDeliveryTime(time, date) {
  if (!time || !date || !moment.isMoment(date)) return null;
  const [hours, minutes] = time.split(':');
  return date.set({hour: hours, minute: minutes, seconds: 0});
}

function parseCreditCard(card) {
  if (!card) return '';
  return `${card.brand} xxxx xxxx xxxx ${card.last4} ${card.exp_month}/${card.exp_year.toString().substring(2, 4)}`;
}

function getLocationType(location, type) {
  if (!location || !location.address_components) return null;
  const components = location.address_components;
  for (let i = 0; i < components.length; i += 1) {
    if (components[i].types.indexOf(type) > -1) return components[i].long_name;
  }
  return null;
}

function roundNumber(value, decimals) {
  const round = Math.round(`${value}e${decimals}`);
  return Number(`${round}e-${decimals}`);
}

// Temporary method to retreive currency
function getCurrency(products) {
  if (!products) return '';
  const productList = Object.values(products);

  for (let i = 0; i < productList.length; i += 1) {
    const p = productList[i];
    if (p && p.item && p.item.currency) return p.item.currency;
  }

  return '';
}

export default {
  parseDeliveryTime,
  parseCreditCard,
  getLocationType,
  roundNumber,
  getCurrency
};
