const navbar = document.querySelector('header');
const brand = navbar.querySelector('.navbar__brand');
const navigation = navbar.querySelector('nav');
const ul = navigation.querySelector('ul');
const menuIcon = navbar.querySelector('.menu-icon');

brand.addEventListener('click', function() {
    window.location = '/';
});

menuIcon.addEventListener('click', function() {
    this.classList.toggle('change');
    navigation.style.height = this.classList.contains('change') ? '100%' : '0';
});
