import T from "i18n-react";

const languages = {
  no: "no",
  en: "en",
};

T.setLanguage = (lng) => {
  if (lng === languages.no) {
    T.setTexts({
      global: {
        next: "Neste",
        back: "Tilbake",
        confirm: "Bekreft",
        addAPhone: "Legg til telefon",
        backToSite: "< Tilbake til hjemmesiden"
      }
    });
  } else { // fallback english
    T.setTexts({
      global: {
        next: "Next",
        back: "Back",
        confirm: "Confirm",
        addAPhone: "Add a phone",
        backToSite: "< Back to the main page",
      }
    });
  }
};

export default T;
