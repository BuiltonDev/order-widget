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
        confirm: "Bekreft"
      }
    });
  } else { // fallback english
    T.setTexts({
      global: {
        next: "Next",
        back: "Back",
        confirm: "Confirm"
      }
    });
  }
};

export default T;
