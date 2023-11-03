import file from "../../lib/mocks/file/index.cjs";

let reader;
beforeEach(() => {
	reader = new file.Reader({
		contents: "this is a test or something like that",
	});
});

describe("file.Reader", () => {
	describe("readChars", () => {
		it("should return the next number of chars", () => {
			expect(reader.readChars(5)).toBe("this ");
			expect(reader.readChars(5)).toBe("is a ");
		});
		it("should stop at the end of the contents", () => {
			reader.pointer = reader.contents.length - 2;
			expect(reader.readChars(5)).toBe("at");
			expect(reader.pointer).toBe(reader.contents.length);
		});
		it("should return blank if pointer is at end of the file", () => {
			reader.pointer = reader.contents.length;
			expect(reader.readChars(5)).toBe("");
			expect(reader.pointer).toBe(reader.contents.length);
		});
	});

	describe("readUntil", () => {
		it("should return the next chars up until and including the supplied tag", () => {
			expect(reader.readUntil(" ")).toBe("this ");
			expect(reader.readUntil(" ")).toBe("is ");
			expect(reader.readUntil("test")).toBe("a test");
		});
		it("should return the rest of the contents if the supplied tag is not found", () => {
			expect(reader.readUntil("banana")).toBe(reader.contents);
			expect(reader.pointer).toBe(reader.contents.length);
		});
		it("should return blank if pointer is at end of the file", () => {
			reader.pointer = reader.contents.length;
			expect(reader.readUntil("test")).toBe("");
			expect(reader.pointer).toBe(reader.contents.length);
		});
	});

	describe("reset", () => {
		it("should set the pointer to 0", () => {
			reader.pointer = 20;
			reader.reset();
			expect(reader.pointer).toBe(0);
		});
	});
});
