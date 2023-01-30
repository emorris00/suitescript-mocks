const encodeStub = require("suitecloud-unit-testing-stubs/stubs/encode");
const { options, required } = require("../../helpers.cjs");

class EncodeModule {
	Encoding = encodeStub.Encoding;

	@options("string", "inputEncoding", "outputEncoding")
	@required("string", "inputEncoding", "outputEncoding")
	convert = (options) => {
		const map = {
			[this.Encoding.UTF_8]: "utf8",
			[this.Encoding.BASE_16]: "hex",
			[this.Encoding.HEX]: "hex",
			[this.Encoding.BASE_64]: "base64",
			[this.Encoding.BASE_64_URL_SAFE]: "base64url",
		};
		const buffer = Buffer.from(options.string, map[options.inputEncoding]);
		return buffer.toString(map[options.outputEncoding]);
	};
}

module.exports = new EncodeModule();
