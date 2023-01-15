const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class MapReduceScriptTaskStatus {
	deploymentId;
	scriptId;
	stage;
	status;
	taskId;

	getCurrentTotalSize = () => {};
	getPendingMapCount = () => {};
	getPendingMapSize = () => {};
	getPendingOutputCount = () => {};
	getPendingOutputSize = () => {};
	getPendingReduceCount = () => {};
	getPendingReduceSize = () => {};
	getPercentageCompleted = () => {};
	getTotalMapCount = () => {};
	getTotalOutputCount = () => {};
	getTotalReduceCount = () => {};
}

module.exports = MapReduceScriptTaskStatus;
