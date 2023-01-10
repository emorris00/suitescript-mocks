const { assignConstructor } = require("../../helpers.cjs")

@assignConstructor()
class SuiteQLTaskStatus {
    fileId
    params
    query
    status
    taskId
}

module.exports = SuiteQLTaskStatus