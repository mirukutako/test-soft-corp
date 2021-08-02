import throttle from '../helpers/throttle';
export default function scrollAction() {

	let headerPage = document.querySelector('.js-header');
	if (headerPage) {
		let docBody = document.querySelector('body');
		let defaultPage = 50;
		let startPage = window.pageYOffset;
		let prevValueY = 0;

		checkOffset(defaultPage, startPage);

		let checkTtrottle = throttle(checkOffset, 200);

		window.addEventListener('scroll', () => {
			let scrollPage = window.pageYOffset;
			checkTtrottle(defaultPage, scrollPage);
			// checkOffset(defaultPage, scrollPage);
		});

		function checkOffset(defaultY, currentY) {
			if (defaultY < currentY) {
				if (currentY > prevValueY) {
					headerPage.classList.add('is-visible');
					docBody.classList.add('header-visible');
					prevValueY = currentY - 50;
				} else {
					headerPage.classList.remove('is-visible');
					docBody.classList.remove('header-visible');
					prevValueY = currentY;
				}
			} else {
				if (!window.openMenu && !window.openModal) {
					headerPage.classList.remove('is-visible');
					docBody.classList.remove('header-visible');
				}
			}
		}
	}

}
