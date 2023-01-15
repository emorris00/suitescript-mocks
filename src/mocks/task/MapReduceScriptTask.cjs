const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class MapReduceScriptTask {
	deploymentId;
	id;
	params;
	scriptId;

	submit = () => {};
}

module.exports = MapReduceScriptTask;
