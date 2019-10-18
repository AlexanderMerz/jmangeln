class CartBar extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <div class="cart">
                <img src="../images/cart.svg" alt="Shopping Cart">
                <span class="qty"></span>
                <a href="/cart">Zum <span>Warenkorb</span></a>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = '@import "../styles/cart-bar.css"';

        this.attachShadow({ mode: 'open' })
            .append(template.content.cloneNode(true), style);
    }

    connectedCallback() {
        this.shadowRoot.ownerDocument.addEventListener('touchstart', function(){}, true);
        this.shadowRoot.querySelector('.qty').textContent = this.getAttribute('qty') || 0;
    }
}
customElements.define('cart-bar', CartBar);
