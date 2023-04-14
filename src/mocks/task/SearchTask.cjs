const { assignConstructor, options, required } = require("../../helpers.cjs");
const { Task } = require("./Task.cjs");

@assignConstructor()
class SearchTask extends Task {
	fileId;
	filePath;
	id;
	inboundDependencies = [];
	savedSearchId;

	@options("dependentScript")
	@required("dependentScript")
	addInboundDependency = (options) => {
		this.inboundDependencies.push(options);
	};
}

module.exports = SearchTask;
