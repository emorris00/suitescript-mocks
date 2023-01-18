const { options, required, assignConstructor } = require("../../../helpers.cjs");
const serverWidgetStub = require("suitecloud-unit-testing-stubs/stubs/serverWidget.js");

@assignConstructor()
class Field {
	alias;
	defaultValue;
	helpText;
	id;
	isMandatory = false;
	label;
	linkText;
	maxLength;
	padding;
	richTextHeight;
	richTextWidth;
	type;
	source;
	container;
	help;
	options = [];
	height;
	width;

	@options("value", "text", "isSelected")
	@required("value", "text")
	addSelectOption = (options) => {
		this.options.push(options);
	};

	// TODO
	@options("filter", "filteroperator")
	getSelectOptions = (options) => {
		return this.options;
	};

	@options("help", "showInlineForAssistant")
	@required("help")
	setHelpText = (options) => {
		this.help = options.help;
		return this;
	};

	@options("breakType")
	@required("breakType")
	updateBreakType = (options) => {
		if (!Object.values(serverWidgetStub.FieldBreakType).includes(options.breakType)) {
			throw new Error("Invalid value for breakType");
		}
		this.breakType = options.breakType;
		return this;
	};

	@options("height", "width")
	@required("height", "width")
	updateDisplaySize = (options) => {
		this.height = options.height;
		this.width = options.width;
		return this;
	};

	@options("displayType")
	@required("displayType")
	updateDisplayType = (options) => {
		if (!Object.values(serverWidgetStub.FieldDisplayType).includes(options.displayType)) {
			throw new Error("Invalid value for displayType");
		}
		this.displayType = options.displayType;
		return this;
	};

	@options("layoutType")
	@required("layoutType")
	updateLayoutType = (options) => {
		if (!Object.values(serverWidgetStub.FieldLayoutType).includes(options.layoutType)) {
			throw new Error("Invalid value for layoutType");
		}
		this.layoutType = options.layoutType;
		return this;
	};
}

module.exports = Field;
