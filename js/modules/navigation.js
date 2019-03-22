/** Nav/menu functions. */

class Navigation {
  constructor(isMobile) {
    this.isMobile = isMobile;
    this.nav = document.querySelector('.nav');
    if (this.nav) {
      const anchors = this.nav.querySelectorAll('a');
      anchors.forEach(el => {
        if (window.location.pathname == el.getAttribute('href')) {
          el.parentNode.classList.add('active');
        }
      })
    }
  }
}

export { Navigation };
