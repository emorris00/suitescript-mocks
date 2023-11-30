const { assignConstructor } = require("../../../helpers.cjs");

@assignConstructor()
class Message {
	type;
	title = "";
	message = "";
	duration = 0;

	visible = false;

	hide = () => {
		this.visible = false;
	};

	show = () => {
		this.visible = true;
	};
}

module.exports = Message;
