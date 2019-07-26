const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
const isStandalone = (window.navigator.standalone) &&
    (window.matchMedia('(display-mode: standalone)').matches);
const customPrompt = document.querySelector('.pwa-btn');
let deferredPrompt;

if (isIos && !isStandalone) {
    window.addEventListener('beforeinstallprompt', event => {
        alert('PROMPT');
        event.preventDefault();
        deferredPrompt = event;
        customPrompt.style.display = 'block';
    });
    customPrompt.addEventListener('click', event => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choice => {
            if (choice.outcome === 'accepted') {
                customPrompt.style.display = 'none';
                deferredPrompt = null;
            }
        })
    });
}
