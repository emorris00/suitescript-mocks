import cache from "../../lib/mocks/cache/index.cjs";

let Cache;
beforeEach(() => {
	Cache = new cache.Cache({
		name: "test",
		scope: cache.Scope.PRIVATE,
		values: { test: "test" },
	});
});
describe("cache.Cache", () => {
	describe("get", () => {
		it("should return value if it exists", () => {
			expect(Cache.get("test")).toBe("test");
		});
		it("should return value from loader function result if value doesn't already exist", () => {
			expect(Cache.get("doesntexist", () => "test2")).toBe("test2");
		});
		it("should return value not from loader function result if value exists", () => {
			expect(Cache.get("test", () => "test2")).toBe("test");
		});
	});

	describe("put", () => {
		it("should set value", () => {
			Cache.put("test", "test2");
			expect(Cache.values.test).toBe("test2");
		});
	});

	describe("remove", () => {
		it("should remove value", () => {
			Cache.remove("test");
			expect(Cache.values.test).toBe(undefined);
		});
	});
});
