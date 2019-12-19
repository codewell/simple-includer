const path = require('path');
const simpleIncluder = require('../lib/dev');

const includePath = path.resolve(__dirname, './test-include-folder');

simpleIncluder({
  path: includePath,
  exclude: ['utils', 'dontTouch.js'],
  constructor: { foo: 'bar' },
  verbose: true,
})

simpleIncluder({
  path: includePath,
  constructor: { foo: 'bar' },
  verbose: true,
})

test()
