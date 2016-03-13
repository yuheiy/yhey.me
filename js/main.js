'use strict';
import 'babel-polyfill';
import loadCss from './loadCss';
import createFuture from './createFuture';
import fixFlexbox from './fixFlexBox';

const init = () => {
  loadCss();
  createFuture();
  fixFlexbox();
};

window.addEventListener('load', init);
