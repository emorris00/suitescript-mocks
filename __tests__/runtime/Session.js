import runtime from "../../lib/mocks/runtime/index.cjs"

let Session
beforeEach(() => {
    Session = new runtime.Session({
        values: {
            test: 1
        }
    })
})

describe("runtime.Session", () => {
    describe("get", () => {
        it("should return value if it exists", () => {
            expect(Session.get("test")).toBe(1)
        })
        it("should return undefined if it doesn't exist", () => {
            expect(Session.get("doesntexst")).toBe(undefined)
        })
    })

    describe("set", () => {
        it("should set value", () => {
            Session.set("test", 2)
            expect(Session.values.test).toBe(2)
        })
    })
})