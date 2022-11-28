const searchStub = require("Suitecloud-unit-testing-stubs/stubs/search")
const Column = require("./Column")
const Filter = require("./Filter")
const Page = require("./Page")
const PagedData = require("./PagedData")
const PageRange = require("./PageRange")
const Result = require("./Result")
const ResultSet = require("./ResultSet")
const Search = require("./Search")
const { options, addPromise } = require("../../helpers")
const SuiteScriptMocks = require("../../../index.cjs")
const { required, toRecord } = require("../../helpers.cjs")

class search {
    Operator = searchStub.Operator
    Sort = searchStub.Sort
    Summary = searchStub.Summary
    Type = searchStub.Type

    Column = Column
    Filter = Filter
    Page = Page
    PagedData = PagedData
    PageRange = PageRange
    Result = Result
    ResultSet = ResultSet
    Search = Search

    @addPromise()
    @required("type")
    create = ({type, columns, filters}) => {
        columns = columns.map(column => this.createColumn(column));
        return new Search({
            searchType: type,
            columns,
            filters,
            results: SuiteScriptMocks.searchResults.shift().map(row => {
                return new Result({
                    id: row.id || row.values.internalid,
                    recordType: row.recordType || type,
                    columns: columns,
                    values: columns.reduce((acc, cur, i) => {
                        acc.set(toRecord(cur), row.values[i])
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
    delete = options => {
        if(!SuiteScriptMocks.searches.has({id: options.id, searchId: options.id})) {
            throw new Error("search does not exist")
        }
        SuiteScriptMocks.searches.delete({id: options.id, searchId: options.id})
    }

    duplicates = options => {}

    @addPromise()
    global = options => {}

    @addPromise()
    load = options => {
        if(!SuiteScriptMocks.searches.has({id: options.id, searchId: options.id})) {
            throw new Error("search does not exist")
        }
        return SuiteScriptMocks.searches.get({id: options.id, searchId: options.id})
    }

    @addPromise()
    @options("type", "id", "columns")
    lookupFields = options => {
        return SuiteScriptMocks.lookupFieldsResults.get(options)
    }
}

module.exports = new search()