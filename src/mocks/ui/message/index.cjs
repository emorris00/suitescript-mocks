const messageStub = require("suitecloud-unit-testing-stubs/stubs/message.js");
const SuiteScriptMocks = require("../../../index.cjs");
const { required } = require("../../../helpers.cjs");
const Message = require("./Message.cjs");

class MessageModule {
	Type = messageStub.Type;

	Message = Message;

	@required("type", "title")
	create = (options) => {
		const message = new this.Message(options);
		SuiteScriptMocks.messages.push(message);
		return message;
	};
}

module.exports = new MessageModule();
