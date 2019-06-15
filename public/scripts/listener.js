window.addEventListener('load', toggle);
window.addEventListener('resize', toggle);

function toggle() {
    if (this.innerWidth <= 768) {
        navigation.classList.add('side');
        menuIcon.style.setProperty('display', 'inline-block');
    } else {
        navigation.classList.remove('side');
        menuIcon.style.setProperty('display', 'none');
        listItems.forEach(li => li.style.setProperty('opacity', 1));
    }
}