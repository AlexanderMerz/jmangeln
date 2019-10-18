class CartBar extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <div class="cart">
                <img src="../images/cart.svg" alt="Shopping Cart">
                <span class="qty">0</span>
                <a href="/cart">Zum Warenkorb</a>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = '@import "../styles/cart-bar.css"';

        this.attachShadow({ mode: 'open' })
            .append(template.content.cloneNode(true), style);
    }

    connectedCallback() {
    }
}
customElements.define('cart-bar', CartBar);
