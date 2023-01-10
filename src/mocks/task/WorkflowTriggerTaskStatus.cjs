const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class WorkflowTriggerTaskStatus {
    status
    taskId
}

module.exports = WorkflowTriggerTaskStatus