const runtimeStub = require("suitecloud-unit-testing-stubs/stubs/runtime");
const SuiteScriptMocks = require("../../index.cjs");
const { options, required } = require("../../helpers.cjs");
const Script = require("./Script.cjs");
const Session = require("./Session.cjs");
const User = require("./User.cjs");

class Runtime {
	accountId;
	country;
	envType;
	executionContext;
	processorCount;
	queueCount;
	version;

	ContextType = runtimeStub.ContextType;
	EnvType = runtimeStub.EnvType;
	Permission = runtimeStub.Permission;

	Script = Script;
	Session = Session;
	User = User;

	getCurrentScript = () => {
		return SuiteScriptMocks.currentScript;
	};

	getCurrentSession = () => {
		return SuiteScriptMocks.currentSession;
	};

	getCurrentUser = () => {
		return SuiteScriptMocks.currentUser;
	};

	@options("feature")
	@required("feature")
	isFeatureInEffect = (options) => {
		return SuiteScriptMocks.features[options.feature];
	};
}

module.exports = new Runtime();
