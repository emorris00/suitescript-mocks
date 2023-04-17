const { options, assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Column {
	name;
	join;
	summary;
	formula;
	function;
	label;
	sort;

	initialize() {
		if (this.sort && !["ASC", "DESC", "NONE"].includes(this.sort)) {
			throw new Error(`Column.sort must be one of ["ASC","DESC","NONE"]`);
		}
	}

	@options("name", "join")
	setWhenOrderedBy = () => {};

	equals = (column2) => {
		const format = (value) => String(value ? value : "").toLowerCase();

		return ["name", "join", "summary", "formula", "function"].every(
			(key) => format(this[key]) == format(column2[key])
		);
	};
}

module.exports = Column;
