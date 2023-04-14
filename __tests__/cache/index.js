import SuiteScriptMocks from "../../index.cjs";
import cache from "../../lib/mocks/cache/index.cjs";

let Cache;
beforeEach(() => {
	SuiteScriptMocks.reset();
	(Cache = new cache.Cache({
		name: "test",
		scope: cache.Scope.PRIVATE,
		values: { test: "test" },
	})),
		(SuiteScriptMocks.caches = [Cache]);
});
describe("cache", () => {
	describe("getCache", () => {
		it("should return existing cache if it exists", () => {
			const c = cache.getCache("test", cache.Scope.PRIVATE);
			expect(c).toBe(Cache);
		});
		it("should default to PRIVATE scope", () => {
			const c = cache.getCache("test");
			expect(c).toBe(Cache);
		});
		it("should return a new cache if scope is different", () => {
			const c = cache.getCache("test", cache.Scope.PUBLIC);
			expect(c).not.toBe(Cache);
			expect(c).toBeInstanceOf(cache.Cache);
		});
		it("should return a new cache if it doesn't exist", () => {
			const c = cache.getCache("doesntexist");
			expect(c).not.toBe(Cache);
			expect(c).toBeInstanceOf(cache.Cache);
		});
		it("should add to SuiteScriptMocks.caches", () => {
			cache.getCache("doesntexist");
			expect(Array.from(SuiteScriptMocks.caches.values()).length).toBe(2);
		});
	});
});
