const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class WorkflowTriggerTask {
	id;
	params;
	recordId;
	recordType;
	workflowId;

	submit = () => {};
}

module.exports = WorkflowTriggerTask;
