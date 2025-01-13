const SuiteScriptMocks = require("../../../index.cjs");
const random = require("../../../lib/mocks/crypto/random/index.cjs");

beforeEach(() => {
	SuiteScriptMocks.reset();
});
describe("crypto/random", () => {
	describe("generateBytes", () => {
		it("should consume and return first entry in SuiteScriptMocks.generateBytesResults", () => {
			SuiteScriptMocks.generateBytesResults.push(new Uint8Array([21, 31]));
			const result = random.generateBytes({ size: 2 });
			expect(result).toEqual(new Uint8Array([21, 31]));
			expect(SuiteScriptMocks.generateBytesResults).toHaveLength(0);
		});
		it("should not error if SuiteScriptMocks.generateBytesResults is empty", () => {
			expect(() => {
				random.generateBytes({ size: 2 });
			}).not.toThrow();
		});
	});

	describe("generateInt", () => {
		it("should consume and return first entry in SuiteScriptMocks.generateIntResults", () => {
			SuiteScriptMocks.generateIntResults.push(456);
			const result = random.generateInt({ max: 1000 });
			expect(result).toEqual(456);
			expect(SuiteScriptMocks.generateIntResults).toHaveLength(0);
		});
		it("should not error if SuiteScriptMocks.generateIntResults is empty", () => {
			expect(() => {
				random.generateInt({ max: 1000 });
			}).not.toThrow();
		});
	});

	describe("generateUUID", () => {
		it("should consume and return first entry in SuiteScriptMocks.generateUUIDResults", () => {
			SuiteScriptMocks.generateUUIDResults.push("580922f2a9754e1984123325e42c11ed");
			const result = random.generateUUID();
			expect(result).toEqual("580922f2a9754e1984123325e42c11ed");
			expect(SuiteScriptMocks.generateUUIDResults).toHaveLength(0);
		});
		it("should not error if SuiteScriptMocks.generateUUIDResults is empty", () => {
			expect(() => {
				random.generateUUID();
			}).not.toThrow();
		});
	});
});
