const { assignConstructor, options, required } = require("../../helpers.cjs");
const { Task } = require("./Task.cjs");

@assignConstructor()
class SuiteQLTask extends Task {
	fileId;
	filePath;
	inboundDependencies = [];
	params;
	query;

	@options("scriptId", "taskType", "deploymentId", "params")
	@required("scriptId", "taskType")
	addInboundDependency = (options) => {
		this.inboundDependencies.push(options);
	};
}

module.exports = SuiteQLTask;
