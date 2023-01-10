const { assignConstructor } = require("../../helpers.cjs")

@assignConstructor()
class CjsImportTaskStatus {
    status
    taskId
}

module.exports = CjsImportTaskStatus