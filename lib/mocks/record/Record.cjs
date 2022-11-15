var _dec, _init_cancelLine, _dec2, _init_commitLine, _dec3, _init_executeMacro, _dec4, _init_getCurrentSublistValue, _dec5, _init_getLineCount, _dec6, _init_getSublistValue, _dec7, _init_getSubrecord, _dec8, _init_getValue, _dec9, _init_removeLine, _dec10, _dec11, _init_save, _dec12, _init_selectLine, _dec13, _init_selectNewLine, _dec14, _init_setCurrentSublistValue, _dec15, _init_setSublistValue, _dec16, _init_setText, _dec17, _init_setValue;
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
const {
  randomUUID
} = require("node:crypto");
const {
  options,
  addPromise
} = require("../../helpers.cjs");
const record = require("./index.cjs");
_dec = options("sublistId");
_dec2 = options("sublistId", "ignoreRecalc");
_dec3 = addPromise();
_dec4 = options("sublistId", "fieldId");
_dec5 = options("sublistId");
_dec6 = options("sublistId", "fieldId", "line");
_dec7 = options("fieldId");
_dec8 = options("fieldId");
_dec9 = options("sublistId", "line", "ignoreRecalc", "lineInstanceId");
_dec10 = addPromise();
_dec11 = options("enableSourcing", "ignoreMandatoryFields");
_dec12 = options("sublistId", "line");
_dec13 = options("sublistId");
_dec14 = options("sublistId", "fieldId", "value");
_dec15 = options("sublistId", "fieldId", "line", "value");
_dec16 = options("fieldId", "text", "ignoreFieldChange");
_dec17 = options("fieldId", "value", "ignoreFieldChange");
class Record {
  static {
    [_init_cancelLine, _init_commitLine, _init_executeMacro, _init_getCurrentSublistValue, _init_getLineCount, _init_getSublistValue, _init_getSubrecord, _init_getValue, _init_removeLine, _init_save, _init_selectLine, _init_selectNewLine, _init_setCurrentSublistValue, _init_setSublistValue, _init_setText, _init_setValue] = _applyDecs(this, [[_dec, 0, "cancelLine"], [_dec2, 0, "commitLine"], [_dec3, 0, "executeMacro"], [_dec4, 0, "getCurrentSublistValue"], [_dec5, 0, "getLineCount"], [_dec6, 0, "getSublistValue"], [_dec7, 0, "getSubrecord"], [_dec8, 0, "getValue"], [_dec9, 0, "removeLine"], [[_dec10, _dec11], 0, "save"], [_dec12, 0, "selectLine"], [_dec13, 0, "selectNewLine"], [_dec14, 0, "setCurrentSublistValue"], [_dec15, 0, "setSublistValue"], [_dec16, 0, "setText"], [_dec17, 0, "setValue"]], []);
  }
  static records = new Map();
  static savedRecords = [];
  constructor({
    id,
    type,
    fields,
    sublists,
    subrecords,
    isDynamic
  }) {
    this.id = id || null;
    this.type = type || null;
    this.fields = fields || {};
    this.sublists = Object.entries(sublists || {}).reduce((acc, [key, value]) => {
      delete value.currentline;
      acc[key] = {
        currentline: {},
        lines: Object.values(value).map(a => {
          if (!a._id) {
            a._id = randomUUID();
          }
          return a;
        })
      };
      return acc;
    }, {});
    this.subrecords = subrecords || {};
    this.isDynamic = Boolean(isDynamic) || false;
  }
  cancelLine = _init_cancelLine(this, options => {
    this.selectNewLine(options.sublistId);
  });
  commitLine = _init_commitLine(this, options => {
    if (!this.isDynamic) {
      throw new Error();
    }
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
    if (!this.isDynamic) {
      throw new Error();
    }
    const sublist = this.sublists[options.sublistId];
    if (sublist === undefined || !("currentline" in sublist)) {
      throw new Error();
    }
    return sublist.currentline[options.fieldId];
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
    const sublist = this.sublists[options.sublistId];
    if (sublist === undefined) {
      throw new Error();
    }
    return sublist.lines[options.line][options.fieldId];
  });
  getSubrecord = _init_getSubrecord(this, options => {
    return this.subrecords[options.fieldId];
  });
  getText = options => {};
  getValue = _init_getValue(this, options => {
    return this.fields[options.fieldId];
  });
  hasCurrentSublistSubrecord = options => {};
  hasSublistSubrecord = options => {};
  hasSubrecord = options => {};
  insertLine = options => {};
  moveLine = options => {};
  removeCurrentSublistSubrecord = options => {};
  removeLine = _init_removeLine(this, options => {
    const sublist = this.sublists[options.sublistId];
    if (sublist === undefined) {
      throw new Error();
    }
    sublist.lines.splice(options.line, 1);
  });
  removeSublistSubrecord = options => {};
  removeSubrecord = options => {};
  save = _init_save(this, options => {
    if (!this.id) {
      this.id = Math.max(Array.from(Record.records.values).map(a => a.id)) + 1;
    }
    Record.records.set(Tuple(this.type, this.id), this);
    Record.savedRecords.push(this);
    return this.id;
  });

  // TODO: edge case where if first line select you do is n + 1 it will give a new line
  selectLine = _init_selectLine(this, options => {
    const sublist = this.sublists[options.sublistId];
    if (sublist === undefined) {
      throw new Error();
    }
    sublist.currentline = {
      ...sublist.lines[options.line]
    };
  });
  selectNewLine = _init_selectNewLine(this, options => {
    if (!this.isDynamic) {
      throw new Error();
    }
    const sublist = this.sublists[options.sublistId];
    if (sublist === undefined) {
      throw new Error();
    }
    sublist.currentline = {
      _id: randomUUID()
    };
  });
  setCurrentMatrixSublistValue = options => {};
  setCurrentSublistText = options => {};
  setCurrentSublistValue = _init_setCurrentSublistValue(this, options => {
    if (!this.isDynamic) {
      throw new Error();
    }
    const sublist = this?.sublists?.[options.sublistId];
    if (sublist === undefined || !("currentline" in sublist)) {
      throw new Error();
    }
    return sublist.currentline[options.fieldId] = options.value;
  });
  setMatrixHeaderValue = options => {};
  setMatrixSublistValue = options => {};
  setSublistText = options => {};
  setSublistValue = _init_setSublistValue(this, options => {
    const sublist = this?.sublists?.[options.sublistId];
    if (sublist === undefined) {
      throw new Error();
    }
    sublist.lines[options.line][options.fieldId] = options.value;
  });
  setText = _init_setText(this, options => {});
  setValue = _init_setValue(this, options => {
    return this.fields[options.fieldId] = options.value;
  });
}
module.exports = Record;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyYW5kb21VVUlEIiwicmVxdWlyZSIsIm9wdGlvbnMiLCJhZGRQcm9taXNlIiwicmVjb3JkIiwiUmVjb3JkIiwicmVjb3JkcyIsIk1hcCIsInNhdmVkUmVjb3JkcyIsImNvbnN0cnVjdG9yIiwiaWQiLCJ0eXBlIiwiZmllbGRzIiwic3VibGlzdHMiLCJzdWJyZWNvcmRzIiwiaXNEeW5hbWljIiwiT2JqZWN0IiwiZW50cmllcyIsInJlZHVjZSIsImFjYyIsImtleSIsInZhbHVlIiwiY3VycmVudGxpbmUiLCJsaW5lcyIsInZhbHVlcyIsIm1hcCIsImEiLCJfaWQiLCJCb29sZWFuIiwiY2FuY2VsTGluZSIsInNlbGVjdE5ld0xpbmUiLCJzdWJsaXN0SWQiLCJjb21taXRMaW5lIiwiRXJyb3IiLCJzdWJsaXN0IiwidW5kZWZpbmVkIiwiZXhpc3RpbmdJbmRleCIsImZpbmRJbmRleCIsInB1c2giLCJleGVjdXRlTWFjcm8iLCJmaW5kTWF0cml4U3VibGlzdExpbmVXaXRoVmFsdWUiLCJmaW5kU3VibGlzdExpbmVXaXRoVmFsdWUiLCJnZXRDdXJyZW50TWF0cml4U3VibGlzdFZhbHVlIiwiZ2V0Q3VycmVudFN1Ymxpc3RGaWVsZCIsImdldEN1cnJlbnRTdWJsaXN0SW5kZXgiLCJnZXRDdXJyZW50U3VibGlzdFN1YnJlY29yZCIsImdldEN1cnJlbnRTdWJsaXN0VGV4dCIsImdldEN1cnJlbnRTdWJsaXN0VmFsdWUiLCJmaWVsZElkIiwiZ2V0RmllbGQiLCJnZXRGaWVsZHMiLCJnZXRMaW5lQ291bnQiLCJsZW5ndGgiLCJnZXRNYWNybyIsImdldE1hY3JvcyIsImdldE1hdHJpeEhlYWRlckNvdW50IiwiZ2V0TWF0cml4SGVhZGVyRmllbGQiLCJnZXRNYXRyaXhIZWFkZXJWYWx1ZSIsImdldE1hdHJpeFN1Ymxpc3RGaWVsZCIsImdldE1hdHJpeFN1Ymxpc3RWYWx1ZSIsImdldFN1Ymxpc3QiLCJnZXRTdWJsaXN0cyIsImdldFN1Ymxpc3RGaWVsZCIsImdldFN1Ymxpc3RGaWVsZHMiLCJnZXRTdWJsaXN0U3VicmVjb3JkIiwiZ2V0U3VibGlzdFRleHQiLCJnZXRTdWJsaXN0VmFsdWUiLCJsaW5lIiwiZ2V0U3VicmVjb3JkIiwiZ2V0VGV4dCIsImdldFZhbHVlIiwiaGFzQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQiLCJoYXNTdWJsaXN0U3VicmVjb3JkIiwiaGFzU3VicmVjb3JkIiwiaW5zZXJ0TGluZSIsIm1vdmVMaW5lIiwicmVtb3ZlQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQiLCJyZW1vdmVMaW5lIiwic3BsaWNlIiwicmVtb3ZlU3VibGlzdFN1YnJlY29yZCIsInJlbW92ZVN1YnJlY29yZCIsInNhdmUiLCJNYXRoIiwibWF4IiwiQXJyYXkiLCJmcm9tIiwic2V0IiwiVHVwbGUiLCJzZWxlY3RMaW5lIiwic2V0Q3VycmVudE1hdHJpeFN1Ymxpc3RWYWx1ZSIsInNldEN1cnJlbnRTdWJsaXN0VGV4dCIsInNldEN1cnJlbnRTdWJsaXN0VmFsdWUiLCJzZXRNYXRyaXhIZWFkZXJWYWx1ZSIsInNldE1hdHJpeFN1Ymxpc3RWYWx1ZSIsInNldFN1Ymxpc3RUZXh0Iiwic2V0U3VibGlzdFZhbHVlIiwic2V0VGV4dCIsInNldFZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2Nrcy9yZWNvcmQvUmVjb3JkLmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IHJhbmRvbVVVSUQgfSA9IHJlcXVpcmUoXCJub2RlOmNyeXB0b1wiKVxyXG5jb25zdCB7IG9wdGlvbnMsIGFkZFByb21pc2UgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKVxyXG5jb25zdCByZWNvcmQgPSByZXF1aXJlKFwiLi9pbmRleC5janNcIilcclxuXHJcbmNsYXNzIFJlY29yZCB7XHJcbiAgICBzdGF0aWMgcmVjb3JkcyA9IG5ldyBNYXAoKVxyXG4gICAgc3RhdGljIHNhdmVkUmVjb3JkcyA9IFtdXHJcblxyXG4gICAgY29uc3RydWN0b3Ioe2lkLCB0eXBlLCBmaWVsZHMsIHN1Ymxpc3RzLCBzdWJyZWNvcmRzLCBpc0R5bmFtaWN9KSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkIHx8IG51bGxcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlIHx8IG51bGxcclxuICAgICAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcyB8fCB7fVxyXG4gICAgICAgIHRoaXMuc3VibGlzdHMgPSBPYmplY3QuZW50cmllcyhzdWJsaXN0cyB8fCB7fSkucmVkdWNlKChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICBkZWxldGUgdmFsdWUuY3VycmVudGxpbmVcclxuICAgICAgICAgICAgYWNjW2tleV0gPSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50bGluZToge30sXHJcbiAgICAgICAgICAgICAgICBsaW5lczogT2JqZWN0LnZhbHVlcyh2YWx1ZSkubWFwKGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFhLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhLl9pZCA9IHJhbmRvbVVVSUQoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWNjXHJcbiAgICAgICAgfSwge30pXHJcbiAgICAgICAgdGhpcy5zdWJyZWNvcmRzID0gc3VicmVjb3JkcyB8fCB7fVxyXG4gICAgICAgIHRoaXMuaXNEeW5hbWljID0gQm9vbGVhbihpc0R5bmFtaWMpIHx8IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIilcclxuICAgIGNhbmNlbExpbmUgPSBvcHRpb25zID0+IHtcclxuICAgICAgICB0aGlzLnNlbGVjdE5ld0xpbmUob3B0aW9ucy5zdWJsaXN0SWQpXHJcbiAgICB9XHJcblxyXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJpZ25vcmVSZWNhbGNcIilcclxuICAgIGNvbW1pdExpbmUgPSBvcHRpb25zID0+IHtcclxuICAgICAgICBpZighdGhpcy5pc0R5bmFtaWMpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3VibGlzdCA9IHRoaXM/LnN1Ymxpc3RzPy5bb3B0aW9ucy5zdWJsaXN0SWRdXHJcbiAgICAgICAgaWYoc3VibGlzdCA9PT0gdW5kZWZpbmVkIHx8ICEoXCJjdXJyZW50bGluZVwiIGluIHN1Ymxpc3QpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBzdWJsaXN0LmxpbmVzLmZpbmRJbmRleChhID0+IGEuX2lkID09PSBzdWJsaXN0LmN1cnJlbnRsaW5lLl9pZClcclxuICAgICAgICBpZihleGlzdGluZ0luZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgc3VibGlzdC5saW5lc1tleGlzdGluZ0luZGV4XSA9IHN1Ymxpc3QuY3VycmVudGxpbmVcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN1Ymxpc3QubGluZXMucHVzaChzdWJsaXN0LmN1cnJlbnRsaW5lKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbGVjdE5ld0xpbmUob3B0aW9ucy5zdWJsaXN0SWQpXHJcbiAgICB9XHJcblxyXG4gICAgQGFkZFByb21pc2UoKVxyXG4gICAgZXhlY3V0ZU1hY3JvID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIGZpbmRNYXRyaXhTdWJsaXN0TGluZVdpdGhWYWx1ZSA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBmaW5kU3VibGlzdExpbmVXaXRoVmFsdWUgPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgZ2V0Q3VycmVudE1hdHJpeFN1Ymxpc3RWYWx1ZSA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBnZXRDdXJyZW50U3VibGlzdEZpZWxkID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIGdldEN1cnJlbnRTdWJsaXN0SW5kZXggPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgZ2V0Q3VycmVudFN1Ymxpc3RTdWJyZWNvcmQgPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgZ2V0Q3VycmVudFN1Ymxpc3RUZXh0ID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiKVxyXG4gICAgZ2V0Q3VycmVudFN1Ymxpc3RWYWx1ZSA9IG9wdGlvbnMgPT4ge1xyXG4gICAgICAgIGlmKCF0aGlzLmlzRHluYW1pYykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWJsaXN0ID0gdGhpcy5zdWJsaXN0c1tvcHRpb25zLnN1Ymxpc3RJZF1cclxuICAgICAgICBpZihzdWJsaXN0ID09PSB1bmRlZmluZWQgfHwgIShcImN1cnJlbnRsaW5lXCIgaW4gc3VibGlzdCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1Ymxpc3QuY3VycmVudGxpbmVbb3B0aW9ucy5maWVsZElkXVxyXG4gICAgfVxyXG5cclxuICAgIGdldEZpZWxkID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIGdldEZpZWxkcyA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBAb3B0aW9ucyhcInN1Ymxpc3RJZFwiKVxyXG4gICAgZ2V0TGluZUNvdW50ID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdXHJcbiAgICAgICAgaWYoc3VibGlzdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VibGlzdC5saW5lcy5sZW5ndGhcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYWNybyA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBnZXRNYWNyb3MgPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgZ2V0TWF0cml4SGVhZGVyQ291bnQgPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgZ2V0TWF0cml4SGVhZGVyRmllbGQgPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgZ2V0TWF0cml4SGVhZGVyVmFsdWUgPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgZ2V0TWF0cml4U3VibGlzdEZpZWxkID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIGdldE1hdHJpeFN1Ymxpc3RWYWx1ZSA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBnZXRTdWJsaXN0ID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIGdldFN1Ymxpc3RzID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIGdldFN1Ymxpc3RGaWVsZCA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBnZXRTdWJsaXN0RmllbGRzID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIGdldFN1Ymxpc3RTdWJyZWNvcmQgPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgZ2V0U3VibGlzdFRleHQgPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwibGluZVwiKVxyXG4gICAgZ2V0U3VibGlzdFZhbHVlID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdXHJcbiAgICAgICAgaWYoc3VibGlzdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdWJsaXN0LmxpbmVzW29wdGlvbnMubGluZV1bb3B0aW9ucy5maWVsZElkXVxyXG4gICAgfVxyXG5cclxuICAgIEBvcHRpb25zKFwiZmllbGRJZFwiKVxyXG4gICAgZ2V0U3VicmVjb3JkID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VicmVjb3Jkc1tvcHRpb25zLmZpZWxkSWRdXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGV4dCA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBAb3B0aW9ucyhcImZpZWxkSWRcIilcclxuICAgIGdldFZhbHVlID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRzW29wdGlvbnMuZmllbGRJZF1cclxuICAgIH1cclxuXHJcbiAgICBoYXNDdXJyZW50U3VibGlzdFN1YnJlY29yZCA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBoYXNTdWJsaXN0U3VicmVjb3JkID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIGhhc1N1YnJlY29yZCA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBpbnNlcnRMaW5lID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIG1vdmVMaW5lID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIHJlbW92ZUN1cnJlbnRTdWJsaXN0U3VicmVjb3JkID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwibGluZVwiLCBcImlnbm9yZVJlY2FsY1wiLCBcImxpbmVJbnN0YW5jZUlkXCIpXHJcbiAgICByZW1vdmVMaW5lID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdXHJcbiAgICAgICAgaWYoc3VibGlzdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1Ymxpc3QubGluZXMuc3BsaWNlKG9wdGlvbnMubGluZSwgMSlcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTdWJsaXN0U3VicmVjb3JkID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIHJlbW92ZVN1YnJlY29yZCA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBAYWRkUHJvbWlzZSgpXHJcbiAgICBAb3B0aW9ucyhcImVuYWJsZVNvdXJjaW5nXCIsIFwiaWdub3JlTWFuZGF0b3J5RmllbGRzXCIpXHJcbiAgICBzYXZlID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgaWYoIXRoaXMuaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5pZCA9IE1hdGgubWF4KEFycmF5LmZyb20oUmVjb3JkLnJlY29yZHMudmFsdWVzKS5tYXAoYSA9PiBhLmlkKSkgKyAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJlY29yZC5yZWNvcmRzLnNldChUdXBsZSh0aGlzLnR5cGUsIHRoaXMuaWQpLCB0aGlzKVxyXG4gICAgICAgIFJlY29yZC5zYXZlZFJlY29yZHMucHVzaCh0aGlzKVxyXG4gICAgICAgIHJldHVybiB0aGlzLmlkXHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogZWRnZSBjYXNlIHdoZXJlIGlmIGZpcnN0IGxpbmUgc2VsZWN0IHlvdSBkbyBpcyBuICsgMSBpdCB3aWxsIGdpdmUgYSBuZXcgbGluZVxyXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJsaW5lXCIpXHJcbiAgICBzZWxlY3RMaW5lID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdXHJcbiAgICAgICAgaWYoc3VibGlzdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1Ymxpc3QuY3VycmVudGxpbmUgPSB7Li4uc3VibGlzdC5saW5lc1tvcHRpb25zLmxpbmVdfVxyXG4gICAgfVxyXG5cclxuICAgIEBvcHRpb25zKFwic3VibGlzdElkXCIpXHJcbiAgICBzZWxlY3ROZXdMaW5lID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNEeW5hbWljKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXVxyXG4gICAgICAgIGlmKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdWJsaXN0LmN1cnJlbnRsaW5lID0ge1xyXG4gICAgICAgICAgICBfaWQ6IHJhbmRvbVVVSUQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRDdXJyZW50TWF0cml4U3VibGlzdFZhbHVlID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIHNldEN1cnJlbnRTdWJsaXN0VGV4dCA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJ2YWx1ZVwiKVxyXG4gICAgc2V0Q3VycmVudFN1Ymxpc3RWYWx1ZSA9IG9wdGlvbnMgPT4ge1xyXG4gICAgICAgIGlmKCF0aGlzLmlzRHluYW1pYykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWJsaXN0ID0gdGhpcz8uc3VibGlzdHM/LltvcHRpb25zLnN1Ymxpc3RJZF1cclxuICAgICAgICBpZihzdWJsaXN0ID09PSB1bmRlZmluZWQgfHwgIShcImN1cnJlbnRsaW5lXCIgaW4gc3VibGlzdCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1Ymxpc3QuY3VycmVudGxpbmVbb3B0aW9ucy5maWVsZElkXSA9IG9wdGlvbnMudmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBzZXRNYXRyaXhIZWFkZXJWYWx1ZSA9IG9wdGlvbnMgPT4ge31cclxuXHJcbiAgICBzZXRNYXRyaXhTdWJsaXN0VmFsdWUgPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgc2V0U3VibGlzdFRleHQgPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwibGluZVwiLCBcInZhbHVlXCIpXHJcbiAgICBzZXRTdWJsaXN0VmFsdWUgPSBvcHRpb25zID0+IHtcclxuICAgICAgICBjb25zdCBzdWJsaXN0ID0gdGhpcz8uc3VibGlzdHM/LltvcHRpb25zLnN1Ymxpc3RJZF1cclxuICAgICAgICBpZihzdWJsaXN0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKClcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VibGlzdC5saW5lc1tvcHRpb25zLmxpbmVdW29wdGlvbnMuZmllbGRJZF0gPSBvcHRpb25zLnZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgQG9wdGlvbnMoXCJmaWVsZElkXCIsIFwidGV4dFwiLCBcImlnbm9yZUZpZWxkQ2hhbmdlXCIpXHJcbiAgICBzZXRUZXh0ID0gb3B0aW9ucyA9PiB7fVxyXG5cclxuICAgIEBvcHRpb25zKFwiZmllbGRJZFwiLCBcInZhbHVlXCIsIFwiaWdub3JlRmllbGRDaGFuZ2VcIilcclxuICAgIHNldFZhbHVlID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRzW29wdGlvbnMuZmllbGRJZF0gPSBvcHRpb25zLnZhbHVlXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVjb3JkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE1BQU07RUFBRUE7QUFBVyxDQUFDLEdBQUdDLE9BQU8sQ0FBQyxhQUFhLENBQUM7QUFDN0MsTUFBTTtFQUFFQyxPQUFPO0VBQUVDO0FBQVcsQ0FBQyxHQUFHRixP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