import assert from "node:assert/strict";
// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { describe, it } from "node:test";
import configExternalDependencies from "./index.js";

const externalWithNull = configExternalDependencies(null);
const externalWithEmptyArray = configExternalDependencies([]);

const externalWithDependencies = configExternalDependencies({
  dependencies: { "@babel/runtime": "0.0.0", jest: "0.0.0" },
});

const externalWithPeerDependencies = configExternalDependencies({
  peerDependencies: { "@babel/runtime": "0.0.0", jest: "0.0.0" },
});

const externalWithMultiplePackages = configExternalDependencies([
  {
    dependencies: { "@babel/runtime": "0.0.0" },
  },
  {
    peerDependencies: { jest: "0.0.0" },
  },
]);

[
  ["null", externalWithNull, false, false],
  ["empty array", externalWithEmptyArray, true, false],
  ["dependencies", externalWithDependencies, true, true],
  ["peerDependencies", externalWithPeerDependencies, true, true],
  ["multiple packages", externalWithMultiplePackages, true, true],
].forEach(([title, external, shouldRejectNodeModules, shouldFindModule]) => {
  describe(title, () => {
    describe("builtins", () => {
      it("should return true when path includes builtins", () => {
        assert.equal(external("fs"), true);
        assert.equal(external("path"), true);
        assert.equal(external("child_process"), true);
      });
    });

    describe("path includes node_modules", () => {
      it(`should return ${shouldRejectNodeModules} when path includes node_modules`, () => {
        assert.equal(external("../node_modules/jest"), shouldRejectNodeModules);
      });
    });

    [
      ["with scope", "@babel/runtime"],
      ["without scope", "jest"],
    ].forEach(([title, packageName]) => {
      describe(`package ${title}`, () => {
        it(`should return ${shouldFindModule} for direct path`, () => {
          assert.equal(external(packageName), shouldFindModule);
        });

        it(`should return ${shouldFindModule} for sub path`, () => {
          assert.equal(external(`${packageName}/index.js`), shouldFindModule);
        });

        it(`should return ${shouldFindModule} for sub sub path`, () => {
          assert.equal(
            external(`${packageName}/bin/index.js`),
            shouldFindModule,
          );
        });
      });
    });
  });
});
