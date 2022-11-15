import record from "../lib/mocks/record"
import search from "../lib/mocks/search"

describe("record", () => {
    it("something", () => {
        const Record = new record.Record({
            fields: {
                location: "4"
            },
            sublists: {
                item: {
                    "line 0": {
                        item: 123456
                    }
                }
            }
        })
        expect(Record).toHaveProperty("fields")
        expect(Record.getValue("location")).toBe("4")
        expect(Record.getValue({fieldId: "location"})).toBe("4")
        expect(Record.getLineCount("item")).toBe(1)
        expect(Record.getSublistValue("item", "item", 0)).toBe(123456)
        Record.setValue("test", 2)
        expect(Record.fields.test).toBe(2)
    })

    describe("_getSavedRecord", () => {
        it("should get latest saved record", () => {
            const newRecord = record.create({
                type: record.Type.SALES_ORDER,
            })
            newRecord.save()
            const savedRecord = record._getSavedRecord()
            expect(savedRecord).toBe(newRecord)
        })
    })

    describe("save", () => {
        it("should increment id for new records", () => {
            const newRecord = record.create({
                type: record.Type.SALES_ORDER,
            })
            expect(newRecord.save()).toBe(1)
        })
    })
})

describe("search", () => {
    it("test", () => {
        search._addResults([{values: [12345]}])
            ._addResults([{values: [23456]}])

        const results = search.create({
            type: search.Type.SALES_ORDER,
            columns: ["internalid"],
            filters: [
                ["internalid", "is", 12345]
            ]
        }).run().getRange(0, 10)

        expect(results.length).toBe(1)
        expect(results[0].getValue("internalid")).toBe(12345)
        expect(results[0].getValue({name: "internalid"})).toBe(12345)
        expect(results[0].getValue(results[0].columns[0])).toBe(12345)
    })
})