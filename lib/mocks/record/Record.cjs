var _initClass, _dec, _dec2, _dec3, _dec4, _init_cancelLine, _dec5, _dec6, _dec7, _init_commitLine, _dec8, _init_executeMacro, _dec9, _dec10, _dec11, _init_getCurrentSublistText, _dec12, _dec13, _dec14, _init_getCurrentSublistValue, _dec15, _dec16, _init_getLineCount, _dec17, _dec18, _init_getSublistText, _dec19, _dec20, _init_getSublistValue, _dec21, _dec22, _init_getSubrecord, _dec23, _dec24, _init_getText, _dec25, _dec26, _init_getValue, _dec27, _dec28, _init_removeLine, _dec29, _dec30, _init_save, _dec31, _dec32, _dec33, _init_selectLine, _dec34, _dec35, _dec36, _init_selectNewLine, _dec37, _dec38, _dec39, _init_setCurrentSublistText, _dec40, _dec41, _dec42, _init_setCurrentSublistValue, _dec43, _dec44, _dec45, _init_setSublistText, _dec46, _dec47, _dec48, _init_setSublistValue, _dec49, _dec50, _init_setText, _dec51, _dec52, _init_setValue;
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
const datefns = require("date-fns");
const structuredClone = require("core-js-pure/actual/structured-clone");
const {
  randomUUID
} = require("node:crypto");
const SuiteScriptMocks = require("../../index.cjs");
const {
  options,
  required,
  addPromise,
  dynamicModeOnly,
  standardModeOnly,
  assignConstructor
} = require("../../helpers.cjs");
let _Record;
_dec = assignConstructor();
_dec2 = dynamicModeOnly();
_dec3 = options("sublistId");
_dec4 = required("sublistId");
_dec5 = dynamicModeOnly();
_dec6 = options("sublistId", "ignoreRecalc");
_dec7 = required("sublistId");
_dec8 = addPromise();
_dec9 = dynamicModeOnly();
_dec10 = options("sublistId", "fieldId");
_dec11 = required("sublistId", "fieldId");
_dec12 = dynamicModeOnly();
_dec13 = options("sublistId", "fieldId");
_dec14 = required("sublistId", "fieldId");
_dec15 = options("sublistId");
_dec16 = required("sublistId");
_dec17 = options("sublistId", "fieldId", "line");
_dec18 = required("sublistId", "fieldId", "line");
_dec19 = options("sublistId", "fieldId", "line");
_dec20 = required("sublistId", "fieldId", "line");
_dec21 = options("fieldId");
_dec22 = required("fieldId");
_dec23 = options("fieldId");
_dec24 = required("fieldId");
_dec25 = options("fieldId");
_dec26 = required("fieldId");
_dec27 = options("sublistId", "line", "ignoreRecalc", "lineInstanceId");
_dec28 = required("sublistId", "line");
_dec29 = addPromise();
_dec30 = options("enableSourcing", "ignoreMandatoryFields");
_dec31 = dynamicModeOnly();
_dec32 = options("sublistId", "line");
_dec33 = required("sublistId", "line");
_dec34 = dynamicModeOnly();
_dec35 = options("sublistId");
_dec36 = required("sublistId");
_dec37 = dynamicModeOnly();
_dec38 = options("sublistId", "fieldId", "text");
_dec39 = required("sublistId", "fieldId", "text");
_dec40 = dynamicModeOnly();
_dec41 = options("sublistId", "fieldId", "value");
_dec42 = required("sublistId", "fieldId", "value");
_dec43 = standardModeOnly();
_dec44 = options("sublistId", "fieldId", "line", "text");
_dec45 = required("sublistId", "fieldId", "line", "text");
_dec46 = standardModeOnly();
_dec47 = options("sublistId", "fieldId", "line", "value");
_dec48 = required("sublistId", "fieldId", "line", "value");
_dec49 = options("fieldId", "text", "ignoreFieldChange");
_dec50 = required("fieldId", "text");
_dec51 = options("fieldId", "value", "ignoreFieldChange");
_dec52 = required("fieldId", "value");
class Record {
  static {
    [_init_cancelLine, _init_commitLine, _init_executeMacro, _init_getCurrentSublistText, _init_getCurrentSublistValue, _init_getLineCount, _init_getSublistText, _init_getSublistValue, _init_getSubrecord, _init_getText, _init_getValue, _init_removeLine, _init_save, _init_selectLine, _init_selectNewLine, _init_setCurrentSublistText, _init_setCurrentSublistValue, _init_setSublistText, _init_setSublistValue, _init_setText, _init_setValue, _Record, _initClass] = _applyDecs(this, [[[_dec2, _dec3, _dec4], 0, "cancelLine"], [[_dec5, _dec6, _dec7], 0, "commitLine"], [_dec8, 0, "executeMacro"], [[_dec9, _dec10, _dec11], 0, "getCurrentSublistText"], [[_dec12, _dec13, _dec14], 0, "getCurrentSublistValue"], [[_dec15, _dec16], 0, "getLineCount"], [[_dec17, _dec18], 0, "getSublistText"], [[_dec19, _dec20], 0, "getSublistValue"], [[_dec21, _dec22], 0, "getSubrecord"], [[_dec23, _dec24], 0, "getText"], [[_dec25, _dec26], 0, "getValue"], [[_dec27, _dec28], 0, "removeLine"], [[_dec29, _dec30], 0, "save"], [[_dec31, _dec32, _dec33], 0, "selectLine"], [[_dec34, _dec35, _dec36], 0, "selectNewLine"], [[_dec37, _dec38, _dec39], 0, "setCurrentSublistText"], [[_dec40, _dec41, _dec42], 0, "setCurrentSublistValue"], [[_dec43, _dec44, _dec45], 0, "setSublistText"], [[_dec46, _dec47, _dec48], 0, "setSublistValue"], [[_dec49, _dec50], 0, "setText"], [[_dec51, _dec52], 0, "setValue"]], [_dec]);
  }
  id = null;
  type = null;
  fields = {};
  sublists = {};
  subrecords = {};
  isDynamic = false;
  version = 1;
  initialize = () => {
    this.fields = structuredClone(this.fields);
    this.sublists = Object.entries(structuredClone(this.sublists) || {}).reduce((acc, [lineId, lines]) => {
      acc[lineId] = {
        currentline: {},
        lines: "lines" in lines ? lines.lines : lines
      };
      return acc;
    }, {});
    this.subrecords = Object.entries(this.subrecords || {}).reduce((acc, [subrecordId, subrecord]) => {
      acc[subrecordId] = new _Record(subrecord);
      return acc;
    }, {});
  };
  cancelLine = _init_cancelLine(this, options => {
    this.selectNewLine(options.sublistId);
  });
  commitLine = _init_commitLine(this, options => {
    const sublist = this?.sublists?.[options.sublistId];
    if (sublist === undefined || !("currentline" in sublist)) {
      throw new Error();
    }
    const existingIndex = sublist.lines.findIndex(a => a._id === sublist.currentline._id);
    if (existingIndex > -1) {
      sublist.lines[existingIndex] = sublist.currentline;
    } else {
      sublist.lines.push(sublist.currentline);
    }
    this.selectNewLine(options.sublistId);
  });
  executeMacro = _init_executeMacro(this, options => {});
  findMatrixSublistLineWithValue = options => {};
  findSublistLineWithValue = options => {};
  getCurrentMatrixSublistValue = options => {};
  getCurrentSublistField = options => {};
  getCurrentSublistIndex = options => {};
  getCurrentSublistSubrecord = options => {};
  getCurrentSublistText = _init_getCurrentSublistText(this, options => {
    const sublist = this.sublists[options.sublistId];
    if (sublist === undefined) {
      throw new Error("Sublist does not exist");
    }
    if (!("currentline" in sublist)) {
      this.selectNewLine(sublist);
    }
    const field = sublist.currentline[options.fieldId];
    if (field instanceof Date) {
      return datefns.format(field, SuiteScriptMocks.dateFormat);
    }
    if (typeof field === "object" && field !== null) {
      return field.text || field.value;
    }
    return field;
  });
  getCurrentSublistValue = _init_getCurrentSublistValue(this, options => {
    const sublist = this.sublists[options.sublistId];
    if (sublist === undefined) {
      return null;
    }
    if (!("currentline" in sublist)) {
      this.selectNewLine(sublist);
    }
    const field = sublist.currentline[options.fieldId];
    if (typeof field === "object" && field !== null && !(field instanceof Date)) {
      return field.value;
    }
    return field;
  });
  getField = options => {};
  getFields = options => {};
  getLineCount = _init_getLineCount(this, options => {
    const sublist = this.sublists[options.sublistId];
    if (sublist === undefined) {
      return -1;
    }
    return sublist.lines.length;
  });
  getMacro = options => {};
  getMacros = options => {};
  getMatrixHeaderCount = options => {};
  getMatrixHeaderField = options => {};
  getMatrixHeaderValue = options => {};
  getMatrixSublistField = options => {};
  getMatrixSublistValue = options => {};
  getSublist = options => {};
  getSublists = options => {};
  getSublistField = options => {};
  getSublistFields = options => {};
  getSublistSubrecord = options => {};
  getSublistText = _init_getSublistText(this, options => {
    const field = this.sublists[options.sublistId].lines[options.line][options.fieldId];
    if (field instanceof Date) {
      return datefns.format(field, SuiteScriptMocks.dateFormat);
    }
    if (typeof field === "object" && field !== null) {
      if (!this.isDynamic && !("text" in field)) {
        throw new Error("Cannot use getSublistText on field that has had value but not text set in standard mode");
      }
      return field.text || field.value;
    }
    return field;
  });
  getSublistValue = _init_getSublistValue(this, options => {
    const field = this.sublists[options.sublistId].lines[options.line][options.fieldId];
    if (typeof field === "object" && field !== null && !(field instanceof Date)) {
      return field.value;
    }
    return field;
  });
  getSubrecord = _init_getSubrecord(this, options => {
    if (!(options.fieldId in this.subrecords)) {
      throw new Error("Subrecord does not exist.");
    }
    return this.subrecords[options.fieldId];
  });
  getText = _init_getText(this, options => {
    const field = this.fields[options.fieldId];
    if (field instanceof Date) {
      return datefns.format(field, SuiteScriptMocks.dateFormat);
    }
    if (typeof field === "object" && field !== null) {
      if (!this.isDynamic && !("text" in field)) {
        throw new Error("Cannot use getText on field that has had value but not text set in standard mode");
      }
      return field.text || field.value;
    }
    return field;
  });
  getValue = _init_getValue(this, options => {
    const field = this.fields[options.fieldId];
    if (typeof field === "object" && field !== null && !(field instanceof Date)) {
      return field.value;
    }
    return field;
  });
  hasCurrentSublistSubrecord = options => {};
  hasSublistSubrecord = options => {};
  hasSubrecord = options => {};
  insertLine = options => {};
  moveLine = options => {};
  removeCurrentSublistSubrecord = options => {};
  removeLine = _init_removeLine(this, options => {
    const sublist = this.sublists[options.sublistId];
    if (sublist === undefined || !(options.line in sublist.lines)) {
      throw new Error();
    }
    sublist.lines.splice(options.line, 1);
  });
  removeSublistSubrecord = options => {};
  removeSubrecord = options => {};
  save = _init_save(this, options => {
    if (this.id && SuiteScriptMocks.records.get(this).version !== this.version) {
      throw new Error("Record has changed");
    }
    this.version++;
    const copy = new _Record(this);
    // change fields that only have value to not be an object so getText works
    Object.entries(copy.fields).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null && !(value instanceof Date) && !("text" in value)) {
        copy.fields[key] = value.value;
      }
    });
    Object.values(copy.sublists).forEach(sublist => {
      sublist.lines.forEach(line => {
        Object.entries(line).forEach(([key, value]) => {
          if (typeof value === "object" && value !== null && !(value instanceof Date) && !("text" in value)) {
            line[key] = value.value;
          }
        });
      });
    });
    if (!this.id) {
      this.id = copy.id = Math.max(Array.from(SuiteScriptMocks.records.values()).map(a => a.id)) + 1;
      SuiteScriptMocks.createdRecords.push(copy);
    }
    SuiteScriptMocks.records.set(copy);
    SuiteScriptMocks.savedRecords.push(copy);
    return this.id;
  });

  // TODO: edge case where if first line select you do is n + 1 it will give a new line
  selectLine = _init_selectLine(this, options => {
    const sublist = this.sublists[options.sublistId];
    if (sublist === undefined || !(options.line in sublist.lines)) {
      throw new Error("sublist or line does not exist");
    }
    sublist.currentline = {
      ...sublist.lines[options.line]
    };
  });
  selectNewLine = _init_selectNewLine(this, options => {
    const sublist = this.sublists[options.sublistId];
    if (sublist === undefined) {
      throw new Error("sublist does not exist");
    }
    sublist.currentline = {
      _id: randomUUID()
    };
  });
  setCurrentMatrixSublistValue = options => {};
  setCurrentSublistText = _init_setCurrentSublistText(this, options => {
    const sublist = this?.sublists?.[options.sublistId];
    if (sublist === undefined || !("currentline" in sublist)) {
      throw new Error("sublist doesn't exist or line is not selected");
    }
    return sublist.currentline[options.fieldId] = {
      value: options.text,
      text: options.text
    };
  });
  setCurrentSublistValue = _init_setCurrentSublistValue(this, options => {
    const sublist = this?.sublists?.[options.sublistId];
    if (sublist === undefined || !("currentline" in sublist)) {
      throw new Error("sublist doesn't exist or line is not selected");
    }
    return sublist.currentline[options.fieldId] = {
      value: options.value
    };
  });
  setMatrixHeaderValue = options => {};
  setMatrixSublistValue = options => {};
  setSublistText = _init_setSublistText(this, options => {
    const sublist = this?.sublists?.[options.sublistId];
    if (sublist === undefined || !(options.line in sublist.lines)) {
      throw new Error("sublist or line doesn't exist");
    }
    sublist.lines[options.line][options.fieldId] = {
      value: options.text,
      text: options.text
    };
  });
  setSublistValue = _init_setSublistValue(this, options => {
    const sublist = this?.sublists?.[options.sublistId];
    if (sublist === undefined || !(options.line in sublist.lines)) {
      throw new Error("sublist or line doesn't exist");
    }
    sublist.lines[options.line][options.fieldId] = {
      value: options.value
    };
  });
  setText = _init_setText(this, options => {
    this.fields[options.fieldId] = {
      value: options.text,
      text: options.text
    };
    return this;
  });
  setValue = _init_setValue(this, options => {
    this.fields[options.fieldId] = {
      value: options.value
    };
    return this;
  });
  static {
    _initClass();
  }
}
module.exports = _Record;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkYXRlZm5zIiwicmVxdWlyZSIsInN0cnVjdHVyZWRDbG9uZSIsInJhbmRvbVVVSUQiLCJTdWl0ZVNjcmlwdE1vY2tzIiwib3B0aW9ucyIsInJlcXVpcmVkIiwiYWRkUHJvbWlzZSIsImR5bmFtaWNNb2RlT25seSIsInN0YW5kYXJkTW9kZU9ubHkiLCJhc3NpZ25Db25zdHJ1Y3RvciIsImlkIiwidHlwZSIsImZpZWxkcyIsInN1Ymxpc3RzIiwic3VicmVjb3JkcyIsImlzRHluYW1pYyIsInZlcnNpb24iLCJpbml0aWFsaXplIiwiT2JqZWN0IiwiZW50cmllcyIsInJlZHVjZSIsImFjYyIsImxpbmVJZCIsImxpbmVzIiwiY3VycmVudGxpbmUiLCJzdWJyZWNvcmRJZCIsInN1YnJlY29yZCIsIlJlY29yZCIsImNhbmNlbExpbmUiLCJzZWxlY3ROZXdMaW5lIiwic3VibGlzdElkIiwiY29tbWl0TGluZSIsInN1Ymxpc3QiLCJ1bmRlZmluZWQiLCJFcnJvciIsImV4aXN0aW5nSW5kZXgiLCJmaW5kSW5kZXgiLCJhIiwiX2lkIiwicHVzaCIsImV4ZWN1dGVNYWNybyIsImZpbmRNYXRyaXhTdWJsaXN0TGluZVdpdGhWYWx1ZSIsImZpbmRTdWJsaXN0TGluZVdpdGhWYWx1ZSIsImdldEN1cnJlbnRNYXRyaXhTdWJsaXN0VmFsdWUiLCJnZXRDdXJyZW50U3VibGlzdEZpZWxkIiwiZ2V0Q3VycmVudFN1Ymxpc3RJbmRleCIsImdldEN1cnJlbnRTdWJsaXN0U3VicmVjb3JkIiwiZ2V0Q3VycmVudFN1Ymxpc3RUZXh0IiwiZmllbGQiLCJmaWVsZElkIiwiRGF0ZSIsImZvcm1hdCIsImRhdGVGb3JtYXQiLCJ0ZXh0IiwidmFsdWUiLCJnZXRDdXJyZW50U3VibGlzdFZhbHVlIiwiZ2V0RmllbGQiLCJnZXRGaWVsZHMiLCJnZXRMaW5lQ291bnQiLCJsZW5ndGgiLCJnZXRNYWNybyIsImdldE1hY3JvcyIsImdldE1hdHJpeEhlYWRlckNvdW50IiwiZ2V0TWF0cml4SGVhZGVyRmllbGQiLCJnZXRNYXRyaXhIZWFkZXJWYWx1ZSIsImdldE1hdHJpeFN1Ymxpc3RGaWVsZCIsImdldE1hdHJpeFN1Ymxpc3RWYWx1ZSIsImdldFN1Ymxpc3QiLCJnZXRTdWJsaXN0cyIsImdldFN1Ymxpc3RGaWVsZCIsImdldFN1Ymxpc3RGaWVsZHMiLCJnZXRTdWJsaXN0U3VicmVjb3JkIiwiZ2V0U3VibGlzdFRleHQiLCJsaW5lIiwiZ2V0U3VibGlzdFZhbHVlIiwiZ2V0U3VicmVjb3JkIiwiZ2V0VGV4dCIsImdldFZhbHVlIiwiaGFzQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQiLCJoYXNTdWJsaXN0U3VicmVjb3JkIiwiaGFzU3VicmVjb3JkIiwiaW5zZXJ0TGluZSIsIm1vdmVMaW5lIiwicmVtb3ZlQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQiLCJyZW1vdmVMaW5lIiwic3BsaWNlIiwicmVtb3ZlU3VibGlzdFN1YnJlY29yZCIsInJlbW92ZVN1YnJlY29yZCIsInNhdmUiLCJyZWNvcmRzIiwiZ2V0IiwiY29weSIsImZvckVhY2giLCJrZXkiLCJ2YWx1ZXMiLCJNYXRoIiwibWF4IiwiQXJyYXkiLCJmcm9tIiwibWFwIiwiY3JlYXRlZFJlY29yZHMiLCJzZXQiLCJzYXZlZFJlY29yZHMiLCJzZWxlY3RMaW5lIiwic2V0Q3VycmVudE1hdHJpeFN1Ymxpc3RWYWx1ZSIsInNldEN1cnJlbnRTdWJsaXN0VGV4dCIsInNldEN1cnJlbnRTdWJsaXN0VmFsdWUiLCJzZXRNYXRyaXhIZWFkZXJWYWx1ZSIsInNldE1hdHJpeFN1Ymxpc3RWYWx1ZSIsInNldFN1Ymxpc3RUZXh0Iiwic2V0U3VibGlzdFZhbHVlIiwic2V0VGV4dCIsInNldFZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2Nrcy9yZWNvcmQvUmVjb3JkLmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYXRlZm5zID0gcmVxdWlyZShcImRhdGUtZm5zXCIpO1xuY29uc3Qgc3RydWN0dXJlZENsb25lID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9hY3R1YWwvc3RydWN0dXJlZC1jbG9uZVwiKTtcbmNvbnN0IHsgcmFuZG9tVVVJRCB9ID0gcmVxdWlyZShcIm5vZGU6Y3J5cHRvXCIpO1xuY29uc3QgU3VpdGVTY3JpcHRNb2NrcyA9IHJlcXVpcmUoXCIuLi8uLi9pbmRleC5janNcIik7XG5jb25zdCB7XG5cdG9wdGlvbnMsXG5cdHJlcXVpcmVkLFxuXHRhZGRQcm9taXNlLFxuXHRkeW5hbWljTW9kZU9ubHksXG5cdHN0YW5kYXJkTW9kZU9ubHksXG5cdGFzc2lnbkNvbnN0cnVjdG9yLFxufSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKTtcblxuQGFzc2lnbkNvbnN0cnVjdG9yKClcbmNsYXNzIFJlY29yZCB7XG5cdGlkID0gbnVsbDtcblx0dHlwZSA9IG51bGw7XG5cdGZpZWxkcyA9IHt9O1xuXHRzdWJsaXN0cyA9IHt9O1xuXHRzdWJyZWNvcmRzID0ge307XG5cdGlzRHluYW1pYyA9IGZhbHNlO1xuXHR2ZXJzaW9uID0gMTtcblxuXHRpbml0aWFsaXplID0gKCkgPT4ge1xuXHRcdHRoaXMuZmllbGRzID0gc3RydWN0dXJlZENsb25lKHRoaXMuZmllbGRzKTtcblx0XHR0aGlzLnN1Ymxpc3RzID0gT2JqZWN0LmVudHJpZXMoc3RydWN0dXJlZENsb25lKHRoaXMuc3VibGlzdHMpIHx8IHt9KS5yZWR1Y2UoKGFjYywgW2xpbmVJZCwgbGluZXNdKSA9PiB7XG5cdFx0XHRhY2NbbGluZUlkXSA9IHtcblx0XHRcdFx0Y3VycmVudGxpbmU6IHt9LFxuXHRcdFx0XHRsaW5lczogXCJsaW5lc1wiIGluIGxpbmVzID8gbGluZXMubGluZXMgOiBsaW5lcyxcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gYWNjO1xuXHRcdH0sIHt9KTtcblx0XHR0aGlzLnN1YnJlY29yZHMgPSBPYmplY3QuZW50cmllcyh0aGlzLnN1YnJlY29yZHMgfHwge30pLnJlZHVjZSgoYWNjLCBbc3VicmVjb3JkSWQsIHN1YnJlY29yZF0pID0+IHtcblx0XHRcdGFjY1tzdWJyZWNvcmRJZF0gPSBuZXcgUmVjb3JkKHN1YnJlY29yZCk7XG5cdFx0XHRyZXR1cm4gYWNjO1xuXHRcdH0sIHt9KTtcblx0fTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG5cdGNhbmNlbExpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdHRoaXMuc2VsZWN0TmV3TGluZShvcHRpb25zLnN1Ymxpc3RJZCk7XG5cdH07XG5cblx0QGR5bmFtaWNNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiaWdub3JlUmVjYWxjXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiKVxuXHRjb21taXRMaW5lID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBzdWJsaXN0ID0gdGhpcz8uc3VibGlzdHM/LltvcHRpb25zLnN1Ymxpc3RJZF07XG5cdFx0aWYgKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCB8fCAhKFwiY3VycmVudGxpbmVcIiBpbiBzdWJsaXN0KSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCk7XG5cdFx0fVxuXHRcdGNvbnN0IGV4aXN0aW5nSW5kZXggPSBzdWJsaXN0LmxpbmVzLmZpbmRJbmRleCgoYSkgPT4gYS5faWQgPT09IHN1Ymxpc3QuY3VycmVudGxpbmUuX2lkKTtcblx0XHRpZiAoZXhpc3RpbmdJbmRleCA+IC0xKSB7XG5cdFx0XHRzdWJsaXN0LmxpbmVzW2V4aXN0aW5nSW5kZXhdID0gc3VibGlzdC5jdXJyZW50bGluZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3VibGlzdC5saW5lcy5wdXNoKHN1Ymxpc3QuY3VycmVudGxpbmUpO1xuXHRcdH1cblx0XHR0aGlzLnNlbGVjdE5ld0xpbmUob3B0aW9ucy5zdWJsaXN0SWQpO1xuXHR9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0ZXhlY3V0ZU1hY3JvID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGZpbmRNYXRyaXhTdWJsaXN0TGluZVdpdGhWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRmaW5kU3VibGlzdExpbmVXaXRoVmFsdWUgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0Q3VycmVudE1hdHJpeFN1Ymxpc3RWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRDdXJyZW50U3VibGlzdEZpZWxkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldEN1cnJlbnRTdWJsaXN0SW5kZXggPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0Q3VycmVudFN1Ymxpc3RTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge307XG5cblx0QGR5bmFtaWNNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIpXG5cdGdldEN1cnJlbnRTdWJsaXN0VGV4dCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdO1xuXHRcdGlmIChzdWJsaXN0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlN1Ymxpc3QgZG9lcyBub3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdGlmICghKFwiY3VycmVudGxpbmVcIiBpbiBzdWJsaXN0KSkge1xuXHRcdFx0dGhpcy5zZWxlY3ROZXdMaW5lKHN1Ymxpc3QpO1xuXHRcdH1cblx0XHRjb25zdCBmaWVsZCA9IHN1Ymxpc3QuY3VycmVudGxpbmVbb3B0aW9ucy5maWVsZElkXTtcblx0XHRpZiAoZmllbGQgaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0XHRyZXR1cm4gZGF0ZWZucy5mb3JtYXQoZmllbGQsIFN1aXRlU2NyaXB0TW9ja3MuZGF0ZUZvcm1hdCk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgZmllbGQgPT09IFwib2JqZWN0XCIgJiYgZmllbGQgIT09IG51bGwpIHtcblx0XHRcdHJldHVybiBmaWVsZC50ZXh0IHx8IGZpZWxkLnZhbHVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGQ7XG5cdH07XG5cblx0QGR5bmFtaWNNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIpXG5cdGdldEN1cnJlbnRTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0aWYgKCEoXCJjdXJyZW50bGluZVwiIGluIHN1Ymxpc3QpKSB7XG5cdFx0XHR0aGlzLnNlbGVjdE5ld0xpbmUoc3VibGlzdCk7XG5cdFx0fVxuXHRcdGNvbnN0IGZpZWxkID0gc3VibGlzdC5jdXJyZW50bGluZVtvcHRpb25zLmZpZWxkSWRdO1xuXHRcdGlmICh0eXBlb2YgZmllbGQgPT09IFwib2JqZWN0XCIgJiYgZmllbGQgIT09IG51bGwgJiYgIShmaWVsZCBpbnN0YW5jZW9mIERhdGUpKSB7XG5cdFx0XHRyZXR1cm4gZmllbGQudmFsdWU7XG5cdFx0fVxuXHRcdHJldHVybiBmaWVsZDtcblx0fTtcblxuXHRnZXRGaWVsZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRGaWVsZHMgPSAob3B0aW9ucykgPT4ge307XG5cblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG5cdGdldExpbmVDb3VudCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdO1xuXHRcdGlmIChzdWJsaXN0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiAtMTtcblx0XHR9XG5cdFx0cmV0dXJuIHN1Ymxpc3QubGluZXMubGVuZ3RoO1xuXHR9O1xuXG5cdGdldE1hY3JvID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldE1hY3JvcyA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRNYXRyaXhIZWFkZXJDb3VudCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRNYXRyaXhIZWFkZXJGaWVsZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRNYXRyaXhIZWFkZXJWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRNYXRyaXhTdWJsaXN0RmllbGQgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0TWF0cml4U3VibGlzdFZhbHVlID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldFN1Ymxpc3QgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0U3VibGlzdHMgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0U3VibGlzdEZpZWxkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldFN1Ymxpc3RGaWVsZHMgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0U3VibGlzdFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG5cdGdldFN1Ymxpc3RUZXh0ID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBmaWVsZCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdLmxpbmVzW29wdGlvbnMubGluZV1bb3B0aW9ucy5maWVsZElkXTtcblx0XHRpZiAoZmllbGQgaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0XHRyZXR1cm4gZGF0ZWZucy5mb3JtYXQoZmllbGQsIFN1aXRlU2NyaXB0TW9ja3MuZGF0ZUZvcm1hdCk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgZmllbGQgPT09IFwib2JqZWN0XCIgJiYgZmllbGQgIT09IG51bGwpIHtcblx0XHRcdGlmICghdGhpcy5pc0R5bmFtaWMgJiYgIShcInRleHRcIiBpbiBmaWVsZCkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdFwiQ2Fubm90IHVzZSBnZXRTdWJsaXN0VGV4dCBvbiBmaWVsZCB0aGF0IGhhcyBoYWQgdmFsdWUgYnV0IG5vdCB0ZXh0IHNldCBpbiBzdGFuZGFyZCBtb2RlXCJcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmaWVsZC50ZXh0IHx8IGZpZWxkLnZhbHVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGQ7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwibGluZVwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwibGluZVwiKVxuXHRnZXRTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGZpZWxkID0gdGhpcy5zdWJsaXN0c1tvcHRpb25zLnN1Ymxpc3RJZF0ubGluZXNbb3B0aW9ucy5saW5lXVtvcHRpb25zLmZpZWxkSWRdO1xuXHRcdGlmICh0eXBlb2YgZmllbGQgPT09IFwib2JqZWN0XCIgJiYgZmllbGQgIT09IG51bGwgJiYgIShmaWVsZCBpbnN0YW5jZW9mIERhdGUpKSB7XG5cdFx0XHRyZXR1cm4gZmllbGQudmFsdWU7XG5cdFx0fVxuXHRcdHJldHVybiBmaWVsZDtcblx0fTtcblxuXHRAb3B0aW9ucyhcImZpZWxkSWRcIilcblx0QHJlcXVpcmVkKFwiZmllbGRJZFwiKVxuXHRnZXRTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge1xuXHRcdGlmICghKG9wdGlvbnMuZmllbGRJZCBpbiB0aGlzLnN1YnJlY29yZHMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJTdWJyZWNvcmQgZG9lcyBub3QgZXhpc3QuXCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5zdWJyZWNvcmRzW29wdGlvbnMuZmllbGRJZF07XG5cdH07XG5cblx0QG9wdGlvbnMoXCJmaWVsZElkXCIpXG5cdEByZXF1aXJlZChcImZpZWxkSWRcIilcblx0Z2V0VGV4dCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1tvcHRpb25zLmZpZWxkSWRdO1xuXHRcdGlmIChmaWVsZCBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRcdHJldHVybiBkYXRlZm5zLmZvcm1hdChmaWVsZCwgU3VpdGVTY3JpcHRNb2Nrcy5kYXRlRm9ybWF0KTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBmaWVsZCA9PT0gXCJvYmplY3RcIiAmJiBmaWVsZCAhPT0gbnVsbCkge1xuXHRcdFx0aWYgKCF0aGlzLmlzRHluYW1pYyAmJiAhKFwidGV4dFwiIGluIGZpZWxkKSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgdXNlIGdldFRleHQgb24gZmllbGQgdGhhdCBoYXMgaGFkIHZhbHVlIGJ1dCBub3QgdGV4dCBzZXQgaW4gc3RhbmRhcmQgbW9kZVwiKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmaWVsZC50ZXh0IHx8IGZpZWxkLnZhbHVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGQ7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJmaWVsZElkXCIpXG5cdEByZXF1aXJlZChcImZpZWxkSWRcIilcblx0Z2V0VmFsdWUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZHNbb3B0aW9ucy5maWVsZElkXTtcblx0XHRpZiAodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsICYmICEoZmllbGQgaW5zdGFuY2VvZiBEYXRlKSkge1xuXHRcdFx0cmV0dXJuIGZpZWxkLnZhbHVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGQ7XG5cdH07XG5cblx0aGFzQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge307XG5cblx0aGFzU3VibGlzdFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRoYXNTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge307XG5cblx0aW5zZXJ0TGluZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRtb3ZlTGluZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRyZW1vdmVDdXJyZW50U3VibGlzdFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImxpbmVcIiwgXCJpZ25vcmVSZWNhbGNcIiwgXCJsaW5lSW5zdGFuY2VJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJsaW5lXCIpXG5cdHJlbW92ZUxpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkIHx8ICEob3B0aW9ucy5saW5lIGluIHN1Ymxpc3QubGluZXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcblx0XHR9XG5cdFx0c3VibGlzdC5saW5lcy5zcGxpY2Uob3B0aW9ucy5saW5lLCAxKTtcblx0fTtcblxuXHRyZW1vdmVTdWJsaXN0U3VicmVjb3JkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdHJlbW92ZVN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwiZW5hYmxlU291cmNpbmdcIiwgXCJpZ25vcmVNYW5kYXRvcnlGaWVsZHNcIilcblx0c2F2ZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKHRoaXMuaWQgJiYgU3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLmdldCh0aGlzKS52ZXJzaW9uICE9PSB0aGlzLnZlcnNpb24pIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlJlY29yZCBoYXMgY2hhbmdlZFwiKTtcblx0XHR9XG5cdFx0dGhpcy52ZXJzaW9uKys7XG5cdFx0Y29uc3QgY29weSA9IG5ldyBSZWNvcmQodGhpcyk7XG5cdFx0Ly8gY2hhbmdlIGZpZWxkcyB0aGF0IG9ubHkgaGF2ZSB2YWx1ZSB0byBub3QgYmUgYW4gb2JqZWN0IHNvIGdldFRleHQgd29ya3Ncblx0XHRPYmplY3QuZW50cmllcyhjb3B5LmZpZWxkcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSAmJiAhKFwidGV4dFwiIGluIHZhbHVlKSkge1xuXHRcdFx0XHRjb3B5LmZpZWxkc1trZXldID0gdmFsdWUudmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LnZhbHVlcyhjb3B5LnN1Ymxpc3RzKS5mb3JFYWNoKChzdWJsaXN0KSA9PiB7XG5cdFx0XHRzdWJsaXN0LmxpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcblx0XHRcdFx0T2JqZWN0LmVudHJpZXMobGluZSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgJiYgIShcInRleHRcIiBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdGxpbmVba2V5XSA9IHZhbHVlLnZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZiAoIXRoaXMuaWQpIHtcblx0XHRcdHRoaXMuaWQgPSBjb3B5LmlkID0gTWF0aC5tYXgoQXJyYXkuZnJvbShTdWl0ZVNjcmlwdE1vY2tzLnJlY29yZHMudmFsdWVzKCkpLm1hcCgoYSkgPT4gYS5pZCkpICsgMTtcblx0XHRcdFN1aXRlU2NyaXB0TW9ja3MuY3JlYXRlZFJlY29yZHMucHVzaChjb3B5KTtcblx0XHR9XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLnNldChjb3B5KTtcblx0XHRTdWl0ZVNjcmlwdE1vY2tzLnNhdmVkUmVjb3Jkcy5wdXNoKGNvcHkpO1xuXHRcdHJldHVybiB0aGlzLmlkO1xuXHR9O1xuXG5cdC8vIFRPRE86IGVkZ2UgY2FzZSB3aGVyZSBpZiBmaXJzdCBsaW5lIHNlbGVjdCB5b3UgZG8gaXMgbiArIDEgaXQgd2lsbCBnaXZlIGEgbmV3IGxpbmVcblx0QGR5bmFtaWNNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwibGluZVwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJsaW5lXCIpXG5cdHNlbGVjdExpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkIHx8ICEob3B0aW9ucy5saW5lIGluIHN1Ymxpc3QubGluZXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzdWJsaXN0IG9yIGxpbmUgZG9lcyBub3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdHN1Ymxpc3QuY3VycmVudGxpbmUgPSB7IC4uLnN1Ymxpc3QubGluZXNbb3B0aW9ucy5saW5lXSB9O1xuXHR9O1xuXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIilcblx0c2VsZWN0TmV3TGluZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdO1xuXHRcdGlmIChzdWJsaXN0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInN1Ymxpc3QgZG9lcyBub3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdHN1Ymxpc3QuY3VycmVudGxpbmUgPSB7XG5cdFx0XHRfaWQ6IHJhbmRvbVVVSUQoKSxcblx0XHR9O1xuXHR9O1xuXG5cdHNldEN1cnJlbnRNYXRyaXhTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge307XG5cblx0QGR5bmFtaWNNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcInRleHRcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcInRleHRcIilcblx0c2V0Q3VycmVudFN1Ymxpc3RUZXh0ID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBzdWJsaXN0ID0gdGhpcz8uc3VibGlzdHM/LltvcHRpb25zLnN1Ymxpc3RJZF07XG5cdFx0aWYgKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCB8fCAhKFwiY3VycmVudGxpbmVcIiBpbiBzdWJsaXN0KSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwic3VibGlzdCBkb2Vzbid0IGV4aXN0IG9yIGxpbmUgaXMgbm90IHNlbGVjdGVkXCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gKHN1Ymxpc3QuY3VycmVudGxpbmVbb3B0aW9ucy5maWVsZElkXSA9IHsgdmFsdWU6IG9wdGlvbnMudGV4dCwgdGV4dDogb3B0aW9ucy50ZXh0IH0pO1xuXHR9O1xuXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJ2YWx1ZVwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwidmFsdWVcIilcblx0c2V0Q3VycmVudFN1Ymxpc3RWYWx1ZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXM/LnN1Ymxpc3RzPy5bb3B0aW9ucy5zdWJsaXN0SWRdO1xuXHRcdGlmIChzdWJsaXN0ID09PSB1bmRlZmluZWQgfHwgIShcImN1cnJlbnRsaW5lXCIgaW4gc3VibGlzdCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInN1Ymxpc3QgZG9lc24ndCBleGlzdCBvciBsaW5lIGlzIG5vdCBzZWxlY3RlZFwiKTtcblx0XHR9XG5cdFx0cmV0dXJuIChzdWJsaXN0LmN1cnJlbnRsaW5lW29wdGlvbnMuZmllbGRJZF0gPSB7IHZhbHVlOiBvcHRpb25zLnZhbHVlIH0pO1xuXHR9O1xuXG5cdHNldE1hdHJpeEhlYWRlclZhbHVlID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdHNldE1hdHJpeFN1Ymxpc3RWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAc3RhbmRhcmRNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIiwgXCJ0ZXh0XCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIsIFwidGV4dFwiKVxuXHRzZXRTdWJsaXN0VGV4dCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXM/LnN1Ymxpc3RzPy5bb3B0aW9ucy5zdWJsaXN0SWRdO1xuXHRcdGlmIChzdWJsaXN0ID09PSB1bmRlZmluZWQgfHwgIShvcHRpb25zLmxpbmUgaW4gc3VibGlzdC5saW5lcykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInN1Ymxpc3Qgb3IgbGluZSBkb2Vzbid0IGV4aXN0XCIpO1xuXHRcdH1cblx0XHRzdWJsaXN0LmxpbmVzW29wdGlvbnMubGluZV1bb3B0aW9ucy5maWVsZElkXSA9IHsgdmFsdWU6IG9wdGlvbnMudGV4dCwgdGV4dDogb3B0aW9ucy50ZXh0IH07XG5cdH07XG5cblx0QHN0YW5kYXJkTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIsIFwidmFsdWVcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIiwgXCJ2YWx1ZVwiKVxuXHRzZXRTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzPy5zdWJsaXN0cz8uW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkIHx8ICEob3B0aW9ucy5saW5lIGluIHN1Ymxpc3QubGluZXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzdWJsaXN0IG9yIGxpbmUgZG9lc24ndCBleGlzdFwiKTtcblx0XHR9XG5cdFx0c3VibGlzdC5saW5lc1tvcHRpb25zLmxpbmVdW29wdGlvbnMuZmllbGRJZF0gPSB7IHZhbHVlOiBvcHRpb25zLnZhbHVlIH07XG5cdH07XG5cblx0QG9wdGlvbnMoXCJmaWVsZElkXCIsIFwidGV4dFwiLCBcImlnbm9yZUZpZWxkQ2hhbmdlXCIpXG5cdEByZXF1aXJlZChcImZpZWxkSWRcIiwgXCJ0ZXh0XCIpXG5cdHNldFRleHQgPSAob3B0aW9ucykgPT4ge1xuXHRcdHRoaXMuZmllbGRzW29wdGlvbnMuZmllbGRJZF0gPSB7IHZhbHVlOiBvcHRpb25zLnRleHQsIHRleHQ6IG9wdGlvbnMudGV4dCB9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiZmllbGRJZFwiLCBcInZhbHVlXCIsIFwiaWdub3JlRmllbGRDaGFuZ2VcIilcblx0QHJlcXVpcmVkKFwiZmllbGRJZFwiLCBcInZhbHVlXCIpXG5cdHNldFZhbHVlID0gKG9wdGlvbnMpID0+IHtcblx0XHR0aGlzLmZpZWxkc1tvcHRpb25zLmZpZWxkSWRdID0geyB2YWx1ZTogb3B0aW9ucy52YWx1ZSB9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY29yZDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDbkMsTUFBTUMsZUFBZSxHQUFHRCxPQUFPLENBQUMsc0NBQXNDLENBQUM7QUFDdkUsTUFBTTtFQUFFRTtBQUFXLENBQUMsR0FBR0YsT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUM3QyxNQUFNRyxnQkFBZ0IsR0FBR0gs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