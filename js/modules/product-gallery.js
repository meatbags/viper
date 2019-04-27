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
      zoom: document.querySelector('.product__zoom'),
    };

    // bind carousel events
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
        this.zoomOut();
      });
    });
    this.el.prev.addEventListener('click', evt => {
      evt.stopPropagation();
      const index = this.getActiveIndex();
      if (index > 0) {
        this.activateIndex(index - 1);
        this.setControls();
      }
      this.zoomOut();
    });
    this.el.next.addEventListener('click', evt => {
      evt.stopPropagation();
      const index = this.getActiveIndex();
      if (index < this.el.images.length - 1) {
        this.activateIndex(index + 1);
        this.setControls();
      }
      this.zoomOut();
    });

    // bind zoom events
    if (!this.isMobile) {
      this.mouse = {
        isDown: false,
        timestamp: (new Date()).getTime(),
        threshold: {time: 250, distance: 30},
        origin: {x: 0, y: 0},
        delta: {x: 0, y: 0},
      };
      this.image = {
        target: null,
        origin: {x: 0, y: 0},
        position: {x: 0, y: 0},
        min: {x: 0, y: 0},
      };
      this.rect = {top: 0, left: 0, width: 0, height: 0};
      this.el.wrapper.addEventListener('click', evt => {
        const d = (new Date()).getTime();
        const dt = d - this.mouse.timestamp;
        const dx = Math.sqrt(Math.pow(this.mouse.delta.x, 2) + Math.pow(this.mouse.delta.y, 2));
        if (dt < this.mouse.threshold.time && dx < this.mouse.threshold.distance) {
          if (this.el.zoom.classList.contains('active')) {
            this.zoomOut();
          } else {
            this.zoomIn(evt);
          }
        }
      });
      this.el.wrapper.addEventListener('mousemove', evt => {
        this.onMouseMove(evt);
      });
      this.el.wrapper.addEventListener('mousedown', evt => {
        this.onMouseDown(evt);
      });
      this.el.wrapper.addEventListener('mouseup', evt => {
        this.onMouseUp();
      });
      this.el.wrapper.addEventListener('mouseout', evt => {
        this.onMouseUp();
      });
    }

    // set initial state
    this.setControls();
  }

  onMouseDown(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.mouse.timestamp = (new Date()).getTime();
    this.mouse.delta.x = 0;
    this.mouse.delta.y = 0;
    if (this.el.zoom.classList.contains('active')) {
      this.mouse.isDown = true;
      this.mouse.origin.x = evt.clientX;
      this.mouse.origin.y = evt.clientY;
      this.image.origin.x = this.image.position.x;
      this.image.origin.y = this.image.position.y;
    }
  }

  onMouseMove(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.mouse.isDown) {
      this.mouse.delta.x = evt.clientX - this.mouse.origin.x;
      this.mouse.delta.y = evt.clientY - this.mouse.origin.y;
      let x = this.image.origin.x + this.mouse.delta.x;
      let y = this.image.origin.y + this.mouse.delta.y;
      this.image.position.x = Math.min(0, Math.max(this.image.min.x, x));
      this.image.position.y = Math.min(0, Math.max(this.image.min.y, y));
      this.image.el.style.left = this.image.position.x + 'px';
      this.image.el.style.top = this.image.position.y + 'px';

      // limit mouse
      if (this.image.position.x == 0 || this.image.position.x == this.image.min.x) {
        this.mouse.origin.x = evt.clientX;
        this.image.origin.x = this.image.position.x;
      }
      if (this.image.position.y == 0 || this.image.position.y == this.image.min.y) {
        this.mouse.origin.y = evt.clientY;
        this.image.origin.y = this.image.position.y;
      }
    }
  }

  onMouseUp() {
    this.mouse.isDown = false;
  }

  zoomIn(evt) {
    const img = this.el.wrapper.querySelector('img.active');
    if (img) {
      const rect = this.el.wrapper.getBoundingClientRect();
      const x = (evt.clientX - rect.left) / rect.width;
      const y = (evt.clientY - rect.top) / rect.height;

      // create new image
      this.image.el = document.createElement('img');
      this.image.el.src = img.src;
      this.el.zoom.appendChild(this.image.el);
      this.el.zoom.classList.add('active');

      // set image position
      this.image.min.x = -(img.naturalWidth - rect.width);
      this.image.min.y = -(img.naturalHeight - rect.height);
      this.image.origin.x = Math.ceil(x * this.image.min.x);
      this.image.origin.y = Math.ceil(y * this.image.min.y);
      this.image.position.x = this.image.origin.x;
      this.image.position.y = this.image.origin.y;
      this.image.el.style.left = this.image.position.x + 'px';
      this.image.el.style.top = this.image.position.y + 'px';
    }
  }

  zoomOut() {
    this.el.zoom.classList.remove('active');
    this.el.zoom.innerHTML = '';
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
