'use strict';

const once = fn => {
  let result;
  let isCalled = false;

  return function () {
    if (!isCalled) {
      result = fn.apply(this, arguments);
      isCalled = true;
    }
    return result;
  };
};

module.exports = once;
