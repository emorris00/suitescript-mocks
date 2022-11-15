const Column = require("./Column.cjs")
const ResultSet = require("./ResultSet.cjs")
const PagedData = require("./PagedData.cjs")
const { options, addPromise } = require("../../helpers")

class Search {
    results

    constructor({id, type, columns, results}) {
        this.searchId = id
        this.searchType = type
        this.columns = columns
        this.results = results
    }

    run = () => {
        return new ResultSet({
            columns: this.columns,
            results: this.results
        })
    }

    @options("pageSize")
    runPaged = options => {
        return new PagedData({
            results: this.results,
            pageSize: options.pageSize || 50
        })
    }

    save() {}
}

module.exports = Search