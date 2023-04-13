const { options, required } = require("../../helpers.cjs");
const SuiteScriptMocks = require("../../index.cjs");

class LogModule {
	@options("title", "details")
	@required("title")
	audit = (...args) => {
		if (SuiteScriptMocks.outputAuditLogs) {
			console.info(args);
		}
	};

	@options("title", "details")
	@required("title")
	debug = (...args) => {
		if (SuiteScriptMocks.outputDebugLogs) {
			console.log(args);
		}
	};

	@options("title", "details")
	@required("title")
	emergency = (...args) => {
		if (SuiteScriptMocks.outputEmergencyLogs) {
			console.error(args);
		}
	};

	@options("title", "details")
	@required("title")
	error = (...args) => {
		if (SuiteScriptMocks.outputErrorLogs) {
			console.error(args);
		}
	};
}

module.exports = new LogModule();
