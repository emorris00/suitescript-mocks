const SuiteScriptMocks = require("../../index.cjs");
const taskStub = require("suitecloud-unit-testing-stubs/stubs/task");
const { options, required } = require("../../helpers.cjs");

const taskTypeMap = new Map()
taskTypeMap.set(taskStub.TaskType.CSV_IMPORT, require("./CsvImportTask.cjs"))
taskTypeMap.set(taskStub.TaskType.ENTITY_DEDUPLICATION, require("./EntityDeduplicationTask.cjs"))
taskTypeMap.set(taskStub.TaskType.MAP_REDUCE, require("./MapReduceScriptTask.cjs"))
taskTypeMap.set(taskStub.TaskType.QUERY, require("./QueryTask.cjs"))
taskTypeMap.set(taskStub.TaskType.RECORD_ACTION, require("./RecordActionTask.cjs"))
taskTypeMap.set(taskStub.TaskType.SCHEDULED_SCRIPT, require("./ScheduledScriptTask.cjs"))
taskTypeMap.set(taskStub.TaskType.SEARCH, require("./SearchTask.cjs"))
taskTypeMap.set(taskStub.TaskType.SUITE_QL, require("./SuiteQLTask.cjs"))
taskTypeMap.set(taskStub.TaskType.WORKFLOW_TRIGGER, require("./WorkflowTriggerTask.cjs"))

const taskStatusMap = new Map()
taskStatusMap.set(taskTypeMap.get(taskStub.TaskType.CSV_IMPORT), require("./CsvImportTaskStatus.cjs"))
taskStatusMap.set(taskTypeMap.get(taskStub.TaskType.ENTITY_DEDUPLICATION), require("./EntityDeduplicationTaskStatus.cjs"))
taskStatusMap.set(taskTypeMap.get(taskStub.TaskType.MAP_REDUCE), require("./MapReduceScriptTaskStatus.cjs"))
taskStatusMap.set(taskTypeMap.get(taskStub.TaskType.QUERY), require("./QueryTaskStatus.cjs"))
taskStatusMap.set(taskTypeMap.get(taskStub.TaskType.RECORD_ACTION), require("./RecordActionTaskStatus.cjs"))
taskStatusMap.set(taskTypeMap.get(taskStub.TaskType.SCHEDULED_SCRIPT), require("./ScheduledScriptTaskStatus.cjs"))
taskStatusMap.set(taskTypeMap.get(taskStub.TaskType.SEARCH), require("./SearchTaskStatus.cjs"))
taskStatusMap.set(taskTypeMap.get(taskStub.TaskType.SUITE_QL), require("./SuiteQLTaskStatus.cjs"))
taskStatusMap.set(taskTypeMap.get(taskStub.TaskType.WORKFLOW_TRIGGER), require("./WorkflowTriggerTaskStatus.cjs"))

class Task {
    ActionCondition = taskStub.ActionCondition
    DedupeEntityType = taskStub.DedupeEntityType
    DedupeMode = taskStub.DedupeMode
    MapReduceStage = taskStub.MapReduceStage
    MasterSelectionMode = taskStub.MasterSelectionMode
    TaskStatus = taskStub.TaskStatus
    TaskType = taskStub.TaskType

    @options("taskId")
    @required("taskId")
    checkStatus = (options) => {
        if(options.taskId in SuiteScriptMocks.tasks) {
            const task = SuiteScriptMocks.tasks[options.taskId]
            return new (taskStatusMap.get(task.constructor))(task)
        }
        throw new Error("Task doesn't exist")
    }

    @required("taskType")
    create = (options) => {
        if(taskTypeMap.has(options.taskType)) {
            const task = new (taskTypeMap.get(options.taskType))(options)
            SuiteScriptMocks.tasks.push(task)
            return task
        }
        throw new Error("Invalid task type")
    }
}

module.exports = new Task()