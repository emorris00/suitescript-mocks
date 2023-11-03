const { options, required, assignConstructor } = require("../../helpers.cjs");

@assignConstructor()
class Reader {
	contents = "";
	pointer = 0;

	@options("number")
	@required("number")
	readChars = (options) => {
		const oldPointer = this.pointer;
		this.pointer = Math.min(this.pointer + options.number, this.contents.length);
		return this.contents.substring(oldPointer, this.pointer);
	};

	@options("tag")
	@required("tag")
	readUntil = (options) => {
		const oldPointer = this.pointer;
		const index = this.contents.indexOf(options.tag, this.pointer);
		this.pointer = index >= 0 ? index + options.tag.length : this.contents.length;
		return this.contents.substring(oldPointer, this.pointer);
	};

	reset = () => {
		this.pointer = 0;
	};
}

module.exports = Reader;
