import runtime from "../../lib/mocks/runtime/index.cjs";

let Script;
beforeEach(() => {
	Script = new runtime.Script({
		parameters: {
			custscript_test: "test",
		},
	});
});

describe("runtime.Script", () => {
	describe("getParameter", () => {
		it("should return parameter value if it exists", () => {
			expect(Script.getParameter("custscript_test")).toBe("test");
		});
		it("should return undefined if parameter doesn't exist", () => {
			expect(Script.getParameter("doesntexist")).toBe(undefined);
		});
	});

	describe("getRemainingUsage", () => {
		it("should return number above 0", () => {
			expect(Script.getRemainingUsage()).toBeGreaterThan(0);
		});
	});
});
