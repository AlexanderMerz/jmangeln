const cart = document.querySelector('.cart');
cart.addEventListener('touchmove', function() {
    this.style.right = '0';
});
cart.addEventListener('touchstart', function() {
    this.style.right = '0';
});
cart.addEventListener('touchend', function() {
    this.style.right = '-220px';
});