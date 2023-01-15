const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class SearchTaskStatus {
	fileId;
	savedSearchId;
	status;
	taskId;
}

module.exports = SearchTaskStatus;
