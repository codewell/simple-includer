'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));

/**
 * Require all files in a directory assuming that they
 * all export only one funciton.
 * module.exports = (constructor) => ...
 * @param {string} path - Path to directory
 * @param {object} constructor - All params that should be passed to the required function
 * @param {object} config - Array with strings to files that should not be included
 */

var simpleIncluder = function simpleIncluder(params) {
  var constructor = params.constructor,
      verbose = params.verbose;
  var exclude = params.exclude || [];
  var includePath = params.path;
  fs.readdirSync(includePath).forEach(function (fileOrDirectory) {
    if (!exclude.includes(fileOrDirectory)) {
      var absoluteFilePath = path.resolve("".concat(includePath, "/").concat(fileOrDirectory));
      var stat = fs.lstatSync(absoluteFilePath);

      if (stat.isDirectory()) {
        // Recursively call simple Includer
        simpleIncluder({
          path: absoluteFilePath,
          constructor: constructor,
          verbose: verbose,
          exclude: exclude
        });
      }

      if (stat.isFile()) {
        // Require the file with the constructor as parameter
        require(absoluteFilePath)(constructor);

        if (verbose === true) {
          console.log("> ".concat(fileOrDirectory, " was included"));
        }
      }
    }
  });
};

var index = (function (params) {
  if (params.verbose === true) {
    console.log('- - - - - - SIMPLE INCLUDER - - - - - -');
  }

  simpleIncluder(params);

  if (params.verbose === true) {
    console.log('- - - - - - - - - - - - - - - - - - - -');
  }
});

module.exports = index;
