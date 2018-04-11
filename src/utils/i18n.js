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
        last: 'Avslutt'
      },
      product: {
        search: 'Søk',
        searchPlaceholder: 'Søk etter produkt',
        noResults: 'Fant ingen treff'
      },
      basket: {
        header: 'Handlekurv',
        checkout: "Neste",
        products: 'Produkter',
        tax: 'Mva',
        total: 'Totalt m/ skatt'
      },
      userDetails: {
        header: 'Bruker',
        detailsInfo: 'Vennligst fyll inn dine opplysninger',
        verifyInfo: 'Verifiser telefonnummeret ditt',
        firstName: 'Fornavn',
        lastName: 'Etternavn',
        phoneNumber: 'Telefonnummer',
        verifyCode: 'Verifiseringskode'
      },
      deliveryDetails: {
        header: 'Levering'
      },
      paymentDetails: {
        header: 'Betaling'
      },
      receipt: {
        header: 'Kvittering'
      }
    });
  } else { // fallback english
    T.setTexts({
      global: {
        next: 'Next',
        last: 'Complete'
      },
      product: {
        search: 'Search',
        searchPlaceholder: 'Search for product',
        noResults: 'No results'
      },
      basket: {
        header: 'Basket',
        checkout: "Checkout",
        products: 'Products',
        tax: 'Tax',
        total: 'Total w/ tax'
      },
      userDetails: {
        header: 'User',
        detailsInfo: 'Please type in your details',
        verifyInfo: 'Verify your phone number',
        firstName: 'Given name',
        lastName: 'Family name',
        phoneNumber: 'Phone number',
        verifyCode: 'Verification code'
      },
      deliveryDetails: {
        header: 'Delivery'
      },
      paymentDetails: {
        header: 'Payment'
      },
      receipt: {
        header: 'Receipt'
      }
    });
  }
};

export default T;
