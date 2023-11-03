import SuiteScriptMocks from "../..";
import Iterator from "../../lib/iterator.cjs";
import file from "../../lib/mocks/file/index.cjs";

let File;
let createdFile;
beforeEach(() => {
	SuiteScriptMocks.reset();
	File = new file.File({
		id: 1,
		folder: 1,
		name: "test.csv",
		fileType: file.Type.CSV,
		contents: "this is a test",
	});
	createdFile = new file.File({
		folder: 2,
		name: "test.csv",
		fileType: file.Type.CSV,
		contents: "this is a test",
	});
});
describe("file.File", () => {
	describe("appendLine", () => {
		it("should add line to contents", () => {
			File.appendLine({ value: "another line" });
			expect(File.contents).toBe("this is a test\nanother line");
		});
	});

	describe("getContents", () => {
		it("should return the saved file contents", () => {
			expect(File.getContents()).toBe("this is a test");
		});
		it("should error if called directly after resetStream on created file", () => {
			createdFile.resetStream();
			expect(() => {
				createdFile.getContents();
			}).toThrow();
		});
		it("should return current contents when called for the first time on created file", () => {
			expect(createdFile.getContents()).toBe("this is a test");
		});
		it("should always return same value when called on created file", () => {
			expect(createdFile.getContents()).toBe("this is a test");
			createdFile.resetStream();
			createdFile.appendLine({ value: "another line" });
			expect(createdFile.getContents()).toBe("this is a test");
		});
	});

	describe("getReader", () => {
		it("should return Reader object", () => {
			expect(File.getReader()).toBeInstanceOf(file.Reader);
		});
		it("should return Reader of saved file contents", () => {
			expect(File.getReader().contents).toBe("this is a test");
		});
		it("should return blank Reader if called before getContents on created file", () => {
			expect(createdFile.getReader().contents).toBe("");
		});
		it("should return Reader for same value of getContents if called after getContents and before resetStream on created file", () => {
			createdFile.getContents();
			expect(createdFile.getReader().contents).toBe("this is a test");
		});
		it("should return Reader for same value of getContents if called after getContents and before resetStream on created file", () => {
			createdFile.resetStream();
			createdFile.appendLine({ value: "another line" });
			createdFile.getContents();
			expect(createdFile.getReader().contents).toBe("another line");
		});
		it("should return blank Reader if called after getContents and resetStream on created file", () => {
			createdFile.getContents();
			createdFile.resetStream();
			expect(createdFile.getReader().contents).toBe("");
		});
	});

	describe("getSegments", () => {
		it("should throw if separator is not a string", () => {
			expect(() => {
				File.getSegments(4);
			}).toThrow();
		});
		it("should return iterator of saved file contents split by separator", () => {
			const iterator = File.getSegments(" ").iterator();
			expect(iterator).toBeInstanceOf(Iterator);
			expect(iterator.values).toEqual(["this", "is", "a", "test"]);
		});
		it("should return blank iterator if file wasn't loaded", () => {
			const File = file.create({ name: "test.csv", fileType: file.Type.CSV, contents: "1 2 3" });
			const iterator = File.getSegments(" ").iterator();
			expect(iterator.next()).toEqual({ value: undefined, done: true });
		});
	});

	describe("resetStream", () => {
		it("should reset iterators", () => {
			const iterator1 = File.lines.iterator();
			const iterator2 = File.getSegments({ separator: " " }).iterator();
			expect(iterator1.next()).toEqual({ value: "this is a test", done: false });
			expect(iterator2.next()).toEqual({ value: "this", done: false });
			File.resetStream();
			expect(iterator1.next()).toEqual({ value: "this is a test", done: false });
			expect(iterator2.next()).toEqual({ value: "this", done: false });
		});
		it("should reset readers", () => {
			const reader = File.getReader();
			expect(reader.readUntil("banana")).toBe("this is a test");
			expect(reader.readUntil("banana")).toBe("");
			File.resetStream();
			expect(reader.readUntil("banana")).toBe("this is a test");
		});
		it("should blank out readers on created files", () => {
			createdFile.getContents();
			const reader = createdFile.getReader();
			expect(reader.readUntil("banana")).toBe("this is a test");
			expect(reader.readUntil("banana")).toBe("");
			File.resetStream();
			expect(reader.readUntil("banana")).toBe("");
		});
	});

	describe("save", () => {
		it("should error if called directly after resetStream on created file", () => {
			createdFile.resetStream();
			expect(() => {
				createdFile.save();
			}).toThrow();
		});
		it("should error if folder isn't set", () => {
			delete createdFile.folder;
			expect(() => {
				createdFile.save();
			}).toThrow();
		});
		it("should add created file to SuiteScriptMocks.createdFiles", () => {
			createdFile.save();
			expect(SuiteScriptMocks.createdFiles).toHaveLength(1);
			expect(SuiteScriptMocks.savedFiles).toHaveLength(1);
		});
		it("should add file to SuiteScriptMocks.savedFiles", () => {
			File.save();
			expect(SuiteScriptMocks.savedFiles).toHaveLength(1);
		});
		it("should update existing file", () => {
			File.contents = "update file";
			File.save();
			expect(SuiteScriptMocks.files[0].contents).toBe("update file");
		});
		it("should save copy of file", () => {
			File.save();
			expect(SuiteScriptMocks.files[0]).not.toBe(File);
		});
		it("should save without frozenContents and frozenContents2", () => {
			File.frozenContents = "test";
			File.frozenContents2 = "test";
			File.save();
			File = file.load(File.id);
			expect(File.frozenContents).toBe(null);
			expect(File.frozenContents2).toBe(null);
		});
	});
});
