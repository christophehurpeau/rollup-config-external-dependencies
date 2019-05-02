<h3 align="center">
  rollup-config-external-dependencies
</h3>

<p align="center">
  rollup config external dependencies
</p>

<p align="center">
  <a href="https://npmjs.org/package/rollup-config-external-dependencies"><img src="https://img.shields.io/npm/v/rollup-config-external-dependencies.svg?style=flat-square"></a>
  <a href="https://david-dm.org/christophehurpeau/rollup-config-external-dependencies"><img src="https://david-dm.org/christophehurpeau/rollup-config-external-dependencies.svg?style=flat-square"></a>
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
