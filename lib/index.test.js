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

describe.each([
  ["null", externalWithNull, false, false],
  ["empty array", externalWithEmptyArray, true, false],
  ["dependencies", externalWithDependencies, true, true],
  ["peerDependencies", externalWithPeerDependencies, true, true],
  ["multiple packages", externalWithMultiplePackages, true, true],
])("%s", (title, external, shouldRejectNodeModules, shouldFindModule) => {
  describe("builtins", () => {
    it("should return true when path includes builtins", () => {
      expect(external("fs")).toBe(true);
      expect(external("path")).toBe(true);
      expect(external("child_process")).toBe(true);
    });
  });

  describe("path includes node_modules", () => {
    it(`should return ${shouldRejectNodeModules} when path includes node_modules`, () => {
      expect(external("../node_modules/jest")).toBe(shouldRejectNodeModules);
    });
  });

  describe.each([
    ["with scope", "@babel/runtime"],
    ["without scope", "jest"],
  ])("package %s", (title, packageName) => {
    it(`should return ${shouldFindModule} for direct path`, () => {
      expect(external(packageName)).toBe(shouldFindModule);
    });

    it(`should return ${shouldFindModule} for sub path`, () => {
      expect(external(`${packageName}/index.js`)).toBe(shouldFindModule);
    });

    it(`should return ${shouldFindModule} for sub sub path`, () => {
      expect(external(`${packageName}/bin/index.js`)).toBe(shouldFindModule);
    });
  });
});
