/**
 * Instantiates an **IntersectionObserver**, if supported, to load 
 * **imageElement** when it appears on the screen.
 * Therefore, the element needs to reference the source via the **data-src** attribute.
 * @param {string} querySelector query selector to get images to lazy load
 * @param {ShadowRoot} shadowRoot passed in shadow root when called within web component
 */
window.lazyLoad = function (selector, shadowRoot) {

    const images = shadowRoot
        ? Array.from(shadowRoot.querySelectorAll(selector))
        : Array.from(document.querySelectorAll(selector));

    if (window.caches) {

        Promise.all(

            images.map(async img => {
                const src = img.getAttribute('data-src');
                const response = await window.caches.match(src);
                if (response) {
                    img.setAttribute('src', src);
                    img.removeAttribute('data-src');
                }

        })).then(() => {
            
            const nonCachedImages = images.filter(image => image.src === '');
            addIntersectionObservers(nonCachedImages);
            
        });

    } else addIntersectionObservers(images);

}

function addIntersectionObservers(images) {

    for (const image of images) {

        if ('IntersectionObserver' in window) {

            new IntersectionObserver(function ([element]) {
                const { target } = element;
                if (element.isIntersecting) {
                    target.src = target.dataset.src;
                    this.unobserve(image);
                    console.log('Image lazy loaded');
                }
            }).observe(image);
        
        } else {
          
            function lazyloadFallback () {
                const scrollTop = window.pageYOffset;
                if (image.offsetTop < (window.innerHeight + scrollTop)) {
                    image.src = image.dataset.src;
                    document.removeEventListener("scroll", lazyloadFallback);
                    window.removeEventListener("resize", lazyloadFallback);
                    window.removeEventListener("orientationChange", lazyloadFallback);
                }
            }
            document.addEventListener("scroll", lazyloadFallback);
            window.addEventListener("resize", lazyloadFallback);
            window.addEventListener("orientationChange", lazyloadFallback);
            
        }
    }

}
