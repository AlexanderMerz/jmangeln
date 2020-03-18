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
}
