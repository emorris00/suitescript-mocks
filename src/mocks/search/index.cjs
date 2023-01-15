const searchStub = require("suitecloud-unit-testing-stubs/stubs/search");
const Column = require("./Column.cjs");
const Filter = require("./Filter.cjs");
const Page = require("./Page.cjs");
const PagedData = require("./PagedData.cjs");
const PageRange = require("./PageRange.cjs");
const Result = require("./Result.cjs");
const ResultSet = require("./ResultSet.cjs");
const _Search = require("./Search.cjs");
const { options, addPromise } = require("../../helpers.cjs");
const SuiteScriptMocks = require("../../../index.cjs");
const { required } = require("../../helpers.cjs");

class Search {
	Operator = searchStub.Operator;
	Sort = searchStub.Sort;
	Summary = searchStub.Summary;
	Type = searchStub.Type;

	Column = Column;
	Filter = Filter;
	Page = Page;
	PagedData = PagedData;
	PageRange = PageRange;
	Result = Result;
	ResultSet = ResultSet;
	Search = _Search;

	@addPromise()
	@required("type")
	create = ({ type, columns, filters }) => {
		columns = columns.map((column) => this.createColumn(column));
		return new Search({
			searchType: type,
			columns,
			filters,
			results: SuiteScriptMocks.searchResults.shift().map((row) => {
				return new Result({
					id: row.id || row.values.internalid,
					recordType: row.recordType || type,
					columns: columns,
					values: row.values,
				});
			}),
		});
	};

	@options("name", "join", "summary", "formula", "function", "label", "sort")
	createColumn = (options) => {
		return new Column(options);
	};

	@options("name", "join", "operator", "values", "formula", "summary")
	createFilter = (options) => {
		return new Filter(options);
	};

	@options("name", "value")
	createSetting = (options) => {};

	@addPromise()
	@options("id", "type")
	delete = (options) => {
		if (!SuiteScriptMocks.searches.has({ id: options.id, searchId: options.id })) {
			throw new Error("search does not exist");
		}
		SuiteScriptMocks.searches.delete({ id: options.id, searchId: options.id });
	};

	duplicates = (options) => {};

	@addPromise()
	global = (options) => {};

	@addPromise()
	load = (options) => {
		if (!SuiteScriptMocks.searches.has({ id: options.id, searchId: options.id })) {
			throw new Error("search does not exist");
		}
		return SuiteScriptMocks.searches.get({ id: options.id, searchId: options.id });
	};

	@addPromise()
	@options("type", "id", "columns")
	lookupFields = (options) => {
		return SuiteScriptMocks.lookupFieldsResults.get(options);
	};
}

module.exports = new Search();
