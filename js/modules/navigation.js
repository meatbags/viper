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

    // mobile nav/ menu
    this.mobileNavButton = document.querySelector('.mobile-nav-button');
    this.mobileNav = document.querySelector('.mobile-nav');
    if (this.mobileNavButton && this.mobileNav) {
      const evtType = this.isMobile ? 'touchend' : 'click';
      this.mobileNavButton.addEventListener(evtType, evt => {
        if (!this.mobileNavButton.classList.contains('active')) {
          this.mobileNavButton.classList.add('active');
          this.mobileNav.classList.add('active');
        } else {
          this.mobileNavButton.classList.remove('active');
          this.mobileNav.classList.remove('active');
        }
      });
    }
  }
}

export { Navigation };
