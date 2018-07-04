import moment from 'moment';
import utils from 'src/utils';

describe('utils functions', () => {

  describe('parseDeliveryTime', () => {
    it('should return null if time or date is not set in correct format', () => {
      const date = moment('2018-12-12T12:00:00');
      const time = '11:30:00';

      expect(utils.parseDeliveryTime(null, date)).toEqual(null);
      expect(utils.parseDeliveryTime(time, null)).toEqual(null);
      expect(utils.parseDeliveryTime(time, new Date("2018-12-12T12:00:00"))).toEqual(null);
    });

    it('should return full delivery time given time string and date object', () => {
      const date = moment('2018-12-12T12:00:00');
      const time = '11:30:00';
      expect(utils.parseDeliveryTime(time, date).format('MM/DD/YYYY hh:mm:ss')).toEqual('12/12/2018 11:30:00');
    });
  });

  describe('parseCreditCard', () => {
    it('should parse credit card in specific format', () => {
      const card = {
        brand: 'VISA',
        last4: '1234',
        exp_month: 12,
        exp_year: 2019
      };
      expect(utils.parseCreditCard(card)).toEqual('VISA xxxx xxxx xxxx 1234 12/19');
    });
  });

  describe('getLocationType', () => {
    it('should search and retreive specific location type', () => {
      const location = {
        address_components: [{
          types: 'country',
          long_name: 'Norway'
        },
        {
          types: 'city',
          long_name: 'Oslo'
        }
      ]};
      expect(utils.getLocationType(location, 'country')).toEqual('Norway');
      expect(utils.getLocationType(location, 'city')).toEqual('Oslo');
    });
  });

  describe('roundNumber', () => {
    it('should round number to desired decimal', () => {
      expect(utils.roundNumber(2.333232, '2')).toEqual(2.33);
      expect(utils.roundNumber(2.1, '2')).toEqual(2.1);
      expect(utils.roundNumber(2.1, '0')).toEqual(2);
    });
  });

  describe('getCurrency', () => {
    it('should search list of products and retreive first currency it finds', () => {
      const products = {
        '123': {
          item: {
            name: 'book'
          }
        },
        '345': {
          item: {
            name: 'movie',
            currency: 'NOK'
          }
        }
      };
      expect(utils.getCurrency(products)).toEqual('NOK');
    });
  });

  describe('parseRecommendations', () => {
    it('should parse returned recommendations into a easily consumable array', () => {
      const recommendations = {
        response: [
          {
            object: {
              name: 'product'
            }
          }
        ]
      };
      expect(utils.parseRecommendations(recommendations)[0]).toEqual(recommendations.response[0].object);
    });
  });

});
