const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class RecordActionTaskStatus {
	complete;
	errors;
	failed;
	pending;
	results;
	status;
	succeeded;
	taskId;
}

module.exports = RecordActionTaskStatus;
