import SuiteScriptMocks from "../../index.cjs";
import search from "../../lib/mocks/search/index.cjs";

let Search;
beforeEach(() => {
	Search = new search.Search({
		id: "customsearch_1",
		searchId: 1,
		searchType: search.Type.TRANSACTION,
		title: "Test Search",
		columns: [],
		filters: [],
	});
	SuiteScriptMocks.searches = [Search];
	Search = new search.Search(Search);
});

describe("search.Search", () => {
	describe("run", () => {
		it("should return a search.ResultSet", () => {
			expect(Search.run()).toBeInstanceOf(search.ResultSet);
		});
	});

	describe("runPaged", () => {
		it("should error if pageSize is below 5", () => {
			expect(() => {
				Search.runPaged(4);
			}).toThrow();
		});
		it("should error if pageSize is above 1000", () => {
			expect(() => {
				Search.runPaged(1001);
			}).toThrow();
		});
		it("should return a search.PagedData", () => {
			expect(Search.runPaged()).toBeInstanceOf(search.PagedData);
		});
	});

	describe("save", () => {
		it("should throw error if search title isn't set", () => {
			Search.title = null;
			expect(() => {
				Search.save();
			}).toThrow();
		});
		it("should throw error if search with same title already exists", () => {
			Search.searchId = null;
			Search.id = "customscript_2";
			expect(() => {
				Search.save();
			}).toThrow();
		});
		it("should throw error if search with same script id already exists", () => {
			Search.searchId = null;
			Search.title = "Test Search 2";
			expect(() => {
				Search.save();
			}).toThrow();
		});
		it("should add id to search", () => {
			Search.id = null;
			Search.searchId = null;
			Search.title = "Test Search 2";
			Search.save();
			expect(Search.id).not.toBe(null);
		});
		it("should add searchId to search", () => {
			Search.id = "customsearch_2";
			Search.searchId = null;
			Search.title = "Test Search 2";
			Search.save();
			expect(Search.searchId).not.toBe(null);
		});
		it("should update search", () => {
			Search.columns = ["internalid"];
			Search.save();
			expect(SuiteScriptMocks.searches[0].columns.length).toBe(1);
		});
		it("should save copy of search", () => {
			Search.save();
			expect(SuiteScriptMocks.searches[0]).not.toBe(Search);
		});
	});
});
