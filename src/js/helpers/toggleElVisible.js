function hideStart(el) {
	el.style.display = 'none';
	el.style.opacity = '0';
	el.style.transform = 'translateY(10px)';
}
function hideElement(el) {
	el.style.opacity = '0';
	el.style.transform = 'translateY(10px)';
	setTimeout(() => {
		el.style.display = 'none';
	}, 300);
}
function showElement(el) {
	setTimeout(() => {
		el.style.display = '';
	}, 300);
	setTimeout(() => {
		el.style.opacity = '1';
		el.style.transform = 'none';
	}, 320);
}

function accSlideUp(el, event) {
	el.style.height = '0';
	setTimeout(() => {
		if(!event || event.type !== 'resize') {
			el.classList.remove('active');
		}
		el.style.display = 'none';
	}, 300);
}

function accSlideDown(el, event) {
	el.style.display = 'block';
	setTimeout(() => {
		if(!event || event.type !== 'resize') {
			el.classList.add('active');
		}
		el.style.height = `${el.scrollHeight}px`;
	}, 10);

}
export {hideStart, hideElement, showElement, accSlideUp, accSlideDown};
