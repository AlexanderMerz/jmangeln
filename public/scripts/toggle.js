const navigation = document.querySelector('.navbar__navigation');
const menuIcon = document.querySelector('.menu-icon');
const listItems = document.querySelectorAll('.navbar__navigation ul li');

menuIcon.addEventListener('click', function() {
    this.classList.toggle('change');
    if (this.classList.contains('change')) {
        navigation.style.setProperty('width', '100%');
        listItems.forEach(li => li.style.setProperty('opacity', 1));
    } else {
        navigation.style.setProperty('width', '0');
        listItems.forEach(li => li.style.setProperty('opacity', 0));
    }
});