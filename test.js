'use strict';

const assert = require('assert');
const path = require('path');

const fs = require('graceful-fs');
const realpaths = require('.');
const test = require('tape');

fs.symlink(__filename, 'tmp', symlinkErr => {
  assert.ifError(symlinkErr);

  test('realpaths()', t => {
    t.plan(3);

    t.equal(realpaths.name, 'realpaths', 'should have a function name.');

    realpaths(['tmp']).then(paths => {
      t.deepEqual(paths, [__filename], 'should expand symbolic links.');
    }).catch(t.fail);

    realpaths(['foo', 'tmp', 'bar'], {[path.resolve('foo')]: '/foo'}).then(t.fail, err => {
      t.equal(err.path, path.resolve('bar'), 'should fail when it cannot resolve paths.');
    }).catch(t.fail);

    t.on('end', () => fs.unlink('tmp', unlinkErr => {
      assert.ifError(unlinkErr);
    }));
  });
});
