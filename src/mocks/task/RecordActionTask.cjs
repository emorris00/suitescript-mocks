const { assignConstructor } = require("../../helpers.cjs");
const { Task } = require("./Task.cjs");

@assignConstructor()
class RecordActionTask extends Task {
	action;
	condition;
	id;
	paramCallback;
	params;
	recordType;

	submit = () => {};
}

module.exports = RecordActionTask;
