class BlogPost extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set content (data) {
        const { id, title, image } = data;
        const date = new Date(data.date).toLocaleDateString();

        this.shadowRoot.innerHTML = `
            <style>@import "../styles/blog-post.css"</style>
            <div class="post" data-id="${id}">
                <h1 class="post__title">${title}</h1>
                <p class="post__date">vom ${date}</p>
                <img class="post__image" src="${image}">
            </div>
        `;
    }

    connectedCallback () {
        const { id } = this.shadowRoot.querySelector('.post').dataset;
        this.shadowRoot.addEventListener('click', () => {
            window.location = `/blog/post/${id}`;
        });
    }
}
customElements.define('blog-post', BlogPost);
