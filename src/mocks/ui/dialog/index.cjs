const SuiteScriptMocks = require("../../../index.cjs");
const { options } = require("../../../helpers.cjs");

class DialogModule {
	@options("title", "message")
	alert = (options) => {
		SuiteScriptMocks.dialogs.push({
			...options,
			type: "alert",
		});
	};

	@options("title", "message")
	confirm = (options) => {
		SuiteScriptMocks.dialogs.push({
			...options,
			type: "confirm",
		});
		return Boolean(SuiteScriptMocks.dialogResults.shift());
	};

	@options("button", "title", "message")
	create = (options) => {
		SuiteScriptMocks.dialogs.push({
			...options,
			type: "create",
		});
		const result = SuiteScriptMocks.dialogResults.shift();
		return new Promise((resolve, reject) => {
			resolve(result);
		});
	};
}

module.exports = new DialogModule();
