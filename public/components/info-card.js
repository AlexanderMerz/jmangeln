import { lazyLoad } from '../scripts/lazy-load.mjs';

class InfoCard extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <div class="card">
                <img alt="info-card image">
                <div class="content">
                    <h1></h1>
                    <p><slot></slot></p>
                    <button>Mehr</button>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = '@import "../styles/info-card.css"';

        this.attachShadow({ mode: 'open' })
            .append(template.content.cloneNode(true), style);
    }

    connectedCallback() {
        const href = this.getAttribute('href');
        const title = this.shadowRoot.querySelector('h1');
        const image = this.shadowRoot.querySelector('img');
        const button = this.shadowRoot.querySelector('button');
        title.innerText = this.getAttribute('title');
        image.dataset.src = this.getAttribute('image');
        if (window.innerWidth > 400) {
            this.shadowRoot.addEventListener('click', () => {
                if (href) window.location = href;
            });
        }
        button.addEventListener('click', () => {
            if (href) window.location = href;
        });
        lazyLoad(image);
    }
}
customElements.define('info-card', InfoCard);