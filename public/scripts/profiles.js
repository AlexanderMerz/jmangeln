const profiles = Array.from(document.querySelectorAll('.profile'));

for (const profile of profiles) {

    for (const section of profile.children) {
        section.addEventListener('click', function() {
            profiles
                .filter(p => !Array.from(p.children).includes(this))
                .forEach(otherProfile => {
                    otherProfile.firstElementChild.classList.add('active');
                    Array.from(otherProfile.children).slice(1, 3)
                        .forEach(children => children.classList.remove('active'));
                });
            if (!this.classList.contains('active')) {
                this.classList.add('active');
                Array.from(profile.children)
                    .filter(children => children !== this)
                    .forEach(children => children.classList.remove('active'));
            }
        });
    }

    const images = Array.from(profile.querySelectorAll('.images img'));
    images[0].classList.add('show');
    let currentImageIndex = images.findIndex(({ classList }) => classList.contains('show')) || 0;
    const arrows = Array.from(profile.querySelectorAll('.arrow'));

    if (arrows.length > 0) {
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
                const showLeftArrow =
                    currentImageIndex === 0 ? 'none' : 'block';
                const showRightArrow =
                    currentImageIndex === images.length - 1 ? 'none' : 'block';
                arrows[0].style.setProperty('display', showLeftArrow);
                arrows[1].style.setProperty('display', showRightArrow);
            });
        }
    }
}
