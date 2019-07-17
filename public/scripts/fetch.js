window.addEventListener('load', async () => {
    if (!sessionStorage.getItem('youtube')) {
        const response = await fetch('/api/youtube')
        const json = await response.json();
        sessionStorage.setItem('youtube', JSON.stringify(json));
        alert('Fetch hat funktioniert');
    }
    const { items } = JSON.parse(sessionStorage.getItem('youtube'));
    const playlist = document.querySelector('.playlist');
    const player = document.querySelector('.video-player iframe');
    player.src += items[0].id.videoId;
    for (let item of items) {
        const playerItem = document.createElement('player-item');
        playerItem.data = item;
        playlist.appendChild(playerItem);
    }
});