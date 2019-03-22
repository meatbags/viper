/** Product gallery functionality */

class ProductGallery {
  constructor(isMobile) {
    if (document.querySelector('#product-gallery')) {
      this.isMobile = isMobile;
      this.init();
    }
  }

  init() {
    this.el = {
      menu: document.querySelector('.product__gallery-menu'),
      thumbs: document.querySelectorAll('.product__gallery-menu-thumbnail'),
      prev: document.querySelector('#gallery-prev-image'),
      next: document.querySelector('#gallery-next-image'),
      wrapper: document.querySelector('.product__gallery-image'),
      images: document.querySelectorAll('.product__gallery-image img'),
    };

    // bind events
    this.el.thumbs.forEach(e => {
      e.addEventListener('click', evt => {
        const target = evt.currentTarget;
        if (!target.classList.contains('active')) {
          // set menu state
          this.el.menu.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active');
          });
          target.classList.add('active');

          // find image
          const id = target.dataset.id;
          this.el.images.forEach(el => {
            if (el.dataset.id === id) {
              el.classList.add('active');
            } else {
              el.classList.remove('active');
            }
          });

          // adjust controls
          this.setControls();
        }
      });
    });
    this.el.prev.addEventListener('click', evt => {
      const index = this.getActiveIndex();
      if (index > 0) {
        this.activateIndex(index - 1);
        this.setControls();
      }
    });
    this.el.next.addEventListener('click', evt => {
      const index = this.getActiveIndex();
      if (index < this.el.images.length - 1) {
        this.activateIndex(index + 1);
        this.setControls();
      }
    });

    // set initial state
    this.setControls();
  }

  activateIndex(index) {
    // activate image
    this.el.wrapper.querySelectorAll('img.active').forEach(img => {
      img.classList.remove('active');
    });
    this.el.images[index].classList.add('active');

    // menu item
    const id = this.el.images[index].dataset.id;
    this.el.thumbs.forEach(el => {
      if (el.dataset.id == id) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  getActiveIndex() {
    let index = 0;
    for (let i=0; i<this.el.images.length; i++) {
      if (this.el.images[i].classList.contains('active')) {
        index = i;
        break;
      }
    }
    return index;
  }

  setControls() {
    // show or hide arrow controls
    const index = this.getActiveIndex();

    // previous
    if (index != 0) {
      this.el.prev.classList.add('active');
    } else {
      this.el.prev.classList.remove('active');
    }

    // next
    if (index != this.el.images.length - 1) {
      this.el.next.classList.add('active');
    } else {
      this.el.next.classList.remove('active');
    }
  }
}

export { ProductGallery }
