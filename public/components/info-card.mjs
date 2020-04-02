import { lazyLoad } from '../scripts/lazy-load.mjs';

export default class InfoCard extends HTMLElement {
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

    navigate() {
        const href = this.getAttribute('href');
        const disabled = this.getAttribute('disabled');
        if (href && !disabled) {
            window.location = href;
        }
    }

    connectedCallback() {
        const title = this.shadowRoot.querySelector('h1');
        const image = this.shadowRoot.querySelector('img');
        this.addEventListener('click', this.navigate);
        this.getAttribute('title')
            ? title.innerText = this.getAttribute('title')
            : title.style.display = 'none';
        image.style.height = this.getAttribute('image-height') || '220px';
        image.dataset.src = this.getAttribute('image');
        lazyLoad('.lazy', this.shadowRoot);
    }
}
customElements.define('info-card', InfoCard);
