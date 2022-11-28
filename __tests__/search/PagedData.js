
import search from "../../lib/mocks/search/index.cjs"

describe("search.PagedData", () => {
    describe("fetch", () => {
        it("should break results into pages based on pageSize", () => {
            const PagedData = new search.PagedData({
                results: new Array(5000).fill({}),
                pageSize: 500
            })
            expect(PagedData.pageRanges.length).toBe(10)
        })
        it("should return page if it exists", () => {
            const PagedData = new search.PagedData({
                results: [1],
                pageSize: 500
            })
            expect(PagedData.fetch({index: 0})).toBeInstanceOf(search.Page)
        })
        it("should throw error if page doesn't exist", () => {
            const PagedData = new search.PagedData({
                results: [1],
                pageSize: 500
            })
            expect(() => {
                PagedData.fetch({index: 2})
            }).toThrow()
        })
    })
})