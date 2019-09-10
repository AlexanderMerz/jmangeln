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
            const list = this.assignedNodes()[1];
            list.style.cssText = `
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
            `;
            Array.from(list.children).forEach(li => {
                li.style.cssText = `
                    font-size: 13px;
                    border: none;
                    box-shadow: 0 0 1px;
                    outline: none;
                    background-color: white;
                    color: black;
                    padding: 10px;
                    text-align: center;
                    cursor: pointer;
                `;
                li.addEventListener('click', function() {
                    Array.from(list.children).filter(li => this !== li)
                        .forEach(li => li.style.backgroundColor = 'white');
                    this.style.backgroundColor = 'lightgray';
                    productCard.dataset.meta = this.innerText;
                });
            });
        });
    }

}

customElements.define('product-card', ProductCard);
