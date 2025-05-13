import SuiteScriptMocks from "../../index.cjs";
import record from "../../lib/mocks/record/index.cjs";

let Record;
beforeEach(() => {
	SuiteScriptMocks.reset();
	Record = new record.Record({
		id: 1,
		type: record.Type.SALES_ORDER,
		fields: {
			test: 1,
		},
		sublists: {
			item: {
				lines: [{ item: 1 }],
			},
		},
	});
	SuiteScriptMocks.records = [Record];
});

describe("record", () => {
	describe("attach", () => {});

	describe("copy", () => {
		it("should return copy of record with no id if it exists", () => {
			const copy = record.copy({
				id: 1,
				type: record.Type.SALES_ORDER,
			});
			expect(copy.id).toBe(null);
			expect(copy).not.toBe(Record);
		});
		it("should throw error if record does not exist", () => {
			expect(() => {
				record.copy({
					id: 99999,
					type: record.Type.SALES_ORDER,
				});
			}).toThrow();
		});
		it("should not modify original record when modifying copy", () => {
			const copy = record.copy({ id: 1, type: record.Type.SALES_ORDER });
			copy.setValue("test", 2);
			expect(Record.fields.test).toBe(1);
			copy.setSublistValue("item", "item", 0, 2);
			expect(Record.sublists.item.lines[0].item).toBe(1);
		});
		it("should work if id provided is a string", () => {
			expect(() => {
				record.load({
					id: "1",
					type: record.Type.SALES_ORDER,
				});
			}).not.toThrow();
		});
	});

	describe("create", () => {
		it("should return new record", () => {
			const rec = record.create({
				type: record.Type.SALES_ORDER,
			});
			expect(rec).toBeInstanceOf(record.Record);
			expect(rec).toMatchObject({
				id: null,
				type: record.Type.SALES_ORDER,
			});
		});
		it("should set default values", () => {
			const rec = record.create({
				type: record.Type.SALES_ORDER,
				defaultValues: {
					test: "test",
				},
			});
			expect(rec.fields.test).toBe("test");
		});
	});

	describe("delete", () => {
		it("should delete record if it exists", () => {
			record.delete({
				id: 1,
				type: record.Type.SALES_ORDER,
			});
			expect(SuiteScriptMocks.records.length).toBe(0);
		});
		it("should return id of deleted record", () => {
			expect(
				record.delete({
					id: 1,
					type: record.Type.SALES_ORDER,
				}),
			).toBe(1);
		});
		it("should throw error if record doesn't exist", () => {
			expect(() => {
				record.delete({ id: 99999, type: record.Type.SALES_ORDER });
			}).toThrow();
		});
		it("should add deleted record to SuiteScriptMocks.deletedRecords", () => {
			record.delete({
				id: 1,
				type: record.Type.SALES_ORDER,
			});
			expect(SuiteScriptMocks.deletedRecords).toHaveLength(1);
			expect(SuiteScriptMocks.deletedRecords[0].id).toBe(1);
			expect(SuiteScriptMocks.deletedRecords[0].type).toBe(record.Type.SALES_ORDER);
		});
		it("should work if id provided is a string", () => {
			expect(() => {
				record.delete({
					id: "1",
					type: record.Type.SALES_ORDER,
				});
			}).not.toThrow();
		});
	});

	describe("detach", () => {});

	describe("load", () => {
		it("should return copy of record if it exists", () => {
			const rec = record.load({
				id: 1,
				type: record.Type.SALES_ORDER,
			});
			expect(rec).not.toBe(Record);
			expect(rec.id).toBe(1);
		});
		it("should throw error if record doesn't exist", () => {
			expect(() => {
				record.load({ id: 99999, type: record.Type.SALES_ORDER });
			}).toThrow();
		});
		it("should not modify original record when modifying loaded record before save", () => {
			const loadedRecord = record.load({ id: 1, type: record.Type.SALES_ORDER });
			loadedRecord.setValue("test", 2);
			expect(Record.fields.test).toBe(1);
			loadedRecord.setSublistValue("item", "item", 0, 2);
			expect(Record.sublists.item.lines[0].item).toBe(1);
		});
		it("should work if id provided is a string", () => {
			expect(() => {
				record.load({
					id: "1",
					type: record.Type.SALES_ORDER,
				});
			}).not.toThrow();
		});
	});

	describe("submitFields", () => {
		it("should change fields on record if it exists", () => {
			record.submitFields({
				id: 1,
				type: record.Type.SALES_ORDER,
				values: {
					test: "test2",
				},
			});
			expect(SuiteScriptMocks.records[0].fields.test).toBe("test2");
		});
		it("should throw error if record doesn't exist", () => {
			expect(() => {
				record.submitFields({
					id: 99999,
					type: record.Type.SALES_ORDER,
					values: {
						test: "test2",
					},
				});
			}).toThrow();
		});
		it("should save fields on copy of record", () => {
			record.submitFields({
				id: 1,
				type: record.Type.SALES_ORDER,
				values: {
					test: "test2",
				},
			});
			expect(Record.fields.test).toBe(1);
		});
		it("should work if id provided is a string", () => {
			expect(() => {
				record.submitFields({
					id: "1",
					type: record.Type.SALES_ORDER,
					values: {
						test: "test2",
					},
				});
			}).not.toThrow();
		});
	});

	describe("transform", () => {
		it("should return copy of records with null id and new type if it exists", () => {
			const rec = record.transform({
				fromType: record.Type.SALES_ORDER,
				fromId: 1,
				toType: record.Type.ITEM_FULFILLMENT,
			});
			expect(rec).not.toBe(Record);
			expect(rec).toMatchObject({ id: null, type: record.Type.ITEM_FULFILLMENT });
		});
		it("should set default values", () => {
			const rec = record.transform({
				fromType: record.Type.SALES_ORDER,
				fromId: 1,
				toType: record.Type.ITEM_FULFILLMENT,
				defaultValues: {
					test: "test2",
				},
			});
			expect(rec.fields.test).toBe("test2");
		});
		it("should throw error if record doesn't exist", () => {
			expect(() => {
				record.transform({
					fromType: record.Type.SALES_ORDER,
					fromId: 99999,
					toType: record.Type.ITEM_FULFILLMENT,
				});
			}).toThrow();
		});
		it("should work if id provided is a string", () => {
			expect(() => {
				record.transform({
					fromType: record.Type.SALES_ORDER,
					fromId: "1",
					toType: record.Type.ITEM_FULFILLMENT,
				});
			}).not.toThrow();
		});
	});
});
