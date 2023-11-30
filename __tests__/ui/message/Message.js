const message = require("../../../lib/mocks/ui/message/index.cjs");

let Message;
beforeEach(() => {
	Message = new message.Message({ type: message.Type.ERROR, title: "test" });
});
describe("ui/message/Message", () => {
	describe("hide", () => {
		it("should set visible to false", () => {
			Message.visible = true;
			Message.hide();
			expect(Message.visible).toBe(false);
		});
	});

	describe("show", () => {
		it("should set visible to true", () => {
			Message.visible = false;
			Message.show();
			expect(Message.visible).toBe(true);
		});
	});
});
