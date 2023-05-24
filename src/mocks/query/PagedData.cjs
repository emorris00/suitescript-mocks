const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class PagedData {
	count;
	pageRanges;
	pageSize;

	fetch = (options) => {};
	iterator = () => {};
}

module.exports = PagedData;
