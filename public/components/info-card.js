import { lazyLoad } from '../scripts/lazy-load.mjs';

class InfoCard extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <div class="card">
                <img class="lazy card__image" alt="info-card image">
                <div class="card__content">
                    <h1></h1>
                    <p><slot></slot></p>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = '@import "../styles/info-card.css"';

        this.attachShadow({ mode: 'open' })
            .append(template.content.cloneNode(true), style);
    }

    connectedCallback() {
        const title = this.shadowRoot.querySelector('h1');
        const image = this.shadowRoot.querySelector('img');
        const href = this.getAttribute('href');
        this.shadowRoot.addEventListener('click', () => {
            if (href) window.location = href;
        });
        title.innerText = this.getAttribute('title');
        image.dataset.src = this.getAttribute('image');
        lazyLoad('.lazy', this.shadowRoot);
    }
}
customElements.define('info-card', InfoCard);
