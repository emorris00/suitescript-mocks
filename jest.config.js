import SuiteCloudJestConfiguration from "@oracle/suitecloud-unit-testing/jest-configuration/SuiteCloudJestConfiguration.js";
import SuiteScriptMocks from "./index.js";
import cliConfig from "./suitecloud.config.js";

process.env.TZ = "UTC";

export default SuiteCloudJestConfiguration.build({
	projectFolder: cliConfig.defaultProjectFolder,
	projectType: SuiteCloudJestConfiguration.ProjectType.ACP,
	customStubs: SuiteScriptMocks.stubs,
});
