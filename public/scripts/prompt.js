const customPrompt = document.querySelector('.pwa-btn');
const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase);
let deferredPrompt;

if (isIos) {
    alert('IOS');
    window.addEventListener('beforeinstallprompt', event => {
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
