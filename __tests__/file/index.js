import SuiteScriptMocks from "../../index.cjs";
import file from "../../lib/mocks/file/index.cjs";

let File;
beforeEach(() => {
	SuiteScriptMocks.reset();
	File = new file.File({
		id: 1,
		name: "test.csv",
		fileType: file.Type.CSV,
		folder: 1,
	});
	SuiteScriptMocks.files = [File];
});
describe("file", () => {
	describe("copy", () => {
		it("should throw error if file does not exist", () => {
			expect(() => {
				file.copy({ folder: 2, id: 99999 });
			}).toThrow();
		});
		it("should throw if conflictResolution is invalid", () => {
			expect(() => {
				file.copy({ folder: 2, id: 1, conflictResolution: "test" });
			}).toThrow();
		});
		it("should not modify original file when modifying copy", () => {
			const copy = file.copy({ folder: 2, id: 1 });
			copy.name = "test2.csv";
			expect(File.name).toBe("test.csv");
		});
		it("should throw if conflictResolution is FAIL and file with that name already exists in the folder", () => {
			expect(() => {
				file.copy({ folder: 1, id: 1 });
			}).toThrow();
			expect(() => {
				file.copy({ folder: 1, id: 1, conflictResolution: file.NameConflictResolution.FAIL });
			}).toThrow();
		});
		it("should overwrite file if conflictResolution is OVERWRITE and file with that name already exists in the folder", () => {
			const copy = file.copy({ folder: 1, id: 1, conflictResolution: file.NameConflictResolution.OVERWRITE });
			expect(copy.id).toBe(1);
			expect(copy).not.toBe(File);
		});
		it("should overwrite file if conflictResolution is OVERWRITE_CONTENT_AND_ATTRIBUTES and file with that name already exists in the folder", () => {
			const copy = file.copy({
				folder: 1,
				id: 1,
				conflictResolution: file.NameConflictResolution.OVERWRITE_CONTENT_AND_ATTRIBUTES,
			});
			expect(copy.id).toBe(1);
			expect(copy).not.toBe(File);
		});
		it("should rename file if conflictResolution is RENAME_TO_UNIQUE and file with that name already exists in the folder", () => {
			const copy = file.copy({
				folder: 1,
				id: 1,
				conflictResolution: file.NameConflictResolution.RENAME_TO_UNIQUE,
			});
			expect(copy.id).toBe(2);
			expect(copy).not.toBe(File);
			expect(copy.name).toBe("test(1).csv");

			const copy2 = file.copy({
				folder: 1,
				id: 1,
				conflictResolution: file.NameConflictResolution.RENAME_TO_UNIQUE,
			});
			expect(copy2.id).toBe(3);
			expect(copy2).not.toBe(File);
			expect(copy2.name).toBe("test(2).csv");
		});
		it("should return copy of file", () => {
			const copy = file.copy({ folder: 2, id: 1 });
			expect(copy.id).toBe(2);
			expect(copy).not.toBe(File);
		});
	});

	describe("create", () => {
		it("should return new file", () => {
			const rec = file.create({
				name: "test.csv",
				fileType: file.Type.CSV,
			});
			expect(rec).toBeInstanceOf(file.File);
			expect(rec).toMatchObject({
				id: null,
				name: "test.csv",
				fileType: file.Type.CSV,
			});
		});
	});

	describe("delete", () => {
		it("should delete file if it exists", () => {
			file.delete({ id: 1 });
			expect(SuiteScriptMocks.files.length).toBe(0);
		});
		it("should return id of deleted file", () => {
			expect(file.delete({ id: 1 })).toBe(1);
		});
		it("should throw error if file doesn't exist", () => {
			expect(() => {
				file.delete({ id: 99999 });
			}).toThrow();
		});
		it("should add deleted file to SuiteScriptMocks.deletedFiles", () => {
			file.delete({ id: 1 });
			expect(SuiteScriptMocks.deletedFiles).toHaveLength(1);
			expect(SuiteScriptMocks.deletedFiles[0].id).toBe(1);
		});
	});

	describe("load", () => {
		it("should return copy of file if it exists", () => {
			const rec = file.load({ id: 1 });
			expect(rec).not.toBe(File);
			expect(rec.id).toBe(1);
		});
		it("should throw error if file doesn't exist", () => {
			expect(() => {
				file.load({ id: 99999 });
			}).toThrow();
		});
		it("should not modify original file when modifying loaded file before save", () => {
			const loadedfile = file.load({ id: 1 });
			loadedfile.name = "test2.csv";
			expect(File.name).toBe("test.csv");
		});
		it("should set savedContents on file to files contents", () => {
			File.savedContents = "";
			const loadedfile = file.load({ id: 1 });
			expect(loadedfile.savedContents).toBe(loadedfile.contents);
		});
	});
});
