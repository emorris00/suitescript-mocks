const { assignConstructor } = require("../../helpers.cjs")

@assignConstructor()
class PageRange {
    compoundLabel
    index
}

module.exports = PageRange