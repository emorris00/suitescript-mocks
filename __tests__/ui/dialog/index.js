import SuiteScriptMocks from "../../..";
import dialog from "../../../lib/mocks/ui/dialog/index.cjs";

beforeEach(() => {
	SuiteScriptMocks.reset();
});
describe("ui/dialog", () => {
	describe("alert", () => {
		it("should add to SuiteScriptMocks.dialogs with type alert", () => {
			dialog.alert("title", "message");
			expect(SuiteScriptMocks.dialogs).toHaveLength(1);
			expect(SuiteScriptMocks.dialogs[0]).toEqual({
				title: "title",
				message: "message",
				type: "alert",
			});
		});
	});

	describe("confirm", () => {
		it("should add to SuiteScriptMocks.dialogs with type confirm", () => {
			dialog.confirm("title", "message");
			expect(SuiteScriptMocks.dialogs).toHaveLength(1);
			expect(SuiteScriptMocks.dialogs[0]).toEqual({
				title: "title",
				message: "message",
				type: "confirm",
			});
		});
		it("should return the first value in SuiteScriptMocks.dialogResults as boolean", () => {
			SuiteScriptMocks.dialogResults.push(true);
			expect(dialog.confirm()).toBe(true);

			SuiteScriptMocks.dialogResults.push(false);
			expect(dialog.confirm()).toBe(false);

			SuiteScriptMocks.dialogResults.push("test");
			expect(dialog.confirm()).toBe(true);
		});
		it("should return false if there is no value in SuiteScriptMocks.dialogResults", () => {
			expect(dialog.confirm()).toBe(false);
		});
	});

	describe("create", () => {
		it("should add to SuiteScriptMocks.dialogs with type create", () => {
			dialog.create({ title: "title", message: "message" });
			expect(SuiteScriptMocks.dialogs).toHaveLength(1);
			expect(SuiteScriptMocks.dialogs[0]).toEqual({
				title: "title",
				message: "message",
				type: "create",
			});
		});
		it("should return a promise", () => {
			expect(dialog.create()).toBeInstanceOf(Promise);
		});
		it("should resolve to first value in SuiteScriptMocks.dialogResults", () => {
			SuiteScriptMocks.dialogResults.push("test");
			dialog.create().then((result) => {
				expect(result).toBe("test");
			});

			dialog.create().then((result) => {
				expect(result).toBe(undefined);
			});
		});
	});
});
