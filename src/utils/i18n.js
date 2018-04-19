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
        select: 'Velg'
      },
      product: {
        search: 'Søk',
        searchPlaceholder: 'Søk etter produkt',
        noResults: 'Fant ingen treff'
      },
      basket: {
        header: 'Handlekurv',
        checkout: 'Neste',
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
        header: 'Levering',
        searchPlacesPlaceholder: 'Søk etter adresse',
        deliveryDetails: 'Vennligst fyll inn leveringsadresse',
        timeDetails: 'Velg leveringstidspunk',
        dateDetails: 'Velg leveringsdato',
        additionalDetails: 'Tilleggsinformasjon ved levering'
      },
      paymentDetails: {
        header: 'Betaling',
        pay: 'Betal'
      },
      receipt: {
        header: 'Kvittering',
        nameLabel: 'Navn',
        phoneNumberLabel: 'Tlf',
        productsLabel: 'Produkter',
        priceLabel: 'Total pris',
        deliveryLabel: 'Levering',
        deliveryAddLabel: 'Tilleggsinformasjon'
      }
    });
  } else { // fallback english
    T.setTexts({
      global: {
        next: 'Next',
        last: 'Complete',
        select: 'Select'
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
        verifyCode: 'Verification code'
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
        pay: 'Pay'
      },
      receipt: {
        header: 'Receipt',
        nameLabel: 'Name',
        phoneNumberLabel: 'Phone number',
        productsLabel: 'Product(s)',
        priceLabel: 'Total price',
        deliveryLabel: 'Delivery',
        deliveryAddLabel: 'Comment'
      }
    });
  }
};

export default T;
