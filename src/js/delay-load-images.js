'use strict';
const once = require('./once');

const delayLoadImage = (image, index = 0) => {
  const initialDelay = 1000;
  const interval = 500;
  const {src} = image.dataset;
  const loadImage = once(() => {
    image.src = src;
    image.style.transition = 'opacity .8s ease';
    image.style.opacity = '';
  });
  const preloader = new Image();

  image.style.opacity = 0;
  preloader.addEventListener('load', loadImage);
  preloader.src = src;
  setTimeout(loadImage, initialDelay + (interval * index));
};

const delayLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  Array.from(images).forEach(delayLoadImage);
};

module.exports = delayLoadImages;
