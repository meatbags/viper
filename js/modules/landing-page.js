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

      // transform index navigation
      const nav = document.querySelector('.nav--index');
      if (nav) {
        const breakpoint = {
          medium: 1500,
          tablet: 950,
          mobilePortrait: 400,
        };
        const rinse = (text) => {
          return text.replace(/[^0-9.-]/g, "");
        }
        const resize = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const x = parseFloat(rinse(w > breakpoint.tablet ? nav.dataset['x'] : nav.dataset['mx']));
          const y = parseFloat(rinse(w > breakpoint.tablet ? nav.dataset['y'] : nav.dataset['my']));
          const rot = parseFloat(rinse(w > breakpoint.tablet ? nav.dataset['rot'] : nav.dataset['mrot']));
          const scale = parseFloat(rinse(w > breakpoint.tablet ? '100.0' : nav.dataset['mscale']));
          if (!isNaN(x) && !isNaN(y) && !isNaN(rot) && !isNaN(scale)) {
            const left = w * (x / 100) + 'px';
            const top = h * (y / 100) + 'px';
            const s = scale / 100;
            const transformText = `translate(-50%, -50%) rotate(${rot}deg) scale(${s})`;
            nav.style.left = left;
            nav.style.top = top;
            nav.style.transform = transformText;
          }
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
