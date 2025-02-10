const { options, required, assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Script {
	apiVersion;
	bundleIds;
	deploymentId;
	id;
	logLevel;
	percentComplete;
	parameters = {};

	@options("name")
	@required("name")
	getParameter = (options) => {
		return this.parameters[options.name];
	};

	getRemainingUsage = () => {
		return 10000000;
	};
}

module.exports = Script;
