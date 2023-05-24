const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Page {
	data;
	isFirst;
	isLast;
	pageRange;
	pagedData;
}

module.exports = Page;
