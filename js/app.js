import './modules/mobile_check.js';

class App {
	constructor() {
		this.isMobile = window.mobileCheck();
    console.log('Hello World!');
	}
};

window.onload = () => {
	var app = new App();
};
