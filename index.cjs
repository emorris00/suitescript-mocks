const SuiteScriptMocks = require("./lib/index.cjs");

global.log = {
	debug: (...args) => {
		if (SuiteScriptMocks.outputDebugLogs) {
			console.log(args);
		}
	},
	error: (...args) => {
		if (SuiteScriptMocks.outputErrorLogs) {
			console.error(args);
		}
	},
	audit: (...args) => {
		if (SuiteScriptMocks.outputAuditLogs) {
			console.audit(args);
		}
	},
};

global.alert = () => {};

module.exports = SuiteScriptMocks;
