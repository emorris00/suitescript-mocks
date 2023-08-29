const SuiteScriptMocks = require("../../../index.cjs");
const { addPromise, options, required } = require("../../helpers.cjs");

class EmailModule {
	@options(
		"author",
		"body",
		"recipients",
		"subject",
		"attachments",
		"bcc",
		"cc",
		"isInternalOnly",
		"relatedRecords",
		"replyTo"
	)
	@required("author", "body", "recipients", "subject")
	@addPromise()
	send = (options) => {
		SuiteScriptMocks.sentEmails.push(options);
	};

	@options(
		"author",
		"body",
		"recipients",
		"subject",
		"attachments",
		"bcc",
		"cc",
		"isInternalOnly",
		"relatedRecords",
		"replyTo"
	)
	@required("author", "body", "recipients", "subject")
	@addPromise()
	sendBulk = (options) => {
		SuiteScriptMocks.sentEmails.push(options);
	};

	@options("campaignEventId", "receipientId")
	@required("campaignEventId", "receipientId")
	@addPromise()
	sendCampaignEvent = (options) => {};
}

module.exports = new EmailModule();
