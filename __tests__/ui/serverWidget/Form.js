import serverWidget from "../../../lib/mocks/ui/serverWidget/index.cjs";

let form;
beforeEach(() => {
	form = serverWidget.createForm({ title: "test" });
});

describe("ui/serverWidget.Form", () => {
	describe("addButton", () => {
		it("should add a button to the form", () => {
			form.addButton({ id: "test", label: "test" });
			expect(form.buttons).toHaveProperty("test");
		});
	});

	describe("addField", () => {
		it("should add a field to the form", () => {
			form.addField({
				id: "custpage_test",
				label: "test",
				type: serverWidget.FieldType.TEXT,
			});
			expect(form.fields).toHaveProperty("custpage_test");
		});

		it("should error if id doesn't start with custpage", () => {
			expect(() => {
				form.addField({
					id: "test",
					label: "test",
					type: serverWidget.FieldType.TEXT,
				});
			}).toThrow();
		});
	});

	describe("getButton", () => {
		it("should return button", () => {
			form.buttons = {
				test: new serverWidget.Button({ id: "test", label: "test" }),
			};
			expect(form.getButton("test")).toBe(form.buttons.test);
		});
	});

	describe("getField", () => {
		it("should return field", () => {
			form.fields = {
				custpage_test: new serverWidget.Field({ id: "test", label: "test", type: serverWidget.FieldType.TEXT }),
			};
			expect(form.getField("custpage_test")).toBe(form.fields.custpage_test);
		});
	});
});
