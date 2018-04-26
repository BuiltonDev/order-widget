import moment from 'moment';

export default function parsedDeliveryTime(time, date) {
  if (!time || !date || !moment.isMoment(date)) return null;
  const [hours, minutes] = time.split(':');
  return date.set({'hour': hours, 'minute': minutes, 'seconds': 0});
};
