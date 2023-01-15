const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class ScheduledScriptTaskStatus {
	deployementId;
	scriptId;
	status;
	taskId;
}

module.exports = ScheduledScriptTaskStatus;
