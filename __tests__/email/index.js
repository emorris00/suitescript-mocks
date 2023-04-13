import SuiteScriptMocks from "../../index.cjs";
import email from "../../lib/mocks/email/index.cjs";

beforeEach(() => {
	SuiteScriptMocks.reset();
});
describe("email", () => {
	describe("send", () => {
		it("should add to sentEmails", () => {
			const e = {
				author: 1,
				body: "test",
				subject: "test",
				recipients: "test@example.com",
			};
			email.send(e);
			expect(SuiteScriptMocks.sentEmails[0]).toBe(e);
		});
	});
	describe("sendBuild", () => {
		it("should add to sentEmails", () => {
			const e = {
				author: 1,
				body: "test",
				subject: "test",
				recipients: "test@example.com",
			};
			email.sendBulk(e);
			expect(SuiteScriptMocks.sentEmails[0]).toBe(e);
		});
	});
	describe("sendCampaignEvent", () => {});
});
