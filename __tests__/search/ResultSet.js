import search from "../../lib/mocks/search/index.cjs"

let ResultSet
beforeEach(() => {
    const column = new search.Column({name: "internalid"})
    ResultSet = new search.ResultSet({
        columns: [column],
        results: [
            new search.Result({
                id: 1,
                recordType: "salesorder",
                columns: [column],
                values: [1]
            })
        ]
    })
})

describe("search.ResultSet", () => {
    describe("each", () => {
        it("should call callback for results", () => {
            ResultSet.each(result => {
                expect(result).toBe(ResultSet.results[0])
            })
        })
        it("should only do first 4000 results", () => {
            ResultSet.results = new Array(4001).fill(ResultSet.results[0])
            const callback = jest.fn();
            ResultSet.each(callback)
            expect(callback).toBeCalledTimes(4000)
        })
    })

    describe("getRange", () => {
        it("should return range of results", () => {
            expect(ResultSet.getRange({start: 0, end: 1}).length).toBe(1)
        })
        it("should only return results that exist", () => {
            expect(ResultSet.getRange({start: 1, end: 2}).length).toBe(0)
        })
    })
})