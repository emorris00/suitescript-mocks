const { Record } = require("@bloomberg/record-tuple-polyfill")
const { options } = require("../../helpers.cjs")

class Column {
    constructor({name, join, summary, formula, "function": func, label, sort}) {
        this.name = name;
        this.join = join
        this.summary = summary
        this.formula = formula
        this.function = func
        this.label = label
        this.sort = sort
    }

    @options("name", "join")
    setWhenOrderedBy = () => {
        // idk what this is supposed to do
    }
    
    toRecord() {
        return Record({
            name: this.name,
            join: this.join,
            summary: this.summary,
            formula: this.formula,
            function: this.function,
            label: this.label,
            sort: this.sort
        })
    }
}

module.exports = Column