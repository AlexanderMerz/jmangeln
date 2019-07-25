const btn = document.querySelector('.pwa-btn');
let deferredPrompt;

btn.addEventListener('click', event => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
        if (choice.outcome === 'accepted') {
            console.log('Accepted');
        }
        btn.style.display = 'none';
        deferredPrompt = null;
    });
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('Registered ', res))
        .catch(error => console.log(error));
}

window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    btn.style.display = 'block';
});

window.addEventListener('appinstalled', event => {
    console.log('App has been installed');
})
