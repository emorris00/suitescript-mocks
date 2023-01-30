const SuiteCloudJestStubs = require("suitecloud-unit-testing-stubs");
const KeyedSet = require("./keyed-set.cjs");
const { createUserEventContext, keyedSetGetSet } = require("./helpers.cjs");

class SuiteScriptMocks {
	outputDebugLogs = false;
	outputErrorLogs = true;
	outputAuditLogs = false;

	@keyedSetGetSet()
	#records = new KeyedSet((value) => [value.id, value.type]);
	savedRecords = [];
	createdRecords = [];

	@keyedSetGetSet()
	#searches = new KeyedSet(
		(value) => value.id,
		(value) => value.searchId,
		(value) => value.title
	);
	searchResults = [];

	@keyedSetGetSet()
	#lookupFieldsResults = new KeyedSet((value) => [value.id, value.searchId]);

	caches = {};

	sentEmails = [];

	tasks = [];

	currentScript;
	currentUser;
	currentSession;

	features = {};

	reset = () => {
		this.#records.clear();
		this.savedRecords = [];
		this.createdRecords = [];
		this.#searches.clear();
		this.#lookupFieldsResults.clear();
		this.tasks = [];
		this.caches = {};
		this.sentEmails = [];
	};

	createUserEventContext = createUserEventContext;

	stubs = [
		...SuiteCloudJestStubs.customStubs,
		{ module: "N/cache", path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/cache/index.cjs" },
		{ module: "N/email", path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/email/index.cjs" },
		{ module: "N/encode", path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/encode/index.cjs" },
		{ module: "N/record", path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/record/index.cjs" },
		{ module: "N/runtime", path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/runtime/index.cjs" },
		{ module: "N/search", path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/search/index.cjs" },
		{ module: "N/task", path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/task/index.cjs" },
		{ module: "N/url", path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/url/index.cjs" },
		{
			module: "N/ui/serverWidget",
			path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/ui/serverWidget/index.cjs",
		},
	];
}

module.exports = new SuiteScriptMocks();
