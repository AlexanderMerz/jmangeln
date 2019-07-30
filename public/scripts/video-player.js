const videoPlayer = document.querySelector('.video-player');
    videoPlayer.addEventListener('update', function(event) {
    this.childNodes[0].nextElementSibling.src
    = `https://www.youtube.com/embed/${event.detail}`;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
});
