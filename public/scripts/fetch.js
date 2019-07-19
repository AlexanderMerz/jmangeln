window.addEventListener('load', async () => {

    switch(this.location.pathname) {

        case '/videos': {
            const playlist = document.querySelector('.playlist');
            const player = document.querySelector('.video-player iframe');
            if (!sessionStorage.getItem('youtube')) {
                try {
                    const response = await fetch('/api/youtube');
                    const json = await response.json();
                    if (json.status === 423) {
                        player.src += 'YnjdFKQAZhw';
                        return;
                    }
                    sessionStorage.setItem('youtube', JSON.stringify(json));
                } catch(error) {
                    console.error(error);
                }
            }
            const { data } = JSON.parse(sessionStorage.getItem('youtube'));
            player.src += data.items[0].id.videoId;
            for (let item of data.items) {
                const playlistItem = document.createElement('playlist-item');
                playlistItem.data = item;
                playlist.appendChild(playlistItem);
            }
            break;
        }

        case '/blog': {
            const blogSection = document.querySelector('.blog');
            if (!sessionStorage.getItem('posts')) {
                const response = await fetch('/api/blogs');
                const json = await response.json();
                sessionStorage.setItem('posts', JSON.stringify(json));
            }
            const posts = JSON.parse(sessionStorage.getItem('posts'));
            for (let post of posts) {
                const blogPost = document.createElement('blog-post');
                blogPost.content = post;
                blogSection.appendChild(blogPost);
            }
            break;
        }

        default: return;
        
    }

});