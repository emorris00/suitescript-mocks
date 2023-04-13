import SuiteScriptMocks from "../index.cjs";
import _log from "../lib/mocks/log/index.cjs";

beforeEach(() => {
	SuiteScriptMocks.reset();
	jest.clearAllMocks();
});
describe("global log", () => {
	it("global log.audit should call module log.audit", () => {
		const logAudit = jest.spyOn(_log, "audit");
		log.audit("test");
		expect(logAudit).toHaveBeenCalled();
	});

	it("global log.debug should call module log.debug", () => {
		const logDebug = jest.spyOn(_log, "debug");
		log.debug("test");
		expect(logDebug).toHaveBeenCalled();
	});

	it("global log.emergency should call module log.emergency", () => {
		const logEmergency = jest.spyOn(_log, "emergency");
		log.emergency("test");
		expect(logEmergency).toHaveBeenCalled();
	});

	it("global log.error should call module log.error", () => {
		const logError = jest.spyOn(_log, "error");
		log.error("test");
		expect(logError).toHaveBeenCalled();
	});
});
