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

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true), style);
    }

    connectedCallback() {
        this.shadowRoot.querySelector('h1').innerText = this.getAttribute('title');
        this.shadowRoot.querySelector('img').src = this.getAttribute('image');
        this.shadowRoot.addEventListener('click', () => {
            const href = this.getAttribute('href');
            if (href) window.location = href;
        });
    }
}
customElements.define('info-card', InfoCard);