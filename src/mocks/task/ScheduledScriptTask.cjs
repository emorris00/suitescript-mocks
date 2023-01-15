const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class ScheduledScriptTask {
	deploymentId;
	id;
	params;
	scriptId;

	submit = () => {};
}

module.exports = ScheduledScriptTask;
