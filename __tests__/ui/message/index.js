const SuiteScriptMocks = require("../../../index.cjs");
const message = require("../../../lib/mocks/ui/message/index.cjs");

beforeEach(() => {
	SuiteScriptMocks.reset();
});
describe("ui/message", () => {
	describe("create", () => {
		it("should return a Message", () => {
			expect(message.create({ type: message.Type.ERROR, title: "test" })).toBeInstanceOf(message.Message);
		});
		it("should add to SuiteScriptMocks.messages", () => {
			message.create({ type: message.Type.ERROR, title: "test" });
			expect(SuiteScriptMocks.messages).toHaveLength(1);
			expect(SuiteScriptMocks.messages[0].type).toBe(message.Type.ERROR);
			expect(SuiteScriptMocks.messages[0].title).toBe("test");
		});
	});
});
