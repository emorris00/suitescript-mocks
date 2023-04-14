import SuiteScriptMocks from "../../index.cjs";
import task from "../../lib/mocks/task/index.cjs";

let Task;
beforeEach(() => {
	SuiteScriptMocks.reset();
	Task = task.create({ taskType: task.TaskType.CSV_IMPORT });
});
describe("task.Task", () => {
	describe("submit", () => {
		it("should add status to SuiteScriptMocks.taskStatuses", () => {
			Task.submit();
			expect(Array.from(SuiteScriptMocks.taskStatuses.values())).toHaveLength(1);
		});
		it("should add id to task", () => {
			Task.submit();
			expect(Task.id).toBeGreaterThan(0);
		});
		it("should return task id", () => {
			expect(Task.submit()).toBeGreaterThan(0);
		});
		it("should error if status was already submitted", () => {
			Task.submit();
			expect(() => {
				Task.submit();
			}).toThrow();
		});
	});
});
