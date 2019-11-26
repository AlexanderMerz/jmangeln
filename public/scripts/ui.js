const navbar = document.querySelector('header');
const brand = navbar.querySelector('.navbar__brand');
const navigation = navbar.querySelector('nav');
const ul = navigation.querySelector('ul');
const menuIcon = navbar.querySelector('.menu-icon');

brand.addEventListener('click', function() {
    window.location = '/';
});

function setOpacity(value) {
    return function(element) {
        if (element instanceof HTMLElement) {
            element.style.setProperty('opacity', value);
        }
    };
}

menuIcon.addEventListener('click', function () {
    this.classList.toggle('change');
    if (this.classList.contains('change')) {
        navigation.style.setProperty('height', '100%');
        Array.from(ul.children).forEach(setOpacity(1));
    } else {
        navigation.style.setProperty('height', '0');
        Array.from(ul.children).forEach(setOpacity(0));
    }
});
