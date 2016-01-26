'use strict';
import 'babel-polyfill';
import loadingComplete from './loadingComplete';
import fixFlexbox from './fixFlexBox';
import createFuture from './createFuture';
import showCotents from './showContents';

const init = () => {
  loadingComplete();
  fixFlexbox();
  createFuture();
  showCotents();
};

window.addEventListener('load', init);
