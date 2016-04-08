'use strict';
const moment = require('moment');
const template = require('./templates/blog-list.jade');

const fetchEntries = (url, count) => {
  return new Promise((done, fail) => {
    const feed = new google.feeds.Feed(url);

    feed.setNumEntries(count);
    feed.load(result => {
      if (!result.error) {
        done(result.feed.entries);
      } else {
        fail(result.error);
      }
    });
  });
};

class EntryListRenderer {
  constructor(container) {
    this._container = container;
    this._template = template;
  }

  _processEntries(entries) {
    return entries.map(({title, contentSnippet, publishedDate, link}) => {
      const content = contentSnippet.replace(/\n/g, '').substr(0, 80);
      const date = moment(Date.parse(publishedDate));
      const published = date.format('ll');
      const dateTime = date.format();

      return {
        title,
        content,
        published,
        dateTime,
        href: link
      };
    });
  }

  render(entries) {
    const data = {entries: this._processEntries(entries)};
    const htmlString = this._template(data);

    this._container.outerHTML = htmlString;
  }
}

module.exports = {
  fetchEntries,
  EntryListRenderer
};
