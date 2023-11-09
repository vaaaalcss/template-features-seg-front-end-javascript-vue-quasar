import {boot} from 'quasar/wrappers'

export default boot(async ({app}) => {
	app.directive('my-only-alphanumeric', (el, binding, vNode) => {
		const t = binding.value;
		let maxChars = 254;

		if(t && t.maxChars){
			maxChars = t.maxChars;
		}

		let element = null;

		if (el.getElementsByTagName('INPUT')[0]) {
			element = el.getElementsByTagName('INPUT')[0];
			element.setAttribute('maxlength', maxChars);
		}

		let handler = function(e) {
			let string = e.target.value;
			let value = string ? string: '';
			let newValue = value.replace(/[^a-zA-Z0-9\-_ ?¿]/gi,'');
			e.srcElement.value = newValue;
		};

		el.addEventListener('input', handler);
	});

	app.directive('my-only-letters', (el, binding, vNode) => {
		const t = binding.value;
		let maxChars = 254;

		if(t && t.maxChars){
			maxChars = t.maxChars;
		}

		let element = null;

		if (el.getElementsByTagName('INPUT')[0]) {
			element = el.getElementsByTagName('INPUT')[0];
			element.setAttribute('maxlength', maxChars);
		}

		let handler = function(e) {
			let string = e.target.value;
			let value = string ? string: '';
			let newValue = value.replace(/[^a-zA-Z\-_ ?¿]/gi,'');
			e.srcElement.value = newValue;
		};

		el.addEventListener('input', handler);
	});

	app.directive('my-only-numbers', (el, binding, vNode) => {
		const t = binding.value;
		let maxChars = 5;

		if(t && t.maxChars){
			maxChars = t.maxChars;
		}

		let element = null;

		if (el.getElementsByTagName('INPUT')[0]) {
			element = el.getElementsByTagName('INPUT')[0];
			element.setAttribute('maxlength', maxChars);
		}

		let handler = function(e) {
			let string = e.target.value;
			let value = string ? string: '';
			let newValue = value.replace(/[^0-9]/gi,'');
			e.srcElement.value = newValue;
		};

		el.addEventListener('input', handler);
	});
})

