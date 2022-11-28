var _dec, _dec2, _dec3, _init_cancelLine, _dec4, _dec5, _dec6, _init_commitLine, _dec7, _init_executeMacro, _dec8, _dec9, _dec10, _init_getCurrentSublistValue, _dec11, _dec12, _init_getLineCount, _dec13, _dec14, _init_getSublistValue, _dec15, _dec16, _init_getSubrecord, _dec17, _dec18, _init_getText, _dec19, _dec20, _init_getValue, _dec21, _dec22, _init_removeLine, _dec23, _dec24, _init_save, _dec25, _dec26, _dec27, _init_selectLine, _dec28, _dec29, _dec30, _init_selectNewLine, _dec31, _dec32, _dec33, _init_setCurrentSublistValue, _dec34, _dec35, _dec36, _init_setSublistValue, _dec37, _dec38, _init_setText, _dec39, _dec40, _init_setValue;
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
const structuredClone = require('core-js-pure/actual/structured-clone');
const {
  randomUUID
} = require("node:crypto");
const SuiteScriptMocks = require("../../index.cjs");
const {
  options,
  required,
  addPromise,
  dynamicModeOnly,
  standardModeOnly
} = require("../../helpers.cjs");
_dec = dynamicModeOnly();
_dec2 = options("sublistId");
_dec3 = required("sublistId");
_dec4 = dynamicModeOnly();
_dec5 = options("sublistId", "ignoreRecalc");
_dec6 = required("sublistId");
_dec7 = addPromise();
_dec8 = dynamicModeOnly();
_dec9 = options("sublistId", "fieldId");
_dec10 = required("sublistId", "fieldId");
_dec11 = options("sublistId");
_dec12 = required("sublistId");
_dec13 = options("sublistId", "fieldId", "line");
_dec14 = required("sublistId", "fieldId", "line");
_dec15 = options("fieldId");
_dec16 = required("fieldId");
_dec17 = options("fieldId");
_dec18 = required("fieldId");
_dec19 = options("fieldId");
_dec20 = required("fieldId");
_dec21 = options("sublistId", "line", "ignoreRecalc", "lineInstanceId");
_dec22 = required("sublistId", "line");
_dec23 = addPromise();
_dec24 = options("enableSourcing", "ignoreMandatoryFields");
_dec25 = dynamicModeOnly();
_dec26 = options("sublistId", "line");
_dec27 = required("sublistId", "line");
_dec28 = dynamicModeOnly();
_dec29 = options("sublistId");
_dec30 = required("sublistId");
_dec31 = dynamicModeOnly();
_dec32 = options("sublistId", "fieldId", "value");
_dec33 = required("sublistId", "fieldId", "value");
_dec34 = standardModeOnly();
_dec35 = options("sublistId", "fieldId", "line", "value");
_dec36 = required("sublistId", "fieldId", "line", "value");
_dec37 = options("fieldId", "text", "ignoreFieldChange");
_dec38 = required("fieldId", "text");
_dec39 = options("fieldId", "value", "ignoreFieldChange");
_dec40 = required("fieldId", "value");
class Record {
  static {
    [_init_cancelLine, _init_commitLine, _init_executeMacro, _init_getCurrentSublistValue, _init_getLineCount, _init_getSublistValue, _init_getSubrecord, _init_getText, _init_getValue, _init_removeLine, _init_save, _init_selectLine, _init_selectNewLine, _init_setCurrentSublistValue, _init_setSublistValue, _init_setText, _init_setValue] = _applyDecs(this, [[[_dec, _dec2, _dec3], 0, "cancelLine"], [[_dec4, _dec5, _dec6], 0, "commitLine"], [_dec7, 0, "executeMacro"], [[_dec8, _dec9, _dec10], 0, "getCurrentSublistValue"], [[_dec11, _dec12], 0, "getLineCount"], [[_dec13, _dec14], 0, "getSublistValue"], [[_dec15, _dec16], 0, "getSubrecord"], [[_dec17, _dec18], 0, "getText"], [[_dec19, _dec20], 0, "getValue"], [[_dec21, _dec22], 0, "removeLine"], [[_dec23, _dec24], 0, "save"], [[_dec25, _dec26, _dec27], 0, "selectLine"], [[_dec28, _dec29, _dec30], 0, "selectNewLine"], [[_dec31, _dec32, _dec33], 0, "setCurrentSublistValue"], [[_dec34, _dec35, _dec36], 0, "setSublistValue"], [[_dec37, _dec38], 0, "setText"], [[_dec39, _dec40], 0, "setValue"]], []);
  }
  id;
  type;
  fields = {};
  sublists = {};
  subrecords = {};
  isDynamic = false;
  version = 1;
  constructor({
    id,
    type,
    fields,
    sublists,
    subrecords,
    isDynamic,
    version
  }) {
    this.id = id || null;
    this.type = type || null;
    this.fields = structuredClone(fields || {});
    this.sublists = Object.entries(structuredClone(sublists) || {}).reduce((acc, [key, value]) => {
      acc[key] = {
        currentline: {},
        lines: "lines" in value ? value.lines : value
      };
      return acc;
    }, {});
    this.subrecords = Object.entries(subrecords || {}).reduce((acc, [key, value]) => {
      acc[key] = new Record(value);
      return acc;
    }, {});
    this.isDynamic = Boolean(isDynamic) || false;
    this.version = version || 1;
  }
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
  getCurrentSublistText = options => {};
  getCurrentSublistValue = _init_getCurrentSublistValue(this, options => {
    const sublist = this.sublists[options.sublistId];
    if (sublist === undefined) {
      return null;
    }
    if (!("currentline" in sublist)) {
      this.selectNewLine(sublist);
    }
    const field = sublist.currentline[options.fieldId];
    if (typeof field === "object" && field !== null) {
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
  getSublistText = options => {};
  getSublistValue = _init_getSublistValue(this, options => {
    const field = this.sublists[options.sublistId].lines[options.line][options.fieldId];
    if (typeof field === "object" && field !== null) {
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
    if (typeof field === "object" && field !== null) {
      if (!this.isDynamic && !("text" in field)) {
        throw new Error("Cannot use getText on field that has had value but not text set in standard mode");
      }
      return field.text;
    }
    return field;
  });
  getValue = _init_getValue(this, options => {
    const field = this.fields[options.fieldId];
    if (typeof field === "object" && field !== null) {
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
    const copy = new Record(this);
    // change fields that only have value to not be an object so getText works
    Object.entries(copy.fields).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null && !("text" in value)) {
        copy.fields[key] = value.value;
      }
    });
    Object.values(copy.sublists).forEach(sublist => {
      sublist.lines.forEach(line => {
        Object.entries(line).forEach(([key, value]) => {
          if (typeof value === "object" && value !== null && !("text" in value)) {
            line[key] = value.value;
          }
        });
      });
    });
    if (!this.id) {
      this.id = copy.id = Math.max(Array.from(SuiteScriptMocks.records.values).map(a => a.id)) + 1;
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
  setCurrentSublistText = options => {};
  setCurrentSublistValue = _init_setCurrentSublistValue(this, options => {
    const sublist = this?.sublists?.[options.sublistId];
    if (sublist === undefined || !("currentline" in sublist)) {
      throw new Error();
    }
    return sublist.currentline[options.fieldId] = {
      value: options.value
    };
  });
  setMatrixHeaderValue = options => {};
  setMatrixSublistValue = options => {};
  setSublistText = options => {};
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
}
module.exports = Record;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzdHJ1Y3R1cmVkQ2xvbmUiLCJyZXF1aXJlIiwicmFuZG9tVVVJRCIsIlN1aXRlU2NyaXB0TW9ja3MiLCJvcHRpb25zIiwicmVxdWlyZWQiLCJhZGRQcm9taXNlIiwiZHluYW1pY01vZGVPbmx5Iiwic3RhbmRhcmRNb2RlT25seSIsIlJlY29yZCIsImlkIiwidHlwZSIsImZpZWxkcyIsInN1Ymxpc3RzIiwic3VicmVjb3JkcyIsImlzRHluYW1pYyIsInZlcnNpb24iLCJjb25zdHJ1Y3RvciIsIk9iamVjdCIsImVudHJpZXMiLCJyZWR1Y2UiLCJhY2MiLCJrZXkiLCJ2YWx1ZSIsImN1cnJlbnRsaW5lIiwibGluZXMiLCJCb29sZWFuIiwiY2FuY2VsTGluZSIsInNlbGVjdE5ld0xpbmUiLCJzdWJsaXN0SWQiLCJjb21taXRMaW5lIiwic3VibGlzdCIsInVuZGVmaW5lZCIsIkVycm9yIiwiZXhpc3RpbmdJbmRleCIsImZpbmRJbmRleCIsImEiLCJfaWQiLCJwdXNoIiwiZXhlY3V0ZU1hY3JvIiwiZmluZE1hdHJpeFN1Ymxpc3RMaW5lV2l0aFZhbHVlIiwiZmluZFN1Ymxpc3RMaW5lV2l0aFZhbHVlIiwiZ2V0Q3VycmVudE1hdHJpeFN1Ymxpc3RWYWx1ZSIsImdldEN1cnJlbnRTdWJsaXN0RmllbGQiLCJnZXRDdXJyZW50U3VibGlzdEluZGV4IiwiZ2V0Q3VycmVudFN1Ymxpc3RTdWJyZWNvcmQiLCJnZXRDdXJyZW50U3VibGlzdFRleHQiLCJnZXRDdXJyZW50U3VibGlzdFZhbHVlIiwiZmllbGQiLCJmaWVsZElkIiwiZ2V0RmllbGQiLCJnZXRGaWVsZHMiLCJnZXRMaW5lQ291bnQiLCJsZW5ndGgiLCJnZXRNYWNybyIsImdldE1hY3JvcyIsImdldE1hdHJpeEhlYWRlckNvdW50IiwiZ2V0TWF0cml4SGVhZGVyRmllbGQiLCJnZXRNYXRyaXhIZWFkZXJWYWx1ZSIsImdldE1hdHJpeFN1Ymxpc3RGaWVsZCIsImdldE1hdHJpeFN1Ymxpc3RWYWx1ZSIsImdldFN1Ymxpc3QiLCJnZXRTdWJsaXN0cyIsImdldFN1Ymxpc3RGaWVsZCIsImdldFN1Ymxpc3RGaWVsZHMiLCJnZXRTdWJsaXN0U3VicmVjb3JkIiwiZ2V0U3VibGlzdFRleHQiLCJnZXRTdWJsaXN0VmFsdWUiLCJsaW5lIiwiZ2V0U3VicmVjb3JkIiwiZ2V0VGV4dCIsInRleHQiLCJnZXRWYWx1ZSIsImhhc0N1cnJlbnRTdWJsaXN0U3VicmVjb3JkIiwiaGFzU3VibGlzdFN1YnJlY29yZCIsImhhc1N1YnJlY29yZCIsImluc2VydExpbmUiLCJtb3ZlTGluZSIsInJlbW92ZUN1cnJlbnRTdWJsaXN0U3VicmVjb3JkIiwicmVtb3ZlTGluZSIsInNwbGljZSIsInJlbW92ZVN1Ymxpc3RTdWJyZWNvcmQiLCJyZW1vdmVTdWJyZWNvcmQiLCJzYXZlIiwicmVjb3JkcyIsImdldCIsImNvcHkiLCJmb3JFYWNoIiwidmFsdWVzIiwiTWF0aCIsIm1heCIsIkFycmF5IiwiZnJvbSIsIm1hcCIsImNyZWF0ZWRSZWNvcmRzIiwic2V0Iiwic2F2ZWRSZWNvcmRzIiwic2VsZWN0TGluZSIsInNldEN1cnJlbnRNYXRyaXhTdWJsaXN0VmFsdWUiLCJzZXRDdXJyZW50U3VibGlzdFRleHQiLCJzZXRDdXJyZW50U3VibGlzdFZhbHVlIiwic2V0TWF0cml4SGVhZGVyVmFsdWUiLCJzZXRNYXRyaXhTdWJsaXN0VmFsdWUiLCJzZXRTdWJsaXN0VGV4dCIsInNldFN1Ymxpc3RWYWx1ZSIsInNldFRleHQiLCJzZXRWYWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9ja3MvcmVjb3JkL1JlY29yZC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCBzdHJ1Y3R1cmVkQ2xvbmUgPSByZXF1aXJlKCdjb3JlLWpzLXB1cmUvYWN0dWFsL3N0cnVjdHVyZWQtY2xvbmUnKTtcbmNvbnN0IHsgcmFuZG9tVVVJRCB9ID0gcmVxdWlyZShcIm5vZGU6Y3J5cHRvXCIpXG5jb25zdCBTdWl0ZVNjcmlwdE1vY2tzID0gcmVxdWlyZShcIi4uLy4uL2luZGV4LmNqc1wiKVxuY29uc3QgeyBvcHRpb25zLCByZXF1aXJlZCwgYWRkUHJvbWlzZSwgZHluYW1pY01vZGVPbmx5LCBzdGFuZGFyZE1vZGVPbmx5IH0gPSByZXF1aXJlKFwiLi4vLi4vaGVscGVycy5janNcIik7XG5cbmNsYXNzIFJlY29yZCB7XG4gICAgaWRcbiAgICB0eXBlXG4gICAgZmllbGRzID0ge31cbiAgICBzdWJsaXN0cyA9IHt9XG4gICAgc3VicmVjb3JkcyA9IHt9XG4gICAgaXNEeW5hbWljID0gZmFsc2VcbiAgICB2ZXJzaW9uID0gMVxuXG4gICAgY29uc3RydWN0b3Ioe2lkLCB0eXBlLCBmaWVsZHMsIHN1Ymxpc3RzLCBzdWJyZWNvcmRzLCBpc0R5bmFtaWMsIHZlcnNpb259KSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZCB8fCBudWxsXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGUgfHwgbnVsbFxuICAgICAgICB0aGlzLmZpZWxkcyA9IHN0cnVjdHVyZWRDbG9uZShmaWVsZHMgfHwge30pXG4gICAgICAgIHRoaXMuc3VibGlzdHMgPSBPYmplY3QuZW50cmllcyhzdHJ1Y3R1cmVkQ2xvbmUoc3VibGlzdHMpIHx8IHt9KS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bGluZToge30sXG4gICAgICAgICAgICAgICAgbGluZXM6IFwibGluZXNcIiBpbiB2YWx1ZSA/IHZhbHVlLmxpbmVzIDogdmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2NcbiAgICAgICAgfSwge30pXG4gICAgICAgIHRoaXMuc3VicmVjb3JkcyA9IE9iamVjdC5lbnRyaWVzKHN1YnJlY29yZHMgfHwge30pLnJlZHVjZSgoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGFjY1trZXldID0gbmV3IFJlY29yZCh2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiBhY2NcbiAgICAgICAgfSwge30pXG4gICAgICAgIHRoaXMuaXNEeW5hbWljID0gQm9vbGVhbihpc0R5bmFtaWMpIHx8IGZhbHNlXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb24gfHwgMVxuICAgIH1cblxuICAgIEBkeW5hbWljTW9kZU9ubHkoKVxuICAgIEBvcHRpb25zKFwic3VibGlzdElkXCIpXG4gICAgQHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG4gICAgY2FuY2VsTGluZSA9IG9wdGlvbnMgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdE5ld0xpbmUob3B0aW9ucy5zdWJsaXN0SWQpXG4gICAgfVxuXG4gICAgQGR5bmFtaWNNb2RlT25seSgpXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJpZ25vcmVSZWNhbGNcIilcbiAgICBAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIilcbiAgICBjb21taXRMaW5lID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ymxpc3QgPSB0aGlzPy5zdWJsaXN0cz8uW29wdGlvbnMuc3VibGlzdElkXVxuICAgICAgICBpZihzdWJsaXN0ID09PSB1bmRlZmluZWQgfHwgIShcImN1cnJlbnRsaW5lXCIgaW4gc3VibGlzdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXhpc3RpbmdJbmRleCA9IHN1Ymxpc3QubGluZXMuZmluZEluZGV4KGEgPT4gYS5faWQgPT09IHN1Ymxpc3QuY3VycmVudGxpbmUuX2lkKVxuICAgICAgICBpZihleGlzdGluZ0luZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHN1Ymxpc3QubGluZXNbZXhpc3RpbmdJbmRleF0gPSBzdWJsaXN0LmN1cnJlbnRsaW5lXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdWJsaXN0LmxpbmVzLnB1c2goc3VibGlzdC5jdXJyZW50bGluZSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdE5ld0xpbmUob3B0aW9ucy5zdWJsaXN0SWQpXG4gICAgfVxuXG4gICAgQGFkZFByb21pc2UoKVxuICAgIGV4ZWN1dGVNYWNybyA9IG9wdGlvbnMgPT4ge31cblxuICAgIGZpbmRNYXRyaXhTdWJsaXN0TGluZVdpdGhWYWx1ZSA9IG9wdGlvbnMgPT4ge31cblxuICAgIGZpbmRTdWJsaXN0TGluZVdpdGhWYWx1ZSA9IG9wdGlvbnMgPT4ge31cblxuICAgIGdldEN1cnJlbnRNYXRyaXhTdWJsaXN0VmFsdWUgPSBvcHRpb25zID0+IHt9XG5cbiAgICBnZXRDdXJyZW50U3VibGlzdEZpZWxkID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0Q3VycmVudFN1Ymxpc3RJbmRleCA9IG9wdGlvbnMgPT4ge31cblxuICAgIGdldEN1cnJlbnRTdWJsaXN0U3VicmVjb3JkID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0Q3VycmVudFN1Ymxpc3RUZXh0ID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgQGR5bmFtaWNNb2RlT25seSgpXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIpXG4gICAgQHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiKVxuICAgIGdldEN1cnJlbnRTdWJsaXN0VmFsdWUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgY29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdXG4gICAgICAgIGlmKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgICBpZighKFwiY3VycmVudGxpbmVcIiBpbiBzdWJsaXN0KSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3ROZXdMaW5lKHN1Ymxpc3QpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmllbGQgPSBzdWJsaXN0LmN1cnJlbnRsaW5lW29wdGlvbnMuZmllbGRJZF1cbiAgICAgICAgaWYodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGQudmFsdWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRcbiAgICB9XG5cbiAgICBnZXRGaWVsZCA9IG9wdGlvbnMgPT4ge31cblxuICAgIGdldEZpZWxkcyA9IG9wdGlvbnMgPT4ge31cblxuICAgIEBvcHRpb25zKFwic3VibGlzdElkXCIpXG4gICAgQHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG4gICAgZ2V0TGluZUNvdW50ID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXVxuICAgICAgICBpZihzdWJsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJsaXN0LmxpbmVzLmxlbmd0aFxuICAgIH1cblxuICAgIGdldE1hY3JvID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0TWFjcm9zID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0TWF0cml4SGVhZGVyQ291bnQgPSBvcHRpb25zID0+IHt9XG5cbiAgICBnZXRNYXRyaXhIZWFkZXJGaWVsZCA9IG9wdGlvbnMgPT4ge31cblxuICAgIGdldE1hdHJpeEhlYWRlclZhbHVlID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0TWF0cml4U3VibGlzdEZpZWxkID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0TWF0cml4U3VibGlzdFZhbHVlID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0U3VibGlzdCA9IG9wdGlvbnMgPT4ge31cblxuICAgIGdldFN1Ymxpc3RzID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0U3VibGlzdEZpZWxkID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0U3VibGlzdEZpZWxkcyA9IG9wdGlvbnMgPT4ge31cblxuICAgIGdldFN1Ymxpc3RTdWJyZWNvcmQgPSBvcHRpb25zID0+IHt9XG5cbiAgICBnZXRTdWJsaXN0VGV4dCA9IG9wdGlvbnMgPT4ge31cblxuICAgIEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIilcbiAgICBAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwibGluZVwiKVxuICAgIGdldFN1Ymxpc3RWYWx1ZSA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdLmxpbmVzW29wdGlvbnMubGluZV1bb3B0aW9ucy5maWVsZElkXVxuICAgICAgICBpZih0eXBlb2YgZmllbGQgPT09IFwib2JqZWN0XCIgJiYgZmllbGQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZC52YWx1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWVsZFxuICAgIH1cblxuICAgIEBvcHRpb25zKFwiZmllbGRJZFwiKVxuICAgIEByZXF1aXJlZChcImZpZWxkSWRcIilcbiAgICBnZXRTdWJyZWNvcmQgPSBvcHRpb25zID0+IHtcbiAgICAgICAgaWYoIShvcHRpb25zLmZpZWxkSWQgaW4gdGhpcy5zdWJyZWNvcmRzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU3VicmVjb3JkIGRvZXMgbm90IGV4aXN0LlwiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN1YnJlY29yZHNbb3B0aW9ucy5maWVsZElkXVxuICAgIH1cblxuICAgIEBvcHRpb25zKFwiZmllbGRJZFwiKVxuICAgIEByZXF1aXJlZChcImZpZWxkSWRcIilcbiAgICBnZXRUZXh0ID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZHNbb3B0aW9ucy5maWVsZElkXVxuICAgICAgICBpZih0eXBlb2YgZmllbGQgPT09IFwib2JqZWN0XCIgJiYgZmllbGQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzRHluYW1pYyAmJiAhKFwidGV4dFwiIGluIGZpZWxkKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCB1c2UgZ2V0VGV4dCBvbiBmaWVsZCB0aGF0IGhhcyBoYWQgdmFsdWUgYnV0IG5vdCB0ZXh0IHNldCBpbiBzdGFuZGFyZCBtb2RlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmllbGQudGV4dFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWVsZFxuICAgIH1cblxuICAgIEBvcHRpb25zKFwiZmllbGRJZFwiKVxuICAgIEByZXF1aXJlZChcImZpZWxkSWRcIilcbiAgICBnZXRWYWx1ZSA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW29wdGlvbnMuZmllbGRJZF1cbiAgICAgICAgaWYodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGQudmFsdWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRcbiAgICB9XG5cbiAgICBoYXNDdXJyZW50U3VibGlzdFN1YnJlY29yZCA9IG9wdGlvbnMgPT4ge31cblxuICAgIGhhc1N1Ymxpc3RTdWJyZWNvcmQgPSBvcHRpb25zID0+IHt9XG5cbiAgICBoYXNTdWJyZWNvcmQgPSBvcHRpb25zID0+IHt9XG5cbiAgICBpbnNlcnRMaW5lID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgbW92ZUxpbmUgPSBvcHRpb25zID0+IHt9XG5cbiAgICByZW1vdmVDdXJyZW50U3VibGlzdFN1YnJlY29yZCA9IG9wdGlvbnMgPT4ge31cblxuICAgIEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwibGluZVwiLCBcImlnbm9yZVJlY2FsY1wiLCBcImxpbmVJbnN0YW5jZUlkXCIpXG4gICAgQHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwibGluZVwiKVxuICAgIHJlbW92ZUxpbmUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgY29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdXG4gICAgICAgIGlmKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCB8fCAhKG9wdGlvbnMubGluZSBpbiBzdWJsaXN0LmxpbmVzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcbiAgICAgICAgfVxuICAgICAgICBzdWJsaXN0LmxpbmVzLnNwbGljZShvcHRpb25zLmxpbmUsIDEpXG4gICAgfVxuXG4gICAgcmVtb3ZlU3VibGlzdFN1YnJlY29yZCA9IG9wdGlvbnMgPT4ge31cblxuICAgIHJlbW92ZVN1YnJlY29yZCA9IG9wdGlvbnMgPT4ge31cblxuICAgIEBhZGRQcm9taXNlKClcbiAgICBAb3B0aW9ucyhcImVuYWJsZVNvdXJjaW5nXCIsIFwiaWdub3JlTWFuZGF0b3J5RmllbGRzXCIpXG4gICAgc2F2ZSA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBpZih0aGlzLmlkICYmIFN1aXRlU2NyaXB0TW9ja3MucmVjb3Jkcy5nZXQodGhpcykudmVyc2lvbiAhPT0gdGhpcy52ZXJzaW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWNvcmQgaGFzIGNoYW5nZWRcIilcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZlcnNpb24rK1xuICAgICAgICBjb25zdCBjb3B5ID0gbmV3IFJlY29yZCh0aGlzKVxuICAgICAgICAvLyBjaGFuZ2UgZmllbGRzIHRoYXQgb25seSBoYXZlIHZhbHVlIHRvIG5vdCBiZSBhbiBvYmplY3Qgc28gZ2V0VGV4dCB3b3Jrc1xuICAgICAgICBPYmplY3QuZW50cmllcyhjb3B5LmZpZWxkcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgIShcInRleHRcIiBpbiB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb3B5LmZpZWxkc1trZXldID0gdmFsdWUudmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgT2JqZWN0LnZhbHVlcyhjb3B5LnN1Ymxpc3RzKS5mb3JFYWNoKHN1Ymxpc3QgPT4ge1xuICAgICAgICAgICAgc3VibGlzdC5saW5lcy5mb3JFYWNoKGxpbmUgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGxpbmUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgIShcInRleHRcIiBpbiB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVba2V5XSA9IHZhbHVlLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgaWYoIXRoaXMuaWQpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBjb3B5LmlkID0gTWF0aC5tYXgoQXJyYXkuZnJvbShTdWl0ZVNjcmlwdE1vY2tzLnJlY29yZHMudmFsdWVzKS5tYXAoYSA9PiBhLmlkKSkgKyAxXG4gICAgICAgICAgICBTdWl0ZVNjcmlwdE1vY2tzLmNyZWF0ZWRSZWNvcmRzLnB1c2goY29weSlcbiAgICAgICAgfVxuICAgICAgICBTdWl0ZVNjcmlwdE1vY2tzLnJlY29yZHMuc2V0KGNvcHkpXG4gICAgICAgIFN1aXRlU2NyaXB0TW9ja3Muc2F2ZWRSZWNvcmRzLnB1c2goY29weSlcbiAgICAgICAgcmV0dXJuIHRoaXMuaWRcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBlZGdlIGNhc2Ugd2hlcmUgaWYgZmlyc3QgbGluZSBzZWxlY3QgeW91IGRvIGlzIG4gKyAxIGl0IHdpbGwgZ2l2ZSBhIG5ldyBsaW5lXG4gICAgQGR5bmFtaWNNb2RlT25seSgpXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJsaW5lXCIpXG4gICAgQHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwibGluZVwiKVxuICAgIHNlbGVjdExpbmUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgY29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdXG4gICAgICAgIGlmKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCB8fCAhKG9wdGlvbnMubGluZSBpbiBzdWJsaXN0LmxpbmVzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3VibGlzdCBvciBsaW5lIGRvZXMgbm90IGV4aXN0XCIpXG4gICAgICAgIH1cbiAgICAgICAgc3VibGlzdC5jdXJyZW50bGluZSA9IHsuLi5zdWJsaXN0LmxpbmVzW29wdGlvbnMubGluZV19XG4gICAgfVxuXG4gICAgQGR5bmFtaWNNb2RlT25seSgpXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIilcbiAgICBAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIilcbiAgICBzZWxlY3ROZXdMaW5lID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXVxuICAgICAgICBpZihzdWJsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInN1Ymxpc3QgZG9lcyBub3QgZXhpc3RcIilcbiAgICAgICAgfVxuICAgICAgICBzdWJsaXN0LmN1cnJlbnRsaW5lID0ge1xuICAgICAgICAgICAgX2lkOiByYW5kb21VVUlEKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEN1cnJlbnRNYXRyaXhTdWJsaXN0VmFsdWUgPSBvcHRpb25zID0+IHt9XG5cbiAgICBzZXRDdXJyZW50U3VibGlzdFRleHQgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAZHluYW1pY01vZGVPbmx5KClcbiAgICBAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJ2YWx1ZVwiKVxuICAgIEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJ2YWx1ZVwiKVxuICAgIHNldEN1cnJlbnRTdWJsaXN0VmFsdWUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgY29uc3Qgc3VibGlzdCA9IHRoaXM/LnN1Ymxpc3RzPy5bb3B0aW9ucy5zdWJsaXN0SWRdXG4gICAgICAgIGlmKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCB8fCAhKFwiY3VycmVudGxpbmVcIiBpbiBzdWJsaXN0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VibGlzdC5jdXJyZW50bGluZVtvcHRpb25zLmZpZWxkSWRdID0ge3ZhbHVlOiBvcHRpb25zLnZhbHVlfVxuICAgIH1cblxuICAgIHNldE1hdHJpeEhlYWRlclZhbHVlID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgc2V0TWF0cml4U3VibGlzdFZhbHVlID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgc2V0U3VibGlzdFRleHQgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAc3RhbmRhcmRNb2RlT25seSgpXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwibGluZVwiLCBcInZhbHVlXCIpXG4gICAgQHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIiwgXCJ2YWx1ZVwiKVxuICAgIHNldFN1Ymxpc3RWYWx1ZSA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBjb25zdCBzdWJsaXN0ID0gdGhpcz8uc3VibGlzdHM/LltvcHRpb25zLnN1Ymxpc3RJZF1cbiAgICAgICAgaWYoc3VibGlzdCA9PT0gdW5kZWZpbmVkIHx8ICEob3B0aW9ucy5saW5lIGluIHN1Ymxpc3QubGluZXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzdWJsaXN0IG9yIGxpbmUgZG9lc24ndCBleGlzdFwiKVxuICAgICAgICB9XG4gICAgICAgIHN1Ymxpc3QubGluZXNbb3B0aW9ucy5saW5lXVtvcHRpb25zLmZpZWxkSWRdID0ge3ZhbHVlOiBvcHRpb25zLnZhbHVlfVxuICAgIH1cblxuICAgIEBvcHRpb25zKFwiZmllbGRJZFwiLCBcInRleHRcIiwgXCJpZ25vcmVGaWVsZENoYW5nZVwiKVxuICAgIEByZXF1aXJlZChcImZpZWxkSWRcIiwgXCJ0ZXh0XCIpXG4gICAgc2V0VGV4dCA9IG9wdGlvbnMgPT4ge1xuICAgICAgICB0aGlzLmZpZWxkc1tvcHRpb25zLmZpZWxkSWRdID0ge3ZhbHVlOiBvcHRpb25zLnRleHQsIHRleHQ6IG9wdGlvbnMudGV4dH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBAb3B0aW9ucyhcImZpZWxkSWRcIiwgXCJ2YWx1ZVwiLCBcImlnbm9yZUZpZWxkQ2hhbmdlXCIpXG4gICAgQHJlcXVpcmVkKFwiZmllbGRJZFwiLCBcInZhbHVlXCIpXG4gICAgc2V0VmFsdWUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgdGhpcy5maWVsZHNbb3B0aW9ucy5maWVsZElkXSA9IHt2YWx1ZTogb3B0aW9ucy52YWx1ZX1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVjb3JkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLE1BQU1BLGVBQWUsR0FBR0MsT0FBTyxDQUFDLHNDQUFzQyxDQUFDO0FBQ3ZFLE1BQU07RUFBRUM7QUFBVyxDQUFDLEdBQUdELE9BQU8sQ0FBQyxhQUFhLENBQUM7QUFDN0MsTUFBTUUsZ0JBQWdCLEdBQUdGLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUNuRCxNQUFNO0VBQUVHLE9BQU87RUFBRUMsUUFBUTtFQUFFQyxVQUFVO0VBQUVDLGVBQWU7RUFBRUM7QUFBaUIsQ0FBQyxHQUFHUCxPQUFPLENBQUMsbUJBQW1CLENBQUM7QUFBQyxPQThCckdNLGVBQWUsRUFBRTtBQUFBLFFBQ2pCSCxP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