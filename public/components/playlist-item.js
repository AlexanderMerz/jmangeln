import { loadLazy } from '../scripts/lazy-load.mjs';

class PlaylistItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    set data(data) {
        const { videoId } = data.id;
        const { title, publishedAt } = data.snippet;
        const date = new Date(publishedAt).toLocaleDateString();
        const imageHref = data.snippet.thumbnails.medium.url;

        this.shadowRoot.innerHTML = `
            <style>@import "../styles/playlist-item.css"</style>
            <div class="video" data-video-id="${videoId}">
                <div class="info">
                    <h3 class="info__title">${title}</h3>
                    <p class="info__date">${date}</p>
                </div>
                <img
                    class="video__image"
                    data-src="${imageHref}"
                    alt="playlist-thumbnail"
                >
            </div>
        `;
    }
    connectedCallback() {
        loadLazy(this.shadowRoot.querySelector('img'));
    }
}
customElements.define('playlist-item', PlaylistItem);