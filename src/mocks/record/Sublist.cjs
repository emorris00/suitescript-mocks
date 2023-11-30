const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Sublist {
	id;
	isChanged = false;
	isDisplay = true;
	type;
}

module.exports = Sublist;
