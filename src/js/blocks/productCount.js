export default function productCount() {
	let productCounts = document.querySelectorAll('.js-product-count');

	if(productCounts.length) {
		productCounts.forEach(product => {

			let countPlus = product.querySelector('.js-product-plus');
			let countMinus = product.querySelector('.js-product-minus');
			let countInput = product.querySelector('.js-product-input');
			let countMin = +countInput.min;
			let countMax = +countInput.max;

			countPlus.addEventListener('click', function() {
				if(countInput.value < countMax) {
					countInput.value++;
				}
			});

			countMinus.addEventListener('click', function() {
				if(countInput.value > countMin) {
					countInput.value--;
				}
			});

			countInput.addEventListener('input', function() {
				if(countInput.value > countMax) {
					countInput.value = countMax;
				}
			});

			countInput.addEventListener('change', function() {
				if(!countInput.value) {
					countInput.value = countMin;
				}
			});
		});
	}
}
