import './modules/mobile_check.js';

class App {
	constructor() {
		this.isMobile = window.mobileCheck();
	}
};

window.onload = () => {
	var app = new App();
};
