const cart = document.querySelector('.cart');
this.window.addEventListener('click', function({ target }) {
    if (target !== cart && !(Array.from(cart.children).some(el => el === target))) {
        cart.blur();
    }
});