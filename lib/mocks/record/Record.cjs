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
      return null;
    }
    if (!("currentline" in sublist)) {
      this.selectNewLine(sublist);
    }
    const field = sublist.currentline[options.fieldId];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzdHJ1Y3R1cmVkQ2xvbmUiLCJyZXF1aXJlIiwicmFuZG9tVVVJRCIsIlN1aXRlU2NyaXB0TW9ja3MiLCJvcHRpb25zIiwicmVxdWlyZWQiLCJhZGRQcm9taXNlIiwiZHluYW1pY01vZGVPbmx5Iiwic3RhbmRhcmRNb2RlT25seSIsImFzc2lnbkNvbnN0cnVjdG9yIiwiaWQiLCJ0eXBlIiwiZmllbGRzIiwic3VibGlzdHMiLCJzdWJyZWNvcmRzIiwiaXNEeW5hbWljIiwidmVyc2lvbiIsImluaXRpYWxpemUiLCJPYmplY3QiLCJlbnRyaWVzIiwicmVkdWNlIiwiYWNjIiwibGluZUlkIiwibGluZXMiLCJjdXJyZW50bGluZSIsInN1YnJlY29yZElkIiwic3VicmVjb3JkIiwiUmVjb3JkIiwiY2FuY2VsTGluZSIsInNlbGVjdE5ld0xpbmUiLCJzdWJsaXN0SWQiLCJjb21taXRMaW5lIiwic3VibGlzdCIsInVuZGVmaW5lZCIsIkVycm9yIiwiZXhpc3RpbmdJbmRleCIsImZpbmRJbmRleCIsImEiLCJfaWQiLCJwdXNoIiwiZXhlY3V0ZU1hY3JvIiwiZmluZE1hdHJpeFN1Ymxpc3RMaW5lV2l0aFZhbHVlIiwiZmluZFN1Ymxpc3RMaW5lV2l0aFZhbHVlIiwiZ2V0Q3VycmVudE1hdHJpeFN1Ymxpc3RWYWx1ZSIsImdldEN1cnJlbnRTdWJsaXN0RmllbGQiLCJnZXRDdXJyZW50U3VibGlzdEluZGV4IiwiZ2V0Q3VycmVudFN1Ymxpc3RTdWJyZWNvcmQiLCJnZXRDdXJyZW50U3VibGlzdFRleHQiLCJmaWVsZCIsImZpZWxkSWQiLCJ0ZXh0IiwidmFsdWUiLCJnZXRDdXJyZW50U3VibGlzdFZhbHVlIiwiZ2V0RmllbGQiLCJnZXRGaWVsZHMiLCJnZXRMaW5lQ291bnQiLCJsZW5ndGgiLCJnZXRNYWNybyIsImdldE1hY3JvcyIsImdldE1hdHJpeEhlYWRlckNvdW50IiwiZ2V0TWF0cml4SGVhZGVyRmllbGQiLCJnZXRNYXRyaXhIZWFkZXJWYWx1ZSIsImdldE1hdHJpeFN1Ymxpc3RGaWVsZCIsImdldE1hdHJpeFN1Ymxpc3RWYWx1ZSIsImdldFN1Ymxpc3QiLCJnZXRTdWJsaXN0cyIsImdldFN1Ymxpc3RGaWVsZCIsImdldFN1Ymxpc3RGaWVsZHMiLCJnZXRTdWJsaXN0U3VicmVjb3JkIiwiZ2V0U3VibGlzdFRleHQiLCJsaW5lIiwiZ2V0U3VibGlzdFZhbHVlIiwiZ2V0U3VicmVjb3JkIiwiZ2V0VGV4dCIsImdldFZhbHVlIiwiaGFzQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQiLCJoYXNTdWJsaXN0U3VicmVjb3JkIiwiaGFzU3VicmVjb3JkIiwiaW5zZXJ0TGluZSIsIm1vdmVMaW5lIiwicmVtb3ZlQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQiLCJyZW1vdmVMaW5lIiwic3BsaWNlIiwicmVtb3ZlU3VibGlzdFN1YnJlY29yZCIsInJlbW92ZVN1YnJlY29yZCIsInNhdmUiLCJyZWNvcmRzIiwiZ2V0IiwiY29weSIsImZvckVhY2giLCJrZXkiLCJ2YWx1ZXMiLCJNYXRoIiwibWF4IiwiQXJyYXkiLCJmcm9tIiwibWFwIiwiY3JlYXRlZFJlY29yZHMiLCJzZXQiLCJzYXZlZFJlY29yZHMiLCJzZWxlY3RMaW5lIiwic2V0Q3VycmVudE1hdHJpeFN1Ymxpc3RWYWx1ZSIsInNldEN1cnJlbnRTdWJsaXN0VGV4dCIsInNldEN1cnJlbnRTdWJsaXN0VmFsdWUiLCJzZXRNYXRyaXhIZWFkZXJWYWx1ZSIsInNldE1hdHJpeFN1Ymxpc3RWYWx1ZSIsInNldFN1Ymxpc3RUZXh0Iiwic2V0U3VibGlzdFZhbHVlIiwic2V0VGV4dCIsInNldFZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2Nrcy9yZWNvcmQvUmVjb3JkLmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzdHJ1Y3R1cmVkQ2xvbmUgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL2FjdHVhbC9zdHJ1Y3R1cmVkLWNsb25lXCIpO1xuY29uc3QgeyByYW5kb21VVUlEIH0gPSByZXF1aXJlKFwibm9kZTpjcnlwdG9cIik7XG5jb25zdCBTdWl0ZVNjcmlwdE1vY2tzID0gcmVxdWlyZShcIi4uLy4uL2luZGV4LmNqc1wiKTtcbmNvbnN0IHtcblx0b3B0aW9ucyxcblx0cmVxdWlyZWQsXG5cdGFkZFByb21pc2UsXG5cdGR5bmFtaWNNb2RlT25seSxcblx0c3RhbmRhcmRNb2RlT25seSxcblx0YXNzaWduQ29uc3RydWN0b3IsXG59ID0gcmVxdWlyZShcIi4uLy4uL2hlbHBlcnMuY2pzXCIpO1xuXG5AYXNzaWduQ29uc3RydWN0b3IoKVxuY2xhc3MgUmVjb3JkIHtcblx0aWQgPSBudWxsO1xuXHR0eXBlID0gbnVsbDtcblx0ZmllbGRzID0ge307XG5cdHN1Ymxpc3RzID0ge307XG5cdHN1YnJlY29yZHMgPSB7fTtcblx0aXNEeW5hbWljID0gZmFsc2U7XG5cdHZlcnNpb24gPSAxO1xuXG5cdGluaXRpYWxpemUgPSAoKSA9PiB7XG5cdFx0dGhpcy5maWVsZHMgPSBzdHJ1Y3R1cmVkQ2xvbmUodGhpcy5maWVsZHMpO1xuXHRcdHRoaXMuc3VibGlzdHMgPSBPYmplY3QuZW50cmllcyhzdHJ1Y3R1cmVkQ2xvbmUodGhpcy5zdWJsaXN0cykgfHwge30pLnJlZHVjZSgoYWNjLCBbbGluZUlkLCBsaW5lc10pID0+IHtcblx0XHRcdGFjY1tsaW5lSWRdID0ge1xuXHRcdFx0XHRjdXJyZW50bGluZToge30sXG5cdFx0XHRcdGxpbmVzOiBcImxpbmVzXCIgaW4gbGluZXMgPyBsaW5lcy5saW5lcyA6IGxpbmVzLFxuXHRcdFx0fTtcblx0XHRcdHJldHVybiBhY2M7XG5cdFx0fSwge30pO1xuXHRcdHRoaXMuc3VicmVjb3JkcyA9IE9iamVjdC5lbnRyaWVzKHRoaXMuc3VicmVjb3JkcyB8fCB7fSkucmVkdWNlKChhY2MsIFtzdWJyZWNvcmRJZCwgc3VicmVjb3JkXSkgPT4ge1xuXHRcdFx0YWNjW3N1YnJlY29yZElkXSA9IG5ldyBSZWNvcmQoc3VicmVjb3JkKTtcblx0XHRcdHJldHVybiBhY2M7XG5cdFx0fSwge30pO1xuXHR9O1xuXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIilcblx0Y2FuY2VsTGluZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0dGhpcy5zZWxlY3ROZXdMaW5lKG9wdGlvbnMuc3VibGlzdElkKTtcblx0fTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJpZ25vcmVSZWNhbGNcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG5cdGNvbW1pdExpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzPy5zdWJsaXN0cz8uW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkIHx8ICEoXCJjdXJyZW50bGluZVwiIGluIHN1Ymxpc3QpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcblx0XHR9XG5cdFx0Y29uc3QgZXhpc3RpbmdJbmRleCA9IHN1Ymxpc3QubGluZXMuZmluZEluZGV4KChhKSA9PiBhLl9pZCA9PT0gc3VibGlzdC5jdXJyZW50bGluZS5faWQpO1xuXHRcdGlmIChleGlzdGluZ0luZGV4ID4gLTEpIHtcblx0XHRcdHN1Ymxpc3QubGluZXNbZXhpc3RpbmdJbmRleF0gPSBzdWJsaXN0LmN1cnJlbnRsaW5lO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdWJsaXN0LmxpbmVzLnB1c2goc3VibGlzdC5jdXJyZW50bGluZSk7XG5cdFx0fVxuXHRcdHRoaXMuc2VsZWN0TmV3TGluZShvcHRpb25zLnN1Ymxpc3RJZCk7XG5cdH07XG5cblx0QGFkZFByb21pc2UoKVxuXHRleGVjdXRlTWFjcm8gPSAob3B0aW9ucykgPT4ge307XG5cblx0ZmluZE1hdHJpeFN1Ymxpc3RMaW5lV2l0aFZhbHVlID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGZpbmRTdWJsaXN0TGluZVdpdGhWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRDdXJyZW50TWF0cml4U3VibGlzdFZhbHVlID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldEN1cnJlbnRTdWJsaXN0RmllbGQgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0Q3VycmVudFN1Ymxpc3RJbmRleCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRDdXJyZW50U3VibGlzdFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIilcblx0Z2V0Q3VycmVudFN1Ymxpc3RUZXh0ID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBzdWJsaXN0ID0gdGhpcy5zdWJsaXN0c1tvcHRpb25zLnN1Ymxpc3RJZF07XG5cdFx0aWYgKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGlmICghKFwiY3VycmVudGxpbmVcIiBpbiBzdWJsaXN0KSkge1xuXHRcdFx0dGhpcy5zZWxlY3ROZXdMaW5lKHN1Ymxpc3QpO1xuXHRcdH1cblx0XHRjb25zdCBmaWVsZCA9IHN1Ymxpc3QuY3VycmVudGxpbmVbb3B0aW9ucy5maWVsZElkXTtcblx0XHRpZiAodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gZmllbGQudGV4dCB8fCBmaWVsZC52YWx1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZpZWxkO1xuXHR9O1xuXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiKVxuXHRnZXRDdXJyZW50U3VibGlzdFZhbHVlID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBzdWJsaXN0ID0gdGhpcy5zdWJsaXN0c1tvcHRpb25zLnN1Ymxpc3RJZF07XG5cdFx0aWYgKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGlmICghKFwiY3VycmVudGxpbmVcIiBpbiBzdWJsaXN0KSkge1xuXHRcdFx0dGhpcy5zZWxlY3ROZXdMaW5lKHN1Ymxpc3QpO1xuXHRcdH1cblx0XHRjb25zdCBmaWVsZCA9IHN1Ymxpc3QuY3VycmVudGxpbmVbb3B0aW9ucy5maWVsZElkXTtcblx0XHRpZiAodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gZmllbGQudmFsdWU7XG5cdFx0fVxuXHRcdHJldHVybiBmaWVsZDtcblx0fTtcblxuXHRnZXRGaWVsZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRGaWVsZHMgPSAob3B0aW9ucykgPT4ge307XG5cblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG5cdGdldExpbmVDb3VudCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdO1xuXHRcdGlmIChzdWJsaXN0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiAtMTtcblx0XHR9XG5cdFx0cmV0dXJuIHN1Ymxpc3QubGluZXMubGVuZ3RoO1xuXHR9O1xuXG5cdGdldE1hY3JvID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldE1hY3JvcyA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRNYXRyaXhIZWFkZXJDb3VudCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRNYXRyaXhIZWFkZXJGaWVsZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRNYXRyaXhIZWFkZXJWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRNYXRyaXhTdWJsaXN0RmllbGQgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0TWF0cml4U3VibGlzdFZhbHVlID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldFN1Ymxpc3QgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0U3VibGlzdHMgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0U3VibGlzdEZpZWxkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldFN1Ymxpc3RGaWVsZHMgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0U3VibGlzdFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG5cdGdldFN1Ymxpc3RUZXh0ID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBmaWVsZCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdLmxpbmVzW29wdGlvbnMubGluZV1bb3B0aW9ucy5maWVsZElkXTtcblx0XHRpZiAodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsKSB7XG5cdFx0XHRpZiAoIXRoaXMuaXNEeW5hbWljICYmICEoXCJ0ZXh0XCIgaW4gZmllbGQpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcIkNhbm5vdCB1c2UgZ2V0U3VibGlzdFRleHQgb24gZmllbGQgdGhhdCBoYXMgaGFkIHZhbHVlIGJ1dCBub3QgdGV4dCBzZXQgaW4gc3RhbmRhcmQgbW9kZVwiXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmllbGQudGV4dCB8fCBmaWVsZC52YWx1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZpZWxkO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIilcblx0Z2V0U3VibGlzdFZhbHVlID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBmaWVsZCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdLmxpbmVzW29wdGlvbnMubGluZV1bb3B0aW9ucy5maWVsZElkXTtcblx0XHRpZiAodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gZmllbGQudmFsdWU7XG5cdFx0fVxuXHRcdHJldHVybiBmaWVsZDtcblx0fTtcblxuXHRAb3B0aW9ucyhcImZpZWxkSWRcIilcblx0QHJlcXVpcmVkKFwiZmllbGRJZFwiKVxuXHRnZXRTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge1xuXHRcdGlmICghKG9wdGlvbnMuZmllbGRJZCBpbiB0aGlzLnN1YnJlY29yZHMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJTdWJyZWNvcmQgZG9lcyBub3QgZXhpc3QuXCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5zdWJyZWNvcmRzW29wdGlvbnMuZmllbGRJZF07XG5cdH07XG5cblx0QG9wdGlvbnMoXCJmaWVsZElkXCIpXG5cdEByZXF1aXJlZChcImZpZWxkSWRcIilcblx0Z2V0VGV4dCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1tvcHRpb25zLmZpZWxkSWRdO1xuXHRcdGlmICh0eXBlb2YgZmllbGQgPT09IFwib2JqZWN0XCIgJiYgZmllbGQgIT09IG51bGwpIHtcblx0XHRcdGlmICghdGhpcy5pc0R5bmFtaWMgJiYgIShcInRleHRcIiBpbiBmaWVsZCkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHVzZSBnZXRUZXh0IG9uIGZpZWxkIHRoYXQgaGFzIGhhZCB2YWx1ZSBidXQgbm90IHRleHQgc2V0IGluIHN0YW5kYXJkIG1vZGVcIik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmllbGQudGV4dCB8fCBmaWVsZC52YWx1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZpZWxkO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiZmllbGRJZFwiKVxuXHRAcmVxdWlyZWQoXCJmaWVsZElkXCIpXG5cdGdldFZhbHVlID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW29wdGlvbnMuZmllbGRJZF07XG5cdFx0aWYgKHR5cGVvZiBmaWVsZCA9PT0gXCJvYmplY3RcIiAmJiBmaWVsZCAhPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGZpZWxkLnZhbHVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGQ7XG5cdH07XG5cblx0aGFzQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge307XG5cblx0aGFzU3VibGlzdFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRoYXNTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge307XG5cblx0aW5zZXJ0TGluZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRtb3ZlTGluZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRyZW1vdmVDdXJyZW50U3VibGlzdFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImxpbmVcIiwgXCJpZ25vcmVSZWNhbGNcIiwgXCJsaW5lSW5zdGFuY2VJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJsaW5lXCIpXG5cdHJlbW92ZUxpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkIHx8ICEob3B0aW9ucy5saW5lIGluIHN1Ymxpc3QubGluZXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcblx0XHR9XG5cdFx0c3VibGlzdC5saW5lcy5zcGxpY2Uob3B0aW9ucy5saW5lLCAxKTtcblx0fTtcblxuXHRyZW1vdmVTdWJsaXN0U3VicmVjb3JkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdHJlbW92ZVN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwiZW5hYmxlU291cmNpbmdcIiwgXCJpZ25vcmVNYW5kYXRvcnlGaWVsZHNcIilcblx0c2F2ZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKHRoaXMuaWQgJiYgU3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLmdldCh0aGlzKS52ZXJzaW9uICE9PSB0aGlzLnZlcnNpb24pIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlJlY29yZCBoYXMgY2hhbmdlZFwiKTtcblx0XHR9XG5cdFx0dGhpcy52ZXJzaW9uKys7XG5cdFx0Y29uc3QgY29weSA9IG5ldyBSZWNvcmQodGhpcyk7XG5cdFx0Ly8gY2hhbmdlIGZpZWxkcyB0aGF0IG9ubHkgaGF2ZSB2YWx1ZSB0byBub3QgYmUgYW4gb2JqZWN0IHNvIGdldFRleHQgd29ya3Ncblx0XHRPYmplY3QuZW50cmllcyhjb3B5LmZpZWxkcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmICEoXCJ0ZXh0XCIgaW4gdmFsdWUpKSB7XG5cdFx0XHRcdGNvcHkuZmllbGRzW2tleV0gPSB2YWx1ZS52YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QudmFsdWVzKGNvcHkuc3VibGlzdHMpLmZvckVhY2goKHN1Ymxpc3QpID0+IHtcblx0XHRcdHN1Ymxpc3QubGluZXMuZm9yRWFjaCgobGluZSkgPT4ge1xuXHRcdFx0XHRPYmplY3QuZW50cmllcyhsaW5lKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmICEoXCJ0ZXh0XCIgaW4gdmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRsaW5lW2tleV0gPSB2YWx1ZS52YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0aWYgKCF0aGlzLmlkKSB7XG5cdFx0XHR0aGlzLmlkID0gY29weS5pZCA9IE1hdGgubWF4KEFycmF5LmZyb20oU3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLnZhbHVlcygpKS5tYXAoKGEpID0+IGEuaWQpKSArIDE7XG5cdFx0XHRTdWl0ZVNjcmlwdE1vY2tzLmNyZWF0ZWRSZWNvcmRzLnB1c2goY29weSk7XG5cdFx0fVxuXHRcdFN1aXRlU2NyaXB0TW9ja3MucmVjb3Jkcy5zZXQoY29weSk7XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5zYXZlZFJlY29yZHMucHVzaChjb3B5KTtcblx0XHRyZXR1cm4gdGhpcy5pZDtcblx0fTtcblxuXHQvLyBUT0RPOiBlZGdlIGNhc2Ugd2hlcmUgaWYgZmlyc3QgbGluZSBzZWxlY3QgeW91IGRvIGlzIG4gKyAxIGl0IHdpbGwgZ2l2ZSBhIG5ldyBsaW5lXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImxpbmVcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwibGluZVwiKVxuXHRzZWxlY3RMaW5lID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBzdWJsaXN0ID0gdGhpcy5zdWJsaXN0c1tvcHRpb25zLnN1Ymxpc3RJZF07XG5cdFx0aWYgKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCB8fCAhKG9wdGlvbnMubGluZSBpbiBzdWJsaXN0LmxpbmVzKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwic3VibGlzdCBvciBsaW5lIGRvZXMgbm90IGV4aXN0XCIpO1xuXHRcdH1cblx0XHRzdWJsaXN0LmN1cnJlbnRsaW5lID0geyAuLi5zdWJsaXN0LmxpbmVzW29wdGlvbnMubGluZV0gfTtcblx0fTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG5cdHNlbGVjdE5ld0xpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzdWJsaXN0IGRvZXMgbm90IGV4aXN0XCIpO1xuXHRcdH1cblx0XHRzdWJsaXN0LmN1cnJlbnRsaW5lID0ge1xuXHRcdFx0X2lkOiByYW5kb21VVUlEKCksXG5cdFx0fTtcblx0fTtcblxuXHRzZXRDdXJyZW50TWF0cml4U3VibGlzdFZhbHVlID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJ0ZXh0XCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJ0ZXh0XCIpXG5cdHNldEN1cnJlbnRTdWJsaXN0VGV4dCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXM/LnN1Ymxpc3RzPy5bb3B0aW9ucy5zdWJsaXN0SWRdO1xuXHRcdGlmIChzdWJsaXN0ID09PSB1bmRlZmluZWQgfHwgIShcImN1cnJlbnRsaW5lXCIgaW4gc3VibGlzdCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInN1Ymxpc3QgZG9lc24ndCBleGlzdCBvciBsaW5lIGlzIG5vdCBzZWxlY3RlZFwiKTtcblx0XHR9XG5cdFx0cmV0dXJuIChzdWJsaXN0LmN1cnJlbnRsaW5lW29wdGlvbnMuZmllbGRJZF0gPSB7IHZhbHVlOiBvcHRpb25zLnRleHQsIHRleHQ6IG9wdGlvbnMudGV4dCB9KTtcblx0fTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwidmFsdWVcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcInZhbHVlXCIpXG5cdHNldEN1cnJlbnRTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzPy5zdWJsaXN0cz8uW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkIHx8ICEoXCJjdXJyZW50bGluZVwiIGluIHN1Ymxpc3QpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzdWJsaXN0IGRvZXNuJ3QgZXhpc3Qgb3IgbGluZSBpcyBub3Qgc2VsZWN0ZWRcIik7XG5cdFx0fVxuXHRcdHJldHVybiAoc3VibGlzdC5jdXJyZW50bGluZVtvcHRpb25zLmZpZWxkSWRdID0geyB2YWx1ZTogb3B0aW9ucy52YWx1ZSB9KTtcblx0fTtcblxuXHRzZXRNYXRyaXhIZWFkZXJWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRzZXRNYXRyaXhTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge307XG5cblx0QHN0YW5kYXJkTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIsIFwidGV4dFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwibGluZVwiLCBcInRleHRcIilcblx0c2V0U3VibGlzdFRleHQgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzPy5zdWJsaXN0cz8uW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkIHx8ICEob3B0aW9ucy5saW5lIGluIHN1Ymxpc3QubGluZXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzdWJsaXN0IG9yIGxpbmUgZG9lc24ndCBleGlzdFwiKTtcblx0XHR9XG5cdFx0c3VibGlzdC5saW5lc1tvcHRpb25zLmxpbmVdW29wdGlvbnMuZmllbGRJZF0gPSB7IHZhbHVlOiBvcHRpb25zLnRleHQsIHRleHQ6IG9wdGlvbnMudGV4dCB9O1xuXHR9O1xuXG5cdEBzdGFuZGFyZE1vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwibGluZVwiLCBcInZhbHVlXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIsIFwidmFsdWVcIilcblx0c2V0U3VibGlzdFZhbHVlID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBzdWJsaXN0ID0gdGhpcz8uc3VibGlzdHM/LltvcHRpb25zLnN1Ymxpc3RJZF07XG5cdFx0aWYgKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCB8fCAhKG9wdGlvbnMubGluZSBpbiBzdWJsaXN0LmxpbmVzKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwic3VibGlzdCBvciBsaW5lIGRvZXNuJ3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdHN1Ymxpc3QubGluZXNbb3B0aW9ucy5saW5lXVtvcHRpb25zLmZpZWxkSWRdID0geyB2YWx1ZTogb3B0aW9ucy52YWx1ZSB9O1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiZmllbGRJZFwiLCBcInRleHRcIiwgXCJpZ25vcmVGaWVsZENoYW5nZVwiKVxuXHRAcmVxdWlyZWQoXCJmaWVsZElkXCIsIFwidGV4dFwiKVxuXHRzZXRUZXh0ID0gKG9wdGlvbnMpID0+IHtcblx0XHR0aGlzLmZpZWxkc1tvcHRpb25zLmZpZWxkSWRdID0geyB2YWx1ZTogb3B0aW9ucy50ZXh0LCB0ZXh0OiBvcHRpb25zLnRleHQgfTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHRAb3B0aW9ucyhcImZpZWxkSWRcIiwgXCJ2YWx1ZVwiLCBcImlnbm9yZUZpZWxkQ2hhbmdlXCIpXG5cdEByZXF1aXJlZChcImZpZWxkSWRcIiwgXCJ2YWx1ZVwiKVxuXHRzZXRWYWx1ZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0dGhpcy5maWVsZHNbb3B0aW9ucy5maWVsZElkXSA9IHsgdmFsdWU6IG9wdGlvbnMudmFsdWUgfTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWNvcmQ7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsTUFBTUEsZUFBZSxHQUFHQyxPQUFPLENBQUMsc0NBQXNDLENBQUM7QUFDdkUsTUFBTTtFQUFFQztBQUFXLENBQUMsR0FBR0QsT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUM3QyxNQUFNRSxnQkFBZ0IsR0FBR0YsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQ25ELE1BQU07RUFDTEcsT0FBTztFQUNQQyxRQUFRO0VBQ1JDLFVBQVU7RUFDVkMsZUFBZTtFQUNmQyxnQkFBZ0I7RUFDaEJDO0FBQ0QsQ0FBQyxHQUFHUixPQUFPLENBQUMsbUJBQW1CLENBQUM7QUFBQztBQUFBLE9BRWhDUSxpQkFBaUIsRUFBRTtBQUFBLFFBeUJsQkYsZUFBZSxFQUFFO0FBQUEsUUFDakJILE9BQU8sQ0FBQyxXQUFXLENBQUM7QUFBQSxRQUNwQkMsUUFBUSxDQUFDLFdBQVcsQ0FBQztBQUFBLFFBS3JCRSxlQUFlLEVBQUU7QUFBQSxRQUNqQkgsT0FBTyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUM7QUFBQSxRQUNwQ0MsUUFBUSxDQUFDLFdBQVcsQ0FBQztBQUFBLFFBZXJCQyxVQUFVLEVBQUU7QUFBQSxRQWVaQyxlQUFlLEVBQUU7QUFBQSxTQUNqQkgsT0FBTyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7QUFBQSxTQUMvQkMsUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7QUFBQSxTQWdCaENFLGVBQWUsRUFBRTtBQUFBLFNBQ2pCSCxPQUFPLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztBQUFBLFNBQy9CQyxRQUFRLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztBQUFBLFNBb0JoQ0QsT0FBTyxDQUFDLFdBQVcsQ0FBQztB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