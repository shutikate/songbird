import { Observer } from '../observer/Observer';
import birdsDataRu from './ru';
import birdsDataEn from './en';

const config = {
  ru: birdsDataRu,
  en: birdsDataEn,
}

class Localization {
  constructor() {
    this.observer = new Observer();
  }

  getCurrentLanguage() {
    return window.localStorage.getItem('language-shutikate') || 'ru';
  }

  setCurrentLanguage(language) {
    window.localStorage.setItem('language-shutikate', language);
    this.observer.notifyListeners(language);
  }

  getData() {
    return config[this.getCurrentLanguage()];
  }
}

export const localization = new Localization();