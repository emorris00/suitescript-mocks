const ResultSet = require("./ResultSet.cjs");
const PagedData = require("./PagedData.cjs");
const SuiteScriptMocks = require("../../../index.cjs");
const { options, assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Search {
	id;
	searchId;
	searchType;
	title;
	columns;
	filters;
	results;

	run = () => {
		SuiteScriptMocks.runSearches.push(this);
		return new ResultSet({
			columns: this.columns,
			results: this.results,
		});
	};

	@options("pageSize")
	runPaged = (options) => {
		SuiteScriptMocks.runSearches.push(this);
		const pageSize = options.pageSize || 50;
		if (pageSize < 5 || pageSize > 1000) {
			throw new Error("page size is outside allowed range");
		}
		return new PagedData({
			results: this.results || [],
			pageSize: pageSize,
		});
	};

	save() {
		if (!this.title) {
			throw new Error("search title not set");
		}
		if (!this.searchId || !SuiteScriptMocks.searches.has({ searchId: this.searchId })) {
			if (SuiteScriptMocks.searches.has({ id: this.id })) {
				throw new Error("search script id is already in use");
			}
			if (SuiteScriptMocks.searches.has({ title: this.title })) {
				throw new Error("search title is already in use");
			}
		}
		if (!this.searchId) {
			this.searchId = Math.max(Array.from(SuiteScriptMocks.searches.values()).map((a) => a.searchId)) + 1;
		}
		if (!this.id) {
			this.id = `customsearch_${this.searchId}`;
		}
		SuiteScriptMocks.searches.set(new Search(this));
	}
}

module.exports = Search;
