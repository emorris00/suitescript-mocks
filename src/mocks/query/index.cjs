const queryStub = require("suitecloud-unit-testing-stubs/stubs/query");
const { addPromise, options, required } = require("../../helpers.cjs");
const Column = require("./Column.cjs");
const Component = require("./Component.cjs");
const Condition = require("./Condition.cjs");
const Page = require("./Page.cjs");
const PagedData = require("./PagedData.cjs");
const PageRange = require("./PageRange.cjs");
const Period = require("./Period.cjs");
const Query = require("./Query.cjs");
const RelativeDate = require("./RelativeDate.cjs");
const Result = require("./Result.cjs");
const ResultSet = require("./ResultSet.cjs");
const Sort = require("./Sort.cjs");
const SuiteQL = require("./SuiteQL.cjs");
const { default: SuiteScriptMocks } = require("../../../index.js");

class QueryModule {
	Aggregate = queryStub.Aggregate;
	DateId = queryStub.DateId;
	FieldContext = queryStub.FieldContext;
	Operator = queryStub.Operator;
	PeriodAdjustment = queryStub.PeriodAdjustment;
	PeriodCode = queryStub.PeriodCode;
	PeriodType = queryStub.PeriodType;
	RelativeDateRange = queryStub.RelativeDateRange;
	ReturnType = queryStub.ReturnType;
	SortLocale = queryStub.SortLocale;
	Type = queryStub.Type;

	Column = Column;
	Component = Component;
	Condition = Condition;
	Page = Page;
	PagedData = PagedData;
	PageRange = PageRange;
	Period = Period;
	Query = Query;
	RelativeDate = RelativeDate;
	Result = Result;
	ResultSet = ResultSet;
	Sort = Sort;
	SuiteQL = SuiteQL;

	create = (options) => {};

	@options("code", "adjustment", "type")
	@required("code")
	createPeriod = (options) => {
		return new Period({
			adjustment: this.PeriodAdjustment.NOT_LAST,
			type: this.PeriodType.START,
			...options,
		});
	};

	@options("dateId", "value")
	@required("dateId", "value")
	createRelativeDate = (options) => {
		return new RelativeDate(options);
	};

	@options("id")
	@required("id")
	delete = (options) => {};

	@options("workbookId")
	@required("workbookId")
	listTables = (options) => {};

	@addPromise()
	load = (options) => {};

	@options("query", "params", "customScriptId")
	@required("query")
	runSuiteQL = (options) => {
		return new ResultSet(SuiteScriptMocks.runSuiteQLResults.shift());
	};

	runSuiteQLPaged = (options) => {};
}

module.exports = new QueryModule();
