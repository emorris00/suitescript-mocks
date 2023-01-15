const { options, required, assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class QueryTask {
	fileId;
	filePath;
	inboundDependencies = [];
	query;

	@options("scriptId", "taskType", "deploymentId", "params")
	@required("scriptId", "taskType")
	addInboundDependency = (options) => {
		this.inboundDependencies.push(options);
	};

	submit = () => {};
}

module.exports = QueryTask;
