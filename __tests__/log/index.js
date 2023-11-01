import SuiteScriptMocks from "../../index.cjs";
import log from "../../lib/mocks/log/index.cjs";

const consoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
const consoleInfo = jest.spyOn(console, "info").mockImplementation(() => {});
beforeEach(() => {
	SuiteScriptMocks.reset();
	jest.clearAllMocks();
});
describe("log", () => {
	describe("audit", () => {
		it("should append log to SuiteScriptMocks.logs", () => {
			log.audit("title", "details");
			expect(SuiteScriptMocks.logs).toHaveLength(1);
			expect(SuiteScriptMocks.logs[0]).toEqual({
				title: "title",
				details: "details",
				type: "audit",
			});
		});
		it("should output console when SuiteScriptMocks.outputAuditLogs is true", () => {
			SuiteScriptMocks.outputAuditLogs = true;
			log.audit("test");
			expect(consoleInfo).toHaveBeenCalled();
		});
		it("should not output console when SuiteScriptMocks.outputAuditLogs is false", () => {
			SuiteScriptMocks.outputAuditLogs = false;
			log.audit("test");
			expect(consoleInfo).not.toHaveBeenCalled();
		});
	});

	describe("debug", () => {
		it("should append log to SuiteScriptMocks.logs", () => {
			log.debug("title", "details");
			expect(SuiteScriptMocks.logs).toHaveLength(1);
			expect(SuiteScriptMocks.logs[0]).toEqual({
				title: "title",
				details: "details",
				type: "debug",
			});
		});
		it("should output console when SuiteScriptMocks.outputDebugLogs is true", () => {
			SuiteScriptMocks.outputDebugLogs = true;
			log.debug("test");
			expect(consoleLog).toHaveBeenCalled();
		});
		it("should not output console when SuiteScriptMocks.outputDebugLogs is false", () => {
			SuiteScriptMocks.outputDebugLogs = false;
			log.debug("test");
			expect(consoleLog).not.toHaveBeenCalled();
		});
	});

	describe("emergency", () => {
		it("should append log to SuiteScriptMocks.logs", () => {
			log.emergency("title", "details");
			expect(SuiteScriptMocks.logs).toHaveLength(1);
			expect(SuiteScriptMocks.logs[0]).toEqual({
				title: "title",
				details: "details",
				type: "emergency",
			});
		});
		it("should output console when SuiteScriptMocks.outputEmergencyLogs is true", () => {
			SuiteScriptMocks.outputEmergencyLogs = true;
			log.emergency("test");
			expect(consoleError).toHaveBeenCalled();
		});
		it("should not output console when SuiteScriptMocks.outputEmergencyLogs is false", () => {
			SuiteScriptMocks.outputEmergencyLogs = false;
			log.emergency("test");
			expect(consoleError).not.toHaveBeenCalled();
		});
	});

	describe("error", () => {
		it("should append log to SuiteScriptMocks.logs", () => {
			log.error("title", "details");
			expect(SuiteScriptMocks.logs).toHaveLength(1);
			expect(SuiteScriptMocks.logs[0]).toEqual({
				title: "title",
				details: "details",
				type: "error",
			});
		});
		it("should output console when SuiteScriptMocks.outputErrorLogs is true", () => {
			SuiteScriptMocks.outputErrorLogs = true;
			log.error("test");
			expect(consoleError).toHaveBeenCalled();
		});
		it("should not output console when SuiteScriptMocks.outputErrorLogs is false", () => {
			SuiteScriptMocks.outputErrorLogs = false;
			log.error("test");
			expect(consoleError).not.toHaveBeenCalled();
		});
	});
});
