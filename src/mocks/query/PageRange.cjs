const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class PageRange {
	index;
	size;
}

module.exports = PageRange;
