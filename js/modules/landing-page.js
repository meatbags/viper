/** Landing page functionality. */

class LandingPage {
  constructor(isMobile) {
    this.target = document.querySelector('.landing-page');
    if (this.target) {
      // pick random index images
      /*
      const landscape = document.querySelectorAll('.background-image__landscape');
      const portrait = document.querySelectorAll('.background-image__portrait');
      if (landscape.length) {
        const index = Math.floor(Math.random() * landscape.length);
        landscape[index].classList.add('active');
      }
      if (portrait.length) {
        const index = Math.floor(Math.random() * portrait.length);
        portrait[index].classList.add('active');
      }
      */

      // rotate menus
      const nav = document.querySelector('.nav--index');
      const breakpoint = {
        medium: 1500,
        tablet: 950,
        mobilePortrait: 400,
      };
      if (nav) {
        const resize = () => {

        };
        resize();
        window.addEventListener('resize', () => { resize(); });
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

      // rm loading screen
      const loadingScreen = document.querySelector('.loading-screen');
      if (loadingScreen) {
        loadingScreen.parentNode.removeChild(loadingScreen);
      }
    }
  }
}

export { LandingPage };
