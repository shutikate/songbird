import { localization } from '../localization/Localization';

export default class AbstractComponent {
  constructor(parent) {
    this.children = [];
    this.renderData = {};
    this.root = null;
    this.parent = parent;
    this.localization = localization;
    this.localization.observer.attachListener(this.rerender);
  }

  onDestroy() {
    this.localization.observer.detachListener(this.rerender);
  }

  rerender = () => {
    this.children.forEach(child => child.destroy());
    this.children = [];
    const prevRoot = this.root;
    this.root = this.prepareLayout(this.renderData);
    if (prevRoot) {
      prevRoot.replaceWith(this.root);
    }
  }

  destroy() {
    this.children.forEach(child =>  child.destroy());
    this.children = [];
    this.onDestroy();
    if (this.root) {
      this.root.remove();
      this.root = null;
    }
  }

  render(data = {}) {
    this.renderData = data;
    this.root = this.prepareLayout(data);
    this.parent.append(this.root);
    return this;
  }
}
