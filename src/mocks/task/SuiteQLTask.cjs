const { assignConstructor, options, required } = require("../../helpers.cjs");

@assignConstructor()
class SuiteQLTask {
    fileId
    filePath
    inboundDependencies = []
    params
    query

    @options("scriptId", "taskType", "deploymentId", "params")
    @required("scriptId", "taskType")
    addInboundDependency = (options) => {
        this.inboundDependencies.push(options)
    }

    submit = () => {}
}

module.exports = SuiteQLTask