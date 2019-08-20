window.addEventListener('load', async () => {

    switch(this.location.pathname) {

        case '/videos': {
            const playlist = document.querySelector('.playlist');
            const player = document.querySelector('.video-player iframe');
            try {
                const response = await fetch('/api/youtube');
                const json = await response.json();
                player.src += json.items[0].id.videoId;
                for (let item of json.items) {
                    const playlistItem = document.createElement('playlist-item');
                    playlistItem.data = item;
                    playlist.appendChild(playlistItem);
                }
            } catch(error) {
                // Show fallback video
                player.src += 'YnjdFKQAZhw';
            }
            break;
        }

        case '/blog': {
            const blogSection = document.querySelector('.blog');
            const response = await fetch('/api/blogs');
            const posts = await response.json();
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