const Column = require("./Column.cjs");
const { options, assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Result {
	id;
	recordType;
	columns;
	values = [];

	@options("name", "join", "summary", "func")
	getText = (options) => {
		const column = typeof options.name === "object" && options.name instanceof Column ? options.name : options;
		const index = this.columns.findIndex((a) => a.equals(column));
		const field = this.values[index];
		return typeof field === "object" && field !== null ? field.text || field.value : field;
	};

	@options("name", "join", "summary", "func")
	getValue = (options) => {
		const column = typeof options.name === "object" && options.name instanceof Column ? options.name : options;
		const index = this.columns.findIndex((a) => a.equals(column));
		const field = this.values[index];
		return typeof field === "object" && field !== null ? field.value : field;
	};
}

module.exports = Result;
