const videoPlayer = document.querySelector('.video-player');
const iframe = document.querySelector('.video-player iframe');
    videoPlayer.addEventListener('update', function(event) {
        console.log(event);
        iframe.src = `https://www.youtube.com/embed/${event.detail}`;
        setTimeout(() => {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }, 1000);
});
