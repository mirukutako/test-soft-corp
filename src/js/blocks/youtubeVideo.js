export default function youtubeVideo() {

	let youtubeElems = document.querySelectorAll('.js-youtube');


	if (youtubeElems.length) {
		for (let i = 0; i < youtubeElems.length; i++) {

			let source = 'https://img.youtube.com/vi/' + youtubeElems[i].dataset.embed + '/maxresdefault.jpg';

			var iframe = document.createElement('iframe');

			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('allowfullscreen', '');
			iframe.setAttribute('wmode', 'Opaque');
			iframe.setAttribute('src', 'https://www.youtube.com/embed/' + youtubeElems[i].dataset.embed + '?wmode=opaque&rel=0&showinfo=0&autoplay=0');

			youtubeElems[i].innerHTML = '';
			// youtube[i].parentNode.classList.add('active');
			youtubeElems[i].appendChild(iframe);
		};
	}
}
