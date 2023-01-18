import serverWidget from "../../../lib/mocks/ui/serverWidget/index.cjs";

describe("ui/serverWidget", () => {
	describe("createAssistant", () => {});

	describe("createForm", () => {
		it("should return a form", () => {
			const form = serverWidget.createForm({
				title: "test",
			});
			expect(form).toBeInstanceOf(serverWidget.Form);
		});
	});

	describe("createList", () => {});
});
