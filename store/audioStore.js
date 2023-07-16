import { Observer } from '../utils/observer/Observer';

class AudioStore {
  constructor() {
    this.observer = new Observer();
  }

  startPlaying () {
    this.observer.notifyListeners();
  }
}

export const audioStore = new AudioStore();
