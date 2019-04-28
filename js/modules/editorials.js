/** Handle editorial grid (/collections) */

class Editorials {
  constructor(isMobile) {
    this.isMobile = isMobile;
    if (document.querySelector('.swiper-container')) {
      this.init();
    }
  }

  init() {
    this.el = {
      container: document.querySelector('.swiper-container'),
      wrapper: document.querySelector('.swiper-wrapper'),
      close: document.querySelector('.swiper-close'),
      grid: document.querySelector('.grid--article'),
      excerpt: document.querySelector('.swiper-excerpt'),
    };

    // reform collections grid
    const inner = this.el.grid.querySelector('.grid__inner');
    const articles = document.querySelectorAll('.article');
    this.el.excerpt.innerHTML = document.querySelector('.article__excerpt').innerHTML;
    inner.innerHTML = '';
    articles.forEach(e => {
      //var excerpt = e.querySelector('.article__excerpt').innerHTML;
      e.querySelectorAll('img').forEach(img => {
        var div = document.createElement('div');
        var overlay = document.createElement('div');
        //div.dataset.caption = excerpt;
        div.classList.add('grid__item');
        overlay.classList.add('grid__item-overlay');
        div.appendChild(img);
        div.appendChild(overlay);
        inner.appendChild(div);
      });
    });
    this.el.grid.classList.add('active');

    // build slider html
    let index = 1;
    this.el.grid.querySelectorAll('.grid__item').forEach(e => {
      const img = e.querySelector('img');
      const slide = document.createElement('div');
      const image = document.createElement('img');
      slide.classList.add('swiper-slide');
      image.src = img.src;
      slide.appendChild(image);
      this.el.wrapper.appendChild(slide);
      //slide.dataset.caption = e.dataset.caption;

      // reference
      img.dataset.index = index;
      index += 1;
    });
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper__arrow-next',
        prevEl: '.swiper__arrow-prev',
      }
    });
    this.swiper.on('slideChange', () => {
      /*
      const index = this.swiper.activeIndex;
      const slide = this.swiper.slides[index];
      if (slide.dataset.caption) {
        this.el.excerpt.innerHTML = slide.dataset.caption;
      }
      */
    });

    // bind events
    this.el.grid.addEventListener('click', evt => {
      const target = evt.target;
      if (target.tagName === 'IMG' && target.dataset.index !== undefined) {
        const i = parseInt(target.dataset.index);
        this.swiper.slideTo(i, 0);
        this.el.container.classList.add('active');
      }
    });
    this.el.close.addEventListener('click', evt => {
      this.el.container.classList.remove('active');
    })
  }
}

export { Editorials };
