'use strict';

const className = 'transparent';

const showContent = el => {
  el.classList.remove(className);
};

const wait = delay => new Promise(done => setTimeout(done, delay));

export default function () {
  const transparents = document.querySelectorAll('.transparent');
  const {transitionDuration} = getComputedStyle(transparents[0]);
  const delay = parseFloat(transitionDuration) * 1000;

  [...transparents].forEach(async (el, i) => {
    await wait(i * delay);
    showContent(el);
  });
}
