const { assignConstructor } = require("../../helpers.cjs");
const { Task } = require("./Task.cjs");

@assignConstructor()
class CsvImportTask extends Task {
	id;
	importFile;
	linkedFiles;
	mappingId;
	name;
	queueId;
}

module.exports = CsvImportTask;
