export default function dropFilterInit() {
	let dropFilters = document.querySelectorAll('.js-drop-select');
	if(dropFilters.length) {
		dropFilters.forEach(item => {
			let openTrigger = item.querySelector('.js-drop-select-trigger');
			let chooseValue = openTrigger.dataset.choose;
			let defaultValue = openTrigger.dataset.default;
			let selected = item.querySelector('.js-drop-select-selected');
			let selectItem = item.querySelectorAll('.js-drop-select-item');
			let selectedArr = [];
			//open filter
			openTrigger.addEventListener('click', () => {
				if(!item.classList.contains('active')) {
					dropFilters.forEach(removeClass => {
						removeClass.classList.remove('active');
					});
					item.classList.add('active');
				} else {
					item.classList.remove('active');
				}
			});

			selected.innerText = defaultValue ? defaultValue : '';
			// selected element -> change text
			selectItem.forEach(sItem => {
				let box = sItem.querySelector('input');
				let label = sItem.querySelector('label');
				let link = sItem.querySelector('a');

				if(box && label) {

					if(box.checked) {

						if(box.type === 'checkbox') {
							selectedArr.push(label.innerText);
							selected.innerText = selectedArr.join(', ');
						} else {
							selected.innerText = label.innerText;
						}
						item.classList.add('selected');
						sItem.classList.add('selected');
					}

					//select
					box.addEventListener('change', () => {
						if(box.type === 'checkbox') {
							if(box.checked) {
								selectedArr.push(label.innerText);
								selected.innerText = selectedArr.join(', ');
								if(selectedArr.length) {
									sItem.classList.add('selected');
									item.classList.add('selected');
								}
								// window.location.href = '?varietal=' + box.value;
							} else {
								selectedArr.remove(label.innerText);
								selected.innerText = selectedArr.join(', ');
								sItem.classList.remove('selected');
								if(!selectedArr.length) {
									selected.innerText = defaultValue ? defaultValue : '';
									item.classList.remove('selected');
								}
							}
						} else {
							selectItem.forEach(sItem => {
								let boxUncheck = sItem.querySelector('input');
								boxUncheck.checked = false;
								sItem.classList.remove('selected');
							});
							box.checked = true;
							selected.innerText = label.innerText;
							sItem.classList.add('selected');
							item.classList.add('selected');
						}
					});
				}

				if(link) {
					if(link.classList.contains('active')) {
						selected.innerText = chooseValue ? chooseValue + ' ' + link.innerText : link.innerText;
						sItem.classList.add('selected');
					}

					link.addEventListener('click',(e) => {
						e.preventDefault();
						selectItem.forEach(rItem => {
							rItem.classList.remove('selected');
						});

						selected.innerText = chooseValue ? chooseValue + ' ' + link.innerText : link.innerText;
						sItem.classList.add('selected');

						item.classList.remove('active');
					});
				}

			});

			//missclick -> close filter
			document.addEventListener('click', (e) => {
				if(e.target.closest('.js-drop-select') === item) {
					return;
				} else {
					item.classList.remove('active');
					return;
				}
			});
		});
	}
}
