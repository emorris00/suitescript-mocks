const { assignConstructor, required } = require("../../helpers.cjs");

@assignConstructor()
class Field {
	label;
	id;
	type;
	isMandatory;
	sublistId;
	isDisplay;

	@required("filter", "operator")
	getSelectOptions = (options) => {};
}

module.exports = Field;
