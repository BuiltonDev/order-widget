var config = {
  apiKey: "Y0LQ_QySpWyPJRIOvSTxyhCQLIEDuU3lGzkUA_OAdM0xy7RiFajeU6BGHoyF8EbDdIcGuDzqVVInplMXY1FrVA==",
  endpoint: "https://qa.shareactor.io/",
  firebaseConfig: {
    apiKey: 'AIzaSyB0VtleW5bbd6mixxdgX1Zn29sj9SltEOY',
    domain: 'shareactor-dashboard.firebaseapp.com'
  },
  stripeApiKey: 'pk_test_tAYRDsnQMi1gE7IBosMWmeEn'
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = config;
} else {
  window.config = config;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = config;
} else {
  window.config = config;
}
