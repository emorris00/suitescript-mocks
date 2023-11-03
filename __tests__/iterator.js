const Iterator = require("../lib/iterator.cjs");

let iterator;
beforeEach(() => {
	iterator = new Iterator([1, 2, 3, 4]);
});
describe("Iterator", () => {
	describe("next", () => {
		it("should return the next value", () => {
			expect(iterator.next()).toEqual({ value: 1, done: false });
			expect(iterator.next()).toEqual({ value: 2, done: false });
		});
		it("should return done at end of values", () => {
			iterator.pointer = 4;
			expect(iterator.next()).toEqual({ value: undefined, done: true });
		});
	});
	describe("each", () => {
		it("should send value to callback", () => {
			iterator.each((a) => expect(a).toEqual({ value: 1 }));
		});
		it("should stop execution if true isn't returned", () => {
			let counter = 0;
			iterator.each(() => {
				counter++;
			});
			expect(counter).toBe(1);
			iterator.each(() => counter++);
			expect(counter).toBe(2);
		});
		it("should continue execution if true is returned", () => {
			let counter = 0;
			iterator.each(() => {
				counter++;
				return true;
			});
			expect(counter).toBe(4);
		});
		it("should go through each value in order", () => {
			const values = [];
			iterator.each((a) => {
				values.push(a);
				return true;
			});
			expect(values).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }]);
		});
		it("should remember position stopping execution", () => {
			iterator.each((a) => expect(a).toEqual({ value: 1 }));
			iterator.each((a) => expect(a).toEqual({ value: 2 }));
			iterator.each((a) => expect(a).toEqual({ value: 3 }));
			iterator.each((a) => expect(a).toEqual({ value: 4 }));
		});
	});
});
