import InfoCard from "../components/info-card.mjs";
import { lazyLoad } from '../scripts/lazy-load.mjs';

class ProductCard extends InfoCard {

    constructor() {
        super();
        
        // Create new elements
        const button = document.createElement('button');

        // Select existing elements
        const content = this.shadowRoot.querySelector('.card__content');
        const h1 = this.shadowRoot.querySelector('h1');
        const p = this.shadowRoot.querySelector('p');
        
        h1.appendChild(document.createElement('span'));
        h1.appendChild(document.createElement('span'));
        
        // Assign styling and properties
        [h1, p].forEach(element => element.style.cssText = `
            width: 50%;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `);
        content.style.cssText += 'display:flex';
        button.classList.add('btn');
        button.innerText = 'In den Einkaufswagen';

        // Append to Shadow DOM
        this.shadowRoot.querySelector('.card').appendChild(button);
    }
    
    connectedCallback() {
        const spans = this.shadowRoot.querySelectorAll('span');
        const image = this.shadowRoot.querySelector('img');
        spans[0].innerText = this.getAttribute('name');
        spans[1].innerText = Number(this.getAttribute('price')).toFixed(2) + ' €';
        image.dataset.src = this.getAttribute('image');
        lazyLoad('.lazy', this.shadowRoot);
        this.shadowRoot.querySelector('slot').addEventListener('slotchange', function () {
            // console.log(this.assignedNodes());
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
