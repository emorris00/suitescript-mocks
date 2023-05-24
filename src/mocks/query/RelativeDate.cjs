const { assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class RelativeDate {
	dateId;
	end;
	interval;
	isRange;
	start;
	value;
}

module.exports = RelativeDate;
