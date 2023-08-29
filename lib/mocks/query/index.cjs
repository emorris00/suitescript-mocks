var _dec, _dec2, _init_createPeriod, _dec3, _dec4, _init_createRelativeDate, _dec5, _dec6, _init_delete, _dec7, _dec8, _init_listTables, _dec9, _init_load, _dec10, _dec11, _init_runSuiteQL;
function createAddInitializerMethod(initializers, decoratorFinishedRef) { return function (initializer) { assertNotFinished(decoratorFinishedRef, "addInitializer"), assertCallable(initializer, "An initializer"), initializers.push(initializer); }; }
function memberDec(dec, name, desc, initializers, kind, isStatic, isPrivate, value) { var kindStr; switch (kind) { case 1: kindStr = "accessor"; break; case 2: kindStr = "method"; break; case 3: kindStr = "getter"; break; case 4: kindStr = "setter"; break; default: kindStr = "field"; } var get, set, ctx = { kind: kindStr, name: isPrivate ? "#" + name : name, static: isStatic, private: isPrivate }, decoratorFinishedRef = { v: !1 }; 0 !== kind && (ctx.addInitializer = createAddInitializerMethod(initializers, decoratorFinishedRef)), 0 === kind ? isPrivate ? (get = desc.get, set = desc.set) : (get = function () { return this[name]; }, set = function (v) { this[name] = v; }) : 2 === kind ? get = function () { return desc.value; } : (1 !== kind && 3 !== kind || (get = function () { return desc.get.call(this); }), 1 !== kind && 4 !== kind || (set = function (v) { desc.set.call(this, v); })), ctx.access = get && set ? { get: get, set: set } : get ? { get: get } : { set: set }; try { return dec(value, ctx); } finally { decoratorFinishedRef.v = !0; } }
function assertNotFinished(decoratorFinishedRef, fnName) { if (decoratorFinishedRef.v) throw new Error("attempted to call " + fnName + " after decoration was finished"); }
function assertCallable(fn, hint) { if ("function" != typeof fn) throw new TypeError(hint + " must be a function"); }
function assertValidReturnValue(kind, value) { var type = typeof value; if (1 === kind) { if ("object" !== type || null === value) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== value.get && assertCallable(value.get, "accessor.get"), void 0 !== value.set && assertCallable(value.set, "accessor.set"), void 0 !== value.init && assertCallable(value.init, "accessor.init"); } else if ("function" !== type) { var hint; throw hint = 0 === kind ? "field" : 10 === kind ? "class" : "method", new TypeError(hint + " decorators must return a function or void 0"); } }
function applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, initializers) { var desc, init, value, newValue, get, set, decs = decInfo[0]; if (isPrivate ? desc = 0 === kind || 1 === kind ? { get: decInfo[3], set: decInfo[4] } : 3 === kind ? { get: decInfo[3] } : 4 === kind ? { set: decInfo[3] } : { value: decInfo[3] } : 0 !== kind && (desc = Object.getOwnPropertyDescriptor(base, name)), 1 === kind ? value = { get: desc.get, set: desc.set } : 2 === kind ? value = desc.value : 3 === kind ? value = desc.get : 4 === kind && (value = desc.set), "function" == typeof decs) void 0 !== (newValue = memberDec(decs, name, desc, initializers, kind, isStatic, isPrivate, value)) && (assertValidReturnValue(kind, newValue), 0 === kind ? init = newValue : 1 === kind ? (init = newValue.init, get = newValue.get || value.get, set = newValue.set || value.set, value = { get: get, set: set }) : value = newValue);else for (var i = decs.length - 1; i >= 0; i--) { var newInit; if (void 0 !== (newValue = memberDec(decs[i], name, desc, initializers, kind, isStatic, isPrivate, value))) assertValidReturnValue(kind, newValue), 0 === kind ? newInit = newValue : 1 === kind ? (newInit = newValue.init, get = newValue.get || value.get, set = newValue.set || value.set, value = { get: get, set: set }) : value = newValue, void 0 !== newInit && (void 0 === init ? init = newInit : "function" == typeof init ? init = [init, newInit] : init.push(newInit)); } if (0 === kind || 1 === kind) { if (void 0 === init) init = function (instance, init) { return init; };else if ("function" != typeof init) { var ownInitializers = init; init = function (instance, init) { for (var value = init, i = 0; i < ownInitializers.length; i++) value = ownInitializers[i].call(instance, value); return value; }; } else { var originalInitializer = init; init = function (instance, init) { return originalInitializer.call(instance, init); }; } ret.push(init); } 0 !== kind && (1 === kind ? (desc.get = value.get, desc.set = value.set) : 2 === kind ? desc.value = value : 3 === kind ? desc.get = value : 4 === kind && (desc.set = value), isPrivate ? 1 === kind ? (ret.push(function (instance, args) { return value.get.call(instance, args); }), ret.push(function (instance, args) { return value.set.call(instance, args); })) : 2 === kind ? ret.push(value) : ret.push(function (instance, args) { return value.call(instance, args); }) : Object.defineProperty(base, name, desc)); }
function applyMemberDecs(ret, Class, decInfos) { for (var protoInitializers, staticInitializers, existingProtoNonFields = new Map(), existingStaticNonFields = new Map(), i = 0; i < decInfos.length; i++) { var decInfo = decInfos[i]; if (Array.isArray(decInfo)) { var base, initializers, kind = decInfo[1], name = decInfo[2], isPrivate = decInfo.length > 3, isStatic = kind >= 5; if (isStatic ? (base = Class, 0 !== (kind -= 5) && (initializers = staticInitializers = staticInitializers || [])) : (base = Class.prototype, 0 !== kind && (initializers = protoInitializers = protoInitializers || [])), 0 !== kind && !isPrivate) { var existingNonFields = isStatic ? existingStaticNonFields : existingProtoNonFields, existingKind = existingNonFields.get(name) || 0; if (!0 === existingKind || 3 === existingKind && 4 !== kind || 4 === existingKind && 3 !== kind) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + name); !existingKind && kind > 2 ? existingNonFields.set(name, kind) : existingNonFields.set(name, !0); } applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, initializers); } } pushInitializers(ret, protoInitializers), pushInitializers(ret, staticInitializers); }
function pushInitializers(ret, initializers) { initializers && ret.push(function (instance) { for (var i = 0; i < initializers.length; i++) initializers[i].call(instance); return instance; }); }
function applyClassDecs(ret, targetClass, classDecs) { if (classDecs.length > 0) { for (var initializers = [], newClass = targetClass, name = targetClass.name, i = classDecs.length - 1; i >= 0; i--) { var decoratorFinishedRef = { v: !1 }; try { var nextNewClass = classDecs[i](newClass, { kind: "class", name: name, addInitializer: createAddInitializerMethod(initializers, decoratorFinishedRef) }); } finally { decoratorFinishedRef.v = !0; } void 0 !== nextNewClass && (assertValidReturnValue(10, nextNewClass), newClass = nextNewClass); } ret.push(newClass, function () { for (var i = 0; i < initializers.length; i++) initializers[i].call(newClass); }); } }
function _applyDecs(targetClass, memberDecs, classDecs) { var ret = []; return applyMemberDecs(ret, targetClass, memberDecs), applyClassDecs(ret, targetClass, classDecs), ret; }
const queryStub = require("suitecloud-unit-testing-stubs/stubs/query");
const {
  addPromise,
  options,
  required
} = require("../../helpers.cjs");
const Column = require("./Column.cjs");
const Component = require("./Component.cjs");
const Condition = require("./Condition.cjs");
const Page = require("./Page.cjs");
const PagedData = require("./PagedData.cjs");
const PageRange = require("./PageRange.cjs");
const Period = require("./Period.cjs");
const Query = require("./Query.cjs");
const RelativeDate = require("./RelativeDate.cjs");
const Result = require("./Result.cjs");
const ResultSet = require("./ResultSet.cjs");
const Sort = require("./Sort.cjs");
const SuiteQL = require("./SuiteQL.cjs");
const SuiteScriptMocks = require("../../../index.cjs");
_dec = options("code", "adjustment", "type");
_dec2 = required("code");
_dec3 = options("dateId", "value");
_dec4 = required("dateId", "value");
_dec5 = options("id");
_dec6 = required("id");
_dec7 = options("workbookId");
_dec8 = required("workbookId");
_dec9 = addPromise();
_dec10 = options("query", "params", "customScriptId");
_dec11 = required("query");
class QueryModule {
  static {
    [_init_createPeriod, _init_createRelativeDate, _init_delete, _init_listTables, _init_load, _init_runSuiteQL] = _applyDecs(this, [[[_dec, _dec2], 0, "createPeriod"], [[_dec3, _dec4], 0, "createRelativeDate"], [[_dec5, _dec6], 0, "delete"], [[_dec7, _dec8], 0, "listTables"], [_dec9, 0, "load"], [[_dec10, _dec11], 0, "runSuiteQL"]], []);
  }
  Aggregate = queryStub.Aggregate;
  DateId = queryStub.DateId;
  FieldContext = queryStub.FieldContext;
  Operator = queryStub.Operator;
  PeriodAdjustment = queryStub.PeriodAdjustment;
  PeriodCode = queryStub.PeriodCode;
  PeriodType = queryStub.PeriodType;
  RelativeDateRange = queryStub.RelativeDateRange;
  ReturnType = queryStub.ReturnType;
  SortLocale = queryStub.SortLocale;
  Type = queryStub.Type;
  Column = Column;
  Component = Component;
  Condition = Condition;
  Page = Page;
  PagedData = PagedData;
  PageRange = PageRange;
  Period = Period;
  Query = Query;
  RelativeDate = RelativeDate;
  Result = Result;
  ResultSet = ResultSet;
  Sort = Sort;
  SuiteQL = SuiteQL;
  create = options => {};
  createPeriod = _init_createPeriod(this, options => {
    return new Period({
      adjustment: this.PeriodAdjustment.NOT_LAST,
      type: this.PeriodType.START,
      ...options
    });
  });
  createRelativeDate = _init_createRelativeDate(this, options => {
    return new RelativeDate(options);
  });
  delete = _init_delete(this, options => {});
  listTables = _init_listTables(this, options => {});
  load = _init_load(this, options => {});
  runSuiteQL = _init_runSuiteQL(this, options => {
    return new ResultSet(SuiteScriptMocks.runSuiteQLResults.shift());
  });
  runSuiteQLPaged = options => {};
}
module.exports = new QueryModule();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJxdWVyeVN0dWIiLCJyZXF1aXJlIiwiYWRkUHJvbWlzZSIsIm9wdGlvbnMiLCJyZXF1aXJlZCIsIkNvbHVtbiIsIkNvbXBvbmVudCIsIkNvbmRpdGlvbiIsIlBhZ2UiLCJQYWdlZERhdGEiLCJQYWdlUmFuZ2UiLCJQZXJpb2QiLCJRdWVyeSIsIlJlbGF0aXZlRGF0ZSIsIlJlc3VsdCIsIlJlc3VsdFNldCIsIlNvcnQiLCJTdWl0ZVFMIiwiU3VpdGVTY3JpcHRNb2NrcyIsIlF1ZXJ5TW9kdWxlIiwiQWdncmVnYXRlIiwiRGF0ZUlkIiwiRmllbGRDb250ZXh0IiwiT3BlcmF0b3IiLCJQZXJpb2RBZGp1c3RtZW50IiwiUGVyaW9kQ29kZSIsIlBlcmlvZFR5cGUiLCJSZWxhdGl2ZURhdGVSYW5nZSIsIlJldHVyblR5cGUiLCJTb3J0TG9jYWxlIiwiVHlwZSIsImNyZWF0ZSIsImNyZWF0ZVBlcmlvZCIsImFkanVzdG1lbnQiLCJOT1RfTEFTVCIsInR5cGUiLCJTVEFSVCIsImNyZWF0ZVJlbGF0aXZlRGF0ZSIsImRlbGV0ZSIsImxpc3RUYWJsZXMiLCJsb2FkIiwicnVuU3VpdGVRTCIsInJ1blN1aXRlUUxSZXN1bHRzIiwic2hpZnQiLCJydW5TdWl0ZVFMUGFnZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vY2tzL3F1ZXJ5L2luZGV4LmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBxdWVyeVN0dWIgPSByZXF1aXJlKFwic3VpdGVjbG91ZC11bml0LXRlc3Rpbmctc3R1YnMvc3R1YnMvcXVlcnlcIik7XG5jb25zdCB7IGFkZFByb21pc2UsIG9wdGlvbnMsIHJlcXVpcmVkIH0gPSByZXF1aXJlKFwiLi4vLi4vaGVscGVycy5janNcIik7XG5jb25zdCBDb2x1bW4gPSByZXF1aXJlKFwiLi9Db2x1bW4uY2pzXCIpO1xuY29uc3QgQ29tcG9uZW50ID0gcmVxdWlyZShcIi4vQ29tcG9uZW50LmNqc1wiKTtcbmNvbnN0IENvbmRpdGlvbiA9IHJlcXVpcmUoXCIuL0NvbmRpdGlvbi5janNcIik7XG5jb25zdCBQYWdlID0gcmVxdWlyZShcIi4vUGFnZS5janNcIik7XG5jb25zdCBQYWdlZERhdGEgPSByZXF1aXJlKFwiLi9QYWdlZERhdGEuY2pzXCIpO1xuY29uc3QgUGFnZVJhbmdlID0gcmVxdWlyZShcIi4vUGFnZVJhbmdlLmNqc1wiKTtcbmNvbnN0IFBlcmlvZCA9IHJlcXVpcmUoXCIuL1BlcmlvZC5janNcIik7XG5jb25zdCBRdWVyeSA9IHJlcXVpcmUoXCIuL1F1ZXJ5LmNqc1wiKTtcbmNvbnN0IFJlbGF0aXZlRGF0ZSA9IHJlcXVpcmUoXCIuL1JlbGF0aXZlRGF0ZS5janNcIik7XG5jb25zdCBSZXN1bHQgPSByZXF1aXJlKFwiLi9SZXN1bHQuY2pzXCIpO1xuY29uc3QgUmVzdWx0U2V0ID0gcmVxdWlyZShcIi4vUmVzdWx0U2V0LmNqc1wiKTtcbmNvbnN0IFNvcnQgPSByZXF1aXJlKFwiLi9Tb3J0LmNqc1wiKTtcbmNvbnN0IFN1aXRlUUwgPSByZXF1aXJlKFwiLi9TdWl0ZVFMLmNqc1wiKTtcbmNvbnN0IFN1aXRlU2NyaXB0TW9ja3MgPSByZXF1aXJlKFwiLi4vLi4vLi4vaW5kZXguY2pzXCIpO1xuXG5jbGFzcyBRdWVyeU1vZHVsZSB7XG5cdEFnZ3JlZ2F0ZSA9IHF1ZXJ5U3R1Yi5BZ2dyZWdhdGU7XG5cdERhdGVJZCA9IHF1ZXJ5U3R1Yi5EYXRlSWQ7XG5cdEZpZWxkQ29udGV4dCA9IHF1ZXJ5U3R1Yi5GaWVsZENvbnRleHQ7XG5cdE9wZXJhdG9yID0gcXVlcnlTdHViLk9wZXJhdG9yO1xuXHRQZXJpb2RBZGp1c3RtZW50ID0gcXVlcnlTdHViLlBlcmlvZEFkanVzdG1lbnQ7XG5cdFBlcmlvZENvZGUgPSBxdWVyeVN0dWIuUGVyaW9kQ29kZTtcblx0UGVyaW9kVHlwZSA9IHF1ZXJ5U3R1Yi5QZXJpb2RUeXBlO1xuXHRSZWxhdGl2ZURhdGVSYW5nZSA9IHF1ZXJ5U3R1Yi5SZWxhdGl2ZURhdGVSYW5nZTtcblx0UmV0dXJuVHlwZSA9IHF1ZXJ5U3R1Yi5SZXR1cm5UeXBlO1xuXHRTb3J0TG9jYWxlID0gcXVlcnlTdHViLlNvcnRMb2NhbGU7XG5cdFR5cGUgPSBxdWVyeVN0dWIuVHlwZTtcblxuXHRDb2x1bW4gPSBDb2x1bW47XG5cdENvbXBvbmVudCA9IENvbXBvbmVudDtcblx0Q29uZGl0aW9uID0gQ29uZGl0aW9uO1xuXHRQYWdlID0gUGFnZTtcblx0UGFnZWREYXRhID0gUGFnZWREYXRhO1xuXHRQYWdlUmFuZ2UgPSBQYWdlUmFuZ2U7XG5cdFBlcmlvZCA9IFBlcmlvZDtcblx0UXVlcnkgPSBRdWVyeTtcblx0UmVsYXRpdmVEYXRlID0gUmVsYXRpdmVEYXRlO1xuXHRSZXN1bHQgPSBSZXN1bHQ7XG5cdFJlc3VsdFNldCA9IFJlc3VsdFNldDtcblx0U29ydCA9IFNvcnQ7XG5cdFN1aXRlUUwgPSBTdWl0ZVFMO1xuXG5cdGNyZWF0ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcImNvZGVcIiwgXCJhZGp1c3RtZW50XCIsIFwidHlwZVwiKVxuXHRAcmVxdWlyZWQoXCJjb2RlXCIpXG5cdGNyZWF0ZVBlcmlvZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBQZXJpb2Qoe1xuXHRcdFx0YWRqdXN0bWVudDogdGhpcy5QZXJpb2RBZGp1c3RtZW50Lk5PVF9MQVNULFxuXHRcdFx0dHlwZTogdGhpcy5QZXJpb2RUeXBlLlNUQVJULFxuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHR9KTtcblx0fTtcblxuXHRAb3B0aW9ucyhcImRhdGVJZFwiLCBcInZhbHVlXCIpXG5cdEByZXF1aXJlZChcImRhdGVJZFwiLCBcInZhbHVlXCIpXG5cdGNyZWF0ZVJlbGF0aXZlRGF0ZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBSZWxhdGl2ZURhdGUob3B0aW9ucyk7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJpZFwiKVxuXHRAcmVxdWlyZWQoXCJpZFwiKVxuXHRkZWxldGUgPSAob3B0aW9ucykgPT4ge307XG5cblx0QG9wdGlvbnMoXCJ3b3JrYm9va0lkXCIpXG5cdEByZXF1aXJlZChcIndvcmtib29rSWRcIilcblx0bGlzdFRhYmxlcyA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdGxvYWQgPSAob3B0aW9ucykgPT4ge307XG5cblx0QG9wdGlvbnMoXCJxdWVyeVwiLCBcInBhcmFtc1wiLCBcImN1c3RvbVNjcmlwdElkXCIpXG5cdEByZXF1aXJlZChcInF1ZXJ5XCIpXG5cdHJ1blN1aXRlUUwgPSAob3B0aW9ucykgPT4ge1xuXHRcdHJldHVybiBuZXcgUmVzdWx0U2V0KFN1aXRlU2NyaXB0TW9ja3MucnVuU3VpdGVRTFJlc3VsdHMuc2hpZnQoKSk7XG5cdH07XG5cblx0cnVuU3VpdGVRTFBhZ2VkID0gKG9wdGlvbnMpID0+IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBRdWVyeU1vZHVsZSgpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE1BQU1BLFNBQVMsR0FBR0MsT0FBTyxDQUFDLDJDQUEyQyxDQUFDO0FBQ3RFLE1BQU07RUFBRUMsVUFBVTtFQUFFQyxPQUFPO0VBQUVDO0FBQVMsQ0FBQyxHQUFHSCxPQUFPLENBQUMsbUJBQW1CLENBQUM7QUFDdEUsTUFBTUksTUFBTSxHQUFHSixPQUFPLENBQUMsY0FBYyxDQUFDO0FBQ3RDLE1BQU1LLFNBQVMsR0FBR0wsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQzVDLE1BQU1NLFNBQVMsR0FBR04sT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQzVDLE1BQU1PLElBQUksR0FBR1AsT0FBTyxDQUFDLFlBQVksQ0FBQztBQUNsQyxNQUFNUSxTQUFTLEdBQUdSLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUM1QyxNQUFNUyxTQUFTLEdBQUdULE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUM1QyxNQUFNVSxNQUFNLEdBQUdWLE9BQU8sQ0FBQyxjQUFjLENBQUM7QUFDdEMsTUFBTVcsS0FBSyxHQUFHWCxPQUFPLENB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