# SuiteScript Mocks

This is a set of mocks for unit testing Netsuite. Currently this only mostly mocks N/search and N/record. All other modules are using stubs from https://github.com/KyleJonesWinsted/suitecloud-unit-testing-stubs.


Setup:

  
jest.config.js
```js
import SuiteCloudJestConfiguration from "@oracle/suitecloud-unit-testing/jest-configuration/SuiteCloudJestConfiguration.js";
import { defaults } from "jest-config";
import SuiteScriptMocks from "suitescript-mocks";
import cliConfig from "./suitecloud.config.js";

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

Usage:

look at tests for examples