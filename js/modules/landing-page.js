/** Landing page functionality. */

class LandingPage {
  constructor(isMobile) {
    this.target = document.querySelector('.landing-page');
    if (this.target) {
      // rm loading screen
      const loadingScreen = document.querySelector('.loading-screen');
      if (loadingScreen) {
        loadingScreen.parentNode.removeChild(loadingScreen);
      }

      // bind landing page
      const hash = 'index';
      if (window.location.hash == `#${hash}`) {
        this.target.parentNode.removeChild(this.target);
      } else {
        this.target.addEventListener(isMobile ? 'touchend' : 'click', e => {
          e.preventDefault();
          e.stopPropagation();
          this.target.parentNode.removeChild(this.target);
          window.location.hash = hash;
        });
      }
    }
  }
}

export { LandingPage };
