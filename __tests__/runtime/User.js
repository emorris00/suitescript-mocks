import runtime from "../../lib/mocks/runtime/index.cjs"

let User
beforeEach(() => {
    User = new runtime.User({
        permissions: {
            TEST: true,
            TEST2: false,
        }
    })
})

describe("runtime.User", () => {
    describe("getPermission", () => {
        it("should return true if permission exists and is true", () => {
            expect(User.getPermission("TEST")).toBe(true)
        })
        it("should return false if permission exists and is false", () => {
            expect(User.getPermission("TEST2")).toBe(false)
        })
        it("should return false if permission doesn't exist", () => {
            expect(User.getPermission("DOESNTEXIST")).toBe(false)
        })
    })
})