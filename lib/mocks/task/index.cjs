var _dec, _dec2, _init_checkStatus, _dec3, _init_create;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const SuiteScriptMocks = require("../../index.cjs");
const taskStub = require("suitecloud-unit-testing-stubs/stubs/task");
const {
  options,
  required
} = require("../../helpers.cjs");
const {
  TaskTypeStatusMap
} = require("./Task.cjs");
const CsvImportTask = require("./CsvImportTask.cjs");
const EntityDeduplicationTask = require("./EntityDeduplicationTask.cjs");
const MapReduceScriptTask = require("./MapReduceScriptTask.cjs");
const QueryTask = require("./QueryTask.cjs");
const RecordActionTask = require("./RecordActionTask.cjs");
const ScheduledScriptTask = require("./ScheduledScriptTask.cjs");
const SearchTask = require("./SearchTask.cjs");
const SuiteQLTask = require("./SuiteQLTask.cjs");
const WorkflowTriggerTask = require("./WorkflowTriggerTask.cjs");
const TaskTypeMap = {
  [taskStub.TaskType.CSV_IMPORT]: CsvImportTask,
  [taskStub.TaskType.ENTITY_DEDUPLICATION]: EntityDeduplicationTask,
  [taskStub.TaskType.MAP_REDUCE]: MapReduceScriptTask,
  [taskStub.TaskType.QUERY]: QueryTask,
  [taskStub.TaskType.RECORD_ACTION]: RecordActionTask,
  [taskStub.TaskType.SCHEDULED_SCRIPT]: ScheduledScriptTask,
  [taskStub.TaskType.SEARCH]: SearchTask,
  [taskStub.TaskType.SUITE_QL]: SuiteQLTask,
  [taskStub.TaskType.WORKFLOW_TRIGGER]: WorkflowTriggerTask
};
_dec = options("taskId");
_dec2 = required("taskId");
_dec3 = required("taskType");
class TaskModule {
  static {
    [_init_checkStatus, _init_create] = _applyDecs2203R(this, [[[_dec, _dec2], 0, "checkStatus"], [_dec3, 0, "create"]], []).e;
  }
  ActionCondition = taskStub.ActionCondition;
  DedupeEntityType = taskStub.DedupeEntityType;
  DedupeMode = taskStub.DedupeMode;
  MapReduceStage = taskStub.MapReduceStage;
  MasterSelectionMode = taskStub.MasterSelectionMode;
  TaskStatus = taskStub.TaskStatus;
  TaskType = taskStub.TaskType;
  TaskTypeMap = TaskTypeMap;
  TaskTypeStatusMap = TaskTypeStatusMap;
  CsvImportTask = TaskTypeMap[taskStub.TaskType.CSV_IMPORT];
  EntityDeduplicationTask = TaskTypeMap[taskStub.TaskType.ENTITY_DEDUPLICATION];
  MapReduceScriptTask = TaskTypeMap[taskStub.TaskType.MAP_REDUCE];
  QueryTask = TaskTypeMap[taskStub.TaskType.QUERY];
  RecordActionTask = TaskTypeMap[taskStub.TaskType.RECORD_ACTION];
  ScheduledScriptTask = TaskTypeMap[taskStub.TaskType.SCHEDULED_SCRIPT];
  SearchTask = TaskTypeMap[taskStub.TaskType.SEARCH];
  SuiteQLTask = TaskTypeMap[taskStub.TaskType.SUITE_QL];
  WorkflowTriggerTask = TaskTypeMap[taskStub.TaskType.WORKFLOW_TRIGGER];
  CsvImportTaskStatus = TaskTypeStatusMap[taskStub.TaskType.CSV_IMPORT];
  EntityDeduplicationTaskStatus = TaskTypeStatusMap[taskStub.TaskType.ENTITY_DEDUPLICATION];
  MapReduceScriptTaskStatus = TaskTypeStatusMap[taskStub.TaskType.MAP_REDUCE];
  QueryTaskStatus = TaskTypeStatusMap[taskStub.TaskType.QUERY];
  RecordActionTaskStatus = TaskTypeStatusMap[taskStub.TaskType.RECORD_ACTION];
  ScheduledScriptTaskStatus = TaskTypeStatusMap[taskStub.TaskType.SCHEDULED_SCRIPT];
  SearchTaskStatus = TaskTypeStatusMap[taskStub.TaskType.SEARCH];
  SuiteQLTaskStatus = TaskTypeStatusMap[taskStub.TaskType.SUITE_QL];
  WorkflowTriggerTaskStatus = TaskTypeStatusMap[taskStub.TaskType.WORKFLOW_TRIGGER];
  checkStatus = _init_checkStatus(this, options => {
    if (SuiteScriptMocks.taskStatuses.has(options)) {
      return SuiteScriptMocks.taskStatuses.get(options);
    }
    throw new Error("Task doesn't exist");
  });
  create = _init_create(this, options => {
    if (options.taskType in this.TaskTypeMap) {
      const task = new this.TaskTypeMap[options.taskType](options);
      return task;
    }
    throw new Error("Invalid task type");
  });
}
module.exports = new TaskModule();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWl0ZVNjcmlwdE1vY2tzIiwicmVxdWlyZSIsInRhc2tTdHViIiwib3B0aW9ucyIsInJlcXVpcmVkIiwiVGFza1R5cGVTdGF0dXNNYXAiLCJDc3ZJbXBvcnRUYXNrIiwiRW50aXR5RGVkdXBsaWNhdGlvblRhc2siLCJNYXBSZWR1Y2VTY3JpcHRUYXNrIiwiUXVlcnlUYXNrIiwiUmVjb3JkQWN0aW9uVGFzayIsIlNjaGVkdWxlZFNjcmlwdFRhc2siLCJTZWFyY2hUYXNrIiwiU3VpdGVRTFRhc2siLCJXb3JrZmxvd1RyaWdnZXJUYXNrIiwiVGFza1R5cGVNYXAiLCJUYXNrVHlwZSIsIkNTVl9JTVBPUlQiLCJFTlRJVFlfREVEVVBMSUNBVElPTiIsIk1BUF9SRURVQ0UiLCJRVUVSWSIsIlJFQ09SRF9BQ1RJT04iLCJTQ0hFRFVMRURfU0NSSVBUIiwiU0VBUkNIIiwiU1VJVEVfUUwiLCJXT1JLRkxPV19UUklHR0VSIiwiX2RlYyIsIl9kZWMyIiwiX2RlYzMiLCJUYXNrTW9kdWxlIiwiX2luaXRfY2hlY2tTdGF0dXMiLCJfaW5pdF9jcmVhdGUiLCJfYXBwbHlEZWNzMjIwM1IiLCJlIiwiQWN0aW9uQ29uZGl0aW9uIiwiRGVkdXBlRW50aXR5VHlwZSIsIkRlZHVwZU1vZGUiLCJNYXBSZWR1Y2VTdGFnZSIsIk1hc3RlclNlbGVjdGlvbk1vZGUiLCJUYXNrU3RhdHVzIiwiQ3N2SW1wb3J0VGFza1N0YXR1cyIsIkVudGl0eURlZHVwbGljYXRpb25UYXNrU3RhdHVzIiwiTWFwUmVkdWNlU2NyaXB0VGFza1N0YXR1cyIsIlF1ZXJ5VGFza1N0YXR1cyIsIlJlY29yZEFjdGlvblRhc2tTdGF0dXMiLCJTY2hlZHVsZWRTY3JpcHRUYXNrU3RhdHVzIiwiU2VhcmNoVGFza1N0YXR1cyIsIlN1aXRlUUxUYXNrU3RhdHVzIiwiV29ya2Zsb3dUcmlnZ2VyVGFza1N0YXR1cyIsImNoZWNrU3RhdHVzIiwidGFza1N0YXR1c2VzIiwiaGFzIiwiZ2V0IiwiRXJyb3IiLCJjcmVhdGUiLCJ0YXNrVHlwZSIsInRhc2siLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vY2tzL3Rhc2svaW5kZXguY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFN1aXRlU2NyaXB0TW9ja3MgPSByZXF1aXJlKFwiLi4vLi4vaW5kZXguY2pzXCIpO1xuY29uc3QgdGFza1N0dWIgPSByZXF1aXJlKFwic3VpdGVjbG91ZC11bml0LXRlc3Rpbmctc3R1YnMvc3R1YnMvdGFza1wiKTtcbmNvbnN0IHsgb3B0aW9ucywgcmVxdWlyZWQgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKTtcbmNvbnN0IHsgVGFza1R5cGVTdGF0dXNNYXAgfSA9IHJlcXVpcmUoXCIuL1Rhc2suY2pzXCIpO1xuXG5jb25zdCBDc3ZJbXBvcnRUYXNrID0gcmVxdWlyZShcIi4vQ3N2SW1wb3J0VGFzay5janNcIik7XG5jb25zdCBFbnRpdHlEZWR1cGxpY2F0aW9uVGFzayA9IHJlcXVpcmUoXCIuL0VudGl0eURlZHVwbGljYXRpb25UYXNrLmNqc1wiKTtcbmNvbnN0IE1hcFJlZHVjZVNjcmlwdFRhc2sgPSByZXF1aXJlKFwiLi9NYXBSZWR1Y2VTY3JpcHRUYXNrLmNqc1wiKTtcbmNvbnN0IFF1ZXJ5VGFzayA9IHJlcXVpcmUoXCIuL1F1ZXJ5VGFzay5janNcIik7XG5jb25zdCBSZWNvcmRBY3Rpb25UYXNrID0gcmVxdWlyZShcIi4vUmVjb3JkQWN0aW9uVGFzay5janNcIik7XG5jb25zdCBTY2hlZHVsZWRTY3JpcHRUYXNrID0gcmVxdWlyZShcIi4vU2NoZWR1bGVkU2NyaXB0VGFzay5janNcIik7XG5jb25zdCBTZWFyY2hUYXNrID0gcmVxdWlyZShcIi4vU2VhcmNoVGFzay5janNcIik7XG5jb25zdCBTdWl0ZVFMVGFzayA9IHJlcXVpcmUoXCIuL1N1aXRlUUxUYXNrLmNqc1wiKTtcbmNvbnN0IFdvcmtmbG93VHJpZ2dlclRhc2sgPSByZXF1aXJlKFwiLi9Xb3JrZmxvd1RyaWdnZXJUYXNrLmNqc1wiKTtcblxuY29uc3QgVGFza1R5cGVNYXAgPSB7XG5cdFt0YXNrU3R1Yi5UYXNrVHlwZS5DU1ZfSU1QT1JUXTogQ3N2SW1wb3J0VGFzayxcblx0W3Rhc2tTdHViLlRhc2tUeXBlLkVOVElUWV9ERURVUExJQ0FUSU9OXTogRW50aXR5RGVkdXBsaWNhdGlvblRhc2ssXG5cdFt0YXNrU3R1Yi5UYXNrVHlwZS5NQVBfUkVEVUNFXTogTWFwUmVkdWNlU2NyaXB0VGFzayxcblx0W3Rhc2tTdHViLlRhc2tUeXBlLlFVRVJZXTogUXVlcnlUYXNrLFxuXHRbdGFza1N0dWIuVGFza1R5cGUuUkVDT1JEX0FDVElPTl06IFJlY29yZEFjdGlvblRhc2ssXG5cdFt0YXNrU3R1Yi5UYXNrVHlwZS5TQ0hFRFVMRURfU0NSSVBUXTogU2NoZWR1bGVkU2NyaXB0VGFzayxcblx0W3Rhc2tTdHViLlRhc2tUeXBlLlNFQVJDSF06IFNlYXJjaFRhc2ssXG5cdFt0YXNrU3R1Yi5UYXNrVHlwZS5TVUlURV9RTF06IFN1aXRlUUxUYXNrLFxuXHRbdGFza1N0dWIuVGFza1R5cGUuV09SS0ZMT1dfVFJJR0dFUl06IFdvcmtmbG93VHJpZ2dlclRhc2ssXG59O1xuXG5jbGFzcyBUYXNrTW9kdWxlIHtcblx0QWN0aW9uQ29uZGl0aW9uID0gdGFza1N0dWIuQWN0aW9uQ29uZGl0aW9uO1xuXHREZWR1cGVFbnRpdHlUeXBlID0gdGFza1N0dWIuRGVkdXBlRW50aXR5VHlwZTtcblx0RGVkdXBlTW9kZSA9IHRhc2tTdHViLkRlZHVwZU1vZGU7XG5cdE1hcFJlZHVjZVN0YWdlID0gdGFza1N0dWIuTWFwUmVkdWNlU3RhZ2U7XG5cdE1hc3RlclNlbGVjdGlvbk1vZGUgPSB0YXNrU3R1Yi5NYXN0ZXJTZWxlY3Rpb25Nb2RlO1xuXHRUYXNrU3RhdHVzID0gdGFza1N0dWIuVGFza1N0YXR1cztcblx0VGFza1R5cGUgPSB0YXNrU3R1Yi5UYXNrVHlwZTtcblxuXHRUYXNrVHlwZU1hcCA9IFRhc2tUeXBlTWFwO1xuXHRUYXNrVHlwZVN0YXR1c01hcCA9IFRhc2tUeXBlU3RhdHVzTWFwO1xuXG5cdENzdkltcG9ydFRhc2sgPSBUYXNrVHlwZU1hcFt0YXNrU3R1Yi5UYXNrVHlwZS5DU1ZfSU1QT1JUXTtcblx0RW50aXR5RGVkdXBsaWNhdGlvblRhc2sgPSBUYXNrVHlwZU1hcFt0YXNrU3R1Yi5UYXNrVHlwZS5FTlRJVFlfREVEVVBMSUNBVElPTl07XG5cdE1hcFJlZHVjZVNjcmlwdFRhc2sgPSBUYXNrVHlwZU1hcFt0YXNrU3R1Yi5UYXNrVHlwZS5NQVBfUkVEVUNFXTtcblx0UXVlcnlUYXNrID0gVGFza1R5cGVNYXBbdGFza1N0dWIuVGFza1R5cGUuUVVFUlldO1xuXHRSZWNvcmRBY3Rpb25UYXNrID0gVGFza1R5cGVNYXBbdGFza1N0dWIuVGFza1R5cGUuUkVDT1JEX0FDVElPTl07XG5cdFNjaGVkdWxlZFNjcmlwdFRhc2sgPSBUYXNrVHlwZU1hcFt0YXNrU3R1Yi5UYXNrVHlwZS5TQ0hFRFVMRURfU0NSSVBUXTtcblx0U2VhcmNoVGFzayA9IFRhc2tUeXBlTWFwW3Rhc2tTdHViLlRhc2tUeXBlLlNFQVJDSF07XG5cdFN1aXRlUUxUYXNrID0gVGFza1R5cGVNYXBbdGFza1N0dWIuVGFza1R5cGUuU1VJVEVfUUxdO1xuXHRXb3JrZmxvd1RyaWdnZXJUYXNrID0gVGFza1R5cGVNYXBbdGFza1N0dWIuVGFza1R5cGUuV09SS0ZMT1dfVFJJR0dFUl07XG5cblx0Q3N2SW1wb3J0VGFza1N0YXR1cyA9IFRhc2tUeXBlU3RhdHVzTWFwW3Rhc2tTdHViLlRhc2tUeXBlLkNTVl9JTVBPUlRdO1xuXHRFbnRpdHlEZWR1cGxpY2F0aW9uVGFza1N0YXR1cyA9IFRhc2tUeXBlU3RhdHVzTWFwW3Rhc2tTdHViLlRhc2tUeXBlLkVOVElUWV9ERURVUExJQ0FUSU9OXTtcblx0TWFwUmVkdWNlU2NyaXB0VGFza1N0YXR1cyA9IFRhc2tUeXBlU3RhdHVzTWFwW3Rhc2tTdHViLlRhc2tUeXBlLk1BUF9SRURVQ0VdO1xuXHRRdWVyeVRhc2tTdGF0dXMgPSBUYXNrVHlwZVN0YXR1c01hcFt0YXNrU3R1Yi5UYXNrVHlwZS5RVUVSWV07XG5cdFJlY29yZEFjdGlvblRhc2tTdGF0dXMgPSBUYXNrVHlwZVN0YXR1c01hcFt0YXNrU3R1Yi5UYXNrVHlwZS5SRUNPUkRfQUNUSU9OXTtcblx0U2NoZWR1bGVkU2NyaXB0VGFza1N0YXR1cyA9IFRhc2tUeXBlU3RhdHVzTWFwW3Rhc2tTdHViLlRhc2tUeXBlLlNDSEVEVUxFRF9TQ1JJUFRdO1xuXHRTZWFyY2hUYXNrU3RhdHVzID0gVGFza1R5cGVTdGF0dXNNYXBbdGFza1N0dWIuVGFza1R5cGUuU0VBUkNIXTtcblx0U3VpdGVRTFRhc2tTdGF0dXMgPSBUYXNrVHlwZVN0YXR1c01hcFt0YXNrU3R1Yi5UYXNrVHlwZS5TVUlURV9RTF07XG5cdFdvcmtmbG93VHJpZ2dlclRhc2tTdGF0dXMgPSBUYXNrVHlwZVN0YXR1c01hcFt0YXNrU3R1Yi5UYXNrVHlwZS5XT1JLRkxPV19UUklHR0VSXTtcblxuXHRAb3B0aW9ucyhcInRhc2tJZFwiKVxuXHRAcmVxdWlyZWQoXCJ0YXNrSWRcIilcblx0Y2hlY2tTdGF0dXMgPSAob3B0aW9ucykgPT4ge1xuXHRcdGlmIChTdWl0ZVNjcmlwdE1vY2tzLnRhc2tTdGF0dXNlcy5oYXMob3B0aW9ucykpIHtcblx0XHRcdHJldHVybiBTdWl0ZVNjcmlwdE1vY2tzLnRhc2tTdGF0dXNlcy5nZXQob3B0aW9ucyk7XG5cdFx0fVxuXHRcdHRocm93IG5ldyBFcnJvcihcIlRhc2sgZG9lc24ndCBleGlzdFwiKTtcblx0fTtcblxuXHRAcmVxdWlyZWQoXCJ0YXNrVHlwZVwiKVxuXHRjcmVhdGUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGlmIChvcHRpb25zLnRhc2tUeXBlIGluIHRoaXMuVGFza1R5cGVNYXApIHtcblx0XHRcdGNvbnN0IHRhc2sgPSBuZXcgdGhpcy5UYXNrVHlwZU1hcFtvcHRpb25zLnRhc2tUeXBlXShvcHRpb25zKTtcblx0XHRcdHJldHVybiB0YXNrO1xuXHRcdH1cblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHRhc2sgdHlwZVwiKTtcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVGFza01vZHVsZSgpO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNQSxnQkFBZ0IsR0FBR0MsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQ25ELE1BQU1DLFFBQVEsR0FBR0QsT0FBTyxDQUFDLDBDQUEwQyxDQUFDO0FBQ3BFLE1BQU07RUFBRUUsT0FBTztFQUFFQztBQUFTLENBQUMsR0FBR0gsT0FBTyxDQUFDLG1CQUFtQixDQUFDO0FBQzFELE1BQU07RUFBRUk7QUFBa0IsQ0FBQyxHQUFHSixPQUFPLENBQUMsWUFBWSxDQUFDO0FBRW5ELE1BQU1LLGFBQWEsR0FBR0wsT0FBTyxDQUFDLHFCQUFxQixDQUFDO0FBQ3BELE1BQU1NLHVCQUF1QixHQUFHTixPQUFPLENBQUMsK0JBQStCLENBQUM7QUFDeEUsTUFBTU8sbUJBQW1CLEdBQUdQLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQztBQUNoRSxNQUFNUSxTQUFTLEdBQUdSLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUM1QyxNQUFNUyxnQkFBZ0IsR0FBR1QsT0FBTyxDQUFDLHdCQUF3QixDQUFDO0FBQzFELE1BQU1VLG1CQUFtQixHQUFHVixPQUFPLENBQUMsMkJBQTJCLENBQUM7QUFDaEUsTUFBTVcsVUFBVSxHQUFHWCxPQUFPLENBQUMsa0JBQWtCLENBQUM7QUFDOUMsTUFBTVksV0FBVyxHQUFHWixPQUFPLENBQUMsbUJBQW1CLENBQUM7QUFDaEQsTUFBTWEsbUJBQW1CLEdBQUdiLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQztBQUVoRSxNQUFNYyxXQUFXLEdBQUc7RUFDbkIsQ0FBQ2IsUUFBUSxDQUFDYyxRQUFRLENBQUNDLFVBQVUsR0FBR1gsYUFBYTtFQUM3QyxDQUFDSixRQUFRLENBQUNjLFFBQVEsQ0FBQ0Usb0JBQW9CLEdBQUdYLHVCQUF1QjtFQUNqRSxDQUFDTCxRQUFRLENBQUNjLFFBQVEsQ0FBQ0csVUFBVSxHQUFHWCxtQkFBbUI7RUFDbkQs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