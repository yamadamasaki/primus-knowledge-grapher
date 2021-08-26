import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslation from '../../ui/locales/en.json'
import jaTranslation from '../../ui/locales/ja.json'

const resources = {
  en: {translation: enTranslation},
  ja: {translation: jaTranslation},
}

// noinspection JSIgnoredPromiseFromCall
i18n.use(LanguageDetector).use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      fallbackLng: 'en',
      debug: !!Meteor.settings.public.debug,

      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    })

export default i18n
