const { assignConstructor } = require("../../../helpers.cjs")

@assignConstructor()
class Button {
    isDisabled = false
    isHidden = false
    label
}

module.exports = Button