import smoothscroll from 'smoothscroll-polyfill';

export default function scrollTo() {

	if(document.querySelectorAll('.js-scroll-to').length) {

		smoothscroll.polyfill();

		let scrollToTriggers = document.querySelectorAll('.js-scroll-to');

		scrollToTriggers.forEach(item => {

			item.addEventListener('click',(e) => {

				try {
					item.blur();
				} catch (error) {}

				e.preventDefault();
				let targetel = item.getAttribute('href');
				let target = document.querySelector(targetel);
				let timeDelay = 0;

				if(target) {
					scrollToTriggers.forEach(trigg => {
						trigg.classList.remove('active');
					});

					item.classList.add('active');

					setTimeout(function() {
						let offs = offset(target);
						window.scroll({
							top: offs - (window.matchMedia('(max-width: 768px)').matches ? '60' : '80'),
							behavior: 'smooth'
						});
					}, 150);
				}
			});
		});
	}

}

function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return rect.top + scrollTop;
}
