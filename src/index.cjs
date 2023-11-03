const SuiteCloudJestStubs = require("suitecloud-unit-testing-stubs");
const KeyedSet = require("./keyed-set.cjs");
const { addKeyedSetGetSet, createUserEventContext, UserEventType } = require("./helpers.cjs");

class SuiteScriptMocks {
	dateFormat = "M/d/yyyy";

	@addKeyedSetGetSet()
	#caches = new KeyedSet((cache) => [cache.name, cache.scope]);

	@addKeyedSetGetSet()
	#files = new KeyedSet(
		(file) => file.id,
		(file) => [file.folder, file.name],
	);

	@addKeyedSetGetSet()
	#records = new KeyedSet((record) => [record.id, record.type]);

	@addKeyedSetGetSet()
	#searches = new KeyedSet(
		(search) => search.id,
		(search) => search.searchId,
		(search) => search.title,
	);

	@addKeyedSetGetSet()
	#taskStatuses = new KeyedSet((task) => task.id);

	reset = () => {
		this.outputAuditLogs = false;
		this.outputDebugLogs = false;
		this.outputEmergencyLogs = false;
		this.outputErrorLogs = false;

		this.currentScript = {};
		this.currentUser = {};
		this.currentSession = {};
		this.features = {};

		this.sentEmails = [];

		this.#caches.clear();

		this.#files.clear();
		this.savedFiles = [];
		this.createdFiles = [];
		this.deletedFiles = [];

		this.#records.clear();
		this.savedRecords = [];
		this.createdRecords = [];
		this.deletedRecords = [];

		this.#searches.clear();
		this.runSearches = [];
		this.searchResults = [];
		this.lookupFieldsResults = [];

		this.#taskStatuses.clear();
		this.submittedTasks = [];

		this.logs = [];
	};

	createUserEventContext = createUserEventContext;
	UserEventType = UserEventType;

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

	constructor() {
		this.reset();
	}
}

module.exports = new SuiteScriptMocks();
