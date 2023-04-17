import search from "../../lib/mocks/search/index.cjs";

let Result;
beforeEach(() => {
	Result = new search.Result({
		id: 1,
		type: "salesorder",
		columns: [
			new search.Column({ name: "test" }),
			new search.Column({ name: "test2", label: "test2" }),
			new search.Column({ name: "test3", sort: "ASC" }),
		],
		values: [1, { value: 2 }, { value: 3, text: "test3" }],
	});
});

describe("search.Result", () => {
	describe("getText", () => {
		it("should work if supplied a column", () => {
			expect(Result.getText(Result.columns[0])).toBe(1);
		});
		it("should work if supplied options", () => {
			expect(Result.getText("test")).toBe(1);
		});
		it("should work if column has label set", () => {
			expect(Result.getText("test2")).toBe(2);
		});
		it("should work if column has sort set", () => {
			expect(Result.getText("test3")).toBe("test3");
		});
		it("should return text if field is object and text exists", () => {
			expect(Result.getText("test3")).toBe("test3");
		});
		it("should return value if field is object and text doesn't exist", () => {
			expect(Result.getText("test2")).toBe(2);
		});
		it("should return field if field isn't object", () => {
			expect(Result.getText("test")).toBe(1);
		});
		it("should reutrn text or value if column has label set", () => {
			expect(Result.getValue("test2")).toBe(2);
		});
		it("should reutrn value if column has sort set", () => {
			expect(Result.getValue("test3")).toBe(3);
		});
	});

	describe("getValue", () => {
		it("should work if supplied a column", () => {
			expect(Result.getValue(Result.columns[0])).toBe(1);
			expect(Result.getValue(Result.columns[1])).toBe(2);
			expect(Result.getValue(Result.columns[2])).toBe(3);
		});
		it("should work if supplied string", () => {
			expect(Result.getValue("test")).toBe(1);
			expect(Result.getValue("test2")).toBe(2);
			expect(Result.getValue("test3")).toBe(3);
		});
		it("should work if supplied options", () => {
			expect(Result.getValue({ name: "test" })).toBe(1);
			expect(Result.getValue({ name: "test2" })).toBe(2);
			expect(Result.getValue({ name: "test3" })).toBe(3);
		});
		it("should work if column has label set", () => {
			expect(Result.getValue("test2")).toBe(2);
		});
		it("should work if column has sort set", () => {
			expect(Result.getValue("test3")).toBe(3);
		});
		it("should return value if field is object", () => {
			expect(Result.getValue("test3")).toBe(3);
		});
		it("should return field if field isn't object", () => {
			expect(Result.getValue("test")).toBe(1);
		});
	});
});
