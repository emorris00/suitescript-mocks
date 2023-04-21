import SuiteScriptMocks from "../../index.js";
import search from "../../lib/mocks/search/index.cjs";

beforeEach(() => {
	SuiteScriptMocks.searches = [
		{
			id: "customsearch_1",
			searchId: 1,
			searchType: search.Type.SALES_ORDER,
			title: "Test Search",
			columns: ["internalid"],
			filters: [["internalid", "anyof", [1]]],
			results: [{ id: 1, values: [1] }],
		},
	];
	SuiteScriptMocks.searchResults = [[{ id: 1, values: [1] }]];
});

describe("search", () => {
	describe("create", () => {
		it("should return a search.Search", () => {
			expect(
				search.create({
					type: search.Type.SALES_ORDER,
					columns: ["internalid"],
					filters: [["internalid", "anyof", [1]]],
				})
			).toBeInstanceOf(search.Search);
		});
		it("should create search with results", () => {
			const s = search.create({
				type: search.Type.SALES_ORDER,
				columns: ["internalid"],
				filters: [["internalid", "anyof", [1]]],
			});
			expect(s.results.length).toBe(1);
			expect(s.results[0]).toBeInstanceOf(search.Result);
		});
		it("should create search with correct results", () => {
			const s = search.create({
				type: search.Type.SALES_ORDER,
				columns: ["internalid"],
				filters: [["internalid", "anyof", [1]]],
			});
			expect(s.results.length).toBe(1);
			expect(s.results[0].getValue("internalid")).toBe(1);
		});
		it("should create valid columns when using dot join notation", () => {
			const s = search.create({
				type: search.Type.SALES_ORDER,
				columns: ["item.displayname"],
			});
			expect(s.columns[0].join).toBe("item");
			expect(s.columns[0].name).toBe("displayname");
		});
		it("should not error when not providing columns", () => {
			expect(() => {
				search.create({
					type: search.Type.SALES_ORDER,
					filters: [],
				});
			}).not.toThrow();
		});
	});

	describe("createColumn", () => {
		it("should return a search.Column", () => {
			expect(search.createColumn()).toBeInstanceOf(search.Column);
		});
	});

	describe("createFilter", () => {
		it("should return a search.Filter", () => {
			expect(search.createFilter()).toBeInstanceOf(search.Filter);
		});
	});

	describe("delete", () => {
		it("should throw error if search doesn't exist", () => {
			expect(() => {
				search.delete({ id: 99999 });
			}).toThrow();
		});
		it("should delete search when supplied internal id", () => {
			search.delete({ id: 1 });
			expect(SuiteScriptMocks.searches.length).toBe(0);
		});
		it("should delete search when supplied script id", () => {
			search.delete({ id: "customsearch_1" });
			expect(SuiteScriptMocks.searches.length).toBe(0);
		});
	});

	describe("load", () => {
		it("should throw error if search doesn't exist", () => {
			expect(() => {
				search.load({ id: 99999 });
			}).toThrow();
		});
		it("should return search when supplied internal id", () => {
			expect(search.load({ id: 1 })).toBe(SuiteScriptMocks.searches[0]);
		});
		it("should return search when supplied script id", () => {
			expect(search.load({ id: "customsearch_1" })).toBe(SuiteScriptMocks.searches[0]);
		});
	});

	describe("lookupFields", () => {
		// TODO
	});
});
