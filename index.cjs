const SuiteScriptMocks = require("./lib/index.cjs");
const log = require("./lib/mocks/log/index.cjs");

global.log = log;
global.alert = () => {};

module.exports = SuiteScriptMocks;
