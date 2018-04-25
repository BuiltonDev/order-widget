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
        last: 'Avslutt',
        select: 'Velg',
        confirm: 'Bekreft'
      },
      product: {
        search: 'Søk',
        searchPlaceholder: 'Søk etter produkt',
        noResults: 'Fant ingen treff'
      },
      basket: {
        header: 'Handlekurv',
        checkout: 'Fortsett',
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
        verifyCode: 'Verifiseringskode',
        notYou: 'Ikke deg?'
      },
      deliveryDetails: {
        header: 'Levering',
        searchPlacesPlaceholder: 'Søk etter adresse',
        deliveryDetails: 'Vennligst fyll inn leveringsadresse',
        timeDetails: 'Velg leveringstidspunk',
        dateDetails: 'Velg leveringsdato',
        additionalDetails: 'Tilleggsinformasjon ved levering'
      },
      paymentDetails: {
        header: 'Betaling',
        pay: 'Betal',
        cardDetails: 'Fyll inn betalingsdetaljer',
        addNewCard: 'Legg til',
        usePrevious: 'Bruk tidligere betalingsmetode',
        useNew: 'Legg til betalingsmetode'
      },
      receipt: {
        header: 'Kvittering'
      }
    });
  } else { // fallback english
    T.setTexts({
      global: {
        next: 'Next',
        last: 'Complete',
        select: 'Select',
        confirm: 'Confirm'
      },
      product: {
        search: 'Search',
        searchPlaceholder: 'Search for product',
        noResults: 'No results'
      },
      basket: {
        header: 'Basket',
        checkout: 'Checkout',
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
        verifyCode: 'Verification code',
        notYou: 'Not you?'
      },
      deliveryDetails: {
        header: 'Delivery',
        searchPlacesPlaceholder: 'Search for location',
        deliveryDetails: 'Please enter the delivery location',
        timeDetails: 'Select delivery time',
        dateDetails: 'Select delivery date',
        additionalDetails: 'Add additional delivery details'
      },
      paymentDetails: {
        header: 'Payment',
        pay: 'Pay',
        cardDetails: 'Fill in card details',
        addNewCard: 'Add',
        usePrevious: 'Use previous payment method',
        useNew: 'Add payment method'
      },
      receipt: {
        header: 'Receipt'
      }
    });
  }
};

export default T;
