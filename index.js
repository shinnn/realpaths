/*!
 * realpaths | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/realpaths
*/
'use strict';

const reapathsCallback = require('realpaths-callback');

module.exports = function realpaths(paths, cache) {
  return new Promise(function executor(resolve, reject) {
    reapathsCallback(paths, cache, function callback(err, results) {
      if (err) {
        reject(err);
        return;
      }

      resolve(results);
    });
  });
};
