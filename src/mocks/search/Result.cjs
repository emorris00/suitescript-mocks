const Column = require("./Column")
const { options } = require("../../helpers.cjs");

class Result {
    values = new Map()

    constructor({id, recordType, columns, values}) {
        this.id = id
        this.recordType = recordType
        this.columns = columns
        this.values = values
    }

    @options("name", "join", "summary", "func")
    getValue = options => {
        const rec = new Column(options).toRecord()
        return this.values.get(rec)
    }
}

module.exports = Result