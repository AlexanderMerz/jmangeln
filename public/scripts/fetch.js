window.addEventListener('load', async () => {

    switch (this.location.pathname) {

        case '/merch': {
            const categorySection = document.querySelector('.categories');
            const response = await fetch('/api/categories');
            const categories = await response.json();
            for (const category of categories) {
                const categoryCard = document.createElement('a');
                const categoryText = document.createElement('div');
                categoryCard.classList.add('category');
                categoryText.classList.add('category__text');
                categoryCard.href = '/merch' + category.href;
                categoryText.innerText = category.name;
                categorySection.appendChild(categoryCard);
                categoryCard.appendChild(categoryText);
            }
        }

        case '/blog': {
            const blogSection = document.querySelector('.blog');
            const response = await fetch('/api/blogs');
            const posts = await response.json();
            for (const post of posts) {
                const blogPost = document.createElement('blog-post');
                blogPost.content = post;
                blogSection.appendChild(blogPost);
            }
            break;
        }

        default: 
        
    }

});
