import InfoCard from "../components/info-card.mjs";
import { lazyLoad } from '../scripts/lazy-load.mjs';

class ProductCard extends InfoCard {

    quantity = 0;

    constructor() {
        super();

        const style = document.createElement('style');
        style.textContent = '@import "../styles/product-card.css"';
        this.shadowRoot.append(style);
        
        // Create new elements
        const action = document.createElement('div');
        const quantity = document.createElement('div');
        const button = document.createElement('button');
        const input = document.createElement('input');
        
        // Select existing elements
        const card = this.shadowRoot.querySelector('.card');
        const h1 = this.shadowRoot.querySelector('h1');
        
        h1.appendChild(document.createElement('span'));
        h1.appendChild(document.createElement('span'));

        quantity.classList.add('quantity');
        action.classList.add('action');
        button.classList.add('btn');

        button.innerText = 'In den Einkaufswagen';
        button.style.width = '50%';
        input.type = 'number';
        input.value = 1;
        input.min = 1;
        input.max = 99;
        
        // Append to Shadow DOM
        quantity.appendChild(input);
        action.appendChild(quantity);
        action.appendChild(button);
        card.appendChild(action);
    }
    
    connectedCallback() {
        const spans = this.shadowRoot.querySelectorAll('span');
        const image = this.shadowRoot.querySelector('img');
        spans[0].innerText = this.getAttribute('name');
        spans[1].innerText = Number(this.getAttribute('price')).toFixed(2) + ' €';
        image.dataset.src = this.getAttribute('image');
        lazyLoad('.lazy', this.shadowRoot);
        this.shadowRoot.querySelector('slot').addEventListener('slotchange', function () {
            this.assignedNodes()[0].style.cssText = `
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
            `;
            Array.from(this.assignedNodes()[0].children).forEach(li => {
                li.style.cssText = `
                    font-size: 13px;
                    border: none;
                    box-shadow: 0 0 2px;
                    outline: none;
                    background-color: white;
                    color: black;
                    padding: 10px;
                    text-align: center;
                `;
            });
        });
    }

}

customElements.define('product-card', ProductCard);
