'use strict';

export default function () {
  const links = document.querySelectorAll('link[class="js-load-css"]');

  for (const link of links) {
    link.rel = 'stylesheet';
  }
}
