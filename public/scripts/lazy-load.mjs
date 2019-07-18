/**
 * Instantiates an IntersectionObserver if available to detect the
 * *imageElement* entering the viewport to eventually load it.
 * @param {HTMLImageElement} imageElement node object of <img>
 */
export function loadLazy(imageElement) {

    if ('IntersectionObserver' in window) {

        const imageObserver = new IntersectionObserver(([element]) => {
            const { target: image } = element;
            if (element.isIntersecting) {
                image.src = image.dataset.src;
                imageObserver.unobserve(image);
            }
        });
        imageObserver.observe(imageElement);
    
    } else {
      
        function lazyloadFallback () {
            const scrollTop = window.pageYOffset;
            if (imageElement.offsetTop < (window.innerHeight + scrollTop)) {
                imageElement.src = imageElement.dataset.src;
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
