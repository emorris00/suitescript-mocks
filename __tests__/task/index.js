import task from "../../lib/mocks/task/index.cjs";

const taskTypeMap = new Map();
taskTypeMap.set(task.TaskType.CSV_IMPORT, require("../../lib/mocks/task/CsvImportTask.cjs"));
taskTypeMap.set(task.TaskType.ENTITY_DEDUPLICATION, require("../../lib/mocks/task/EntityDeduplicationTask.cjs"));
taskTypeMap.set(task.TaskType.MAP_REDUCE, require("../../lib/mocks/task/MapReduceScriptTask.cjs"));
taskTypeMap.set(task.TaskType.QUERY, require("../../lib/mocks/task/QueryTask.cjs"));
taskTypeMap.set(task.TaskType.RECORD_ACTION, require("../../lib/mocks/task/RecordActionTask.cjs"));
taskTypeMap.set(task.TaskType.SCHEDULED_SCRIPT, require("../../lib/mocks/task/ScheduledScriptTask.cjs"));
taskTypeMap.set(task.TaskType.SEARCH, require("../../lib/mocks/task/SearchTask.cjs"));
taskTypeMap.set(task.TaskType.SUITE_QL, require("../../lib/mocks/task/SuiteQLTask.cjs"));
taskTypeMap.set(task.TaskType.WORKFLOW_TRIGGER, require("../../lib/mocks/task/WorkflowTriggerTask.cjs"));

describe("task", () => {
	describe("checkStatus", () => {});

	describe("create", () => {
		it.each(Array.from(taskTypeMap.entries()))("should create task of the correct type", (taskType, taskClass) => {
			const t = task.create({ taskType });
			expect(t).toBeInstanceOf(taskClass);
		});
	});
});
