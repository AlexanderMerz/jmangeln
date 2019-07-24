/**
 * Instantiates an **IntersectionObserver** if available to detect the
 * **imageElement** entering the viewport to eventually lazy load it.
 * The element therefore needs to reference the source via the **data-src** attribute.
 * @param {HTMLImageElement} imageElement node object of <img>
 */
export function lazyLoad(imageElement) {

    if ('IntersectionObserver' in window) {

        new IntersectionObserver(function ([element]) {
            const { target: image } = element;
            if (element.isIntersecting) {
                image.src = image.dataset.src;
                this.unobserve(image);
            }
        }).observe(imageElement);
    
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
