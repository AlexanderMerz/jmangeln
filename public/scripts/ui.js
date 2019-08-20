const logo = document.querySelector('.navbar__brand img');
const navigation = document.querySelector('.navbar__navigation');
const ul = document.querySelector('.navbar__navigation ul');
const menuIcon = document.querySelector('.menu-icon');

// document.addEventListener('touchmove', event => event.preventDefault());

logo.addEventListener('click', () => window.location = '/');

menuIcon.addEventListener('click', function() {
    this.classList.toggle('change');
    if (this.classList.contains('change')) {
        navigation.style.setProperty('width', '100%');
        Array.from(ul.children).forEach(li => li.style.opacity =  1);
    } else {
        navigation.style.setProperty('width', '0');
        Array.from(ul.children).forEach(li => li.style.opacity =  0);
    }
});