'use strict';
require('es6-promise');
const {fetchEntries, EntryListRenderer} = require('./load-feed-entries');

const onLoad = () => {
  const feedURL = 'http://yuheiy.hatenablog.com/rss';
  const showEntriesCount = 5;
  const list = document.getElementById('blog-list');
  const renderer = new EntryListRenderer(list);

  fetchEntries(feedURL, showEntriesCount)
    .then(renderer.render.bind(renderer))
    .catch(err => console.error(err.message));
};

google.load('feeds', '1');
google.setOnLoadCallback(onLoad);