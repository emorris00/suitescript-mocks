const { assignConstructor } = require("../../helpers.cjs");
const { Task } = require("./Task.cjs");

@assignConstructor()
class EntityDeduplicationTask extends Task {
	dedupeMode;
	entityType;
	id;
	masterRecordId;
	masterSelectionMode;
	recordIds;
}

module.exports = EntityDeduplicationTask;
