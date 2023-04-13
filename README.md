# SuiteScript Mocks

This is a set of mocks for unit testing Netsuite. Modules that don't have a mock written for them instead use a stub from https://github.com/KyleJonesWinsted/suitecloud-unit-testing-stubs.

Setup:

"type": "module" must be set in package.json
  
jest.config.js
```js
import SuiteCloudJestConfiguration from "@oracle/suitecloud-unit-testing/jest-configuration/SuiteCloudJestConfiguration.js";
import { defaults } from "jest-config";
import SuiteScriptMocks from "suitescript-mocks";
import cliConfig from "./suitecloud.config.mjs";

const config = SuiteCloudJestConfiguration.build({
	projectFolder: cliConfig.defaultProjectFolder,
	projectType: SuiteCloudJestConfiguration.ProjectType.ACP,
	customStubs: SuiteScriptMocks.stubs,
});

export default {
	...config,
	moduleFileExtensions: [...defaults.moduleFileExtensions, "cjs"],
};
```

suitecloud.config.js
```js
const SuiteCloudJestUnitTestRunner = require("@oracle/suitecloud-unit-testing/services/SuiteCloudJestUnitTestRunner.js");

module.exports = {
    defaultProjectFolder: "src",
    commands: {
        "project:deploy": {
            beforeExecuting: async (args) => {
                await SuiteCloudJestUnitTestRunner.run({
                    // Jest configuration options.
                });
                return args;
            },
        },
    },
};
```

suitecloud.config.mjs
```js
import SuiteCloudJestUnitTestRunner from '@oracle/suitecloud-unit-testing/services/SuiteCloudJestUnitTestRunner.js';

export default {
	defaultProjectFolder: 'src',
	commands: {
		"project:deploy": {
			beforeExecuting: async args => {
				await SuiteCloudJestUnitTestRunner.run({
					// Jest configuration options.
				});
				return args;
			},
		},
	},
};
```

Usage:

The SuiteScriptMocks object exported by default by this package has a number of properties on it that control how the mocks work.
| Property | Description |
| -------- | ----------- |
| outputDebugLogs | Choose whether or not to output debug logs to the console. |
| outputErrorLogs | Choose whether or not to output error logs to the console. |
| outputAuditLogs | Choose whether or not to output audit logs to the console. |
| records | List of records used by record.load, etc. Use Record constructor when creating records to add to this. |
| savedRecords | List of records that have been saved. |
| createdRecords | List of records that have been created. |
| searches | List of searches used by search.load, etc. Use Search constructor when creating searches to add to this. |
| searchResults | List of search results used to mock dynamically created and executed searches. Every search created with search.create will consume the first element in the list. |
| lookupFieldsResults | List of results used to mock search.lookupFields. Every call to search.lookupFields will consume the first element in the list. |
| caches | Map of caches used by cache.getCache. |
| sentEmails | List of emails sent using N/email. |
| tasks | List of created tasks. |
| currentScript | Details loaded when using runtime.getCurrentScript() |
| currentUser | Details loaded when using runtime.getCurrentUser() |
| currentSession | Details loaded when using runtime.getCurrentSession() |
| reset | Function used to reset the state of the mocks library. Advisable to do before every test run, likely in a beforeEach. |

For specific examples please look at the tests.