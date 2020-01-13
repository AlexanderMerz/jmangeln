const products = Array.from(document.querySelectorAll('.product'));
const filterSection = document.querySelector('.filter');
const starContainer = document.querySelector('.filter__rate');
const searchbar = document.querySelector('#search');
const priceFilter = document.querySelector('#price');
const priceOutput = document.querySelector('.price__output');
const categories = Array.from(document.querySelectorAll('.categories h3'));

let searchTerm = '';
let maxPrice = 99;
let selected = false;

// Helper Functions

function toLowerCase(...args) {
	if (!args.every(arg => typeof arg))
		throw Error('Argument(s) not of type string');
	return args.map(arg => arg.toLowerCase());
}

function setVisibility(element, condition) {
	if (!(element instanceof HTMLElement))
		throw Error('First argument is no HTMLElement');
	if (typeof condition != 'boolean')
		throw Error('Second argument is not of type boolean');
	element.style.display = condition ? 'block' : 'none';
}

// Filter Function

function filter() {
    for (const product of products) {
        let { name, price, category } = product.dataset;
        let selectedCategory = document.querySelector('.categories h3.active')
            ? document.querySelector('.categories h3.active').textContent
            : '';
        [price, maxPrice] = [price, maxPrice].map(value => parseFloat(value));
		[name, searchTerm, category, selectedCategory] =
			toLowerCase(name, searchTerm, category, selectedCategory);
        if (selectedCategory === '' || selectedCategory === 'alle') {
			setVisibility(product, (
				name.includes(searchTerm) && 
				price <= maxPrice
			));
        } else {
			setVisibility(product, (
				name.includes(searchTerm) && 
				price <= maxPrice && 
				category === selectedCategory
			));
        }
    }
}

// Event Listeners

searchbar.addEventListener('keyup', function() {
    searchTerm = this.value;
    filter();
});

priceFilter.addEventListener('input', function(e) {
    maxPrice = this.value;
    priceOutput.textContent = `max. ${maxPrice} €`;
    filter();
});

categories.forEach(category =>
    category.addEventListener('click', function() {
        const thisCategory = this;
        thisCategory.classList.add('active');
        categories
            .filter(category => category != thisCategory)
            .forEach(category => category.classList.remove('active'));
        filter();
    })
);
