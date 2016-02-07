'use strict';
import 'babel-polyfill';
import fixFlexbox from './fixFlexBox';
import createFuture from './createFuture';
import loadFont from './loadFont';

const init = () => {
  fixFlexbox();
  createFuture();
  loadFont();
};

window.addEventListener('load', init);
