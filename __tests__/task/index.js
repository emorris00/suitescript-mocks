import SuiteScriptMocks from "../../index.cjs";
import task from "../../lib/mocks/task/index.cjs";

beforeEach(() => {
	SuiteScriptMocks.reset();
});
describe("task", () => {
	describe("checkStatus", () => {
		it("should return status if it exists", () => {
			const status = new task.CsvImportTaskStatus({ taskId: 1, status: task.TaskStatus.PENDING });
			SuiteScriptMocks.taskStatuses.add(status);
			expect(task.checkStatus(1).status).toBe(task.TaskStatus.PENDING);
		});
		it("should throw error if status doesn't exist", () => {
			expect(() => {
				task.checkStatus(999999);
			}).toThrow();
		});
	});

	describe("create", () => {
		it.each(Object.entries(task.TaskTypeMap))("should create task of the correct type", (taskType, taskClass) => {
			const t = task.create({ taskType });
			expect(t).toBeInstanceOf(taskClass);
		});
	});
});
