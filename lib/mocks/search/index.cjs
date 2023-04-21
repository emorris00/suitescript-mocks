var _dec, _dec2, _init_create, _dec3, _init_createColumn, _dec4, _init_createFilter, _dec5, _init_createSetting, _dec6, _dec7, _init_delete, _dec8, _init_global, _dec9, _init_load, _dec10, _dec11, _init_lookupFields;
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
const searchStub = require("suitecloud-unit-testing-stubs/stubs/search");
const Column = require("./Column.cjs");
const Filter = require("./Filter.cjs");
const Page = require("./Page.cjs");
const PagedData = require("./PagedData.cjs");
const PageRange = require("./PageRange.cjs");
const Result = require("./Result.cjs");
const ResultSet = require("./ResultSet.cjs");
const Search = require("./Search.cjs");
const {
  options,
  addPromise
} = require("../../helpers.cjs");
const SuiteScriptMocks = require("../../../index.cjs");
const {
  required
} = require("../../helpers.cjs");
_dec = addPromise();
_dec2 = required("type");
_dec3 = options("name", "join", "summary", "formula", "function", "label", "sort");
_dec4 = options("name", "join", "operator", "values", "formula", "summary");
_dec5 = options("name", "value");
_dec6 = addPromise();
_dec7 = options("id", "type");
_dec8 = addPromise();
_dec9 = addPromise();
_dec10 = addPromise();
_dec11 = options("type", "id", "columns");
class SearchModule {
  static {
    [_init_create, _init_createColumn, _init_createFilter, _init_createSetting, _init_delete, _init_global, _init_load, _init_lookupFields] = _applyDecs(this, [[[_dec, _dec2], 0, "create"], [_dec3, 0, "createColumn"], [_dec4, 0, "createFilter"], [_dec5, 0, "createSetting"], [[_dec6, _dec7], 0, "delete"], [_dec8, 0, "global"], [_dec9, 0, "load"], [[_dec10, _dec11], 0, "lookupFields"]], []);
  }
  Operator = searchStub.Operator;
  Sort = searchStub.Sort;
  Summary = searchStub.Summary;
  Type = searchStub.Type;
  Column = Column;
  Filter = Filter;
  Page = Page;
  PagedData = PagedData;
  PageRange = PageRange;
  Result = Result;
  ResultSet = ResultSet;
  Search = Search;
  create = _init_create(this, ({
    type,
    columns,
    filters
  }) => {
    columns = (columns || []).map(column => {
      if (typeof column === "string" && column.includes(".")) {
        const [join, name] = column.split(".");
        return this.createColumn({
          name,
          join
        });
      }
      return this.createColumn(column);
    });
    return new Search({
      searchType: type,
      columns,
      filters,
      results: (SuiteScriptMocks.searchResults.shift() || []).map(row => {
        return new Result({
          id: row.id || row.values.internalid,
          recordType: row.recordType || type,
          columns: columns,
          values: row.values
        });
      })
    });
  });
  createColumn = _init_createColumn(this, options => {
    return new Column(options);
  });
  createFilter = _init_createFilter(this, options => {
    return new Filter(options);
  });
  createSetting = _init_createSetting(this, options => {});
  delete = _init_delete(this, options => {
    if (!SuiteScriptMocks.searches.has({
      id: options.id,
      searchId: options.id
    })) {
      throw new Error("search does not exist");
    }
    SuiteScriptMocks.searches.delete({
      id: options.id,
      searchId: options.id
    });
  });
  duplicates = options => {};
  global = _init_global(this, options => {});
  load = _init_load(this, options => {
    if (!SuiteScriptMocks.searches.has({
      id: options.id,
      searchId: options.id
    })) {
      throw new Error("search does not exist");
    }
    return SuiteScriptMocks.searches.get({
      id: options.id,
      searchId: options.id
    });
  });
  lookupFields = _init_lookupFields(this, options => {
    return SuiteScriptMocks.lookupFieldsResults.shift();
  });
}
module.exports = new SearchModule();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzZWFyY2hTdHViIiwicmVxdWlyZSIsIkNvbHVtbiIsIkZpbHRlciIsIlBhZ2UiLCJQYWdlZERhdGEiLCJQYWdlUmFuZ2UiLCJSZXN1bHQiLCJSZXN1bHRTZXQiLCJTZWFyY2giLCJvcHRpb25zIiwiYWRkUHJvbWlzZSIsIlN1aXRlU2NyaXB0TW9ja3MiLCJyZXF1aXJlZCIsIlNlYXJjaE1vZHVsZSIsIk9wZXJhdG9yIiwiU29ydCIsIlN1bW1hcnkiLCJUeXBlIiwiY3JlYXRlIiwidHlwZSIsImNvbHVtbnMiLCJmaWx0ZXJzIiwibWFwIiwiY29sdW1uIiwiaW5jbHVkZXMiLCJqb2luIiwibmFtZSIsInNwbGl0IiwiY3JlYXRlQ29sdW1uIiwic2VhcmNoVHlwZSIsInJlc3VsdHMiLCJzZWFyY2hSZXN1bHRzIiwic2hpZnQiLCJyb3ciLCJpZCIsInZhbHVlcyIsImludGVybmFsaWQiLCJyZWNvcmRUeXBlIiwiY3JlYXRlRmlsdGVyIiwiY3JlYXRlU2V0dGluZyIsImRlbGV0ZSIsInNlYXJjaGVzIiwiaGFzIiwic2VhcmNoSWQiLCJFcnJvciIsImR1cGxpY2F0ZXMiLCJnbG9iYWwiLCJsb2FkIiwiZ2V0IiwibG9va3VwRmllbGRzIiwibG9va3VwRmllbGRzUmVzdWx0cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9ja3Mvc2VhcmNoL2luZGV4LmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZWFyY2hTdHViID0gcmVxdWlyZShcInN1aXRlY2xvdWQtdW5pdC10ZXN0aW5nLXN0dWJzL3N0dWJzL3NlYXJjaFwiKTtcbmNvbnN0IENvbHVtbiA9IHJlcXVpcmUoXCIuL0NvbHVtbi5janNcIik7XG5jb25zdCBGaWx0ZXIgPSByZXF1aXJlKFwiLi9GaWx0ZXIuY2pzXCIpO1xuY29uc3QgUGFnZSA9IHJlcXVpcmUoXCIuL1BhZ2UuY2pzXCIpO1xuY29uc3QgUGFnZWREYXRhID0gcmVxdWlyZShcIi4vUGFnZWREYXRhLmNqc1wiKTtcbmNvbnN0IFBhZ2VSYW5nZSA9IHJlcXVpcmUoXCIuL1BhZ2VSYW5nZS5janNcIik7XG5jb25zdCBSZXN1bHQgPSByZXF1aXJlKFwiLi9SZXN1bHQuY2pzXCIpO1xuY29uc3QgUmVzdWx0U2V0ID0gcmVxdWlyZShcIi4vUmVzdWx0U2V0LmNqc1wiKTtcbmNvbnN0IFNlYXJjaCA9IHJlcXVpcmUoXCIuL1NlYXJjaC5janNcIik7XG5jb25zdCB7IG9wdGlvbnMsIGFkZFByb21pc2UgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKTtcbmNvbnN0IFN1aXRlU2NyaXB0TW9ja3MgPSByZXF1aXJlKFwiLi4vLi4vLi4vaW5kZXguY2pzXCIpO1xuY29uc3QgeyByZXF1aXJlZCB9ID0gcmVxdWlyZShcIi4uLy4uL2hlbHBlcnMuY2pzXCIpO1xuXG5jbGFzcyBTZWFyY2hNb2R1bGUge1xuXHRPcGVyYXRvciA9IHNlYXJjaFN0dWIuT3BlcmF0b3I7XG5cdFNvcnQgPSBzZWFyY2hTdHViLlNvcnQ7XG5cdFN1bW1hcnkgPSBzZWFyY2hTdHViLlN1bW1hcnk7XG5cdFR5cGUgPSBzZWFyY2hTdHViLlR5cGU7XG5cblx0Q29sdW1uID0gQ29sdW1uO1xuXHRGaWx0ZXIgPSBGaWx0ZXI7XG5cdFBhZ2UgPSBQYWdlO1xuXHRQYWdlZERhdGEgPSBQYWdlZERhdGE7XG5cdFBhZ2VSYW5nZSA9IFBhZ2VSYW5nZTtcblx0UmVzdWx0ID0gUmVzdWx0O1xuXHRSZXN1bHRTZXQgPSBSZXN1bHRTZXQ7XG5cdFNlYXJjaCA9IFNlYXJjaDtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEByZXF1aXJlZChcInR5cGVcIilcblx0Y3JlYXRlID0gKHsgdHlwZSwgY29sdW1ucywgZmlsdGVycyB9KSA9PiB7XG5cdFx0Y29sdW1ucyA9IChjb2x1bW5zIHx8IFtdKS5tYXAoKGNvbHVtbikgPT4ge1xuXHRcdFx0aWYgKHR5cGVvZiBjb2x1bW4gPT09IFwic3RyaW5nXCIgJiYgY29sdW1uLmluY2x1ZGVzKFwiLlwiKSkge1xuXHRcdFx0XHRjb25zdCBbam9pbiwgbmFtZV0gPSBjb2x1bW4uc3BsaXQoXCIuXCIpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb2x1bW4oeyBuYW1lLCBqb2luIH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29sdW1uKGNvbHVtbik7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG5ldyBTZWFyY2goe1xuXHRcdFx0c2VhcmNoVHlwZTogdHlwZSxcblx0XHRcdGNvbHVtbnMsXG5cdFx0XHRmaWx0ZXJzLFxuXHRcdFx0cmVzdWx0czogKFN1aXRlU2NyaXB0TW9ja3Muc2VhcmNoUmVzdWx0cy5zaGlmdCgpIHx8IFtdKS5tYXAoKHJvdykgPT4ge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFJlc3VsdCh7XG5cdFx0XHRcdFx0aWQ6IHJvdy5pZCB8fCByb3cudmFsdWVzLmludGVybmFsaWQsXG5cdFx0XHRcdFx0cmVjb3JkVHlwZTogcm93LnJlY29yZFR5cGUgfHwgdHlwZSxcblx0XHRcdFx0XHRjb2x1bW5zOiBjb2x1bW5zLFxuXHRcdFx0XHRcdHZhbHVlczogcm93LnZhbHVlcyxcblx0XHRcdFx0fSk7XG5cdFx0XHR9KSxcblx0XHR9KTtcblx0fTtcblxuXHRAb3B0aW9ucyhcIm5hbWVcIiwgXCJqb2luXCIsIFwic3VtbWFyeVwiLCBcImZvcm11bGFcIiwgXCJmdW5jdGlvblwiLCBcImxhYmVsXCIsIFwic29ydFwiKVxuXHRjcmVhdGVDb2x1bW4gPSAob3B0aW9ucykgPT4ge1xuXHRcdHJldHVybiBuZXcgQ29sdW1uKG9wdGlvbnMpO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwibmFtZVwiLCBcImpvaW5cIiwgXCJvcGVyYXRvclwiLCBcInZhbHVlc1wiLCBcImZvcm11bGFcIiwgXCJzdW1tYXJ5XCIpXG5cdGNyZWF0ZUZpbHRlciA9IChvcHRpb25zKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBGaWx0ZXIob3B0aW9ucyk7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJuYW1lXCIsIFwidmFsdWVcIilcblx0Y3JlYXRlU2V0dGluZyA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwiaWRcIiwgXCJ0eXBlXCIpXG5cdGRlbGV0ZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKCFTdWl0ZVNjcmlwdE1vY2tzLnNlYXJjaGVzLmhhcyh7IGlkOiBvcHRpb25zLmlkLCBzZWFyY2hJZDogb3B0aW9ucy5pZCB9KSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwic2VhcmNoIGRvZXMgbm90IGV4aXN0XCIpO1xuXHRcdH1cblx0XHRTdWl0ZVNjcmlwdE1vY2tzLnNlYXJjaGVzLmRlbGV0ZSh7IGlkOiBvcHRpb25zLmlkLCBzZWFyY2hJZDogb3B0aW9ucy5pZCB9KTtcblx0fTtcblxuXHRkdXBsaWNhdGVzID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0Z2xvYmFsID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0bG9hZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKCFTdWl0ZVNjcmlwdE1vY2tzLnNlYXJjaGVzLmhhcyh7IGlkOiBvcHRpb25zLmlkLCBzZWFyY2hJZDogb3B0aW9ucy5pZCB9KSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwic2VhcmNoIGRvZXMgbm90IGV4aXN0XCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gU3VpdGVTY3JpcHRNb2Nrcy5zZWFyY2hlcy5nZXQoeyBpZDogb3B0aW9ucy5pZCwgc2VhcmNoSWQ6IG9wdGlvbnMuaWQgfSk7XG5cdH07XG5cblx0QGFkZFByb21pc2UoKVxuXHRAb3B0aW9ucyhcInR5cGVcIiwgXCJpZFwiLCBcImNvbHVtbnNcIilcblx0bG9va3VwRmllbGRzID0gKG9wdGlvbnMpID0+IHtcblx0XHRyZXR1cm4gU3VpdGVTY3JpcHRNb2Nrcy5sb29rdXBGaWVsZHNSZXN1bHRzLnNoaWZ0KCk7XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNlYXJjaE1vZHVs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