import T from 'i18n-react';

const languages = {
  no: 'no',
  en: 'en'
};

T.setLanguage = (lng) => {
  if (lng === languages.no) {
    T.setTexts({
      global: {
        next: 'Neste',
        back: 'Tilbake',
        confirm: 'Bekreft'
      },
      product: {
        search: 'Søk',
        searchPlaceholder: 'Søk etter produkt',
        noResults: 'Fant ingen treff'
      },
      basket: {
        header: 'Handlekurv'
      }
    });
  } else { // fallback english
    T.setTexts({
      global: {
        next: 'Next',
        back: 'Back',
        confirm: 'Confirm'
      },
      product: {
        search: 'Search',
        searchPlaceholder: 'Search for product',
        noResults: 'No results'
      },
      basket: {
        header: 'Basket'
      }
    });
  }
};

export default T;
