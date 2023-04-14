const { assignConstructor } = require("../../helpers.cjs");
const { Task } = require("./Task.cjs");

@assignConstructor()
class ScheduledScriptTask extends Task {
	deploymentId;
	id;
	params;
	scriptId;
}

module.exports = ScheduledScriptTask;
