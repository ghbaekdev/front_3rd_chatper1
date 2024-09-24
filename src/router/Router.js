export default class Router {
  constructor() {
    this.routes = {};
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    history.pushState(null, '', path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const handler = this.routes[path];
    console.log('handler', handler);
    if (handler) {
      handler();
    } else {
      console.log('404 Not Found');
    }
    // else {
    //   this.routes['*']();
    // }
  }
}
