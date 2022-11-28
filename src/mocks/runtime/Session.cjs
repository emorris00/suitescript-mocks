const { options, required, assignConstructor } = require("../../helpers.cjs")

@assignConstructor()
class Session {
    values

    @options("name")
    @required("name")
    get = (options) => {
        return this.values[options.name]
    }

    @options("name", "value")
    @required("name", "value")
    set = (options) => {
        this.values[options.name] = options.value
    }
}

module.exports = Session