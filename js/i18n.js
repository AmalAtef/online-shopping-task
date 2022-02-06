import i18next from "i18next";
import enJson from "./locales/en.json";
import arJson from "./locales/ar.json";

export const i18n = i18next;

export const initI18n = (callback) => {
  i18next.init({
    lng: "en",
    debug: true,
    resources: {
      en: {
        translation: enJson,
      },
      ar: {
        translation: arJson,
      }
    },
  }, function (err, t) {
    // Call this function once i18next is initialized
    callback()
  });
}