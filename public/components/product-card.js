import InfoCard from "../components/info-card.mjs";
import { lazyLoad } from '../scripts/lazy-load.mjs';

class ProductCard extends InfoCard {

    constructor() {
        super();

        const style = document.createElement('style');
        style.textContent = '@import "../styles/product-card.css"';
        this.shadowRoot.append(style);
        
        // Create new elements
        const action = document.createElement('div');
        const quantity = document.createElement('div');
        const button = document.createElement('button');
        const cart = document.createElement('img');
        const input = document.createElement('input');
        const quantityNav = document.createElement('div');
        const quantityPlus = document.createElement('div');
        const quantityMinus = document.createElement('div');
        
        // Select existing elements
        const card = this.shadowRoot.querySelector('.card');
        const h1 = this.shadowRoot.querySelector('h1');
        
        h1.appendChild(document.createElement('span'));
        h1.appendChild(document.createElement('span'));

        quantity.classList.add('quantity');
        quantityNav.classList.add('quantity__nav');
        action.classList.add('action');
        button.classList.add('btn');

        cart.src = '../images/cart.svg';
        button.append(cart);
        
        quantityPlus.innerText = '+';
        quantityMinus.innerText = '-';

        input.type = 'number';
        input.value = 1;
        input.min = 1;
        input.max = 99;
        input.pattern = '[0-9]';
        input.readOnly = true;

        // Append to Shadow DOM
        quantity.appendChild(input);
        quantity.appendChild(quantityNav);
        quantityNav.appendChild(quantityPlus);
        quantityNav.appendChild(quantityMinus);
        action.appendChild(quantity);
        action.appendChild(button);
        card.appendChild(action);

        quantityPlus.addEventListener('click', () => {
            if (input.value > 0 && input.value < 99) {
                input.value++;
            }
        });
        quantityMinus.addEventListener('click', () => {
            if (input.value > 1 && input.value <= 99) {
                input.value--;
            }
        });
        button.addEventListener('click', async () => {
            let response = await fetch('/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify({
                    id: this.dataset.id,
                    quantity: input.value,
                    meta: this.dataset.meta
                })
            });
            response = await response.json();
            alert(response.message);
        });
    }
    
    connectedCallback() {
        const productCard = this;
        const spans = this.shadowRoot.querySelectorAll('span');
        const image = this.shadowRoot.querySelector('img');

        spans[0].innerText = this.getAttribute('name');
        spans[1].innerText = Number(this.getAttribute('price')).toFixed(2) + ' €';
        image.dataset.src = this.getAttribute('image');
        lazyLoad('.lazy', this.shadowRoot);

        this.shadowRoot.querySelector('slot').addEventListener('slotchange', function() {

            // Elements

            const heading = this.assignedNodes()[0];
            const wrapper = this.assignedNodes()[2];
            const select = wrapper.firstElementChild;
            const { options } = select;
            
            // Styling
            
            heading.style.cssText = `
                font-family: Verdana;
                font-size: 18px;
                font-weight: 100;
                margin: 0 0 0.25rem 0;
            `;
            wrapper.style.width = '50%';
            select.style.cssText = `
                -moz-appearance: none;
                -webkit-appearance: none;
                appearance: none;
                border: none;
                width: 100%;
                border: none;
                outline: none;
                box-shadow: 0 0 2px;
                padding: 0.5rem;
                font-family: Verdana;
                font-weight: 100;
                cursor: pointer;
                border-radius: 4px;
            `;
                
            // Logic

            productCard.dataset.meta = select.value;
            select.addEventListener('change', function() {
                productCard.dataset.meta = this.value; 
            });
        });
    }

}

customElements.define('product-card', ProductCard);
