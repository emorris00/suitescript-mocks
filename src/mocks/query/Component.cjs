const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Component {
	child;
	parent;
	source;
	target;
	type;

	autoJoin = (options) => {};

	createColumn = (options) => {};

	createCondition = (options) => {};

	createSort = (options) => {};

	join = (options) => {};

	joinFrom = (options) => {};

	joinTo = (options) => {};
}
module.exports = Component;
