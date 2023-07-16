export class Observer {
  constructor (listeners = []) {
    this.listeners = listeners;
  }

  attachListener(listener) {
    this.listeners.push(listener);
  }

  detachListener(listener) {
    this.listeners = this.listeners.filter(currListener => currListener !== listener);
  }

  clearAllListeners() {
    this.listeners = [];
  }

  notifyListeners(...data) {
    this.listeners.forEach(listener => listener(...data));
  }
}