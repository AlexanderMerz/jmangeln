window.addEventListener('load', async () => {

    switch(this.location.pathname) {

        case '/merch': {
            const response = await fetch('/api/products');
            const products = await response.json();
            console.log(products);
            const wrapper = document.querySelector('.card-wrapper');
            for (let product of products) {
                const productCard = document.createElement('product-card');
                productCard.setAttribute('name', product.name);
                productCard.setAttribute('price', product.price);
                productCard.setAttribute('image', product.image);
                productCard.dataset.id = product._id;
                const meta = product.meta.map(data => `<li>${data}</li>`);
                productCard.innerHTML = product.meta.some(data => data.length > 2)
                    ? '<h3>Farbe wählen</h3>' : '<h3>Größe wählen</h3>';
                productCard.innerHTML += `<ul>${meta.join('')}</ul>`;
                wrapper.appendChild(productCard);
            }
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