const { assignConstructor, options, required } = require("../../helpers.cjs");

@assignConstructor()
class SearchTask {
    fileId
    filePath
    id
    inboundDependencies = []
    savedSearchId

    @options("dependentScript")
    @required("dependentScript")
    addInboundDependency = (options) => {
        this.inboundDependencies.push(options)
    }

    submit = () => {}
}

module.exports = SearchTask