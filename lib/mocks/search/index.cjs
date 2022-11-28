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
const Column = require("./Column");
const Filter = require("./Filter");
const Page = require("./Page");
const PagedData = require("./PagedData");
const PageRange = require("./PageRange");
const Result = require("./Result");
const ResultSet = require("./ResultSet");
const Search = require("./Search");
const {
  options,
  addPromise
} = require("../../helpers");
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
          values: columns.reduce((acc, cur, i) => {
            acc.set(toRecord(cur), row.values[i]);
            return acc;
          }, new Map())
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzZWFyY2hTdHViIiwicmVxdWlyZSIsIkNvbHVtbiIsIkZpbHRlciIsIlBhZ2UiLCJQYWdlZERhdGEiLCJQYWdlUmFuZ2UiLCJSZXN1bHQiLCJSZXN1bHRTZXQiLCJTZWFyY2giLCJvcHRpb25zIiwiYWRkUHJvbWlzZSIsIlN1aXRlU2NyaXB0TW9ja3MiLCJyZXF1aXJlZCIsInRvUmVjb3JkIiwic2VhcmNoIiwiT3BlcmF0b3IiLCJTb3J0IiwiU3VtbWFyeSIsIlR5cGUiLCJjcmVhdGUiLCJ0eXBlIiwiY29sdW1ucyIsImZpbHRlcnMiLCJtYXAiLCJjb2x1bW4iLCJjcmVhdGVDb2x1bW4iLCJzZWFyY2hUeXBlIiwicmVzdWx0cyIsInNlYXJjaFJlc3VsdHMiLCJzaGlmdCIsInJvdyIsImlkIiwidmFsdWVzIiwiaW50ZXJuYWxpZCIsInJlY29yZFR5cGUiLCJyZWR1Y2UiLCJhY2MiLCJjdXIiLCJpIiwic2V0IiwiTWFwIiwiY3JlYXRlRmlsdGVyIiwiY3JlYXRlU2V0dGluZyIsImRlbGV0ZSIsInNlYXJjaGVzIiwiaGFzIiwic2VhcmNoSWQiLCJFcnJvciIsImR1cGxpY2F0ZXMiLCJnbG9iYWwiLCJsb2FkIiwiZ2V0IiwibG9va3VwRmllbGRzIiwibG9va3VwRmllbGRzUmVzdWx0cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9ja3Mvc2VhcmNoL2luZGV4LmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzZWFyY2hTdHViID0gcmVxdWlyZShcIlN1aXRlY2xvdWQtdW5pdC10ZXN0aW5nLXN0dWJzL3N0dWJzL3NlYXJjaFwiKVxuY29uc3QgQ29sdW1uID0gcmVxdWlyZShcIi4vQ29sdW1uXCIpXG5jb25zdCBGaWx0ZXIgPSByZXF1aXJlKFwiLi9GaWx0ZXJcIilcbmNvbnN0IFBhZ2UgPSByZXF1aXJlKFwiLi9QYWdlXCIpXG5jb25zdCBQYWdlZERhdGEgPSByZXF1aXJlKFwiLi9QYWdlZERhdGFcIilcbmNvbnN0IFBhZ2VSYW5nZSA9IHJlcXVpcmUoXCIuL1BhZ2VSYW5nZVwiKVxuY29uc3QgUmVzdWx0ID0gcmVxdWlyZShcIi4vUmVzdWx0XCIpXG5jb25zdCBSZXN1bHRTZXQgPSByZXF1aXJlKFwiLi9SZXN1bHRTZXRcIilcbmNvbnN0IFNlYXJjaCA9IHJlcXVpcmUoXCIuL1NlYXJjaFwiKVxuY29uc3QgeyBvcHRpb25zLCBhZGRQcm9taXNlIH0gPSByZXF1aXJlKFwiLi4vLi4vaGVscGVyc1wiKVxuY29uc3QgU3VpdGVTY3JpcHRNb2NrcyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9pbmRleC5janNcIilcbmNvbnN0IHsgcmVxdWlyZWQsIHRvUmVjb3JkIH0gPSByZXF1aXJlKFwiLi4vLi4vaGVscGVycy5janNcIilcblxuY2xhc3Mgc2VhcmNoIHtcbiAgICBPcGVyYXRvciA9IHNlYXJjaFN0dWIuT3BlcmF0b3JcbiAgICBTb3J0ID0gc2VhcmNoU3R1Yi5Tb3J0XG4gICAgU3VtbWFyeSA9IHNlYXJjaFN0dWIuU3VtbWFyeVxuICAgIFR5cGUgPSBzZWFyY2hTdHViLlR5cGVcblxuICAgIENvbHVtbiA9IENvbHVtblxuICAgIEZpbHRlciA9IEZpbHRlclxuICAgIFBhZ2UgPSBQYWdlXG4gICAgUGFnZWREYXRhID0gUGFnZWREYXRhXG4gICAgUGFnZVJhbmdlID0gUGFnZVJhbmdlXG4gICAgUmVzdWx0ID0gUmVzdWx0XG4gICAgUmVzdWx0U2V0ID0gUmVzdWx0U2V0XG4gICAgU2VhcmNoID0gU2VhcmNoXG5cbiAgICBAYWRkUHJvbWlzZSgpXG4gICAgQHJlcXVpcmVkKFwidHlwZVwiKVxuICAgIGNyZWF0ZSA9ICh7dHlwZSwgY29sdW1ucywgZmlsdGVyc30pID0+IHtcbiAgICAgICAgY29sdW1ucyA9IGNvbHVtbnMubWFwKGNvbHVtbiA9PiB0aGlzLmNyZWF0ZUNvbHVtbihjb2x1bW4pKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2goe1xuICAgICAgICAgICAgc2VhcmNoVHlwZTogdHlwZSxcbiAgICAgICAgICAgIGNvbHVtbnMsXG4gICAgICAgICAgICBmaWx0ZXJzLFxuICAgICAgICAgICAgcmVzdWx0czogU3VpdGVTY3JpcHRNb2Nrcy5zZWFyY2hSZXN1bHRzLnNoaWZ0KCkubWFwKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHQoe1xuICAgICAgICAgICAgICAgICAgICBpZDogcm93LmlkIHx8IHJvdy52YWx1ZXMuaW50ZXJuYWxpZCxcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkVHlwZTogcm93LnJlY29yZFR5cGUgfHwgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogY29sdW1ucyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBjb2x1bW5zLnJlZHVjZSgoYWNjLCBjdXIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjYy5zZXQodG9SZWNvcmQoY3VyKSwgcm93LnZhbHVlc1tpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2NcbiAgICAgICAgICAgICAgICAgICAgfSwgbmV3IE1hcCgpKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIEBvcHRpb25zKFwibmFtZVwiLCBcImpvaW5cIiwgXCJzdW1tYXJ5XCIsIFwiZm9ybXVsYVwiLCBcImZ1bmN0aW9uXCIsIFwibGFiZWxcIiwgXCJzb3J0XCIpXG4gICAgY3JlYXRlQ29sdW1uID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgQ29sdW1uKG9wdGlvbnMpXG4gICAgfVxuXG4gICAgQG9wdGlvbnMoXCJuYW1lXCIsIFwiam9pblwiLCBcIm9wZXJhdG9yXCIsIFwidmFsdWVzXCIsIFwiZm9ybXVsYVwiLCBcInN1bW1hcnlcIilcbiAgICBjcmVhdGVGaWx0ZXIgPSBvcHRpb25zID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBGaWx0ZXIob3B0aW9ucylcbiAgICB9XG5cbiAgICBAb3B0aW9ucyhcIm5hbWVcIiwgXCJ2YWx1ZVwiKVxuICAgIGNyZWF0ZVNldHRpbmcgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAYWRkUHJvbWlzZSgpXG4gICAgQG9wdGlvbnMoXCJpZFwiLCBcInR5cGVcIilcbiAgICBkZWxldGUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgaWYoIVN1aXRlU2NyaXB0TW9ja3Muc2VhcmNoZXMuaGFzKHtpZDogb3B0aW9ucy5pZCwgc2VhcmNoSWQ6IG9wdGlvbnMuaWR9KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2VhcmNoIGRvZXMgbm90IGV4aXN0XCIpXG4gICAgICAgIH1cbiAgICAgICAgU3VpdGVTY3JpcHRNb2Nrcy5zZWFyY2hlcy5kZWxldGUoe2lkOiBvcHRpb25zLmlkLCBzZWFyY2hJZDogb3B0aW9ucy5pZH0pXG4gICAgfVxuXG4gICAgZHVwbGljYXRlcyA9IG9wdGlvbnMgPT4ge31cblxuICAgIEBhZGRQcm9taXNlKClcbiAgICBnbG9iYWwgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAYWRkUHJvbWlzZSgpXG4gICAgbG9hZCA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBpZighU3VpdGVTY3JpcHRNb2Nrcy5zZWFyY2hlcy5oYXMoe2lkOiBvcHRpb25zLmlkLCBzZWFyY2hJZDogb3B0aW9ucy5pZH0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZWFyY2ggZG9lcyBub3QgZXhpc3RcIilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU3VpdGVTY3JpcHRNb2Nrcy5zZWFyY2hlcy5nZXQoe2lkOiBvcHRpb25zLmlkLCBzZWFyY2hJZDogb3B0aW9ucy5pZH0pXG4gICAgfVxuXG4gICAgQGFkZFByb21pc2UoKVxuICAgIEBvcHRpb25zKFwidHlwZVwiLCBcImlkXCIsIFwiY29sdW1uc1wiKVxuICAgIGxvb2t1cEZpZWxkcyA9IG9wdGlvbnMgPT4ge1xuICAgICAgICByZXR1cm4gU3VpdGVTY3JpcHRNb2Nrcy5sb29rdXBGaWVsZHNSZXN1bHRzLmdldChvcHRpb25zKVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgc2VhcmNoKCkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsTUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsNENBQTRDLENBQUM7QUFDeEUsTUFBTUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ2xDLE1BQU1FLE1BQU0sR0FBR0YsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNsQyxNQUFNRyxJQUFJLEdBQUdILE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDOUIsTUFBTUksU0FBUyxHQUFHSixPQUFPLENBQUMsYUFBYSxDQUFDO0FBQ3hDLE1BQU1LLFNBQVMsR0FBR0wsT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUN4QyxNQUFNTSxNQUFNLEdBQUdOLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDbEMsTUFBTU8sU0FBUyxHQUFHUCxPQUFPLENBQUMsYUFBYSxDQUFDO0FBQ3hDLE1BQU1RLE1BQU0sR0FBR1IsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNsQyxNQUFNO0VBQUVTLE9BQU87RUFBRUM7QUFBVyxDQUFDLEdBQUdWLE9BQU8sQ0FBQyxlQUFlLENBQUM7QUFDeEQsTUFBTVcsZ0JBQWdCLEdBQUdYLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztBQUN0RCxNQUFNO0VBQUVZLFFBQVE7RUFBRUM7QUFBUyxDQUFDLEdBQUdiLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUFBLE9BaUJ0RFUsVUFBVSxFQUFFO0FBQUEsUUFDWkUsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUFBLFFBcUJoQkgsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztBQUFBLFFBSzFFQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7QUFBQSxRQUtuRUEsT0FBTyxD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