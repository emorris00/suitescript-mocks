var _dec, _init_create, _dec2, _init_createColumn, _dec3, _init_createFilter, _dec4, _init_createSetting, _dec5, _dec6, _init_delete, _dec7, _init_global, _dec8, _init_load, _dec9, _dec10, _init_lookupFields;
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
const _search = require("Suitecloud-unit-testing-stubs/stubs/search");
const Column = require("./Column");
const Filter = require("./Filter");
const Search = require("./Search");
const ResultSet = require("./ResultSet");
const Result = require("./Result");
const {
  options,
  addPromise
} = require("../../helpers");
_dec = addPromise();
_dec2 = options("name", "join", "summary", "formula", "function", "label", "sort");
_dec3 = options("name", "join", "operator", "values", "formula", "summary");
_dec4 = options("name", "value");
_dec5 = addPromise();
_dec6 = options("id", "type");
_dec7 = addPromise();
_dec8 = addPromise();
_dec9 = addPromise();
_dec10 = options("type", "id", "columns");
class search {
  static {
    [_init_create, _init_createColumn, _init_createFilter, _init_createSetting, _init_delete, _init_global, _init_load, _init_lookupFields] = _applyDecs(this, [[_dec, 0, "create"], [_dec2, 0, "createColumn"], [_dec3, 0, "createFilter"], [_dec4, 0, "createSetting"], [[_dec5, _dec6], 0, "delete"], [_dec7, 0, "global"], [_dec8, 0, "load"], [[_dec9, _dec10], 0, "lookupFields"]], []);
  }
  results = [];
  lookupFieldsResults = [];
  #id = 0;
  Operator = _search.Operator;
  Sort = _search.Sort;
  Summary = _search.Summary;
  Type = _search.Type;
  Column = Column;
  Search = Search;
  ResultSet = ResultSet;
  Result = Result;
  _addResults(results) {
    this.results.push(results);
    return this;
  }
  _setResults(results) {
    this.results = results;
  }
  _addLookupFieldsResults(results) {
    this.lookupFieldsResults.push(results);
    return this;
  }
  create = _init_create(this, ({
    type,
    columns,
    filters
  }) => {
    columns = columns.map(column => this.createColumn(column));
    return new Search({
      type,
      columns,
      filters,
      results: this.results.shift().map(row => {
        return new Result({
          id: row.id || row.values.internalid || this.#id++,
          recordType: row.recordType || type,
          columns: columns,
          values: columns.reduce((acc, cur, i) => {
            acc.set(cur.toRecord(), row.values[i]);
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
  delete = _init_delete(this, options => {});
  duplicates = options => {};
  global = _init_global(this, options => {});
  load = _init_load(this, options => {});
  lookupFields = _init_lookupFields(this, options => {
    return this.lookupFieldsResults.shift() || {};
  });
}
module.exports = new search();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc2VhcmNoIiwicmVxdWlyZSIsIkNvbHVtbiIsIkZpbHRlciIsIlNlYXJjaCIsIlJlc3VsdFNldCIsIlJlc3VsdCIsIm9wdGlvbnMiLCJhZGRQcm9taXNlIiwic2VhcmNoIiwicmVzdWx0cyIsImxvb2t1cEZpZWxkc1Jlc3VsdHMiLCJpZCIsIk9wZXJhdG9yIiwiU29ydCIsIlN1bW1hcnkiLCJUeXBlIiwiX2FkZFJlc3VsdHMiLCJwdXNoIiwiX3NldFJlc3VsdHMiLCJfYWRkTG9va3VwRmllbGRzUmVzdWx0cyIsImNyZWF0ZSIsInR5cGUiLCJjb2x1bW5zIiwiZmlsdGVycyIsIm1hcCIsImNvbHVtbiIsImNyZWF0ZUNvbHVtbiIsInNoaWZ0Iiwicm93IiwidmFsdWVzIiwiaW50ZXJuYWxpZCIsInJlY29yZFR5cGUiLCJyZWR1Y2UiLCJhY2MiLCJjdXIiLCJpIiwic2V0IiwidG9SZWNvcmQiLCJNYXAiLCJjcmVhdGVGaWx0ZXIiLCJjcmVhdGVTZXR0aW5nIiwiZGVsZXRlIiwiZHVwbGljYXRlcyIsImdsb2JhbCIsImxvYWQiLCJsb29rdXBGaWVsZHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vY2tzL3NlYXJjaC9pbmRleC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgX3NlYXJjaCA9IHJlcXVpcmUoXCJTdWl0ZWNsb3VkLXVuaXQtdGVzdGluZy1zdHVicy9zdHVicy9zZWFyY2hcIilcclxuY29uc3QgQ29sdW1uID0gcmVxdWlyZShcIi4vQ29sdW1uXCIpXHJcbmNvbnN0IEZpbHRlciA9IHJlcXVpcmUoXCIuL0ZpbHRlclwiKVxyXG5jb25zdCBTZWFyY2ggPSByZXF1aXJlKFwiLi9TZWFyY2hcIilcclxuY29uc3QgUmVzdWx0U2V0ID0gcmVxdWlyZShcIi4vUmVzdWx0U2V0XCIpXHJcbmNvbnN0IFJlc3VsdCA9IHJlcXVpcmUoXCIuL1Jlc3VsdFwiKVxyXG5jb25zdCB7IG9wdGlvbnMsIGFkZFByb21pc2UgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzXCIpXHJcblxyXG5jbGFzcyBzZWFyY2gge1xyXG4gICAgcmVzdWx0cyA9IFtdXHJcbiAgICBsb29rdXBGaWVsZHNSZXN1bHRzID0gW11cclxuICAgICNpZCA9IDBcclxuXHJcbiAgICBPcGVyYXRvciA9IF9zZWFyY2guT3BlcmF0b3JcclxuICAgIFNvcnQgPSBfc2VhcmNoLlNvcnRcclxuICAgIFN1bW1hcnkgPSBfc2VhcmNoLlN1bW1hcnlcclxuICAgIFR5cGUgPSBfc2VhcmNoLlR5cGVcclxuXHJcbiAgICBDb2x1bW4gPSBDb2x1bW5cclxuICAgIFNlYXJjaCA9IFNlYXJjaFxyXG4gICAgUmVzdWx0U2V0ID0gUmVzdWx0U2V0XHJcbiAgICBSZXN1bHQgPSBSZXN1bHRcclxuXHJcbiAgICBfYWRkUmVzdWx0cyhyZXN1bHRzKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRzLnB1c2gocmVzdWx0cylcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIF9zZXRSZXN1bHRzKHJlc3VsdHMpIHtcclxuICAgICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzXHJcbiAgICB9XHJcblxyXG4gICAgX2FkZExvb2t1cEZpZWxkc1Jlc3VsdHMocmVzdWx0cykge1xyXG4gICAgICAgIHRoaXMubG9va3VwRmllbGRzUmVzdWx0cy5wdXNoKHJlc3VsdHMpXHJcbiAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuXHJcbiAgICBAYWRkUHJvbWlzZSgpXHJcbiAgICBjcmVhdGUgPSAoe3R5cGUsIGNvbHVtbnMsIGZpbHRlcnN9KSA9PiB7XHJcbiAgICAgICAgY29sdW1ucyA9IGNvbHVtbnMubWFwKGNvbHVtbiA9PiB0aGlzLmNyZWF0ZUNvbHVtbihjb2x1bW4pKTtcclxuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaCh7XHJcbiAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgIGNvbHVtbnMsXHJcbiAgICAgICAgICAgIGZpbHRlcnMsXHJcbiAgICAgICAgICAgIHJlc3VsdHM6IHRoaXMucmVzdWx0cy5zaGlmdCgpLm1hcChyb3cgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiByb3cuaWQgfHwgcm93LnZhbHVlcy5pbnRlcm5hbGlkIHx8IHRoaXMuI2lkKyssXHJcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkVHlwZTogcm93LnJlY29yZFR5cGUgfHwgdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBjb2x1bW5zLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogY29sdW1ucy5yZWR1Y2UoKGFjYywgY3VyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjYy5zZXQoY3VyLnRvUmVjb3JkKCksIHJvdy52YWx1ZXNbaV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2NcclxuICAgICAgICAgICAgICAgICAgICB9LCBuZXcgTWFwKCkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgQG9wdGlvbnMoXCJuYW1lXCIsIFwiam9pblwiLCBcInN1bW1hcnlcIiwgXCJmb3JtdWxhXCIsIFwiZnVuY3Rpb25cIiwgXCJsYWJlbFwiLCBcInNvcnRcIilcclxuICAgIGNyZWF0ZUNvbHVtbiA9IG9wdGlvbnMgPT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sdW1uKG9wdGlvbnMpXHJcbiAgICB9XHJcblxyXG4gICAgQG9wdGlvbnMoXCJuYW1lXCIsIFwiam9pblwiLCBcIm9wZXJhdG9yXCIsIFwidmFsdWVzXCIsIFwiZm9ybXVsYVwiLCBcInN1bW1hcnlcIilcclxuICAgIGNyZWF0ZUZpbHRlciA9IG9wdGlvbnMgPT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgRmlsdGVyKG9wdGlvbnMpXHJcbiAgICB9XHJcblxyXG4gICAgQG9wdGlvbnMoXCJuYW1lXCIsIFwidmFsdWVcIilcclxuICAgIGNyZWF0ZVNldHRpbmcgPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgQGFkZFByb21pc2UoKVxyXG4gICAgQG9wdGlvbnMoXCJpZFwiLCBcInR5cGVcIilcclxuICAgIGRlbGV0ZSA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBkdXBsaWNhdGVzID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIEBhZGRQcm9taXNlKClcclxuICAgIGdsb2JhbCA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBAYWRkUHJvbWlzZSgpXHJcbiAgICBsb2FkID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIEBhZGRQcm9taXNlKClcclxuICAgIEBvcHRpb25zKFwidHlwZVwiLCBcImlkXCIsIFwiY29sdW1uc1wiKVxyXG4gICAgbG9va3VwRmllbGRzID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9va3VwRmllbGRzUmVzdWx0cy5zaGlmdCgpIHx8IHt9XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbmV3IHNlYXJjaCgpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE1BQU1BLE9BQU8sR0FBR0MsT0FBTyxDQUFDLDRDQUE0QyxDQUFDO0FBQ3JFLE1BQU1DLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNsQyxNQUFNRSxNQUFNLEdBQUdGLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDbEMsTUFBTUcsTUFBTSxHQUFHSCxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ2xDLE1BQU1JLFNBQVMsR0FBR0osT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUN4QyxNQUFNSyxNQUFNLEdBQUdMLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDbEMsTUFBTTtFQUFFTSxPQUFPO0VBQUVDO0FBQVcsQ0FBQyxHQUFHUCxPQUFPLENBQUMsZUFBZSxDQUFDO0FBQUEsT0ErQm5ETyxVQUFVLEVBQUU7QUFB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