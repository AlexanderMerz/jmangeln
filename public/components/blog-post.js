class BlogPost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    set content(data) {
        const { title, content, image } = data;
        const date = new Date(data.date).toLocaleDateString();

        this.shadowRoot.innerHTML = `
            <style>@import "../styles/blog-post.css"</style>
            <div class="post">
                <h1>${title} vom ${date}</h1>
                <p>${content}</p>
                <img class="video__image" src="${image}">
            </div>
        `;
    }
}
customElements.define('blog-post', BlogPost);