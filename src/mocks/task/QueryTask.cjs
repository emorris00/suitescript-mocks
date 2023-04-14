const { options, required, assignConstructor } = require("../../helpers.cjs");
const { Task } = require("./Task.cjs");

@assignConstructor()
class QueryTask extends Task {
	fileId;
	filePath;
	inboundDependencies = [];
	query;

	@options("scriptId", "taskType", "deploymentId", "params")
	@required("scriptId", "taskType")
	addInboundDependency = (options) => {
		this.inboundDependencies.push(options);
	};
}

module.exports = QueryTask;
