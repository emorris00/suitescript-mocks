const Column = require("./Column")
const { options, toRecord, assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Result {
    id
    recordType
    columns
    values = new Map()

    @options("name", "join", "summary", "func")
    getText = options => {
        const rec = typeof options.name === "object" && options.name instanceof Column
            ? options.name
            : new Column(options)
        const field = this.values.get(toRecord(rec))
        return typeof field === "object" ? (field.text || field.value) : field
    }

    @options("name", "join", "summary", "func")
    getValue = options => {
        const rec = typeof options.name === "object" && options.name instanceof Column
            ? options.name
            : new Column(options)
        const field = this.values.get(toRecord(rec))
        return typeof field === "object" ? field.value : field
    }
}

module.exports = Result