const { assignConstructor } = require("../../helpers.cjs")

@assignConstructor()
class CsvImportTask {
    id
    importFile
    linkedFiles
    mappingId
    name
    queueId

    submit = () => {}
}

module.exports = CsvImportTask