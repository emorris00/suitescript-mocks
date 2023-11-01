const { options, required } = require("../../helpers.cjs");
const SuiteScriptMocks = require("../../index.cjs");

class LogModule {
	@options("title", "details")
	@required("title")
	audit = (options) => {
		SuiteScriptMocks.logs.push({ ...options, type: "audit" });
		if (SuiteScriptMocks.outputAuditLogs) {
			console.info(options);
		}
	};

	@options("title", "details")
	@required("title")
	debug = (options) => {
		SuiteScriptMocks.logs.push({ ...options, type: "debug" });
		if (SuiteScriptMocks.outputDebugLogs) {
			console.log(options);
		}
	};

	@options("title", "details")
	@required("title")
	emergency = (options) => {
		SuiteScriptMocks.logs.push({ ...options, type: "emergency" });
		if (SuiteScriptMocks.outputEmergencyLogs) {
			console.error(options);
		}
	};

	@options("title", "details")
	@required("title")
	error = (options) => {
		SuiteScriptMocks.logs.push({ ...options, type: "error" });
		if (SuiteScriptMocks.outputErrorLogs) {
			console.error(options);
		}
	};
}

module.exports = new LogModule();
