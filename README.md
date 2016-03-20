# realpaths

[![NPM version](https://img.shields.io/npm/v/realpaths.svg)](https://www.npmjs.com/package/realpaths)
[![Build Status](https://travis-ci.org/shinnn/realpaths.svg?branch=master)](https://travis-ci.org/shinnn/realpaths)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/realpaths.svg)](https://coveralls.io/github/shinnn/realpaths)
[![Dependency Status](https://david-dm.org/shinnn/realpaths.svg)](https://david-dm.org/shinnn/realpaths)
[![devDependency Status](https://david-dm.org/shinnn/realpaths/dev-status.svg)](https://david-dm.org/shinnn/realpaths#info=devDependencies)

Like [fs.realpath][realpath], but resolves multiple paths at once

```javascript
const realpaths = require('realpaths');

// symlink1 <<===>> /path/to/foo.txt
// symlink2 <<===>> /path/to/bar.txt

realpaths(['symlink1', 'symlink2']).then(paths => {
  paths; //=> ['/path/to/foo.txt', '/path/to/bar.txt']
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install realpaths
```

## API

```javascript
const realpaths = require('realpaths');
```

### realpaths(*paths* [, *cache*])

*paths*: `Array` of strings (file paths)  
*options*: `Object` (used as [`fs.realpath`](https://github.com/nodejs/node/blob/c339fa36f5493c2bd2e108463910122ef82843c4/lib/fs.js#L1568-L1570) cache)  
Return: [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) instance

It runs [`fs.realpath`][realpath] for each path and returns a `Promise` instance.

When it finishes resolving all paths, it will be [fulfilled](https://promisesaplus.com/#point-26) with an array of resolved paths.

When it fails to resolve at least one of the paths, it will be [rejected](https://promisesaplus.com/#point-30).

```javascript
'use strict';

const path = require('path');
const realpaths = require('realpaths-callback');

realpaths(['symlink1', 'symlink2'], {
  cache: {
    [path.resolve('symlink1')]: '/path/to/foo.txt',
    [path.resolve('symlink2')]: '/path/to/bar.txt'
  }
}).then(paths => {
  paths; //=> ['/path/to/foo.txt', '/path/to/bar.txt']
});
```

## Related projects

* [realpaths-callback](https://github.com/shinnn/realpaths-callback) ([Callback](http://thenodeway.io/posts/understanding-error-first-callbacks/)-style version)

## License

Copyright (c) 2015 - 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).

[realpath]: https://nodejs.org/api/fs.html#fs_fs_realpath_path_cache_callback
