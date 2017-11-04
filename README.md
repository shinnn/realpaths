# realpaths

[![npm version](https://img.shields.io/npm/v/realpaths.svg)](https://www.npmjs.com/package/realpaths)
[![Build Status](https://travis-ci.org/shinnn/realpaths.svg?branch=master)](https://travis-ci.org/shinnn/realpaths)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/realpaths.svg)](https://coveralls.io/github/shinnn/realpaths)

Like [fs.realpath][realpath], but resolves multiple paths at once

```javascript
const realpaths = require('realpaths');

// symlink1 <<===>> /path/to/foo.txt
// symlink2 <<===>> /path/to/bar.txt

(async () => {
  await realpaths(['symlink1', 'symlink2']) //=> ['/path/to/foo.txt', '/path/to/bar.txt']
})();
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install realpaths
```

## API

```javascript
const realpaths = require('realpaths');
```

### realpaths(*paths* [, *cache*])

*paths*: `Array<string>` (file paths)  
*options*: `Object` (used as [`fs.realpath`](https://github.com/nodejs/node/blob/c339fa36f5493c2bd2e108463910122ef82843c4/lib/fs.js#L1568-L1570) cache)  
Return: `Promise<Array<string>>`

It runs [`fs.realpath`][realpath] for each path and returns a `Promise` instance.

When it finishes resolving all paths, it will be [fulfilled](https://promisesaplus.com/#point-26) with an array of resolved paths.

```javascript
const {resolve} = require('path');
const realpaths = require('realpaths-callback');

realpaths(['symlink1', 'symlink2'], {
  cache: {
    [resolve('symlink1')]: '/path/to/foo.txt',
    [resolve('symlink2')]: '/path/to/bar.txt'
  }
}).then(paths => {
  paths; //=> ['/path/to/foo.txt', '/path/to/bar.txt']
});
```

## Related projects

* [realpaths-callback](https://github.com/shinnn/realpaths-callback) – [Callback](http://thenodeway.io/posts/understanding-error-first-callbacks/)-style version

## License

[ISC License](./LICENSE) © 2017 Shinnosuke Watanabe

[realpath]: https://nodejs.org/api/fs.html#fs_fs_realpath_path_options_callback
