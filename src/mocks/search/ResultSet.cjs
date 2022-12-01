const { options, addPromise, assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class ResultSet {
    results = []
    columns = []

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