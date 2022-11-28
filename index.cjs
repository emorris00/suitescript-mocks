const SuiteScriptMocks = require("./lib/index.cjs");

global.log = {
	debug: () => {},
	error: () => {},
	audit: () => {},
};

global.alert = () => {}

module.exports = SuiteScriptMocks
