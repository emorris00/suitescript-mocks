const cacheStub = require("suitecloud-unit-testing-stubs/stubs/cache");
const SuiteScriptMocks = require("../../index.cjs");
const { options, required } = require("../../helpers.cjs");
const Cache = require("./Cache.cjs");

class CacheModule {
	Cache = Cache;

	Scope = cacheStub.Scope;

	@options("name", "scope")
	@required("name")
	getCache = (options) => {
		if (!(options.name in SuiteScriptMocks)) {
			SuiteScriptMocks[options.name] = new Cache(options);
		}
		return SuiteScriptMocks[options.name];
	};
}

module.exports = new CacheModule();
