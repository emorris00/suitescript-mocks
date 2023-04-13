import SuiteScriptMocks from "../index.cjs";

const consoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
const consoleInfo = jest.spyOn(console, "info").mockImplementation(() => {});
beforeEach(() => {
	SuiteScriptMocks.reset();
	jest.clearAllMocks();
});
describe("index.js", () => {
	describe("outputDebugLogs", () => {
		it("should output debug logs to console when true", () => {
			SuiteScriptMocks.outputDebugLogs = true;
			log.debug("test");
			expect(consoleLog).toHaveBeenCalled();
		});
		it("should not output debug logs to console when false", () => {
			SuiteScriptMocks.outputDebugLogs = false;
			log.debug("test");
			expect(consoleLog).not.toHaveBeenCalled();
		});
	});

	describe("outputErrorLogs", () => {
		it("should output error logs to console when true", () => {
			SuiteScriptMocks.outputErrorLogs = true;
			log.error("test");
			expect(consoleError).toHaveBeenCalled();
		});
		it("should not output debug logs to console when false", () => {
			SuiteScriptMocks.outputErrorLogs = false;
			log.error("test");
			expect(consoleError).not.toHaveBeenCalled();
		});
	});

	describe("outputAuditLogs", () => {
		it("should output debug logs to console when true", () => {
			SuiteScriptMocks.outputAuditLogs = true;
			log.audit("test");
			expect(consoleInfo).toHaveBeenCalled();
		});
		it("should not output debug logs to console when false", () => {
			SuiteScriptMocks.outputAuditLogs = false;
			log.audit("test");
			expect(consoleInfo).not.toHaveBeenCalled();
		});
	});
});
