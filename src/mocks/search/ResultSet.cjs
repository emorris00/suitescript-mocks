const { options, addPromise } = require("../../helpers")

class ResultSet {
    results = [];

    constructor({columns, results}) {
        this.columns = columns
        this.results = results
    }

    @addPromise()
    each = (callback) => {
        for(let i = 0; i < this.results.length && i < 4000; i++) {
            if(callback(this.results[i]) === false) return
        }
    }

    @options("start", "end")
    getRange = options => {
        return this.results.slice(options.start, options.end)
    }
}

module.exports = ResultSet