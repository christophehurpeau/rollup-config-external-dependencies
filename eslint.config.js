import pobConfig from "@pob/root/eslint-config";

export default [
  ...pobConfig.configs.nodeModule,
  ...pobConfig.configs.checkPackages,
];
