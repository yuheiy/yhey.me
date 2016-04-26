'use strict';

const delayLoadImage = (image, index = 0) => {
  const interval = 500;
  const {src} = image.dataset;
  let timeout = null;
  let isCalled = false;
  const loadImage = () => {
    if (isCalled) {
      return;
    }

    image.src = src;
    image.style.transition = 'opacity .8s ease';
    image.style.opacity = '';

    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    isCalled = true;
  };
  const preloader = new Image();

  image.style.opacity = 0;
  preloader.addEventListener('load', loadImage);
  preloader.src = src;
  timeout = setTimeout(loadImage, interval * (index + 1));
};

const delayLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  Array.from(images).forEach(delayLoadImage);
};

module.exports = delayLoadImages;
