const { assignConstructor, addPromise } = require("../../helpers.cjs");

@assignConstructor()
class Query {
	child;
	columns;
	condition;
	id;
	name;
	root;
	sort;
	type;

	and = (options) => {};
	autoJoin = (options) => {};
	createColumn = (options) => {};
	createCondition = (options) => {};
	createSort = (options) => {};
	join = (options) => {};
	joinFrom = (options) => {};
	joinTo = (options) => {};
	not = (options) => {};
	or = (options) => {};

	@addPromise()
	run = () => {};

	@addPromise()
	runPaged = () => {};

	toSuiteQL = () => {};
}

module.exports = Query;
