import serverWidget from "../../../lib/mocks/ui/serverWidget/index.cjs";

let field;
beforeEach(() => {
	field = new serverWidget.Field({});
});

describe("ui/serverWidget.Field", () => {
	describe("addSelectOption", () => {
		it("should add select option", () => {
			field.addSelectOption({
				value: "test",
				text: "test",
			});
			expect(field.options.length > 0);
		});
	});

	describe("getSelectOptions", () => {
		it("should return select options", () => {
			field.options = [{ value: "test", text: "test" }];
			expect(field.getSelectOptions()).toEqual([{ value: "test", text: "test" }]);
		});
	});

	describe("setHelpText", () => {
		it("should set help text", () => {
			field.setHelpText({ help: "test" });
			expect(field.help).toBe("test");
		});
	});

	describe("updateBreakType", () => {
		it("should set break type", () => {
			field.updateBreakType({ breakType: serverWidget.FieldBreakType.NONE });
			expect(field.breakType).toBe(serverWidget.FieldBreakType.NONE);
		});
		it("should error if break type is invalid", () => {
			expect(() => {
				field.updateBreakType({ breakType: "test" });
			}).toThrow();
		});
	});

	describe("updateDisplaySize", () => {
		it("should set display size", () => {
			field.updateDisplaySize({ width: 100, height: 100 });
			expect(field.width).toBe(100);
			expect(field.height).toBe(100);
		});
	});

	describe("updateDisplayType", () => {
		it("should set display type", () => {
			field.updateDisplayType({ displayType: serverWidget.FieldDisplayType.DISABLED });
			expect(field.displayType).toBe(serverWidget.FieldDisplayType.DISABLED);
		});
		it("should error if break type is invalid", () => {
			expect(() => {
				field.updateDisplayType({ displayType: "test" });
			}).toThrow();
		});
	});

	describe("updateLayoutType", () => {
		it("should set layout type", () => {
			field.updateLayoutType({ layoutType: serverWidget.FieldLayoutType.ENDROW });
			expect(field.layoutType).toBe(serverWidget.FieldLayoutType.ENDROW);
		});
		it("should error if layout type is invalid", () => {
			expect(() => {
				field.updateLayoutType({ layoutType: "test" });
			}).toThrow();
		});
	});
});
