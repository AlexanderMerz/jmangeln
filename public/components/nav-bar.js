class Navbar extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <header class="navbar">
                <picture class="navbar__brand">
                    <img src="/images/brand_small.jpg" alt="J&M Angeln Brand">
                </picture>
                <nav class="navbar__navigation">
                    <ul>
                        <li><a href="/team">Team</a></li>
                        <li><a href="/videos">Videos</a></li>
                        <li><a href="/merch">Merch</a></li>
                        <li><a href="/blog">Blog</a></li>
                    </ul>
                </nav>
                <div class="menu-icon">
                    <div class="bar bar1"></div>
                    <div class="bar bar2"></div>
                    <div class="bar bar3"></div>
                </div>
            </header>
        `;

        const style = document.createElement('style');
        style.textContent = '@import "/styles/navbar.css"';

        this.attachShadow({ mode: 'open' }).append(
            template.content.cloneNode(true),
            style
        );
    }

    connectedCallback() {
        const navbar = this.shadowRoot.querySelector('header');
        const brand = navbar.querySelector('.navbar__brand');
        const navigation = navbar.querySelector('nav');
        const ul = navigation.querySelector('ul');
        const menuIcon = navbar.querySelector('.menu-icon');

        function setActiveState() {
            let path = this.ownerDocument.location.pathname.split('/')[1];
            for (const li of ul.children) {
                if (li.firstElementChild instanceof HTMLAnchorElement) {
                    const href = li.firstElementChild.href;
                    if (path.length > 0 && href.includes(path)) {
                        li.firstElementChild.classList.add('active');
                    }
                }
            }
        }
        setActiveState.apply(this);

        brand.addEventListener('click', function() {
            window.location = '/';
        });

        menuIcon.addEventListener('click', function() {
            this.classList.toggle('change');
            navigation.style.height = this.classList.contains('change') ? '100%' : '0';
        });
    }
}
customElements.define('nav-bar', Navbar);
