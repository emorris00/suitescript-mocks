const SuiteScriptMocks = require("../../index.cjs");
const taskStub = require("suitecloud-unit-testing-stubs/stubs/task");

const CsvImportTaskStatus = require("./CsvImportTaskStatus.cjs");
const EntityDeduplicationTaskStatus = require("./EntityDeduplicationTaskStatus.cjs");
const MapReduceScriptTaskStatus = require("./MapReduceScriptTaskStatus.cjs");
const QueryTaskStatus = require("./QueryTaskStatus.cjs");
const RecordActionTaskStatus = require("./RecordActionTaskStatus.cjs");
const ScheduledScriptTaskStatus = require("./ScheduledScriptTaskStatus.cjs");
const SearchTaskStatus = require("./SearchTaskStatus.cjs");
const SuiteQLTaskStatus = require("./SuiteQLTaskStatus.cjs");
const WorkflowTriggerTaskStatus = require("./WorkflowTriggerTaskStatus.cjs");

const TaskTypeStatusMap = {
	[taskStub.TaskType.CSV_IMPORT]: CsvImportTaskStatus,
	[taskStub.TaskType.ENTITY_DEDUPLICATION]: EntityDeduplicationTaskStatus,
	[taskStub.TaskType.MAP_REDUCE]: MapReduceScriptTaskStatus,
	[taskStub.TaskType.QUERY]: QueryTaskStatus,
	[taskStub.TaskType.RECORD_ACTION]: RecordActionTaskStatus,
	[taskStub.TaskType.SCHEDULED_SCRIPT]: ScheduledScriptTaskStatus,
	[taskStub.TaskType.SEARCH]: SearchTaskStatus,
	[taskStub.TaskType.SUITE_QL]: SuiteQLTaskStatus,
	[taskStub.TaskType.WORKFLOW_TRIGGER]: WorkflowTriggerTaskStatus,
};

class Task {
	id;
	taskType;

	submit = () => {
		if (this.id) {
			throw new Error("Cannot submit task.");
		}
		if (!(this.taskType in TaskTypeStatusMap)) {
			throw new Error(`'${this.taskType}' is not a valid taskType`);
		}
		this.id = Math.max(Array.from(SuiteScriptMocks.taskStatuses.values()).map((a) => a.taskId)) + 1;
		SuiteScriptMocks.submittedTasks.push(this);
		SuiteScriptMocks.taskStatuses.add(
			new TaskTypeStatusMap[this.taskType]({
				taskId: this.id,
				status: taskStub.TaskStatus.PENDING,
			})
		);
		return this.id;
	};
}

module.exports = {
	Task,
	TaskTypeStatusMap,
};
