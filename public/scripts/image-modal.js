const modal = document.getElementById('modal');
const img = document.querySelector('.image__primary');
const modalImg = document.getElementById('modalImg');
img.addEventListener('click', function() {
    modal.style.display = 'block';
    modalImg.src = this.src;
});
const close = document.getElementsByClassName('close')[0];
close.addEventListener('click', () => (modal.style.display = 'none'));
