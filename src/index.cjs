const SuiteCloudJestStubs = require("suitecloud-unit-testing-stubs");
const KeyedSet = require("./keyed-set.cjs");
const { addKeyedSetGetSet, createUserEventContext, UserEventType } = require("./helpers.cjs");
const RuntimeScript = require("./mocks/runtime/Script.cjs");
const RuntimeUser = require("./mocks/runtime/User.cjs");
const RuntimeSession = require("./mocks/runtime/Session.cjs");

const baseMockPath = "<rootDir>/node_modules/suitescript-mocks/lib/mocks";

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

		this.currentScript = new RuntimeScript();
		this.currentUser = new RuntimeUser();
		this.currentSession = new RuntimeSession();
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

		this.dialogs = [];
		this.dialogResults = [];

		this.messages = [];

		this.generateBytesResults = [];
		this.generateIntResults = [];
		this.generateUUIDResults = [];
	};

	createUserEventContext = createUserEventContext;
	UserEventType = UserEventType;

	stubs = [
		...SuiteCloudJestStubs.customStubs,
		{ module: "N/cache", path: `${baseMockPath}/cache/index.cjs` },
		{ module: "N/config", path: `${baseMockPath}/config/index.cjs` },
		{ module: "N/crypto/random", path: `${baseMockPath}/crypto/random/index.cjs` },
		{ module: "N/email", path: `${baseMockPath}/email/index.cjs` },
		{ module: "N/encode", path: `${baseMockPath}/encode/index.cjs` },
		{ module: "N/file", path: `${baseMockPath}/file/index.cjs` },
		{ module: "N/log", path: `${baseMockPath}/log/index.cjs` },
		{ module: "N/record", path: `${baseMockPath}/record/index.cjs` },
		{ module: "N/runtime", path: `${baseMockPath}/runtime/index.cjs` },
		{ module: "N/search", path: `${baseMockPath}/search/index.cjs` },
		{ module: "N/task", path: `${baseMockPath}/task/index.cjs` },
		{ module: "N/ui/dialog", path: `${baseMockPath}/ui/dialog/index.cjs` },
		{ module: "N/ui/message", path: `${baseMockPath}/ui/message/index.cjs` },
		{ module: "N/ui/serverWidget", path: `${baseMockPath}/ui/serverWidget/index.cjs` },
		{ module: "N/url", path: `${baseMockPath}/url/index.cjs` },
	];

	constructor() {
		this.reset();
	}
}

module.exports = new SuiteScriptMocks();
