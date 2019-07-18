import { loadLazy } from '../scripts/lazy-load.mjs';

class InfoCard extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <div class="card">
                <img>
                <div class="content">
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
        title.innerText = this.getAttribute('title');
        image.dataset.src = this.getAttribute('image');
        loadLazy(image);
        this.shadowRoot.addEventListener('click', () => {
            const href = this.getAttribute('href');
            if (href) window.location = href;
        });
    }
}
customElements.define('info-card', InfoCard);