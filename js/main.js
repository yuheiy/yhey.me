'use strict';
import 'babel-polyfill';
import fixFlexbox from './fixFlexBox';
import createFuture from './createFuture';

const init = () => {
  fixFlexbox();
  createFuture();
};

window.addEventListener('load', init);
