'use strict';
import debounce from 'lodash.debounce';

const isIE11 = document.documentMode === 11;

const fixHeight = debounce((container, parentStyle) => {
  const {offsetHeight} = container;
  const {marginTop, marginBottom} = getComputedStyle(container);
  const height = offsetHeight +
    parseInt(marginTop, 10) + parseInt(marginBottom, 10);

  parentStyle.height = `${height}px`;
}, 100);

export default function () {
  if (isIE11) {
    const container = document.querySelector('.container');
    const pageStyle = document.querySelector('.page').style;
    const fn = fixHeight.bind(null, container, pageStyle);

    fn();

    window.addEventListener('resize', fn);
  }
}
