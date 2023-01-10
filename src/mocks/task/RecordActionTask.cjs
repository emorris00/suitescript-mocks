const { assignConstructor } = require("../../helpers.cjs")

@assignConstructor()
class RecordActionTask {
    action
    condition
    id
    paramCallback
    params
    recordType

    submit = () => {}
}

module.exports = RecordActionTask