const { assignConstructor } = require("../../helpers.cjs");
const { Task } = require("./Task.cjs");

@assignConstructor()
class MapReduceScriptTask extends Task {
	deploymentId;
	id;
	params;
	scriptId;
}

module.exports = MapReduceScriptTask;
