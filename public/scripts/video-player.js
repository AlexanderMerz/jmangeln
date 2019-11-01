async function onYouTubeIframeAPIReady () {
    const playlist = document.querySelector('.playlist');
    const response = await fetch('/api/youtube');
    const json = await response.json();
    for (const item of json.items) {
        const playlistItem = document.createElement('playlist-item');
        playlistItem.data = item;
        playlist.appendChild(playlistItem);
    }
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
