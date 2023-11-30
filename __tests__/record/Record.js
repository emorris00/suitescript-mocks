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
			testdate: new Date("2023-01-01"),
		},
		sublists: {
			test: [
				{
					test: 1,
					test2: { value: 2, text: "test2" },
					testdate: new Date("2023-01-01"),
					testsubrecord: new record.Record({
						id: 2,
						fields: {
							test: 1,
						},
					}),
				},
				{
					test: 2,
					test2: { value: 3, text: "test2" },
					testdate: new Date("2023-01-02"),
				},
			],
		},
		subrecords: {
			test: new record.Record({
				id: 3,
				fields: {
					test: 1,
				},
			}),
		},
	});
	SuiteScriptMocks.records = [Record];
});

describe("record.Record", () => {
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
		it("should return record", () => {
			expect(Record.cancelLine("test")).toBe(Record);
		});
	});

	describe("commitLine", () => {
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
			expect(Record.sublists.test.lines.length).toBe(3);
			expect(Record.sublists.test.lines[0].test).toEqual(1);
			expect(Record.sublists.test.lines[2].test).toEqual({ value: 2 });
		});
		it("should select a new line", () => {
			Record.commitLine("test");
			expect(Record.sublists.test.currentline.test).toBe(undefined);
		});
		it("should return record", () => {
			expect(Record.commitLine("test")).toBe(Record);
		});
	});

	describe("findSublistLineWithValue", () => {
		it("should return -1 if sublist doesn't exist", () => {
			expect(Record.findSublistLineWithValue("doesntexist", "test", 1)).toBe(-1);
		});
		it("should return -1 if sublist doesn't contain value", () => {
			expect(Record.findSublistLineWithValue("test", "test", "doesntexist")).toBe(-1);
		});
		it("should return index of first line with value", () => {
			expect(Record.findSublistLineWithValue("test", "test", 1)).toBe(0);
		});
	});

	describe("getCurrentSublistField", () => {
		beforeEach(() => {
			Record.selectLine("test", 0);
		});
		it("should error if sublist doesn't exist", () => {
			expect(() => {
				Record.getCurrentSublistField("doesntexist", "test");
			}).toThrow();
		});
		it("should return Field if field exists", () => {
			expect(Record.getCurrentSublistField("test", "test")).toBeInstanceOf(record.Field);
		});
		it("should return null if field doesn't exist", () => {
			expect(Record.getCurrentSublistField("test", "doesntexist")).toBe(null);
		});
	});

	describe("getCurrentSublistIndex", () => {
		it("should return -1 if sublist doesn't exist", () => {
			expect(Record.getCurrentSublistIndex("banana")).toBe(-1);
		});
		it("should return index of current selected line", () => {
			Record.selectLine("test", 0);
			expect(Record.getCurrentSublistIndex("test")).toBe(0);
		});
		it("should return length of lines if its a new line", () => {
			expect(Record.getCurrentSublistIndex("test")).toBe(2);
		});
	});

	describe("getCurrentSublistSubrecord", () => {
		beforeEach(() => {
			Record.selectLine("test", 0);
		});
		it("should error if sublist doesn't exist", () => {
			expect(() => {
				Record.getCurrentSublistSubrecord("doesntexist", "testsubrecord");
			}).toThrow();
		});
		it("should error if field isn't a subrecord", () => {
			expect(() => {
				Record.getCurrentSublistSubrecord("test", "test");
			}).toThrow();
		});
		it("should return subrecord", () => {
			expect(Record.getCurrentSublistSubrecord("test", "testsubrecord")).toBe(
				Record.sublists.test.lines[0].testsubrecord,
			);
		});
	});

	describe("getCurrentSublistText", () => {
		beforeEach(() => {
			Record.selectLine("test", 0);
		});
		it("should return text if it exists", () => {
			expect(Record.getCurrentSublistText("test", "test2")).toBe("test2");
		});
		it("should return formatted date string if field is a date", () => {
			expect(Record.getCurrentSublistText("test", "testdate")).toBe("1/1/2023");
		});
		it("should return value if field is an object and text doesn't exist and in dynamic mode", () => {
			delete Record.sublists.test.lines[0].test2.text;
			expect(Record.getCurrentSublistText("test", "test2")).toBe(2);
		});
		it("should return value if field is not an object", () => {
			expect(Record.getCurrentSublistText("test", "test")).toBe(1);
		});
		it("should return undefined if field doesn't exist", () => {
			expect(Record.getCurrentSublistText("test", "doesntexist")).toBe(undefined);
		});
		it("should throw error if sublist doesn't exist", () => {
			expect(() => {
				Record.getCurrentSublistText("doesntexist", "test");
			}).toThrow();
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

	describe("getField", () => {
		it("should return Field if field exists", () => {
			expect(Record.getField("test")).toBeInstanceOf(record.Field);
		});
		it("should return null if field doesn't exist", () => {
			expect(Record.getField("doesntexist")).toBe(null);
		});
	});

	describe("getFields", () => {
		it("should return list of field ids", () => {
			expect(Record.getFields()).toEqual(["test", "test2", "testdate"]);
		});
	});

	describe("getLineCount", () => {
		it("should return length of sublist if it exists", () => {
			expect(Record.getLineCount("test")).toBe(2);
		});
		it("should return -1 if sublist doesn't exist", () => {
			expect(Record.getLineCount("doesntexist")).toBe(-1);
		});
	});

	describe("getSublist", () => {
		it("should return null if sublist doesn't exist", () => {
			expect(Record.getSublist("doesntexist")).toBe(null);
		});
		it("should return Sublist if sublist exists", () => {
			expect(Record.getSublist("test")).toBeInstanceOf(record.Sublist);
		});
	});

	describe("getSublists", () => {
		it("should return list of sublist ids", () => {
			expect(Record.getSublists()).toEqual(["test"]);
		});
	});

	describe("getSublistField", () => {
		it("should error if sublist doesn't exist", () => {
			expect(() => {
				Record.getSublistField("doesntexist", "test", 0);
			}).toThrow();
		});
		it("should return Field if field exists", () => {
			expect(Record.getSublistField("test", "test", 0)).toBeInstanceOf(record.Field);
		});
		it("should return null if field doesn't exist", () => {
			expect(Record.getSublistField("test", "doesntexist", 0)).toBe(null);
		});
	});

	describe("getSublistFields", () => {
		it("should return list of field ids", () => {
			expect(Record.getSublistFields("test")).toEqual(["test", "test2", "testdate", "testsubrecord"]);
		});
	});

	describe("getSublistSubrecord", () => {
		it("should error if sublist doesn't exist", () => {
			expect(() => {
				Record.getSublistSubrecord("doesntexist", "testsubrecord", 0);
			}).toThrow();
		});
		it("should error if field isn't a subrecord", () => {
			expect(() => {
				Record.getSublistSubrecord("test", "test", 0);
			}).toThrow();
		});
		it("should return subrecord", () => {
			expect(Record.getSublistSubrecord("test", "testsubrecord", 0)).toBe(
				Record.sublists.test.lines[0].testsubrecord,
			);
		});
	});

	describe("getSublistText", () => {
		it("should return text if it exists", () => {
			expect(Record.getSublistText("test", "test2", 0)).toBe("test2");
		});
		it("should return formatted date string if field is a date", () => {
			expect(Record.getSublistText("test", "testdate", 0)).toBe("1/1/2023");
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
		it("should return formatted date string if field is a date", () => {
			expect(Record.getText("testdate")).toBe("1/1/2023");
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
		it("should return Date object if its a date", () => {
			expect(Object.prototype.toString.call(Record.getValue("testdate"))).toBe("[object Date]");
		});
	});

	describe("hasCurrentSublistSubrecord", () => {
		beforeEach(() => {
			Record.selectLine("test", 0);
		});
		it("should error if sublist doesn't exist", () => {
			expect(() => {
				Record.hasCurrentSublistSubrecord("doesntexist", "testsubrecord");
			}).toThrow();
		});
		it("should error if field isn't a subrecord", () => {
			expect(() => {
				Record.hasCurrentSublistSubrecord("test", "test");
			}).toThrow();
		});
		it("should return true if subrecord exists", () => {
			expect(Record.hasCurrentSublistSubrecord("test", "testsubrecord")).toBe(true);
		});
	});

	describe("hasSublistSubrecord", () => {
		it("should error if sublist doesn't exist", () => {
			expect(() => {
				Record.hasSublistSubrecord("doesntexist", "testsubrecord", 0);
			}).toThrow();
		});
		it("should error if field isn't a subrecord", () => {
			expect(() => {
				Record.hasSublistSubrecord("test", "test", 0);
			}).toThrow();
		});
		it("should return true if subrecord exists", () => {
			expect(Record.hasSublistSubrecord("test", "testsubrecord", 0)).toBe(true);
		});
	});

	describe("hasSubrecord", () => {
		it("should error if field isn't a subrecord", () => {
			expect(() => {
				Record.hasSubrecord("doesntexist");
			}).toThrow();
		});
		it("should return true if subrecord exists", () => {
			expect(Record.hasSubrecord("test")).toBe(true);
		});
	});

	describe("insertLine", () => {
		it("should error if sublist doesn't exist", () => {
			expect(() => {
				Record.insertLine("doesntexist", 0);
			}).toThrow();
		});
		it("should error if line is outside valid range", () => {
			expect(() => {
				Record.insertLine("doesntexist", 999);
			}).toThrow();
		});
		it("should insert line", () => {
			Record.insertLine("test", 1);
			expect(Record.sublists.test.lines).toHaveLength(3);
			expect(Record.sublists.test.lines[1]._id).toBe(undefined);
		});
		it("should select line if in dynamic mode", () => {
			Record.insertLine("test", 1);
			expect(Record.sublists.test.currentline).toEqual({});
		});
		it("should return record", () => {
			expect(Record.insertLine("test", 1)).toBe(Record);
		});
	});

	describe("removeCurrentSublistSubrecord", () => {
		beforeEach(() => {
			Record.selectLine("test", 0);
		});
		it("should error if sublist doesn't exist", () => {
			expect(() => {
				Record.removeCurrentSublistSubrecord("doesntexist", "testsubrecord");
			}).toThrow();
		});
		it("should error if field isn't a subrecord", () => {
			expect(() => {
				Record.removeCurrentSublistSubrecord("test", "test");
			}).toThrow();
		});
		it("should remove subrecord", () => {
			Record.removeCurrentSublistSubrecord("test", "testsubrecord");
			expect(Record.sublists.test.currentline.testsubrecord).toBe(null);
		});
		it("should return record", () => {
			expect(Record.removeCurrentSublistSubrecord("test", "testsubrecord")).toBe(Record);
		});
	});

	describe("removeLine", () => {
		it("should remove line if it exists", () => {
			Record.removeLine("test", 0);
			expect(Record.sublists.test.lines.length).toBe(1);
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
		it("should select first line if in dynamic mode", () => {
			Record.removeLine("test", 0);
			expect(Record.sublists.test.currentLine);
		});
		it("should return record", () => {
			expect(Record.removeLine("test", 0)).toBe(Record);
		});
	});

	describe("removeSublistSubrecord", () => {
		beforeEach(() => {
			Record.isDynamic = false;
		});
		it("should error if sublist doesn't exist", () => {
			expect(() => {
				Record.removeSublistSubrecord("doesntexist", "testsubrecord", 0);
			}).toThrow();
		});
		it("should error if field isn't a subrecord", () => {
			expect(() => {
				Record.removeSublistSubrecord("test", "test", 0);
			}).toThrow();
		});
		it("should remove subrecord", () => {
			Record.removeSublistSubrecord("test", "testsubrecord", 0);
			expect(Record.sublists.test.lines[0].testsubrecord).toBe(null);
		});
		it("should return record", () => {
			expect(Record.removeSublistSubrecord("test", "testsubrecord", 0)).toBe(Record);
		});
	});

	describe("removeSubrecord", () => {
		it("should error if field isn't a subrecord", () => {
			expect(() => {
				Record.removeSubrecord("doesntexist");
			}).toThrow();
		});
		it("should remove subrecord", () => {
			Record.removeSubrecord("test");
			expect(Record.subrecords.test).toBe(null);
		});
		it("should return record", () => {
			expect(Record.removeSubrecord("test")).toBe(Record);
		});
	});

	describe("save", () => {
		it("should add id to record", () => {
			Record.id = null;
			SuiteScriptMocks.records = [];
			Record.save();
			expect(Record.id).not.toBe(null);
		});
		it("should increment id", () => {
			const newRecord = new record.Record(Record);
			newRecord.id = null;
			newRecord.save();
			expect(newRecord.id).toBe(2);

			const newRecord2 = new record.Record(Record);
			newRecord2.id = null;
			newRecord2.save();
			expect(newRecord2.id).toBe(3);
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
		it("should remove any uncommitted lines created by insertLine", () => {
			Record.insertLine("test", 1);
			expect(Record.sublists.test.lines).toHaveLength(3);
			Record.selectLine("test", 2);
			expect(Record.sublists.test.lines).toHaveLength(2);
			expect(Record.getCurrentSublistIndex("test")).toBe(1);
		});
		it("should return record", () => {
			expect(Record.selectLine("test", 0)).toBe(Record);
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
		it("should return record", () => {
			expect(Record.selectNewLine("test")).toBe(Record);
		});
	});

	describe("setCurrentSublistText", () => {
		beforeEach(() => {
			Record.selectLine("test", 0);
		});
		it("should throw error if record isn't in dynamic mode", () => {
			Record.isDynamic = false;
			expect(() => {
				Record.setCurrentSublistText("test", "test", "test2");
			}).toThrow();
		});
		it("should throw error if sublist doesn't exist", () => {
			expect(() => {
				Record.setCurrentSublistText("doesntexist", "test", "test2");
			}).toThrow();
		});
		it("should set value on current sublist line", () => {
			Record.setCurrentSublistText("test", "test", "test2");
			expect(Record.sublists.test.currentline.test).toEqual({ value: "test2", text: "test2" });
		});
		it("should return record", () => {
			expect(Record.setCurrentSublistText("test", "test", "test2")).toBe(Record);
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
		it("should set value on current sublist line", () => {
			Record.setCurrentSublistValue("test", "test", 2);
			expect(Record.sublists.test.currentline.test).toEqual({ value: 2 });
		});
		it("should return record", () => {
			expect(Record.setCurrentSublistValue("test", "test", 2)).toBe(Record);
		});
	});

	describe("setSublistText", () => {
		beforeEach(() => {
			Record.isDynamic = false;
		});
		it("should throw error if record isn't in standard mode", () => {
			Record.isDynamic = true;
			expect(() => {
				Record.setSublistText("test", "test", 0, "test2");
			}).toThrow();
		});
		it("should throw error if sublist doesn't exist", () => {
			expect(() => {
				Record.setSublistText("doesntexist", "test", 0, "test2");
			}).toThrow();
		});
		it("should set value on current sublist line", () => {
			Record.setSublistText("test", "test", 0, "test2");
			expect(Record.sublists.test.lines[0].test).toEqual({ value: "test2", text: "test2" });
		});
		it("should return record", () => {
			expect(Record.setSublistText("test", "test", 0, "test2")).toBe(Record);
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
		it("should set value on sublist line", () => {
			Record.setSublistValue("test", "test", 0, 2);
			expect(Record.sublists.test.lines[0].test).toEqual({ value: 2 });
		});
		it("should return record", () => {
			expect(Record.setSublistValue("test", "test", 0, 2)).toBe(Record);
		});
	});

	describe("setText", () => {
		it("should set text", () => {
			Record.setText("test", "test2");
			expect(Record.fields.test).toEqual({ value: "test2", text: "test2" });
		});
		it("should return record", () => {
			expect(Record.setText("test", "test2")).toBe(Record);
		});
	});

	describe("setValue", () => {
		it("should set value", () => {
			Record.setValue("test", 2);
			expect(Record.fields.test).toEqual({ value: 2 });
		});
		it("should return record", () => {
			expect(Record.setValue("test", 2)).toBe(Record);
		});
	});
});
