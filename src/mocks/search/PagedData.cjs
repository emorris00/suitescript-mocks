const { Page } = require("suitecloud-unit-testing-stubs/stubs/search.js")
const { addPromise, options } = require("../../helpers.cjs")
const PageRange = require("./PageRange.cjs")


class PagedData {
    results = []

    count
    pageRanges
    pageSize
    searchDefinition

    constructor({results, pageSize}) {
        this.results = results
        this.count = results.length
        this.pageSize = pageSize
        this.pageRanges = new Array(Math.ceil(this.count / pageSize)).map((_, index) => 
            new PageRange({index})
        )
    }

    @addPromise()
    @options("index")
    fetch = options => {
        const index = +options.index
        return new Page({
            data: this.results.slice(index * this.pageSize, (index * this.pageSize) + this.pageSize),
            isFirst: index === 0,
            isLast: index === this.pageRanges.length - 1,
            pagedData: this,
            pageRnage: new PageRange({index})
        })
    }
}

module.exports = PagedData