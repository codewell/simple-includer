import fs from 'fs';
import path from 'path';

/**
 * Require all files in a directory assuming that they
 * all export only one funciton.
 * module.exports = (constructor) => ...
 * @param {string} path - Path to directory
 * @param {object} constructor - All params that should be passed to the required function
 * @param {object} config - Array with strings to files that should not be included
 */
const simpleIncluder = (params) => {
  const { exclude, constructor, verbose } = params;
  const includePath = params.path;
  fs.readdirSync(includePath)
    .forEach(fileOrDirectory => {
      if (!exclude.includes(fileOrDirectory)) {
        const absoluteFilePath = path.resolve(`${includePath}/${fileOrDirectory}`);
        const stat = fs.lstatSync(absoluteFilePath);
        if (stat.isDirectory()) {
          // Recursively call simple Includer
          simpleIncluder({
            path: absoluteFilePath,
            constructor,
            verbose,
            exclude,
          })
        }
        if (stat.isFile()) {
          // Require the file with the constructor as parameter
          require(absoluteFilePath)(constructor)
          if (process.env.NODE_ENV === 'development' && verbose === true) {
            console.log(`> ${fileOrDirectory} was included`);
          }
        }
      }
    })
};

export default params => {
  if (process.env.NODE_ENV === 'development' && params.verbose === true) {
    console.log('- - - - - - SIMPLE INCLUDER - - - - - -');
  }
  simpleIncluder(params);
  if (process.env.NODE_ENV === 'development' && params.verbose === true) {
    console.log('- - - - - - - - - - - - - - - - - - - -');
  }
};
