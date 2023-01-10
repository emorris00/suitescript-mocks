const { assignConstructor } = require("../../helpers.cjs")

@assignConstructor()
class QueryTaskStatus {
    fileId
    query
    status
    taskId
}

module.exports = QueryTaskStatus