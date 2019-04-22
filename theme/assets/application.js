var lilith=function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{enumerable:!0,get:d})},b.r=function(a){'undefined'!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:'Module'}),Object.defineProperty(a,'__esModule',{value:!0})},b.t=function(a,c){if(1&c&&(a=b(a)),8&c)return a;if(4&c&&'object'==typeof a&&a&&a.__esModule)return a;var d=Object.create(null);if(b.r(d),Object.defineProperty(d,'default',{enumerable:!0,value:a}),2&c&&'string'!=typeof a)for(var e in a)b.d(d,e,function(b){return a[b]}.bind(null,e));return d},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s='./js/app.js')}({"./js/app.js":function(module,__webpack_exports__,__webpack_require__){'use strict';eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_mobile_check_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/mobile_check.js */ "./js/modules/mobile_check.js");\n/* harmony import */ var _modules_mobile_check_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_mobile_check_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules */ "./js/modules/index.js");\n\n\n\nclass App {\n  constructor() {\n    this.isMobile = window.mobileCheck();\n    this.landingPage = new _modules__WEBPACK_IMPORTED_MODULE_1__["LandingPage"](this.isMobile);\n    this.navigation = new _modules__WEBPACK_IMPORTED_MODULE_1__["Navigation"](this.isMobile);\n    this.productGallery = new _modules__WEBPACK_IMPORTED_MODULE_1__["ProductGallery"](this.isMobile);\n  }\n\n}\n\n;\n\nwindow.onload = () => {\n  var app = new App();\n};\n\n//# sourceURL=webpack://lilith/./js/app.js?')},"./js/modules/index.js":function(module,__webpack_exports__,__webpack_require__){'use strict';eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _landing_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./landing-page */ "./js/modules/landing-page.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LandingPage", function() { return _landing_page__WEBPACK_IMPORTED_MODULE_0__["LandingPage"]; });\n\n/* harmony import */ var _product_gallery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product-gallery */ "./js/modules/product-gallery.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProductGallery", function() { return _product_gallery__WEBPACK_IMPORTED_MODULE_1__["ProductGallery"]; });\n\n/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navigation */ "./js/modules/navigation.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Navigation", function() { return _navigation__WEBPACK_IMPORTED_MODULE_2__["Navigation"]; });\n\n\n\n\n\n//# sourceURL=webpack://lilith/./js/modules/index.js?')},"./js/modules/landing-page.js":function(module,__webpack_exports__,__webpack_require__){'use strict';eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingPage", function() { return LandingPage; });\n/** Landing page functionality. */\nclass LandingPage {\n  constructor(isMobile) {\n    this.target = document.querySelector(\'.landing-page\');\n\n    if (this.target) {\n      // pick random index images\n\n      /*\r\n      const landscape = document.querySelectorAll(\'.background-image__landscape\');\r\n      const portrait = document.querySelectorAll(\'.background-image__portrait\');\r\n      if (landscape.length) {\r\n        const index = Math.floor(Math.random() * landscape.length);\r\n        landscape[index].classList.add(\'active\');\r\n      }\r\n      if (portrait.length) {\r\n        const index = Math.floor(Math.random() * portrait.length);\r\n        portrait[index].classList.add(\'active\');\r\n      }\r\n      */\n      // transform index navigation\n      const nav = document.querySelector(\'.nav--index\');\n\n      if (nav) {\n        const breakpoint = {\n          medium: 1500,\n          tablet: 950,\n          mobilePortrait: 400\n        };\n\n        const rinse = text => {\n          return text.replace(/[^0-9.-]/g, "");\n        };\n\n        const resize = () => {\n          const w = window.innerWidth;\n          const h = window.innerHeight;\n          const x = parseFloat(rinse(w > breakpoint.tablet ? nav.dataset[\'x\'] : nav.dataset[\'mx\']));\n          const y = parseFloat(rinse(w > breakpoint.tablet ? nav.dataset[\'y\'] : nav.dataset[\'my\']));\n          const rot = parseFloat(rinse(w > breakpoint.tablet ? nav.dataset[\'rot\'] : nav.dataset[\'mrot\']));\n          const scale = parseFloat(rinse(w > breakpoint.tablet ? \'100.0\' : nav.dataset[\'mscale\']));\n\n          if (!isNaN(x) && !isNaN(y) && !isNaN(rot) && !isNaN(scale)) {\n            const left = w * (x / 100) + \'px\';\n            const top = h * (y / 100) + \'px\';\n            const s = scale / 100;\n            const transformText = `translate(-50%, -50%) rotate(${rot}deg) scale(${s})`;\n            nav.style.left = left;\n            nav.style.top = top;\n            nav.style.transform = transformText;\n          }\n        };\n\n        resize();\n        window.addEventListener(\'resize\', () => {\n          resize();\n        });\n      } // bind landing page\n\n\n      const hash = \'index\';\n\n      if (window.location.hash == `#${hash}`) {\n        this.target.parentNode.removeChild(this.target);\n      } else {\n        this.target.addEventListener(isMobile ? \'touchend\' : \'click\', e => {\n          e.preventDefault();\n          e.stopPropagation();\n          this.target.parentNode.removeChild(this.target);\n          window.location.hash = hash;\n        });\n      } // rm loading screen\n\n\n      const loadingScreen = document.querySelector(\'.loading-screen\');\n\n      if (loadingScreen) {\n        loadingScreen.parentNode.removeChild(loadingScreen);\n      }\n    }\n  }\n\n}\n\n\n\n//# sourceURL=webpack://lilith/./js/modules/landing-page.js?')},"./js/modules/mobile_check.js":function(module,exports){eval('// mobile detection utility\nwindow.mobileCheck = function () {\n  var check = false;\n\n  (function (a) {\n    if (/(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|sk\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-/i.test(a.substr(0, 4))) check = true;\n  })(navigator.userAgent || navigator.vendor || window.opera);\n\n  return check;\n};\n\n//# sourceURL=webpack://lilith/./js/modules/mobile_check.js?')},"./js/modules/navigation.js":function(module,__webpack_exports__,__webpack_require__){'use strict';eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Navigation", function() { return Navigation; });\n/** Nav/menu functions. */\nclass Navigation {\n  constructor(isMobile) {\n    this.isMobile = isMobile;\n    this.nav = document.querySelector(\'.nav\');\n\n    if (this.nav) {\n      const anchors = this.nav.querySelectorAll(\'a\');\n      anchors.forEach(el => {\n        if (window.location.pathname == el.getAttribute(\'href\')) {\n          el.parentNode.classList.add(\'active\');\n        }\n      });\n    } // mobile nav/ menu\n\n\n    this.mobileNavButton = document.querySelector(\'.mobile-nav-button\');\n    this.mobileNav = document.querySelector(\'.mobile-nav\');\n\n    if (this.mobileNavButton && this.mobileNav) {\n      this.mobileNavButton.addEventListener(\'click\', evt => {\n        if (!this.mobileNavButton.classList.contains(\'active\')) {\n          this.mobileNavButton.classList.add(\'active\');\n          this.mobileNav.classList.add(\'active\');\n        } else {\n          this.mobileNavButton.classList.remove(\'active\');\n          this.mobileNav.classList.remove(\'active\');\n        }\n      });\n    } // mobile grid\n\n\n    this.grid = document.querySelector(\'.grid\');\n\n    if (this.grid && this.isMobile) {\n      this.gridItems = this.grid.querySelectorAll(\'.grid__item\');\n      /*\r\n      window.addEventListener(\'scroll\', evt => {\r\n        this.onScroll();\r\n      });\r\n      this.onScroll();\r\n      */\n\n      this.gridItems.forEach(item => {\n        item.addEventListener(\'touchstart\', evt => {\n          if (!item.classList.contains(\'active\')) {\n            this.grid.querySelectorAll(\'.grid__item.active\').forEach(el => {\n              el.classList.remove(\'active\');\n            });\n            item.classList.add(\'active\');\n          }\n        });\n      });\n    }\n  }\n\n  onScroll() {\n    // highlight active grid item (mobile)\n    for (let i = 0, lim = this.gridItems.length; i < lim; ++i) {\n      const rect = this.gridItems[i].getBoundingClientRect();\n\n      if (!(rect.left == 0 && rect.top == 0) && rect.top >= 0 && rect.top + rect.height < window.innerHeight) {\n        if (!this.gridItems[i].classList.contains(\'active\')) {\n          this.grid.querySelectorAll(\'.grid__item.active\').forEach(el => {\n            el.classList.remove(\'active\');\n          });\n          this.gridItems[i].classList.add(\'active\');\n        }\n\n        break;\n      }\n    }\n  }\n\n}\n\n\n\n//# sourceURL=webpack://lilith/./js/modules/navigation.js?')},"./js/modules/product-gallery.js":function(module,__webpack_exports__,__webpack_require__){'use strict';eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductGallery", function() { return ProductGallery; });\n/** Product gallery functionality */\nclass ProductGallery {\n  constructor(isMobile) {\n    if (document.querySelector(\'#product-gallery\')) {\n      this.isMobile = isMobile;\n      this.init();\n    }\n  }\n\n  init() {\n    this.el = {\n      menu: document.querySelector(\'.product__gallery-menu\'),\n      thumbs: document.querySelectorAll(\'.product__gallery-menu-thumbnail\'),\n      prev: document.querySelector(\'#gallery-prev-image\'),\n      next: document.querySelector(\'#gallery-next-image\'),\n      wrapper: document.querySelector(\'.product__gallery-image\'),\n      images: document.querySelectorAll(\'.product__gallery-image img\')\n    }; // bind events\n\n    this.el.thumbs.forEach(e => {\n      e.addEventListener(\'click\', evt => {\n        const target = evt.currentTarget;\n\n        if (!target.classList.contains(\'active\')) {\n          // set menu state\n          this.el.menu.querySelectorAll(\'.active\').forEach(el => {\n            el.classList.remove(\'active\');\n          });\n          target.classList.add(\'active\'); // find image\n\n          const id = target.dataset.id;\n          this.el.images.forEach(el => {\n            if (el.dataset.id === id) {\n              el.classList.add(\'active\');\n            } else {\n              el.classList.remove(\'active\');\n            }\n          }); // adjust controls\n\n          this.setControls();\n        }\n      });\n    });\n    this.el.prev.addEventListener(\'click\', evt => {\n      const index = this.getActiveIndex();\n\n      if (index > 0) {\n        this.activateIndex(index - 1);\n        this.setControls();\n      }\n    });\n    this.el.next.addEventListener(\'click\', evt => {\n      const index = this.getActiveIndex();\n\n      if (index < this.el.images.length - 1) {\n        this.activateIndex(index + 1);\n        this.setControls();\n      }\n    }); // set initial state\n\n    this.setControls();\n  }\n\n  activateIndex(index) {\n    // activate image\n    this.el.wrapper.querySelectorAll(\'img.active\').forEach(img => {\n      img.classList.remove(\'active\');\n    });\n    this.el.images[index].classList.add(\'active\'); // menu item\n\n    const id = this.el.images[index].dataset.id;\n    this.el.thumbs.forEach(el => {\n      if (el.dataset.id == id) {\n        el.classList.add(\'active\');\n      } else {\n        el.classList.remove(\'active\');\n      }\n    });\n  }\n\n  getActiveIndex() {\n    let index = 0;\n\n    for (let i = 0; i < this.el.images.length; i++) {\n      if (this.el.images[i].classList.contains(\'active\')) {\n        index = i;\n        break;\n      }\n    }\n\n    return index;\n  }\n\n  setControls() {\n    // show or hide arrow controls\n    const index = this.getActiveIndex(); // previous\n\n    if (index != 0) {\n      this.el.prev.classList.add(\'active\');\n    } else {\n      this.el.prev.classList.remove(\'active\');\n    } // next\n\n\n    if (index != this.el.images.length - 1) {\n      this.el.next.classList.add(\'active\');\n    } else {\n      this.el.next.classList.remove(\'active\');\n    }\n  }\n\n}\n\n\n\n//# sourceURL=webpack://lilith/./js/modules/product-gallery.js?')}});