# @codewell/simple-includer
Simply load all files from a directory assuming that they all export one funtion that takes the same constructor object as input.

## Examples
```JavaScript
// Example file to be included
module.exports = (constructor) => {
    // Do something
};
```

### Example include api endpoints
```JavaScript
// index.js
const path = requrie('path');
const express = require('express');
const simpleIncluder = require('simple-includer');
const app = express();

simpleIncluder({
    path: path.resolve(__dirname, './api'),
    constructor: { app },
})
```

```JavaScript
// api/endpoint1.js

module.exports = ({app}) => {
    app.get('/', (req, res) => {
        // Do some magic
    })
}
```

## Installation
```
npm install @codewell/simple-includer
```

## Basic Usage
```JavaScript
import simpleIncluder from '@codewell/simple-includer';

simpleIncluder({
    // Path to directory to include
    path: './someDir', 

    // All directory- filenames that 
    // should be excluded
    exclude: ['filename'], 
    
    // Constructor object the included 
    // function should be called with
    constructor: {foo: 'bar'}, with
    
    // If the included files should be logged
    verbose: true // or false
});
```

## Testing
**Functions**  
Write tests in the `tests/` folder

**Package**
1. Make a dry reslease with `npm run dry-release`. This will generate a file `packagename-x.x.x.tgz`.
2. Install the package in your other application/package by running `npm install path/to/packagename-x.x.x.tgz`.
3. Import and use as usual in you application/package.

## Releasing
1. Run `npm run release`
2. Push the code to github
3. Update package version 
    - `npm version patch` updates `x.x.1` -> `x.x.2`
    - `npm version minor` updates `x.1.x` -> `x.2.x`
    - `npm version major` updates `1.x.x` -> `2.x.x`
4. Run `npm publish --access public`

## Issues
Please help by posting issues here on github
