import search from "../../lib/mocks/search/index.cjs";

let PagedData;
beforeEach(() => {
	PagedData = new search.PagedData({
		results: new Array(5000).fill({}),
		pageSize: 500,
	});
});

describe("search.Page", () => {
	describe("next", () => {
		it("should return next page if not the last page", () => {
			expect(PagedData.fetch({ index: 0 }).next()).toBeInstanceOf(search.Page);
		});
		it("should throw error if the last page", () => {
			expect(() => {
				PagedData.fetch({ index: 9 }).next();
			}).toThrow();
		});
	});

	describe("prev", () => {
		it("should return previous page if not the first page", () => {
			expect(PagedData.fetch({ index: 9 }).prev()).toBeInstanceOf(search.Page);
		});
		it("should throw error if the first page", () => {
			expect(() => {
				PagedData.fetch({ index: 0 }).prev();
			}).toThrow();
		});
	});
});
