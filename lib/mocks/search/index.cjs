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
const searchStub = require("Suitecloud-unit-testing-stubs/stubs/search");
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
  required,
  toRecord
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
class search {
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
    columns = columns.map(column => this.createColumn(column));
    return new Search({
      searchType: type,
      columns,
      filters,
      results: SuiteScriptMocks.searchResults.shift().map(row => {
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
    return SuiteScriptMocks.lookupFieldsResults.get(options);
  });
}
module.exports = new search();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzZWFyY2hTdHViIiwicmVxdWlyZSIsIkNvbHVtbiIsIkZpbHRlciIsIlBhZ2UiLCJQYWdlZERhdGEiLCJQYWdlUmFuZ2UiLCJSZXN1bHQiLCJSZXN1bHRTZXQiLCJTZWFyY2giLCJvcHRpb25zIiwiYWRkUHJvbWlzZSIsIlN1aXRlU2NyaXB0TW9ja3MiLCJyZXF1aXJlZCIsInRvUmVjb3JkIiwic2VhcmNoIiwiT3BlcmF0b3IiLCJTb3J0IiwiU3VtbWFyeSIsIlR5cGUiLCJjcmVhdGUiLCJ0eXBlIiwiY29sdW1ucyIsImZpbHRlcnMiLCJtYXAiLCJjb2x1bW4iLCJjcmVhdGVDb2x1bW4iLCJzZWFyY2hUeXBlIiwicmVzdWx0cyIsInNlYXJjaFJlc3VsdHMiLCJzaGlmdCIsInJvdyIsImlkIiwidmFsdWVzIiwiaW50ZXJuYWxpZCIsInJlY29yZFR5cGUiLCJjcmVhdGVGaWx0ZXIiLCJjcmVhdGVTZXR0aW5nIiwiZGVsZXRlIiwic2VhcmNoZXMiLCJoYXMiLCJzZWFyY2hJZCIsIkVycm9yIiwiZHVwbGljYXRlcyIsImdsb2JhbCIsImxvYWQiLCJnZXQiLCJsb29rdXBGaWVsZHMiLCJsb29rdXBGaWVsZHNSZXN1bHRzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2Nrcy9zZWFyY2gvaW5kZXguY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlYXJjaFN0dWIgPSByZXF1aXJlKFwiU3VpdGVjbG91ZC11bml0LXRlc3Rpbmctc3R1YnMvc3R1YnMvc2VhcmNoXCIpXG5jb25zdCBDb2x1bW4gPSByZXF1aXJlKFwiLi9Db2x1bW4uY2pzXCIpXG5jb25zdCBGaWx0ZXIgPSByZXF1aXJlKFwiLi9GaWx0ZXIuY2pzXCIpXG5jb25zdCBQYWdlID0gcmVxdWlyZShcIi4vUGFnZS5janNcIilcbmNvbnN0IFBhZ2VkRGF0YSA9IHJlcXVpcmUoXCIuL1BhZ2VkRGF0YS5janNcIilcbmNvbnN0IFBhZ2VSYW5nZSA9IHJlcXVpcmUoXCIuL1BhZ2VSYW5nZS5janNcIilcbmNvbnN0IFJlc3VsdCA9IHJlcXVpcmUoXCIuL1Jlc3VsdC5janNcIilcbmNvbnN0IFJlc3VsdFNldCA9IHJlcXVpcmUoXCIuL1Jlc3VsdFNldC5janNcIilcbmNvbnN0IFNlYXJjaCA9IHJlcXVpcmUoXCIuL1NlYXJjaC5janNcIilcbmNvbnN0IHsgb3B0aW9ucywgYWRkUHJvbWlzZSB9ID0gcmVxdWlyZShcIi4uLy4uL2hlbHBlcnMuY2pzXCIpXG5jb25zdCBTdWl0ZVNjcmlwdE1vY2tzID0gcmVxdWlyZShcIi4uLy4uLy4uL2luZGV4LmNqc1wiKVxuY29uc3QgeyByZXF1aXJlZCwgdG9SZWNvcmQgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKVxuXG5jbGFzcyBzZWFyY2gge1xuICAgIE9wZXJhdG9yID0gc2VhcmNoU3R1Yi5PcGVyYXRvclxuICAgIFNvcnQgPSBzZWFyY2hTdHViLlNvcnRcbiAgICBTdW1tYXJ5ID0gc2VhcmNoU3R1Yi5TdW1tYXJ5XG4gICAgVHlwZSA9IHNlYXJjaFN0dWIuVHlwZVxuXG4gICAgQ29sdW1uID0gQ29sdW1uXG4gICAgRmlsdGVyID0gRmlsdGVyXG4gICAgUGFnZSA9IFBhZ2VcbiAgICBQYWdlZERhdGEgPSBQYWdlZERhdGFcbiAgICBQYWdlUmFuZ2UgPSBQYWdlUmFuZ2VcbiAgICBSZXN1bHQgPSBSZXN1bHRcbiAgICBSZXN1bHRTZXQgPSBSZXN1bHRTZXRcbiAgICBTZWFyY2ggPSBTZWFyY2hcblxuICAgIEBhZGRQcm9taXNlKClcbiAgICBAcmVxdWlyZWQoXCJ0eXBlXCIpXG4gICAgY3JlYXRlID0gKHt0eXBlLCBjb2x1bW5zLCBmaWx0ZXJzfSkgPT4ge1xuICAgICAgICBjb2x1bW5zID0gY29sdW1ucy5tYXAoY29sdW1uID0+IHRoaXMuY3JlYXRlQ29sdW1uKGNvbHVtbikpO1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaCh7XG4gICAgICAgICAgICBzZWFyY2hUeXBlOiB0eXBlLFxuICAgICAgICAgICAgY29sdW1ucyxcbiAgICAgICAgICAgIGZpbHRlcnMsXG4gICAgICAgICAgICByZXN1bHRzOiBTdWl0ZVNjcmlwdE1vY2tzLnNlYXJjaFJlc3VsdHMuc2hpZnQoKS5tYXAocm93ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJlc3VsdCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiByb3cuaWQgfHwgcm93LnZhbHVlcy5pbnRlcm5hbGlkLFxuICAgICAgICAgICAgICAgICAgICByZWNvcmRUeXBlOiByb3cucmVjb3JkVHlwZSB8fCB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBjb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHJvdy52YWx1ZXNcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBAb3B0aW9ucyhcIm5hbWVcIiwgXCJqb2luXCIsIFwic3VtbWFyeVwiLCBcImZvcm11bGFcIiwgXCJmdW5jdGlvblwiLCBcImxhYmVsXCIsIFwic29ydFwiKVxuICAgIGNyZWF0ZUNvbHVtbiA9IG9wdGlvbnMgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IENvbHVtbihvcHRpb25zKVxuICAgIH1cblxuICAgIEBvcHRpb25zKFwibmFtZVwiLCBcImpvaW5cIiwgXCJvcGVyYXRvclwiLCBcInZhbHVlc1wiLCBcImZvcm11bGFcIiwgXCJzdW1tYXJ5XCIpXG4gICAgY3JlYXRlRmlsdGVyID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgRmlsdGVyKG9wdGlvbnMpXG4gICAgfVxuXG4gICAgQG9wdGlvbnMoXCJuYW1lXCIsIFwidmFsdWVcIilcbiAgICBjcmVhdGVTZXR0aW5nID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgQGFkZFByb21pc2UoKVxuICAgIEBvcHRpb25zKFwiaWRcIiwgXCJ0eXBlXCIpXG4gICAgZGVsZXRlID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGlmKCFTdWl0ZVNjcmlwdE1vY2tzLnNlYXJjaGVzLmhhcyh7aWQ6IG9wdGlvbnMuaWQsIHNlYXJjaElkOiBvcHRpb25zLmlkfSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNlYXJjaCBkb2VzIG5vdCBleGlzdFwiKVxuICAgICAgICB9XG4gICAgICAgIFN1aXRlU2NyaXB0TW9ja3Muc2VhcmNoZXMuZGVsZXRlKHtpZDogb3B0aW9ucy5pZCwgc2VhcmNoSWQ6IG9wdGlvbnMuaWR9KVxuICAgIH1cblxuICAgIGR1cGxpY2F0ZXMgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAYWRkUHJvbWlzZSgpXG4gICAgZ2xvYmFsID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgQGFkZFByb21pc2UoKVxuICAgIGxvYWQgPSBvcHRpb25zID0+IHtcbiAgICAgICAgaWYoIVN1aXRlU2NyaXB0TW9ja3Muc2VhcmNoZXMuaGFzKHtpZDogb3B0aW9ucy5pZCwgc2VhcmNoSWQ6IG9wdGlvbnMuaWR9KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2VhcmNoIGRvZXMgbm90IGV4aXN0XCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFN1aXRlU2NyaXB0TW9ja3Muc2VhcmNoZXMuZ2V0KHtpZDogb3B0aW9ucy5pZCwgc2VhcmNoSWQ6IG9wdGlvbnMuaWR9KVxuICAgIH1cblxuICAgIEBhZGRQcm9taXNlKClcbiAgICBAb3B0aW9ucyhcInR5cGVcIiwgXCJpZFwiLCBcImNvbHVtbnNcIilcbiAgICBsb29rdXBGaWVsZHMgPSBvcHRpb25zID0+IHtcbiAgICAgICAgcmV0dXJuIFN1aXRlU2NyaXB0TW9ja3MubG9va3VwRmllbGRzUmVzdWx0cy5nZXQob3B0aW9ucylcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IHNlYXJjaCgpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE1BQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDLDRDQUE0QyxDQUFDO0FBQ3hFLE1BQU1DLE1BQU0sR0FBR0QsT0FB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