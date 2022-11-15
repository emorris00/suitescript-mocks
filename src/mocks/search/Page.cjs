const { addPromise } = require("../../helpers.cjs")

class Page {

    data = []
    isFirst
    isLast
    pagedData
    pageRange

    constructor({data, isFirst, isLast, pagedData, pageRange}) {
        this.data = data
        this.isFirst = isFirst
        this.isLast = isLast
        this.pagedData = pagedData
        this.pageRange = pageRange
    }

    @addPromise()
    next = () => {
        return this.pagedData.fetch({index: this.pageRange.index + 1})
    }

    @addPromise()
    prev = () => {
        return this.pagedData.fetch({index: this.pageRange.index - 1})
    }
}

module.exports = Page