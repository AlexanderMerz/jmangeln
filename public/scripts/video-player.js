async function onYouTubeIframeAPIReady () {
    const playlist = document.querySelector('.playlist');
    const response = await fetch('/api/youtube');
    const json = await response.json();
    for (const item of Array.from(json.items)) {
        playlist.innerHTML += `
            <div class="video" data-id="${item.id.videoId}">
                <div class="info">
                    <h3 class="info__title">${item.snippet.title}</h3>
                    <p class="info__date">${
                        new Date(item.snippet.publishedAt).toLocaleDateString()
                    }</p>
                </div>
                <img
                    class="lazy video__image"
                    data-src="${item.snippet.thumbnails.medium.url}"
                    alt="playlist-thumbnail"
                >
            </div>
        `;
    }
    for (const video of Array.from(playlist.children)) {
        const { id: videoID } = video.dataset;
        video.addEventListener('click', function() {
            window.player.loadVideoById(videoID);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    }
    lazyLoad('.lazy');
    window.player = new YT.Player('player', {
        videoId: json.items[0].id.videoId || 'YnjdFKQAZhw',
        events: { 'onReady': onPlayerReady }
    });
}

function onPlayerReady (event) {
    event.target.playVideo();
}

function stopVideo () {
    window.player.stopVideo();
}
