const configStub = require("suitecloud-unit-testing-stubs/stubs/config");
const { options } = require("../../helpers.cjs");
const record = require("../record/index.cjs");

class ConfigModule {
	Type = configStub.Type;

	@options("type", "isDynamic")
	load = (options) => {
		return new record.Record({ isDynamic: options.isDynamic || false });
	};
}

export default new ConfigModule();
