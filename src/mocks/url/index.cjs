const urlStub = require("suitecloud-unit-testing-stubs/stubs/url")
const { options, required } = require("../../helpers.cjs")

class url {
    HostType = urlStub.HostType

    @options("domain", "params")
    @required("domain", "params")
    format = options => {
        return options.domain + "?" + new URLSearchParams(options.params)
    }

    @options("hostType", "accountId")
    @required("hostType")
    resolveDomain = () => {}

    @options("isEditMode", "recordId", "recordType", "params")
    @required("isEditMode", "recordId", "recordType")
    resolveRecord = () => {}

    @options("deploymentId", "scriptId", "params", "returnExternalUrl")
    @required("deploymentId", "scriptId")
    resolveScript = () => {}

    @options("id", "params")
    @required("id")
    resolveTaskLink = () => {}
}

module.exports = new url()