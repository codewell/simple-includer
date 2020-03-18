const path = require("path");
const simpleIncluder = require("../lib/dev");

const includePath = path.resolve(__dirname, "./test-include-folder");

const foo = (function() {
  let i = 0;

  return {
    inc: () => {
      i = i + 1;
    },
    get: () => i
  };
})();

simpleIncluder({
  path: includePath,
  exclude: ["utils", "dontTouch.js"],
  constructor: { foo: foo },
  verbose: true
});

test("Exclude files", () => {
  expect(foo.get()).toBe(2);
});

const bar = (function() {
  let i = 0;

  return {
    inc: () => {
      i = i + 1;
    },
    get: () => i
  };
})();

simpleIncluder({
  path: includePath,
  constructor: { foo: bar },
  verbose: true
});

test("Include all files", () => {
  expect(bar.get()).toBe(5);
});
