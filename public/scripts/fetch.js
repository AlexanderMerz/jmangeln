window.addEventListener('load', async () => {
    const playlist = document.querySelector('.playlist');
    const player = document.querySelector('.video-player iframe');

    if (!sessionStorage.getItem('youtube')) {
        try {
            const response = await fetch('/api/youtube');
            const json = await response.json();
            if ('error' in json) return;
            sessionStorage.setItem('youtube', JSON.stringify(json));
        } catch(error) {
            console.error(error);
        }
    }

    const { items } = JSON.parse(sessionStorage.getItem('youtube'));
    player.src += items[0].id.videoId;
    for (let item of items) {
        const playlistItem = document.createElement('playlist-item');
        playlistItem.data = item;
        playlist.appendChild(playlistItem);
    }
});