import SuiteScriptMocks from "../../lib/index.cjs";
import runtime from "../../lib/mocks/runtime/index.cjs";

describe("runtime", () => {
	describe("getCurrentScript", () => {
		it("should return current script", () => {
			expect(runtime.getCurrentScript() instanceof runtime.Script).toBe(true);
			expect(runtime.getCurrentScript()).toBe(SuiteScriptMocks.currentScript);
		});
	});

	describe("getCurrentSession", () => {
		it("should return current session", () => {
			expect(runtime.getCurrentSession() instanceof runtime.Session).toBe(true);
			expect(runtime.getCurrentSession()).toBe(SuiteScriptMocks.currentSession);
		});
	});

	describe("getCurrentUser", () => {
		it("should return current user", () => {
			expect(runtime.getCurrentUser() instanceof runtime.User).toBe(true);
			expect(runtime.getCurrentUser()).toBe(SuiteScriptMocks.currentUser);
		});
	});
});
