const fileStub = require("suitecloud-unit-testing-stubs/stubs/file");
const { options, required } = require("../../helpers.cjs");
const SuiteScriptMocks = require("../../index.cjs");
const Reader = require("./Reader.cjs");
const File = require("./File.cjs");

class FileModule {
	Encoding = fileStub.Encoding;
	NameConflictResolution = fileStub.NameConflictResolution;
	Type = fileStub.Type;

	File = File;
	Reader = Reader;

	@required("folder", "id")
	copy = (options) => {
		const file = this.load(options.id);
		file.id = null;
		file.folder = options.folder;
		const resolutionType = options.conflictResolution || this.NameConflictResolution.FAIL;
		if (!Object.values(this.NameConflictResolution).includes(resolutionType)) {
			throw new Error("Invalid value for conflictResolution");
		}
		let existingFile = SuiteScriptMocks.files.get({ folder: options.folder, name: file.name });
		if (existingFile) {
			switch (resolutionType) {
				case this.NameConflictResolution.FAIL:
					throw new Error("File with that name already exists in that folder");
				case this.NameConflictResolution.OVERWRITE:
				case this.NameConflictResolution.OVERWRITE_CONTENT_AND_ATTRIBUTES:
					file.id = existingFile.id;
					break;
				case this.NameConflictResolution.RENAME_TO_UNIQUE:
					while (existingFile) {
						const curNum = +file.name.match(/^.+\((\d+)\)\.[a-z]+$/i)?.[1] || 0;
						file.name = file.name.replace(/^(.+?)(\(\d+\))?\.([a-z]+)$/i, `$1(${curNum + 1}).$3`);
						existingFile = SuiteScriptMocks.files.get({ folder: options.folder, name: file.name });
					}
			}
		}
		file.save();
		return file;
	};

	@required("name", "fileType")
	create = (options) => {
		return new File(options);
	};

	@options("id")
	@required("id")
	delete = (options) => {
		const file = SuiteScriptMocks.files.get(options);
		if (!file) {
			throw new Error("File does not exist");
		}
		SuiteScriptMocks.deletedFiles.push(file);
		SuiteScriptMocks.files.delete(file);
		return file.id;
	};

	@options("id")
	@required("id")
	load = (options) => {
		const file = SuiteScriptMocks.files.get(options);
		if (!file) {
			throw new Error("File does not exist");
		}
		file.savedContents = file.contents;
		return new File({ ...file });
	};
}

module.exports = new FileModule();
