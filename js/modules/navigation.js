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
      this.mobileNavButton.addEventListener('click', evt => {
        if (!this.mobileNavButton.classList.contains('active')) {
          this.mobileNavButton.classList.add('active');
          this.mobileNav.classList.add('active');
        } else {
          this.mobileNavButton.classList.remove('active');
          this.mobileNav.classList.remove('active');
        }
      });
    }

    // mobile grid
    this.grid = document.querySelector('.grid');
    if (this.grid && this.isMobile) {
      this.gridItems = this.grid.querySelectorAll('.grid__item');
      /*
      window.addEventListener('scroll', evt => {
        this.onScroll();
      });
      this.onScroll();
      */
      this.gridItems.forEach(item => {
        item.addEventListener('touchstart', evt => {
          if (!item.classList.contains('active')) {
            this.grid.querySelectorAll('.grid__item.active').forEach(el => { el.classList.remove('active'); });
            item.classList.add('active');
          }
        });
      })
    }
  }

  onScroll() {
    // highlight active grid item (mobile)
    for (let i=0, lim=this.gridItems.length; i<lim; ++i) {
      const rect = this.gridItems[i].getBoundingClientRect();
      if (!(rect.left == 0 && rect.top == 0) && (rect.top >= 0 && rect.top + rect.height < window.innerHeight)) {
        if (!this.gridItems[i].classList.contains('active')) {
          this.grid.querySelectorAll('.grid__item.active').forEach(el => { el.classList.remove('active'); });
          this.gridItems[i].classList.add('active');
        }
        break;
      }
    }
  }
}

export { Navigation };
