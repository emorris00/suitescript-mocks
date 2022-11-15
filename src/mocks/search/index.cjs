const _search = require("Suitecloud-unit-testing-stubs/stubs/search")
const Column = require("./Column")
const Filter = require("./Filter")
const Search = require("./Search")
const ResultSet = require("./ResultSet")
const Result = require("./Result")
const { options, addPromise } = require("../../helpers")

class search {
    results = []
    lookupFieldsResults = []
    #id = 0

    Operator = _search.Operator
    Sort = _search.Sort
    Summary = _search.Summary
    Type = _search.Type

    Column = Column
    Search = Search
    ResultSet = ResultSet
    Result = Result

    _addResults(results) {
        this.results.push(results)
        return this
    }

    _setResults(results) {
        this.results = results
    }

    _addLookupFieldsResults(results) {
        this.lookupFieldsResults.push(results)
        return this
    }

    @addPromise()
    create = ({type, columns, filters}) => {
        columns = columns.map(column => this.createColumn(column));
        return new Search({
            type,
            columns,
            filters,
            results: this.results.shift().map(row => {
                return new Result({
                    id: row.id || row.values.internalid || this.#id++,
                    recordType: row.recordType || type,
                    columns: columns,
                    values: columns.reduce((acc, cur, i) => {
                        acc.set(cur.toRecord(), row.values[i])
                        return acc
                    }, new Map())
                })
            })
        })
    }

    @options("name", "join", "summary", "formula", "function", "label", "sort")
    createColumn = options => {
        return new Column(options)
    }

    @options("name", "join", "operator", "values", "formula", "summary")
    createFilter = options => {
        return new Filter(options)
    }

    @options("name", "value")
    createSetting = options => {}

    @addPromise()
    @options("id", "type")
    delete = options => {}

    duplicates = options => {}

    @addPromise()
    global = options => {}

    @addPromise()
    load = options => {}

    @addPromise()
    @options("type", "id", "columns")
    lookupFields = options => {
        return this.lookupFieldsResults.shift() || {}
    }
}

module.exports = new search()