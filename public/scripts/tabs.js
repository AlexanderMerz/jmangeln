const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(function(tab, index) {
    tab.addEventListener('click', function() {
        toggleTabs(index);
    });
});

function toggleTabs(index) {
    tabs[index].classList.add('open');
    tabContents[index].classList.add('show');
    if (Boolean(index % 2)) {
        tabs[index - 1].classList.remove('open');
        tabContents[index - 1].classList.remove('show');
    } else {
        tabs[index + 1].classList.remove('open');
        tabContents[index + 1].classList.remove('show');
    }
}
