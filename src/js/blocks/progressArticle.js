export default function progressArticle() {
	let progress = document.querySelector('.progress-bar');
	let contentInit = document.querySelector('.js-content');
	if(progress && contentInit) {

		const process = progress.querySelector('.progress-bar-process');
		const processTransform = process.style;
		const contentBlock = document.querySelector('.js-content');

		let contentHeight = contentBlock.offsetHeight - window.innerHeight;
		let scrollHeight = window.pageYOffset || document.documentElement.scrollTop;
		let percent = scrollHeight/contentHeight;
		processTransform.transform = `scaleX(${percent})`;

		window.onresize = function(event) {
			contentHeight = contentBlock.offsetHeight - window.innerHeight;
		};

		window.addEventListener('scroll', function() {
			scrollHeight = window.pageYOffset || document.documentElement.scrollTop;
			percent = scrollHeight/contentHeight;
			processTransform.transform = `scaleX(${percent})`;
		});

	} else {
		return false;
	}
}
