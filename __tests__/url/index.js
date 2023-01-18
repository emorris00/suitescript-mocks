import url from "../../lib/mocks/url/index.cjs";

describe("url", () => {
	describe("format", () => {
		it("should create url out of domain and params", () => {
			const blah = url.format("https://www.google.com", {
				test: "test",
			});
			expect(blah).toBe("https://www.google.com?test=test");
		});
	});

	describe("resolveDomain", () => {});
	describe("resolveRecord", () => {});
	describe("resolveScript", () => {});
	describe("resolveTaskLink", () => {});
});
