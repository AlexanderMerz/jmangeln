window.addEventListener('load', async () => {
    const playlist = document.querySelector('.playlist');
    const player = document.querySelector('.video-player iframe');

    if (!sessionStorage.getItem('youtube')) {
        const response = await fetch('/api/youtube')
        const json = await response.json();
        sessionStorage.setItem('youtube', JSON.stringify(json));
    }
    const { items } = JSON.parse(sessionStorage.getItem('youtube'));
    player.src += items[0].id.videoId;
    for (let item of items) {
        const video = document.createElement('player-item');
        video.data = item;
        playlist.appendChild(video);
    }
});