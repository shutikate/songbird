export class HashRouter {
  constructor (routesConfig) {
    this.currentPage = null;
    this.routesConfig = routesConfig;

    this.renderPage(this.getCurrentPath());

    window.addEventListener('hashchange', this.onRouteChanged);
  }

  getCurrentPath () {
    return new URL(document.URL).hash.slice(1);
  }

  onRouteChanged = () => {
    this.renderPage(this.getCurrentPath());
  }

  renderPage = (path) => {
    const currentRoute = this.routesConfig.find(config => config.path === path);
    if (currentRoute) {
      if (this.currentPage) {
        this.currentPage.destroy();
      }
      this.currentPage = new currentRoute.page(document.body);
      this.currentPage.render();
    } else {
      const url = new URL(document.URL);
      url.hash = '#404';
      document.location.href = url.href;
    }
  }
}