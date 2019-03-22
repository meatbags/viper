import './modules/mobile_check.js';
import * as module from './modules';

class App {
	constructor() {
		this.isMobile = window.mobileCheck();
		this.landingPage = new module.LandingPage(this.isMobile);
		this.productGallery = new module.ProductGallery(this.isMobile);
	}
};

window.onload = () => {
	var app = new App();
};
