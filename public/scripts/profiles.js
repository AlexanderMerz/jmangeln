const profiles = Array.from(document.querySelectorAll('.profile'));

for (const profile of profiles) {

    for (const section of profile.children) {
        section.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                this.classList.add('active');
                Array.from(profile.children).filter(children => children !== this)
                    .forEach(children => children.classList.remove('active'));
            }
        });
    }

    const images = Array.from(profile.querySelectorAll('.images img'));
    let currentImageIndex = images.findIndex(image => image.classList.contains('show')) || 0;
    const arrows = Array.from(profile.querySelectorAll('.arrow'));
    arrows[0].style.setProperty('display', 'none');

    for (const arrow of arrows) {
        arrow.addEventListener('click', function() {
            if (this.classList.contains('arrow__left')) {
                if (currentImageIndex > 0) {
                    images[currentImageIndex].classList.remove('show');
                    images[currentImageIndex - 1].classList.add('show');
                    currentImageIndex--;
                }
            }
            if (this.classList.contains('arrow__right')) {
                if (currentImageIndex < images.length - 1) {
                    images[currentImageIndex].classList.remove('show');
                    images[currentImageIndex + 1].classList.add('show');
                    currentImageIndex++;
                }
            }
            arrows[0].style.setProperty('display', currentImageIndex === 0 ? 'none' : 'block');
            arrows[1].style.setProperty('display', currentImageIndex === (images.length - 1) ? 'none' : 'block');
        });
    }

}
