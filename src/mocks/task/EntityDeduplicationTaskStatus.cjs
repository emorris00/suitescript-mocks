const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class EntityDeduplicationTaskStatus {
	status;
	taskId;
}

module.exports = EntityDeduplicationTaskStatus;
