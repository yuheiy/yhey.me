'use strict';
require('es6-promise');
require('./array.from-polyfill');
const {fetchEntries, EntryListRenderer} = require('./load-feed-entries');
const delayLoadImages = require('./delay-load-images');

const feedInit = () => {
  const feedURL = 'http://yuheiy.hatenablog.com/rss';
  const showEntriesCount = 5;
  const list = document.getElementById('entry-list');
  const renderer = new EntryListRenderer(list);

  fetchEntries(feedURL, showEntriesCount)
    .then(renderer.render.bind(renderer))
    .catch(err => console.error(err.message));
};

google.load('feeds', '1');
google.setOnLoadCallback(feedInit);

delayLoadImages();
