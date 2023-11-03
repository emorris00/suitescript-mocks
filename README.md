# SuiteScript Mocks

This is a set of mocks for unit testing Netsuite. Modules that don't have a mock written for them instead use a stub from https://github.com/KyleJonesWinsted/suitecloud-unit-testing-stubs.

Setup:

package.json type should not be module
  
jest.config.js
```js
const SuiteCloudJestConfiguration = require("@oracle/suitecloud-unit-testing/jest-configuration/SuiteCloudJestConfiguration.js");
const { defaults } = require("jest-config");
const SuiteScriptMocks = require("suitescript-mocks");
const cliConfig = require("./suitecloud.config.js");

const config = SuiteCloudJestConfiguration.build({
    projectFolder: cliConfig.defaultProjectFolder,
    projectType: SuiteCloudJestConfiguration.ProjectType.ACP,
    customStubs: SuiteScriptMocks.stubs,
});

module.exports = {
    ...config,
    moduleFileExtensions: [...defaults.moduleFileExtensions, "cjs"],
};
```

suitecloud.config.js
```js
const SuiteCloudJestUnitTestRunner = require("@oracle/suitecloud-unit-testing/services/SuiteCloudJestUnitTestRunner");

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

Usage:

The SuiteScriptMocks object exported by default by this package has a number of properties on it that control how the mocks work.
| Property            | Description                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| outputDebugLogs     | Choose whether or not to output debug logs to the console.                                                                                                         |
| outputErrorLogs     | Choose whether or not to output error logs to the console.                                                                                                         |
| outputAuditLogs     | Choose whether or not to output audit logs to the console.                                                                                                         |
| currentScript       | Details loaded when using runtime.getCurrentScript()                                                                                                               |
| currentUser         | Details loaded when using runtime.getCurrentUser()                                                                                                                 |
| currentSession      | Details loaded when using runtime.getCurrentSession()                                                                                                              |
| features            | Map of which netsuite features are enabled, used by runtime.isFeatureInEffect                                                                                      |
| sentEmails          | List of emails sent using N/email.                                                                                                                                 |
| caches              | List of caches used by cache.getCache.                                                                                                                             |
| files               | List of files used by file.load, etc. Use File constructor when creating files to add to this.                                                                     |
| createdFiles        | List of files that have been created.                                                                                                                              |
| savedFiles          | List of files that have been saved.                                                                                                                                |
| deletedFiles        | List of files that have been deleted.                                                                                                                              |
| records             | List of records used by record.load, etc. Use Record constructor when creating records to add to this.                                                             |
| createdRecords      | List of records that have been created.                                                                                                                            |
| savedRecords        | List of records that have been saved.                                                                                                                              |
| deletedRecords      | List of records that have been deleted.                                                                                                                            |
| searches            | List of searches used by search.load, etc. Use Search constructor when creating searches to add to this.                                                           |
| runSearches         | List of searches that have been run.                                                                                                                               |
| searchResults       | List of search results used to mock dynamically created and executed searches. Every search created with search.create will consume the first element in the list. |
| lookupFieldsResults | List of results used to mock search.lookupFields. Every call to search.lookupFields will consume the first element in the list.                                    |
| taskStatuses        | List of task statuses used by task.checkStatus.                                                                                                                    |
| submittedTasks      | List of submitted tasks.                                                                                                                                           |
| logs                | List of execution logs created by N/log                                                                                                                            |
| reset               | Function used to reset the state of the mocks library. Advisable to do before every test run, likely in a beforeEach.                                              |

For specific examples please look at the tests.
