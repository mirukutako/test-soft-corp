import {accSlideDown, accSlideUp} from '../helpers/toggleElVisible';
import debounce from '../helpers/debounce';

export default function setupAccordeon() {
	let accordeons = document.querySelectorAll('.js-acc');
	if(accordeons.length) {
		accordeons.forEach(item => {
			let trigg = item.querySelector('.js-acc-trig');
			let targ = item.querySelector('.js-acc-targ');
			if(item.dataset.queries) {
				if(window.matchMedia(`(max-width:${item.dataset.queries}px)`).matches) {
					accSlideUp(targ);
				} else {
					trigg.classList.add('disable');
					trigg.addEventListener('click', () => {return false;});
				}
				window.addEventListener('resize', debounce((e) => {
					if(window.matchMedia(`(max-width:${item.dataset.queries}px)`).matches) {
						trigg.classList.remove('disable');
						trigg.classList.remove('active');
						accSlideUp(targ, e);
					} else {
						// accSlideDown(targ, e);
						targ.style.display = 'block';
						targ.style.height = 'auto';
						targ.classList.remove('active');
						trigg.classList.remove('active');
						trigg.classList.add('disable');
						trigg.addEventListener('click', () => {return false;});
					}
				}, 100));
			} else {
				accSlideUp(targ);
			}
			triggClicked(trigg, targ);
		});
	}

	function triggClicked(trigg, targ) {
		trigg.addEventListener('click', (e) => {
			if(trigg.classList.contains('active')) {
				trigg.classList.remove('active');
				accSlideUp(targ, e);
			} else {
				trigg.classList.add('active');
				accSlideDown(targ, e);
			}
		});
	}
}
