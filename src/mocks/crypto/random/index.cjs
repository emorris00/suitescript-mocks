const SuiteScriptMocks = require("../../../index.cjs");
const { required } = require("../../../helpers.cjs");

class RandomModule {
	@required("size")
	generateBytes = (options) => {
		return SuiteScriptMocks.generateBytesResults.shift();
	};

	@required("max")
	generateInt = (options) => {
		return SuiteScriptMocks.generateIntResults.shift();
	};

	generateUUID = () => {
		return SuiteScriptMocks.generateUUIDResults.shift();
	};
}

module.exports = new RandomModule();
