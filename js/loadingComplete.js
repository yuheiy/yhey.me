'use strict';

const removeElement = el => {
  el.parentNode.removeChild(el);
};

export default function () {
  const loading = document.querySelector('.loading');
  removeElement(loading);
}
