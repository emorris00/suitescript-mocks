const SuiteCloudJestStubs = require("suitecloud-unit-testing-stubs")
const helpers = require("./lib/helpers.cjs");

global.log = {
	debug: () => {},
	error: () => {},
	audit: () => {},
};

global.alert = () => {}

module.exports = {
    UserEventType: helpers.UserEventType,
    createUserEventContext: helpers.createUserEventContext,
    customStubs: [
        ...SuiteCloudJestStubs.customStubs,
        { module: "N/record", path: "<rootDir>/node_modules/netsuite-mocks/lib/mocks/record" },
        { module: "N/search", path: "<rootDir>/node_modules/netsuite-mocks/lib/mocks/search" },
    ]
}