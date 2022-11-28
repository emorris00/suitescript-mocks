const { options, assignConstructor } = require("../../helpers.cjs")

@assignConstructor()
class Column {
    name
    join
    summary
    formula
    function
    label
    sort

    @options("name", "join")
    setWhenOrderedBy = () => {}
}

module.exports = Column