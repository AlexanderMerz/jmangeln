class PlaylistItem extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }
    set data(data) {
        const { videoId } = data.id;
        const { title, publishedAt } = data.snippet;
        const date = new Date(publishedAt).toLocaleDateString();
        const imageHref = data.snippet.thumbnails.medium.url;

        this.root.innerHTML = `
            <style>@import "../styles/playlist-item.css"</style>
            <div class="video" data-video-id="${videoId}">
                <div class="info">
                    <h3 class="info__title">${title}</h3>
                    <p class="info__date">${date}</p>
                </div>
                <img class="video__image" src="${imageHref}">
            </div>
        `;
    }
}
customElements.define('playlist-item', PlaylistItem);