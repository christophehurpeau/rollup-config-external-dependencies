'use strict';

const nodeBuiltinModules = require('module').builtinModules;

module.exports = (pkgs) => {
  if (pkgs == null) {
    return (path) => {
      path = path.replace(/^([^/]+)\/.*$/, '$1');
      return nodeBuiltinModules.includes(path);
    };
  }

  if (!Array.isArray(pkgs)) pkgs = [pkgs];

  const externalModules = nodeBuiltinModules.concat(
    ...pkgs.map((pkg) =>
      [].concat(
        Object.keys(pkg.dependencies || {}),
        Object.keys(pkg.peerDependencies || {}),
        Object.keys(pkg.devPeerDependencies || {}),
      ),
    ),
  );

  return (path) => {
    if (path.includes('node_modules')) return true;
    if (/^[a-z].*\//.test(path)) {
      path = path.replace(/^([^/]+)\/.*$/, '$1');
    } else if (/^@[a-z].*\//.test(path)) {
      path = path.replace(/^(@[a-z-]+\/[^/]+)\/.*$/, '$1');
    }
    return externalModules.includes(path);
  };
};
