import SuiteCloudJestConfiguration from "@oracle/suitecloud-unit-testing/jest-configuration/SuiteCloudJestConfiguration.js"
import { customStubs }  from "./index.js";
import cliConfig from "./suitecloud.config.js";

export default SuiteCloudJestConfiguration.build({
    projectFolder: cliConfig.defaultProjectFolder,
    projectType: SuiteCloudJestConfiguration.ProjectType.ACP,
	customStubs: customStubs,
});
