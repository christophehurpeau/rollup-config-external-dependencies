<h1 align="center">
  rollup-config-external-dependencies
</h1>

<p align="center">
  rollup config external dependencies
</p>

<p align="center">
  <a href="https://npmjs.org/package/rollup-config-external-dependencies"><img src="https://img.shields.io/npm/v/rollup-config-external-dependencies.svg?style=flat-square" alt="npm version"></a>
  <a href="https://npmjs.org/package/rollup-config-external-dependencies"><img src="https://img.shields.io/npm/dw/rollup-config-external-dependencies.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.org/package/rollup-config-external-dependencies"><img src="https://img.shields.io/node/v/rollup-config-external-dependencies.svg?style=flat-square" alt="node version"></a>
  <a href="https://npmjs.org/package/rollup-config-external-dependencies"><img src="https://img.shields.io/npm/types/rollup-config-external-dependencies.svg?style=flat-square" alt="types"></a>
  <a href="https://codecov.io/gh/christophehurpeau/rollup-config-external-dependencies"><img src="https://img.shields.io/codecov/c/github/christophehurpeau/rollup-config-external-dependencies/main.svg?style=flat-square"></a>
</p>

## Usage

```
const pkg = require('./package.json');

const external = configExternalDependencies(pkg);

module.exports = {
  input: ...,
  output: ...,
  external,
  plugins: [
    ...
  ]
};
```
