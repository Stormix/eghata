import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: 'en-us',
    debug: true,
    supportedLngs: ['en-us', 'fr-fr', 'ar-ma'],
    load: 'all',
    lowerCaseLng: true,

    defaultNS: 'common',
    ns: ['common'],
    fallbackNS: ['common'],

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    react: {
      bindI18n: 'languageChanged editorSaved',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true
    },

    // Detector
    detection: {
      order: ['cookie', 'localStorage'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode']
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

export default i18n;
