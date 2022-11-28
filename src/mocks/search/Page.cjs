const { addPromise, assignConstructor } = require("../../helpers.cjs")

@assignConstructor()
class Page {
    data = []
    isFirst
    isLast
    pagedData
    pageRange

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