const SuiteScriptMocks = require("../../index.cjs");
const taskStub = require("suitecloud-unit-testing-stubs/stubs/task");
const { options, required } = require("../../helpers.cjs");
const { TaskTypeStatusMap } = require("./Task.cjs");

const CsvImportTask = require("./CsvImportTask.cjs");
const EntityDeduplicationTask = require("./EntityDeduplicationTask.cjs");
const MapReduceScriptTask = require("./MapReduceScriptTask.cjs");
const QueryTask = require("./QueryTask.cjs");
const RecordActionTask = require("./RecordActionTask.cjs");
const ScheduledScriptTask = require("./ScheduledScriptTask.cjs");
const SearchTask = require("./SearchTask.cjs");
const SuiteQLTask = require("./SuiteQLTask.cjs");
const WorkflowTriggerTask = require("./WorkflowTriggerTask.cjs");

const TaskTypeMap = {
	[taskStub.TaskType.CSV_IMPORT]: CsvImportTask,
	[taskStub.TaskType.ENTITY_DEDUPLICATION]: EntityDeduplicationTask,
	[taskStub.TaskType.MAP_REDUCE]: MapReduceScriptTask,
	[taskStub.TaskType.QUERY]: QueryTask,
	[taskStub.TaskType.RECORD_ACTION]: RecordActionTask,
	[taskStub.TaskType.SCHEDULED_SCRIPT]: ScheduledScriptTask,
	[taskStub.TaskType.SEARCH]: SearchTask,
	[taskStub.TaskType.SUITE_QL]: SuiteQLTask,
	[taskStub.TaskType.WORKFLOW_TRIGGER]: WorkflowTriggerTask,
};

class TaskModule {
	ActionCondition = taskStub.ActionCondition;
	DedupeEntityType = taskStub.DedupeEntityType;
	DedupeMode = taskStub.DedupeMode;
	MapReduceStage = taskStub.MapReduceStage;
	MasterSelectionMode = taskStub.MasterSelectionMode;
	TaskStatus = taskStub.TaskStatus;
	TaskType = taskStub.TaskType;

	TaskTypeMap = TaskTypeMap;
	TaskTypeStatusMap = TaskTypeStatusMap;

	CsvImportTask = TaskTypeMap[taskStub.TaskType.CSV_IMPORT];
	EntityDeduplicationTask = TaskTypeMap[taskStub.TaskType.ENTITY_DEDUPLICATION];
	MapReduceScriptTask = TaskTypeMap[taskStub.TaskType.MAP_REDUCE];
	QueryTask = TaskTypeMap[taskStub.TaskType.QUERY];
	RecordActionTask = TaskTypeMap[taskStub.TaskType.RECORD_ACTION];
	ScheduledScriptTask = TaskTypeMap[taskStub.TaskType.SCHEDULED_SCRIPT];
	SearchTask = TaskTypeMap[taskStub.TaskType.SEARCH];
	SuiteQLTask = TaskTypeMap[taskStub.TaskType.SUITE_QL];
	WorkflowTriggerTask = TaskTypeMap[taskStub.TaskType.WORKFLOW_TRIGGER];

	CsvImportTaskStatus = TaskTypeStatusMap[taskStub.TaskType.CSV_IMPORT];
	EntityDeduplicationTaskStatus = TaskTypeStatusMap[taskStub.TaskType.ENTITY_DEDUPLICATION];
	MapReduceScriptTaskStatus = TaskTypeStatusMap[taskStub.TaskType.MAP_REDUCE];
	QueryTaskStatus = TaskTypeStatusMap[taskStub.TaskType.QUERY];
	RecordActionTaskStatus = TaskTypeStatusMap[taskStub.TaskType.RECORD_ACTION];
	ScheduledScriptTaskStatus = TaskTypeStatusMap[taskStub.TaskType.SCHEDULED_SCRIPT];
	SearchTaskStatus = TaskTypeStatusMap[taskStub.TaskType.SEARCH];
	SuiteQLTaskStatus = TaskTypeStatusMap[taskStub.TaskType.SUITE_QL];
	WorkflowTriggerTaskStatus = TaskTypeStatusMap[taskStub.TaskType.WORKFLOW_TRIGGER];

	@options("taskId")
	@required("taskId")
	checkStatus = (options) => {
		if (SuiteScriptMocks.taskStatuses.has(options)) {
			return SuiteScriptMocks.taskStatuses.get(options);
		}
		throw new Error("Task doesn't exist");
	};

	@required("taskType")
	create = (options) => {
		if (options.taskType in this.TaskTypeMap) {
			const task = new this.TaskTypeMap[options.taskType](options);
			return task;
		}
		throw new Error("Invalid task type");
	};
}

module.exports = new TaskModule();
