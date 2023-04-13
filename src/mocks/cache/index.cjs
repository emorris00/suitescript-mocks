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
		if (!options.scope) {
			options.scope = this.Scope.PRIVATE;
		}
		if (!SuiteScriptMocks.caches.has(options)) {
			SuiteScriptMocks.caches.set(new Cache(options));
		}
		return SuiteScriptMocks.caches.get(options);
	};
}

module.exports = new CacheModule();
