const { assignConstructor } = require("../../helpers.cjs");
const { Task } = require("./Task.cjs");

@assignConstructor()
class WorkflowTriggerTask extends Task {
	id;
	params;
	recordId;
	recordType;
	workflowId;
}

module.exports = WorkflowTriggerTask;
