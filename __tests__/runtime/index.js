import SuiteScriptMocks from "../../lib/index.cjs";
import runtime from "../../lib/mocks/runtime/index.cjs";

describe("runtime", () => {
	describe("getCurrentScript", () => {
		it("should return current script", () => {
			SuiteScriptMocks.currentScript = new runtime.Script({});
			expect(runtime.getCurrentScript()).toBe(SuiteScriptMocks.currentScript);
		});
	});

	describe("getCurrentSession", () => {
		it("should return current session", () => {
			SuiteScriptMocks.currentSession = new runtime.Session({});
			expect(runtime.getCurrentSession()).toBe(SuiteScriptMocks.currentSession);
		});
	});

	describe("getCurrentUser", () => {
		it("should return current user", () => {
			SuiteScriptMocks.currentUser = new runtime.User({});
			expect(runtime.getCurrentUser()).toBe(SuiteScriptMocks.currentUser);
		});
	});
});
