'use strict';
import 'es6-promise';
import 'babel-polyfill';
import loadingComplete from './loadingComplete';
import fixFlexBox from './fixFlexBox';
import createFuture from './createFuture';
import showCotents from './showContents';

const init = () => {
  loadingComplete();
  fixFlexBox();
  createFuture();
  showCotents();
};

window.addEventListener('load', init);
