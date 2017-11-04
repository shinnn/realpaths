'use strict';

const reapathsCallback = require('realpaths-callback');

module.exports = function realpaths(paths, cache) {
  return new Promise((resolve, reject) => {
    reapathsCallback(paths, cache, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(results);
    });
  });
};
