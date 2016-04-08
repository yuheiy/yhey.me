'use strict';

const delayLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]:not([src])');

  Array.from(images).forEach(image => {
    const preloader = new Image();
    const {src} = image.dataset;

    image.style.opacity = 0;
    preloader.addEventListener('load', () => {
      image.src = src;
      image.style.transition = 'opacity .8s';
      image.style.opacity = '';
    });
    preloader.src = src;
  });
};

module.exports = delayLoadImages;
