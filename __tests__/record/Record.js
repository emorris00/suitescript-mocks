import SuiteScriptMocks from "../../index.cjs";
import record from "../../lib/mocks/record/index.cjs";

let Record;
beforeEach(() => {
	SuiteScriptMocks.reset();
	Record = new record.Record({
		id: 1,
		type: record.Type.SALES_ORDER,
		isDynamic: true,
		fields: {
			test: 1,
			test2: { value: 2, text: "test2" },
		},
		sublists: {
			test: [
				{
					test: 1,
					test2: { value: 2, text: "test2" },
				},
			],
		},
		subrecords: {
			test: new record.Record({
				fields: {
					test: 1,
					test2: { value: 2, text: "test2" },
				},
			}),
		},
	});
	SuiteScriptMocks.records = [Record];
});

describe("search.Record", () => {
	describe("cancelLine", () => {
		beforeEach(() => {
			Record.selectLine("test", 0);
			Record.setCurrentSublistValue("test", "test", 2);
		});
		it("should throw error if record isn't in dynamic mode", () => {
			Record.isDynamic = false;
			expect(() => {
				Record.cancelLine("test");
			}).toThrow();
		});
		it("should not save changes to selected line", () => {
			Record.cancelLine("test");
			expect(Record.sublists.test.lines[0].test).toBe(1);
		});
		it("should select a new line", () => {
			Record.cancelLine("test");
			expect(Record.sublists.test.currentline.test).toBe(undefined);
		});
	});

	describe("commitline", () => {
		beforeEach(() => {
			Record.selectLine("test", 0);
			Record.setCurrentSublistValue("test", "test", 2);
		});
		it("should throw error if record isn't in dynamic mode", () => {
			Record.isDynamic = false;
			expect(() => {
				Record.commitLine("test");
			}).toThrow();
		});
		it("should save changes to selected line", () => {
			Record.commitLine("test");
			expect(Record.sublists.test.lines[0].test).toEqual({ value: 2 });
		});
		it("should add new line", () => {
			Record.selectNewLine("test");
			Record.setCurrentSublistValue("test", "test", 2);
			Record.commitLine("test");
			expect(Record.sublists.test.lines.length).toBe(2);
			expect(Record.sublists.test.lines[0].test).toEqual(1);
			expect(Record.sublists.test.lines[1].test).toEqual({ value: 2 });
		});
		it("should select a new line", () => {
			Record.commitLine("test");
			expect(Record.sublists.test.currentline.test).toBe(undefined);
		});
	});

	describe("getCurrentSublistValue", () => {
		beforeEach(() => {
			Record.selectLine("test", 0);
		});
		it("should return value if sublist field exists", () => {
			expect(Record.getCurrentSublistValue("test", "test")).toBe(1);
		});
		it("should return value if sublist field is an object", () => {
			expect(Record.getCurrentSublistValue("test", "test2")).toBe(2);
		});
		it("should return null if the sublist doesn't exist", () => {
			expect(Record.getCurrentSublistValue("doesntexist", "test")).toBe(null);
		});
		it("should return undefined if the sublist field doesn't exist", () => {
			expect(Record.getCurrentSublistValue("test", "doesntexist")).toBe(undefined);
		});
	});

	describe("getLineCount", () => {
		it("should return length of sublist if it exists", () => {
			expect(Record.getLineCount("test")).toBe(1);
		});
		it("should return -1 if sublist doesn't exist", () => {
			expect(Record.getLineCount("doesntexist")).toBe(-1);
		});
	});

	describe("getSublistText", () => {
		it("should return text if it exists", () => {
			expect(Record.getSublistText("test", "test2", 0)).toBe("test2");
		});
		it("should return value if field is an object and text doesn't exist and in dynamic mode", () => {
			delete Record.sublists.test.lines[0].test2.text;
			expect(Record.getSublistText("test", "test2", 0)).toBe(2);
		});
		it("should return value if field is not an object", () => {
			expect(Record.getSublistText("test", "test", 0)).toBe(1);
		});
		it("should return undefined if field doesn't exist", () => {
			expect(Record.getSublistText("test", "doesntexist", 0)).toBe(undefined);
		});
		it("should throw error if sublist doesn't exist", () => {
			expect(() => {
				Record.getSublistText("doesntexist", "test", 0);
			}).toThrow();
		});
		it("should throw error if sublist line doesn't exist", () => {
			expect(() => {
				Record.getSublistText("test", "test", -1);
			}).toThrow();
		});
		it("should throw error if record is in standard mode and field value has been set and field text has not", () => {
			Record.isDynamic = false;
			Record.setSublistValue("test", "test3", 0, 3);
			expect(() => {
				Record.getSublistText("test", "test3", 0);
			}).toThrow();
		});
	});

	describe("getSublistValue", () => {
		it("should return value if sublist field exists", () => {
			expect(Record.getSublistValue("test", "test", 0)).toBe(1);
		});
		it("should return value if sublist field is an object", () => {
			expect(Record.getSublistValue("test", "test2", 0)).toBe(2);
		});
		it("should return undefined if the sublist field doesn't exist", () => {
			expect(Record.getSublistValue("test", "doesntexist", 0)).toBe(undefined);
		});
		it("should throw error if sublist doesn't exist", () => {
			expect(() => {
				Record.getSublistValue("doesntexist", "test", 0);
			}).toThrow();
		});
		it("should throw error if sublist line doesn't exist", () => {
			expect(() => {
				Record.getSublistValue("test", "test", -1);
			}).toThrow();
		});
	});

	describe("getSubrecord", () => {
		it("should return subrecord if it exists", () => {
			const sub = Record.getSubrecord("test");
			expect(sub.fields.test).toBe(1);
		});
		it("should throw error if subrecord doesn't exist", () => {
			expect(() => {
				Record.getSubrecord("doesntexist");
			}).toThrow();
		});
	});

	describe("getText", () => {
		it("should return text if it exists", () => {
			expect(Record.getText("test2")).toBe("test2");
		});
		it("should return value if field is an object and text doesn't exist and in dynamic mode", () => {
			delete Record.fields.test2.text;
			expect(Record.getText("test2")).toBe(2);
		});
		it("should return value if field is not an object", () => {
			expect(Record.getText("test")).toBe(1);
		});
		it("should return undefined if field doesn't exist", () => {
			expect(Record.getText("doesntexist")).toBe(undefined);
		});
		it("should throw error if record is in standard mode and field value has been set and field text has not", () => {
			Record.isDynamic = false;
			Record.setValue("test3", 3);
			expect(() => {
				Record.getText("test3");
			}).toThrow();
		});
	});

	describe("getValue", () => {
		it("should return value if it exists", () => {
			expect(Record.getValue("test")).toBe(1);
		});
		it("should return value if field is an object", () => {
			expect(Record.getValue("test2")).toBe(2);
		});
		it("should return undefined if it doesn't", () => {
			expect(Record.getValue("doesntexist")).toBe(undefined);
		});
	});

	describe("removeLine", () => {
		it("should remove line if it exists", () => {
			Record.removeLine("test", 0);
			expect(Record.sublists.test.lines.length).toBe(0);
		});
		it("should error if sublist doesn't exist", () => {
			expect(() => {
				Record.removeLine("doesntexist", 0);
			}).toThrow();
		});
		it("should error if sublist line doesn't exist", () => {
			expect(() => {
				Record.removeLine("test", -1);
			}).toThrow();
		});
	});

	describe("save", () => {
		it("should add id to record", () => {
			Record.id = null;
			SuiteScriptMocks.records = [];
			Record.save();
			expect(Record.id).not.toBe(null);
		});
		it("should add incremented id", () => {
			const newRecord = new record.Record(Record);
			newRecord.id = null;
			newRecord.save();
			expect(newRecord.id).toBe(2);
		});
		it("should return created id", () => {
			Record.id = null;
			SuiteScriptMocks.records = [];
			expect(Record.save()).toBe(Record.id);
		});
		it("should add new record", () => {
			Record.id = null;
			SuiteScriptMocks.records = [];
			Record.save();
			expect(SuiteScriptMocks.records.length).toBe(1);
		});
		it("should update existing record", () => {
			Record.setValue("test3", 3);
			Record.save();
			expect(SuiteScriptMocks.records[0].getValue("test3")).toBe(3);
		});
		it("should save copy of record", () => {
			Record.save();
			expect(SuiteScriptMocks.records[0]).not.toBe(Record);
		});
		it("should update all field values so that getText doesn't error after load", () => {
			Record.setValue("test3", 3);
			Record.save();
			Record = record.load({ id: Record.id, type: Record.type, isDynamic: false });
			expect(() => {
				Record.getText("test3");
			}).not.toThrow();
		});
		it("should throw error if record has changed", () => {
			const Record2 = record.load({ id: Record.id, type: Record.type, isDynamic: false });
			Record2.setValue("test3", 3);
			Record2.save();
			Record.setValue("test4", 4);
			expect(() => {
				Record.save();
			}).toThrow();
		});
		it("should not throw error if record is saved twice", () => {
			Record.setValue("test3", 3);
			Record.save();
			Record.setValue("test4", 4);
			expect(() => {
				Record.save();
			}).not.toThrow();
		});
		it("should add record to SuiteScriptMocks.savedRecords", () => {
			Record.save();
			expect(SuiteScriptMocks.savedRecords[0].id).toBe(Record.id);
		});
		it("should add record to SuiteScriptMocks.createdRecords if the record was created", () => {
			const newRecord = new record.Record(Record);
			newRecord.id = null;
			newRecord.save();
			expect(newRecord.id).not.toBe(Record.id);
			expect(SuiteScriptMocks.savedRecords[0]).not.toBeNull();
			expect(SuiteScriptMocks.savedRecords[0].id).toBe(newRecord.id);
		});
	});

	describe("selectLine", () => {
		it("should throw error if record isn't in dynamic mode", () => {
			Record.isDynamic = false;
			expect(() => {
				Record.selectLine("test", 0);
			}).toThrow();
		});
		it("should throw error if sublist doesn't exist", () => {
			expect(() => {
				Record.selectLine("doesntexist", 0);
			}).toThrow();
		});
		it("should throw error if line doesn't exist", () => {
			expect(() => {
				Record.selectLine("test", 9999);
			}).toThrow();
		});
		it("should select line if it exists", () => {
			Record.selectLine("test", 0);
			expect(Record.sublists.test.currentline).toEqual(Record.sublists.test.lines[0]);
		});
	});

	describe("selectNewLine", () => {
		it("should throw error if record isn't in dynamic mode", () => {
			Record.isDynamic = false;
			expect(() => {
				Record.selectNewLine("test");
			}).toThrow();
		});
		it("should throw error if sublist doesn't exist", () => {
			expect(() => {
				Record.selectNewLine("doesntexist");
			}).toThrow();
		});
		it("should select new line of sublist", () => {
			Record.selectNewLine("test");
			expect(Record.sublists.test.currentline).not.toEqual(Record.sublists.test.lines[0]);
			expect(Record.sublists.test.currentline).not.toEqual(Record.sublists.test.lines[1]);
		});
	});

	describe("setCurrentSublistValue", () => {
		beforeEach(() => {
			Record.selectLine("test", 0);
		});
		it("should throw error if record isn't in dynamic mode", () => {
			Record.isDynamic = false;
			expect(() => {
				Record.setCurrentSublistValue("test", "test", 0);
			}).toThrow();
		});
		it("should throw error if sublist doesn't exist", () => {
			expect(() => {
				Record.setCurrentSublistValue("doesntexist", "test", 0);
			}).toThrow();
		});
		it("should throw error if fieldId isn't supplied", () => {
			expect(() => {
				Record.setCurrentSublistValue("test");
			}).toThrow();
		});
		it("should throw error if value isn't supplied", () => {
			expect(() => {
				Record.setCurrentSublistValue("test", "test");
			}).toThrow();
		});
		it("should set value on current sublist line", () => {
			Record.setCurrentSublistValue("test", "test", 2);
			expect(Record.sublists.test.currentline.test).toEqual({ value: 2 });
		});
	});

	describe("setSublistValue", () => {
		beforeEach(() => {
			Record.isDynamic = false;
		});
		it("should throw error if record isn't in standard mode", () => {
			Record.isDynamic = true;
			expect(() => {
				Record.setSublistValue("test", "test", 0, 0);
			}).toThrow();
		});
		it("should throw error if sublist doesn't exist", () => {
			expect(() => {
				Record.setSublistValue("doesntexist", "test", 0, 0);
			}).toThrow();
		});
		it("should throw error if line doesn't exist", () => {
			expect(() => {
				Record.setSublistValue("test", "test", 999, 0);
			}).toThrow();
		});
		it("should throw error if fieldId isn't supplied", () => {
			expect(() => {
				Record.setSublistValue("test");
			}).toThrow();
		});
		it("should throw error if line isn't supplied", () => {
			expect(() => {
				Record.setSublistValue("test", "test");
			}).toThrow();
		});
		it("should throw error if value isn't supplied", () => {
			expect(() => {
				Record.setSublistValue("test", "test", 0);
			}).toThrow();
		});
		it("should set value on sublist line", () => {
			Record.setSublistValue("test", "test", 0, 2);
			expect(Record.sublists.test.lines[0].test).toEqual({ value: 2 });
		});
	});

	describe("setText", () => {
		it("should error if fieldId isn't supplied", () => {
			expect(() => {
				Record.setText();
			}).toThrow();
		});
		it("should error if text isn't supplied", () => {
			expect(() => {
				Record.setText("test");
			}).toThrow();
		});
		it("should set text", () => {
			Record.setText("test", "test2");
			expect(Record.fields.test).toEqual({ value: "test2", text: "test2" });
		});
	});

	describe("setValue", () => {
		it("should set value", () => {
			Record.setValue("test", 2);
			expect(Record.fields.test).toEqual({ value: 2 });
		});
	});
});
