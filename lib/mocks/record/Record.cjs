var _initClass, _dec, _dec2, _dec3, _dec4, _init_cancelLine, _dec5, _dec6, _dec7, _init_commitLine, _dec8, _init_executeMacro, _dec9, _dec10, _dec11, _init_getCurrentSublistValue, _dec12, _dec13, _init_getLineCount, _dec14, _dec15, _init_getSublistText, _dec16, _dec17, _init_getSublistValue, _dec18, _dec19, _init_getSubrecord, _dec20, _dec21, _init_getText, _dec22, _dec23, _init_getValue, _dec24, _dec25, _init_removeLine, _dec26, _dec27, _init_save, _dec28, _dec29, _dec30, _init_selectLine, _dec31, _dec32, _dec33, _init_selectNewLine, _dec34, _dec35, _dec36, _init_setCurrentSublistValue, _dec37, _dec38, _dec39, _init_setSublistValue, _dec40, _dec41, _init_setText, _dec42, _dec43, _init_setValue;
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
_dec12 = options("sublistId");
_dec13 = required("sublistId");
_dec14 = options("sublistId", "fieldId", "line");
_dec15 = required("sublistId", "fieldId", "line");
_dec16 = options("sublistId", "fieldId", "line");
_dec17 = required("sublistId", "fieldId", "line");
_dec18 = options("fieldId");
_dec19 = required("fieldId");
_dec20 = options("fieldId");
_dec21 = required("fieldId");
_dec22 = options("fieldId");
_dec23 = required("fieldId");
_dec24 = options("sublistId", "line", "ignoreRecalc", "lineInstanceId");
_dec25 = required("sublistId", "line");
_dec26 = addPromise();
_dec27 = options("enableSourcing", "ignoreMandatoryFields");
_dec28 = dynamicModeOnly();
_dec29 = options("sublistId", "line");
_dec30 = required("sublistId", "line");
_dec31 = dynamicModeOnly();
_dec32 = options("sublistId");
_dec33 = required("sublistId");
_dec34 = dynamicModeOnly();
_dec35 = options("sublistId", "fieldId", "value");
_dec36 = required("sublistId", "fieldId", "value");
_dec37 = standardModeOnly();
_dec38 = options("sublistId", "fieldId", "line", "value");
_dec39 = required("sublistId", "fieldId", "line", "value");
_dec40 = options("fieldId", "text", "ignoreFieldChange");
_dec41 = required("fieldId", "text");
_dec42 = options("fieldId", "value", "ignoreFieldChange");
_dec43 = required("fieldId", "value");
class Record {
  static {
    [_init_cancelLine, _init_commitLine, _init_executeMacro, _init_getCurrentSublistValue, _init_getLineCount, _init_getSublistText, _init_getSublistValue, _init_getSubrecord, _init_getText, _init_getValue, _init_removeLine, _init_save, _init_selectLine, _init_selectNewLine, _init_setCurrentSublistValue, _init_setSublistValue, _init_setText, _init_setValue, _Record, _initClass] = _applyDecs(this, [[[_dec2, _dec3, _dec4], 0, "cancelLine"], [[_dec5, _dec6, _dec7], 0, "commitLine"], [_dec8, 0, "executeMacro"], [[_dec9, _dec10, _dec11], 0, "getCurrentSublistValue"], [[_dec12, _dec13], 0, "getLineCount"], [[_dec14, _dec15], 0, "getSublistText"], [[_dec16, _dec17], 0, "getSublistValue"], [[_dec18, _dec19], 0, "getSubrecord"], [[_dec20, _dec21], 0, "getText"], [[_dec22, _dec23], 0, "getValue"], [[_dec24, _dec25], 0, "removeLine"], [[_dec26, _dec27], 0, "save"], [[_dec28, _dec29, _dec30], 0, "selectLine"], [[_dec31, _dec32, _dec33], 0, "selectNewLine"], [[_dec34, _dec35, _dec36], 0, "setCurrentSublistValue"], [[_dec37, _dec38, _dec39], 0, "setSublistValue"], [[_dec40, _dec41], 0, "setText"], [[_dec42, _dec43], 0, "setValue"]], [_dec]);
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
  getSublistText = _init_getSublistText(this, options => {
    const field = this.sublists[options.sublistId].lines[options.line][options.fieldId];
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
      return field.text || field.value;
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
    const copy = new _Record(this);
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
  static {
    _initClass();
  }
}
module.exports = _Record;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzdHJ1Y3R1cmVkQ2xvbmUiLCJyZXF1aXJlIiwicmFuZG9tVVVJRCIsIlN1aXRlU2NyaXB0TW9ja3MiLCJvcHRpb25zIiwicmVxdWlyZWQiLCJhZGRQcm9taXNlIiwiZHluYW1pY01vZGVPbmx5Iiwic3RhbmRhcmRNb2RlT25seSIsImFzc2lnbkNvbnN0cnVjdG9yIiwiaWQiLCJ0eXBlIiwiZmllbGRzIiwic3VibGlzdHMiLCJzdWJyZWNvcmRzIiwiaXNEeW5hbWljIiwidmVyc2lvbiIsImluaXRpYWxpemUiLCJPYmplY3QiLCJlbnRyaWVzIiwicmVkdWNlIiwiYWNjIiwibGluZUlkIiwibGluZXMiLCJjdXJyZW50bGluZSIsInN1YnJlY29yZElkIiwic3VicmVjb3JkIiwiUmVjb3JkIiwiY2FuY2VsTGluZSIsInNlbGVjdE5ld0xpbmUiLCJzdWJsaXN0SWQiLCJjb21taXRMaW5lIiwic3VibGlzdCIsInVuZGVmaW5lZCIsIkVycm9yIiwiZXhpc3RpbmdJbmRleCIsImZpbmRJbmRleCIsImEiLCJfaWQiLCJwdXNoIiwiZXhlY3V0ZU1hY3JvIiwiZmluZE1hdHJpeFN1Ymxpc3RMaW5lV2l0aFZhbHVlIiwiZmluZFN1Ymxpc3RMaW5lV2l0aFZhbHVlIiwiZ2V0Q3VycmVudE1hdHJpeFN1Ymxpc3RWYWx1ZSIsImdldEN1cnJlbnRTdWJsaXN0RmllbGQiLCJnZXRDdXJyZW50U3VibGlzdEluZGV4IiwiZ2V0Q3VycmVudFN1Ymxpc3RTdWJyZWNvcmQiLCJnZXRDdXJyZW50U3VibGlzdFRleHQiLCJnZXRDdXJyZW50U3VibGlzdFZhbHVlIiwiZmllbGQiLCJmaWVsZElkIiwidmFsdWUiLCJnZXRGaWVsZCIsImdldEZpZWxkcyIsImdldExpbmVDb3VudCIsImxlbmd0aCIsImdldE1hY3JvIiwiZ2V0TWFjcm9zIiwiZ2V0TWF0cml4SGVhZGVyQ291bnQiLCJnZXRNYXRyaXhIZWFkZXJGaWVsZCIsImdldE1hdHJpeEhlYWRlclZhbHVlIiwiZ2V0TWF0cml4U3VibGlzdEZpZWxkIiwiZ2V0TWF0cml4U3VibGlzdFZhbHVlIiwiZ2V0U3VibGlzdCIsImdldFN1Ymxpc3RzIiwiZ2V0U3VibGlzdEZpZWxkIiwiZ2V0U3VibGlzdEZpZWxkcyIsImdldFN1Ymxpc3RTdWJyZWNvcmQiLCJnZXRTdWJsaXN0VGV4dCIsImxpbmUiLCJ0ZXh0IiwiZ2V0U3VibGlzdFZhbHVlIiwiZ2V0U3VicmVjb3JkIiwiZ2V0VGV4dCIsImdldFZhbHVlIiwiaGFzQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQiLCJoYXNTdWJsaXN0U3VicmVjb3JkIiwiaGFzU3VicmVjb3JkIiwiaW5zZXJ0TGluZSIsIm1vdmVMaW5lIiwicmVtb3ZlQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQiLCJyZW1vdmVMaW5lIiwic3BsaWNlIiwicmVtb3ZlU3VibGlzdFN1YnJlY29yZCIsInJlbW92ZVN1YnJlY29yZCIsInNhdmUiLCJyZWNvcmRzIiwiZ2V0IiwiY29weSIsImZvckVhY2giLCJrZXkiLCJ2YWx1ZXMiLCJNYXRoIiwibWF4IiwiQXJyYXkiLCJmcm9tIiwibWFwIiwiY3JlYXRlZFJlY29yZHMiLCJzZXQiLCJzYXZlZFJlY29yZHMiLCJzZWxlY3RMaW5lIiwic2V0Q3VycmVudE1hdHJpeFN1Ymxpc3RWYWx1ZSIsInNldEN1cnJlbnRTdWJsaXN0VGV4dCIsInNldEN1cnJlbnRTdWJsaXN0VmFsdWUiLCJzZXRNYXRyaXhIZWFkZXJWYWx1ZSIsInNldE1hdHJpeFN1Ymxpc3RWYWx1ZSIsInNldFN1Ymxpc3RUZXh0Iiwic2V0U3VibGlzdFZhbHVlIiwic2V0VGV4dCIsInNldFZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2Nrcy9yZWNvcmQvUmVjb3JkLmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHN0cnVjdHVyZWRDbG9uZSA9IHJlcXVpcmUoJ2NvcmUtanMtcHVyZS9hY3R1YWwvc3RydWN0dXJlZC1jbG9uZScpO1xuY29uc3QgeyByYW5kb21VVUlEIH0gPSByZXF1aXJlKFwibm9kZTpjcnlwdG9cIilcbmNvbnN0IFN1aXRlU2NyaXB0TW9ja3MgPSByZXF1aXJlKFwiLi4vLi4vaW5kZXguY2pzXCIpXG5jb25zdCB7IG9wdGlvbnMsIHJlcXVpcmVkLCBhZGRQcm9taXNlLCBkeW5hbWljTW9kZU9ubHksIHN0YW5kYXJkTW9kZU9ubHksIGFzc2lnbkNvbnN0cnVjdG9yIH0gPSByZXF1aXJlKFwiLi4vLi4vaGVscGVycy5janNcIik7XG5cbkBhc3NpZ25Db25zdHJ1Y3RvcigpXG5jbGFzcyBSZWNvcmQge1xuICAgIGlkID0gbnVsbFxuICAgIHR5cGUgPSBudWxsXG4gICAgZmllbGRzID0ge31cbiAgICBzdWJsaXN0cyA9IHt9XG4gICAgc3VicmVjb3JkcyA9IHt9XG4gICAgaXNEeW5hbWljID0gZmFsc2VcbiAgICB2ZXJzaW9uID0gMVxuXG4gICAgaW5pdGlhbGl6ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5maWVsZHMgPSBzdHJ1Y3R1cmVkQ2xvbmUodGhpcy5maWVsZHMpXG4gICAgICAgIHRoaXMuc3VibGlzdHMgPSBPYmplY3QuZW50cmllcyhzdHJ1Y3R1cmVkQ2xvbmUodGhpcy5zdWJsaXN0cykgfHwge30pLnJlZHVjZSgoYWNjLCBbbGluZUlkLCBsaW5lc10pID0+IHtcbiAgICAgICAgICAgIGFjY1tsaW5lSWRdID0ge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRsaW5lOiB7fSxcbiAgICAgICAgICAgICAgICBsaW5lczogXCJsaW5lc1wiIGluIGxpbmVzID8gbGluZXMubGluZXMgOiBsaW5lc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgICB9LCB7fSlcbiAgICAgICAgdGhpcy5zdWJyZWNvcmRzID0gT2JqZWN0LmVudHJpZXModGhpcy5zdWJyZWNvcmRzIHx8IHt9KS5yZWR1Y2UoKGFjYywgW3N1YnJlY29yZElkLCBzdWJyZWNvcmRdKSA9PiB7XG4gICAgICAgICAgICBhY2Nbc3VicmVjb3JkSWRdID0gbmV3IFJlY29yZChzdWJyZWNvcmQpXG4gICAgICAgICAgICByZXR1cm4gYWNjXG4gICAgICAgIH0sIHt9KVxuICAgIH1cblxuICAgIEBkeW5hbWljTW9kZU9ubHkoKVxuICAgIEBvcHRpb25zKFwic3VibGlzdElkXCIpXG4gICAgQHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG4gICAgY2FuY2VsTGluZSA9IG9wdGlvbnMgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdE5ld0xpbmUob3B0aW9ucy5zdWJsaXN0SWQpXG4gICAgfVxuXG4gICAgQGR5bmFtaWNNb2RlT25seSgpXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJpZ25vcmVSZWNhbGNcIilcbiAgICBAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIilcbiAgICBjb21taXRMaW5lID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ymxpc3QgPSB0aGlzPy5zdWJsaXN0cz8uW29wdGlvbnMuc3VibGlzdElkXVxuICAgICAgICBpZihzdWJsaXN0ID09PSB1bmRlZmluZWQgfHwgIShcImN1cnJlbnRsaW5lXCIgaW4gc3VibGlzdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXhpc3RpbmdJbmRleCA9IHN1Ymxpc3QubGluZXMuZmluZEluZGV4KGEgPT4gYS5faWQgPT09IHN1Ymxpc3QuY3VycmVudGxpbmUuX2lkKVxuICAgICAgICBpZihleGlzdGluZ0luZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHN1Ymxpc3QubGluZXNbZXhpc3RpbmdJbmRleF0gPSBzdWJsaXN0LmN1cnJlbnRsaW5lXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdWJsaXN0LmxpbmVzLnB1c2goc3VibGlzdC5jdXJyZW50bGluZSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbGVjdE5ld0xpbmUob3B0aW9ucy5zdWJsaXN0SWQpXG4gICAgfVxuXG4gICAgQGFkZFByb21pc2UoKVxuICAgIGV4ZWN1dGVNYWNybyA9IG9wdGlvbnMgPT4ge31cblxuICAgIGZpbmRNYXRyaXhTdWJsaXN0TGluZVdpdGhWYWx1ZSA9IG9wdGlvbnMgPT4ge31cblxuICAgIGZpbmRTdWJsaXN0TGluZVdpdGhWYWx1ZSA9IG9wdGlvbnMgPT4ge31cblxuICAgIGdldEN1cnJlbnRNYXRyaXhTdWJsaXN0VmFsdWUgPSBvcHRpb25zID0+IHt9XG5cbiAgICBnZXRDdXJyZW50U3VibGlzdEZpZWxkID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0Q3VycmVudFN1Ymxpc3RJbmRleCA9IG9wdGlvbnMgPT4ge31cblxuICAgIGdldEN1cnJlbnRTdWJsaXN0U3VicmVjb3JkID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0Q3VycmVudFN1Ymxpc3RUZXh0ID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgQGR5bmFtaWNNb2RlT25seSgpXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIpXG4gICAgQHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiKVxuICAgIGdldEN1cnJlbnRTdWJsaXN0VmFsdWUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgY29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdXG4gICAgICAgIGlmKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgICBpZighKFwiY3VycmVudGxpbmVcIiBpbiBzdWJsaXN0KSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3ROZXdMaW5lKHN1Ymxpc3QpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmllbGQgPSBzdWJsaXN0LmN1cnJlbnRsaW5lW29wdGlvbnMuZmllbGRJZF1cbiAgICAgICAgaWYodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGQudmFsdWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRcbiAgICB9XG5cbiAgICBnZXRGaWVsZCA9IG9wdGlvbnMgPT4ge31cblxuICAgIGdldEZpZWxkcyA9IG9wdGlvbnMgPT4ge31cblxuICAgIEBvcHRpb25zKFwic3VibGlzdElkXCIpXG4gICAgQHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG4gICAgZ2V0TGluZUNvdW50ID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXVxuICAgICAgICBpZihzdWJsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJsaXN0LmxpbmVzLmxlbmd0aFxuICAgIH1cblxuICAgIGdldE1hY3JvID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0TWFjcm9zID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0TWF0cml4SGVhZGVyQ291bnQgPSBvcHRpb25zID0+IHt9XG5cbiAgICBnZXRNYXRyaXhIZWFkZXJGaWVsZCA9IG9wdGlvbnMgPT4ge31cblxuICAgIGdldE1hdHJpeEhlYWRlclZhbHVlID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0TWF0cml4U3VibGlzdEZpZWxkID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0TWF0cml4U3VibGlzdFZhbHVlID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0U3VibGlzdCA9IG9wdGlvbnMgPT4ge31cblxuICAgIGdldFN1Ymxpc3RzID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0U3VibGlzdEZpZWxkID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgZ2V0U3VibGlzdEZpZWxkcyA9IG9wdGlvbnMgPT4ge31cblxuICAgIGdldFN1Ymxpc3RTdWJyZWNvcmQgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG4gICAgQHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIilcbiAgICBnZXRTdWJsaXN0VGV4dCA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdLmxpbmVzW29wdGlvbnMubGluZV1bb3B0aW9ucy5maWVsZElkXVxuICAgICAgICBpZih0eXBlb2YgZmllbGQgPT09IFwib2JqZWN0XCIgJiYgZmllbGQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzRHluYW1pYyAmJiAhKFwidGV4dFwiIGluIGZpZWxkKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCB1c2UgZ2V0U3VibGlzdFRleHQgb24gZmllbGQgdGhhdCBoYXMgaGFkIHZhbHVlIGJ1dCBub3QgdGV4dCBzZXQgaW4gc3RhbmRhcmQgbW9kZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZpZWxkLnRleHQgfHwgZmllbGQudmFsdWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRcbiAgICB9XG5cbiAgICBAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG4gICAgQHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIilcbiAgICBnZXRTdWJsaXN0VmFsdWUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXS5saW5lc1tvcHRpb25zLmxpbmVdW29wdGlvbnMuZmllbGRJZF1cbiAgICAgICAgaWYodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGQudmFsdWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRcbiAgICB9XG5cbiAgICBAb3B0aW9ucyhcImZpZWxkSWRcIilcbiAgICBAcmVxdWlyZWQoXCJmaWVsZElkXCIpXG4gICAgZ2V0U3VicmVjb3JkID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGlmKCEob3B0aW9ucy5maWVsZElkIGluIHRoaXMuc3VicmVjb3JkcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlN1YnJlY29yZCBkb2VzIG5vdCBleGlzdC5cIilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdWJyZWNvcmRzW29wdGlvbnMuZmllbGRJZF1cbiAgICB9XG5cbiAgICBAb3B0aW9ucyhcImZpZWxkSWRcIilcbiAgICBAcmVxdWlyZWQoXCJmaWVsZElkXCIpXG4gICAgZ2V0VGV4dCA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW29wdGlvbnMuZmllbGRJZF1cbiAgICAgICAgaWYodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZighdGhpcy5pc0R5bmFtaWMgJiYgIShcInRleHRcIiBpbiBmaWVsZCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgdXNlIGdldFRleHQgb24gZmllbGQgdGhhdCBoYXMgaGFkIHZhbHVlIGJ1dCBub3QgdGV4dCBzZXQgaW4gc3RhbmRhcmQgbW9kZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZpZWxkLnRleHQgfHwgZmllbGQudmFsdWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRcbiAgICB9XG5cbiAgICBAb3B0aW9ucyhcImZpZWxkSWRcIilcbiAgICBAcmVxdWlyZWQoXCJmaWVsZElkXCIpXG4gICAgZ2V0VmFsdWUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1tvcHRpb25zLmZpZWxkSWRdXG4gICAgICAgIGlmKHR5cGVvZiBmaWVsZCA9PT0gXCJvYmplY3RcIiAmJiBmaWVsZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpZWxkLnZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkXG4gICAgfVxuXG4gICAgaGFzQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQgPSBvcHRpb25zID0+IHt9XG5cbiAgICBoYXNTdWJsaXN0U3VicmVjb3JkID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgaGFzU3VicmVjb3JkID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgaW5zZXJ0TGluZSA9IG9wdGlvbnMgPT4ge31cblxuICAgIG1vdmVMaW5lID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgcmVtb3ZlQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImxpbmVcIiwgXCJpZ25vcmVSZWNhbGNcIiwgXCJsaW5lSW5zdGFuY2VJZFwiKVxuICAgIEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImxpbmVcIilcbiAgICByZW1vdmVMaW5lID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXVxuICAgICAgICBpZihzdWJsaXN0ID09PSB1bmRlZmluZWQgfHwgIShvcHRpb25zLmxpbmUgaW4gc3VibGlzdC5saW5lcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgc3VibGlzdC5saW5lcy5zcGxpY2Uob3B0aW9ucy5saW5lLCAxKVxuICAgIH1cblxuICAgIHJlbW92ZVN1Ymxpc3RTdWJyZWNvcmQgPSBvcHRpb25zID0+IHt9XG5cbiAgICByZW1vdmVTdWJyZWNvcmQgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAYWRkUHJvbWlzZSgpXG4gICAgQG9wdGlvbnMoXCJlbmFibGVTb3VyY2luZ1wiLCBcImlnbm9yZU1hbmRhdG9yeUZpZWxkc1wiKVxuICAgIHNhdmUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgaWYodGhpcy5pZCAmJiBTdWl0ZVNjcmlwdE1vY2tzLnJlY29yZHMuZ2V0KHRoaXMpLnZlcnNpb24gIT09IHRoaXMudmVyc2lvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVjb3JkIGhhcyBjaGFuZ2VkXCIpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52ZXJzaW9uKytcbiAgICAgICAgY29uc3QgY29weSA9IG5ldyBSZWNvcmQodGhpcylcbiAgICAgICAgLy8gY2hhbmdlIGZpZWxkcyB0aGF0IG9ubHkgaGF2ZSB2YWx1ZSB0byBub3QgYmUgYW4gb2JqZWN0IHNvIGdldFRleHQgd29ya3NcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoY29weS5maWVsZHMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmICEoXCJ0ZXh0XCIgaW4gdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY29weS5maWVsZHNba2V5XSA9IHZhbHVlLnZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIE9iamVjdC52YWx1ZXMoY29weS5zdWJsaXN0cykuZm9yRWFjaChzdWJsaXN0ID0+IHtcbiAgICAgICAgICAgIHN1Ymxpc3QubGluZXMuZm9yRWFjaChsaW5lID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhsaW5lKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmICEoXCJ0ZXh0XCIgaW4gdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lW2tleV0gPSB2YWx1ZS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGlmKCF0aGlzLmlkKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gY29weS5pZCA9IE1hdGgubWF4KEFycmF5LmZyb20oU3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLnZhbHVlcykubWFwKGEgPT4gYS5pZCkpICsgMVxuICAgICAgICAgICAgU3VpdGVTY3JpcHRNb2Nrcy5jcmVhdGVkUmVjb3Jkcy5wdXNoKGNvcHkpXG4gICAgICAgIH1cbiAgICAgICAgU3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLnNldChjb3B5KVxuICAgICAgICBTdWl0ZVNjcmlwdE1vY2tzLnNhdmVkUmVjb3Jkcy5wdXNoKGNvcHkpXG4gICAgICAgIHJldHVybiB0aGlzLmlkXG4gICAgfVxuXG4gICAgLy8gVE9ETzogZWRnZSBjYXNlIHdoZXJlIGlmIGZpcnN0IGxpbmUgc2VsZWN0IHlvdSBkbyBpcyBuICsgMSBpdCB3aWxsIGdpdmUgYSBuZXcgbGluZVxuICAgIEBkeW5hbWljTW9kZU9ubHkoKVxuICAgIEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwibGluZVwiKVxuICAgIEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImxpbmVcIilcbiAgICBzZWxlY3RMaW5lID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXVxuICAgICAgICBpZihzdWJsaXN0ID09PSB1bmRlZmluZWQgfHwgIShvcHRpb25zLmxpbmUgaW4gc3VibGlzdC5saW5lcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInN1Ymxpc3Qgb3IgbGluZSBkb2VzIG5vdCBleGlzdFwiKVxuICAgICAgICB9XG4gICAgICAgIHN1Ymxpc3QuY3VycmVudGxpbmUgPSB7Li4uc3VibGlzdC5saW5lc1tvcHRpb25zLmxpbmVdfVxuICAgIH1cblxuICAgIEBkeW5hbWljTW9kZU9ubHkoKVxuICAgIEBvcHRpb25zKFwic3VibGlzdElkXCIpXG4gICAgQHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG4gICAgc2VsZWN0TmV3TGluZSA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBjb25zdCBzdWJsaXN0ID0gdGhpcy5zdWJsaXN0c1tvcHRpb25zLnN1Ymxpc3RJZF1cbiAgICAgICAgaWYoc3VibGlzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzdWJsaXN0IGRvZXMgbm90IGV4aXN0XCIpXG4gICAgICAgIH1cbiAgICAgICAgc3VibGlzdC5jdXJyZW50bGluZSA9IHtcbiAgICAgICAgICAgIF9pZDogcmFuZG9tVVVJRCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDdXJyZW50TWF0cml4U3VibGlzdFZhbHVlID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgc2V0Q3VycmVudFN1Ymxpc3RUZXh0ID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgQGR5bmFtaWNNb2RlT25seSgpXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwidmFsdWVcIilcbiAgICBAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwidmFsdWVcIilcbiAgICBzZXRDdXJyZW50U3VibGlzdFZhbHVlID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IHN1Ymxpc3QgPSB0aGlzPy5zdWJsaXN0cz8uW29wdGlvbnMuc3VibGlzdElkXVxuICAgICAgICBpZihzdWJsaXN0ID09PSB1bmRlZmluZWQgfHwgIShcImN1cnJlbnRsaW5lXCIgaW4gc3VibGlzdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1Ymxpc3QuY3VycmVudGxpbmVbb3B0aW9ucy5maWVsZElkXSA9IHt2YWx1ZTogb3B0aW9ucy52YWx1ZX1cbiAgICB9XG5cbiAgICBzZXRNYXRyaXhIZWFkZXJWYWx1ZSA9IG9wdGlvbnMgPT4ge31cblxuICAgIHNldE1hdHJpeFN1Ymxpc3RWYWx1ZSA9IG9wdGlvbnMgPT4ge31cblxuICAgIHNldFN1Ymxpc3RUZXh0ID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgQHN0YW5kYXJkTW9kZU9ubHkoKVxuICAgIEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIiwgXCJ2YWx1ZVwiKVxuICAgIEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIsIFwidmFsdWVcIilcbiAgICBzZXRTdWJsaXN0VmFsdWUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgY29uc3Qgc3VibGlzdCA9IHRoaXM/LnN1Ymxpc3RzPy5bb3B0aW9ucy5zdWJsaXN0SWRdXG4gICAgICAgIGlmKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCB8fCAhKG9wdGlvbnMubGluZSBpbiBzdWJsaXN0LmxpbmVzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3VibGlzdCBvciBsaW5lIGRvZXNuJ3QgZXhpc3RcIilcbiAgICAgICAgfVxuICAgICAgICBzdWJsaXN0LmxpbmVzW29wdGlvbnMubGluZV1bb3B0aW9ucy5maWVsZElkXSA9IHt2YWx1ZTogb3B0aW9ucy52YWx1ZX1cbiAgICB9XG5cbiAgICBAb3B0aW9ucyhcImZpZWxkSWRcIiwgXCJ0ZXh0XCIsIFwiaWdub3JlRmllbGRDaGFuZ2VcIilcbiAgICBAcmVxdWlyZWQoXCJmaWVsZElkXCIsIFwidGV4dFwiKVxuICAgIHNldFRleHQgPSBvcHRpb25zID0+IHtcbiAgICAgICAgdGhpcy5maWVsZHNbb3B0aW9ucy5maWVsZElkXSA9IHt2YWx1ZTogb3B0aW9ucy50ZXh0LCB0ZXh0OiBvcHRpb25zLnRleHR9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgQG9wdGlvbnMoXCJmaWVsZElkXCIsIFwidmFsdWVcIiwgXCJpZ25vcmVGaWVsZENoYW5nZVwiKVxuICAgIEByZXF1aXJlZChcImZpZWxkSWRcIiwgXCJ2YWx1ZVwiKVxuICAgIHNldFZhbHVlID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIHRoaXMuZmllbGRzW29wdGlvbnMuZmllbGRJZF0gPSB7dmFsdWU6IG9wdGlvbnMudmFsdWV9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY29yZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxNQUFNQSxlQUFlLEdBQUdDLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQztBQUN2RSxNQUFNO0VBQUVDO0FBQVcsQ0FBQyxHQUFHRCxPQUFPLENBQUMsYUFBYSxDQUFDO0FBQzdDLE1BQU1FLGdCQUFnQixHQUFHRixPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDbkQsTUFBTTtFQUFFRyxPQUFPO0VBQUVDLFFBQVE7RUFBRUMsVUFBVTtFQUFFQyxlQUFlO0VBQUVDLGdCQUFnQjtFQUFFQztBQUFrQixDQUFDLEdBQUdSLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUFDO0FBQUEsT0FFNUhRLGlCQUFpQixFQUFFO0FBQUEsUUF5QmZGLGVBQWUsRUFBRTtBQUFBLFFBQ2pCSCxPQUFPLENBQUMsV0FBVyxDQUFDO0FBQUEsUUFDcEJDLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFBQSxRQUtyQkUsZUFBZSxFQUFFO0FBQUEsUUFDakJILE9BQU8sQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDO0FBQUEsUUFDcENDLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFBQSxRQWdCckJDLFVBQVUsRUFBRTtBQUFBLFFBaUJaQyxlQUFlLEVBQUU7QUFBQSxTQUNqQkgsT0FBTyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7QUFBQSxTQUMvQkMsUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7QUFBQSxTQW9CaENELE9BQU8sQ0FBQyxXQUFXLENBQUM7QUFBQSxTQUNwQkMsUUFBUSxDQUFDLFdBQVcsQ0FBQztBQUFBLFNBaUNyQkQsT0FBTyxDQUFDLFdBQVcsRUFB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