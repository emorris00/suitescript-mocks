const { addPromise, options, required, assignConstructor } = require("../../helpers.cjs");
const PageRange = require("./PageRange.cjs");
const Page = require("./Page.cjs");

@assignConstructor()
class PagedData {
	results = [];
	pageSize = 50;
	searchDefinition;

	get count() {
		return this.results.length;
	}

	get pageRanges() {
		return new Array(Math.ceil(this.count / this.pageSize)).fill(0).map((_, index) => new PageRange({ index }));
	}

	@addPromise()
	@options("index")
	@required("index")
	fetch = (options) => {
		const index = +options.index;
		if (!(index in this.pageRanges)) {
			throw new Error("invalid page index");
		}
		return new Page({
			data: this.results.slice(index * this.pageSize, index * this.pageSize + this.pageSize),
			isFirst: index === 0,
			isLast: index === this.pageRanges.length - 1,
			pagedData: this,
			pageRange: new PageRange({ index }),
		});
	};
}

module.exports = PagedData;
