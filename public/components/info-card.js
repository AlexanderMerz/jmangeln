class InfoCard extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .card {
                    background-color: white;
                    box-shadow: 0 0 7px black;
                    width: fit-content;
                    min-width: 320px;
                    max-width: 500px;
                    position: relative;
                    border-radius: 6px;
                    transition: 0.2s;
                    text-overflow: clip;
                }
                .content h1 {
                    text-align: center;
                    padding: 0.5rem 0;
                    margin: 0;
                }
                .content p {
                    font-size: 14px;
                    padding: 1rem 2rem 2rem;
                    margin: 0;
                    text-align: justify;
                }
                img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 6px 6px 0 0;
                    border: none;
                    outline: none;
                }
                @media (max-width: 525px) {
                    .content p {
                        font-size: 12px;
                    }
                }
            </style>
            <div class="card">
                <img>
                <div class="content">
                    <h1></h1>
                    <p><slot></slot></p>
                </div>
            </div>
        `;
        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('h1').innerText = this.getAttribute('title');
        this.shadowRoot.querySelector('img').src = this.getAttribute('image');
    }
}
customElements.define('info-card', InfoCard);