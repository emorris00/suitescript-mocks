var _initClass, _dec, _dec2, _dec3, _dec4, _init_cancelLine, _dec5, _dec6, _dec7, _init_commitLine, _dec8, _init_executeMacro, _dec9, _dec10, _dec11, _init_getCurrentSublistText, _dec12, _dec13, _dec14, _init_getCurrentSublistValue, _dec15, _dec16, _init_getLineCount, _dec17, _dec18, _init_getSublistText, _dec19, _dec20, _init_getSublistValue, _dec21, _dec22, _init_getSubrecord, _dec23, _dec24, _init_getText, _dec25, _dec26, _init_getValue, _dec27, _dec28, _init_removeLine, _dec29, _dec30, _init_save, _dec31, _dec32, _dec33, _init_selectLine, _dec34, _dec35, _dec36, _init_selectNewLine, _dec37, _dec38, _dec39, _init_setCurrentSublistText, _dec40, _dec41, _dec42, _init_setCurrentSublistValue, _dec43, _dec44, _dec45, _init_setSublistText, _dec46, _dec47, _dec48, _init_setSublistValue, _dec49, _dec50, _init_setText, _dec51, _dec52, _init_setValue;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
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
    ({
      e: [_init_cancelLine, _init_commitLine, _init_executeMacro, _init_getCurrentSublistText, _init_getCurrentSublistValue, _init_getLineCount, _init_getSublistText, _init_getSublistValue, _init_getSubrecord, _init_getText, _init_getValue, _init_removeLine, _init_save, _init_selectLine, _init_selectNewLine, _init_setCurrentSublistText, _init_setCurrentSublistValue, _init_setSublistText, _init_setSublistValue, _init_setText, _init_setValue],
      c: [_Record, _initClass]
    } = _applyDecs2203R(this, [[[_dec2, _dec3, _dec4], 0, "cancelLine"], [[_dec5, _dec6, _dec7], 0, "commitLine"], [_dec8, 0, "executeMacro"], [[_dec9, _dec10, _dec11], 0, "getCurrentSublistText"], [[_dec12, _dec13, _dec14], 0, "getCurrentSublistValue"], [[_dec15, _dec16], 0, "getLineCount"], [[_dec17, _dec18], 0, "getSublistText"], [[_dec19, _dec20], 0, "getSublistValue"], [[_dec21, _dec22], 0, "getSubrecord"], [[_dec23, _dec24], 0, "getText"], [[_dec25, _dec26], 0, "getValue"], [[_dec27, _dec28], 0, "removeLine"], [[_dec29, _dec30], 0, "save"], [[_dec31, _dec32, _dec33], 0, "selectLine"], [[_dec34, _dec35, _dec36], 0, "selectNewLine"], [[_dec37, _dec38, _dec39], 0, "setCurrentSublistText"], [[_dec40, _dec41, _dec42], 0, "setCurrentSublistValue"], [[_dec43, _dec44, _dec45], 0, "setSublistText"], [[_dec46, _dec47, _dec48], 0, "setSublistValue"], [[_dec49, _dec50], 0, "setText"], [[_dec51, _dec52], 0, "setValue"]], [_dec]));
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
    if (Object.prototype.toString.call(field) === "[object Date]") {
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
    if (typeof field === "object" && field !== null && !(Object.prototype.toString.call(field) === "[object Date]")) {
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
    if (Object.prototype.toString.call(field) === "[object Date]") {
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
    if (typeof field === "object" && field !== null && !(Object.prototype.toString.call(field) === "[object Date]")) {
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
    if (Object.prototype.toString.call(field) === "[object Date]") {
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
    if (typeof field === "object" && field !== null && Object.prototype.toString.call(field) !== "[object Date]") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkYXRlZm5zIiwicmVxdWlyZSIsInN0cnVjdHVyZWRDbG9uZSIsInJhbmRvbVVVSUQiLCJTdWl0ZVNjcmlwdE1vY2tzIiwib3B0aW9ucyIsInJlcXVpcmVkIiwiYWRkUHJvbWlzZSIsImR5bmFtaWNNb2RlT25seSIsInN0YW5kYXJkTW9kZU9ubHkiLCJhc3NpZ25Db25zdHJ1Y3RvciIsIl9SZWNvcmQiLCJfZGVjIiwiX2RlYzIiLCJfZGVjMyIsIl9kZWM0IiwiX2RlYzUiLCJfZGVjNiIsIl9kZWM3IiwiX2RlYzgiLCJfZGVjOSIsIl9kZWMxMCIsIl9kZWMxMSIsIl9kZWMxMiIsIl9kZWMxMyIsIl9kZWMxNCIsIl9kZWMxNSIsIl9kZWMxNiIsIl9kZWMxNyIsIl9kZWMxOCIsIl9kZWMxOSIsIl9kZWMyMCIsIl9kZWMyMSIsIl9kZWMyMiIsIl9kZWMyMyIsIl9kZWMyNCIsIl9kZWMyNSIsIl9kZWMyNiIsIl9kZWMyNyIsIl9kZWMyOCIsIl9kZWMyOSIsIl9kZWMzMCIsIl9kZWMzMSIsIl9kZWMzMiIsIl9kZWMzMyIsIl9kZWMzNCIsIl9kZWMzNSIsIl9kZWMzNiIsIl9kZWMzNyIsIl9kZWMzOCIsIl9kZWMzOSIsIl9kZWM0MCIsIl9kZWM0MSIsIl9kZWM0MiIsIl9kZWM0MyIsIl9kZWM0NCIsIl9kZWM0NSIsIl9kZWM0NiIsIl9kZWM0NyIsIl9kZWM0OCIsIl9kZWM0OSIsIl9kZWM1MCIsIl9kZWM1MSIsIl9kZWM1MiIsIlJlY29yZCIsImUiLCJfaW5pdF9jYW5jZWxMaW5lIiwiX2luaXRfY29tbWl0TGluZSIsIl9pbml0X2V4ZWN1dGVNYWNybyIsIl9pbml0X2dldEN1cnJlbnRTdWJsaXN0VGV4dCIsIl9pbml0X2dldEN1cnJlbnRTdWJsaXN0VmFsdWUiLCJfaW5pdF9nZXRMaW5lQ291bnQiLCJfaW5pdF9nZXRTdWJsaXN0VGV4dCIsIl9pbml0X2dldFN1Ymxpc3RWYWx1ZSIsIl9pbml0X2dldFN1YnJlY29yZCIsIl9pbml0X2dldFRleHQiLCJfaW5pdF9nZXRWYWx1ZSIsIl9pbml0X3JlbW92ZUxpbmUiLCJfaW5pdF9zYXZlIiwiX2luaXRfc2VsZWN0TGluZSIsIl9pbml0X3NlbGVjdE5ld0xpbmUiLCJfaW5pdF9zZXRDdXJyZW50U3VibGlzdFRleHQiLCJfaW5pdF9zZXRDdXJyZW50U3VibGlzdFZhbHVlIiwiX2luaXRfc2V0U3VibGlzdFRleHQiLCJfaW5pdF9zZXRTdWJsaXN0VmFsdWUiLCJfaW5pdF9zZXRUZXh0IiwiX2luaXRfc2V0VmFsdWUiLCJjIiwiX2luaXRDbGFzcyIsIl9hcHBseURlY3MyMjAzUiIsImlkIiwidHlwZSIsImZpZWxkcyIsInN1Ymxpc3RzIiwic3VicmVjb3JkcyIsImlzRHluYW1pYyIsInZlcnNpb24iLCJpbml0aWFsaXplIiwiT2JqZWN0IiwiZW50cmllcyIsInJlZHVjZSIsImFjYyIsImxpbmVJZCIsImxpbmVzIiwiY3VycmVudGxpbmUiLCJzdWJyZWNvcmRJZCIsInN1YnJlY29yZCIsImNhbmNlbExpbmUiLCJzZWxlY3ROZXdMaW5lIiwic3VibGlzdElkIiwiY29tbWl0TGluZSIsInN1Ymxpc3QiLCJ1bmRlZmluZWQiLCJFcnJvciIsImV4aXN0aW5nSW5kZXgiLCJmaW5kSW5kZXgiLCJhIiwiX2lkIiwicHVzaCIsImV4ZWN1dGVNYWNybyIsImZpbmRNYXRyaXhTdWJsaXN0TGluZVdpdGhWYWx1ZSIsImZpbmRTdWJsaXN0TGluZVdpdGhWYWx1ZSIsImdldEN1cnJlbnRNYXRyaXhTdWJsaXN0VmFsdWUiLCJnZXRDdXJyZW50U3VibGlzdEZpZWxkIiwiZ2V0Q3VycmVudFN1Ymxpc3RJbmRleCIsImdldEN1cnJlbnRTdWJsaXN0U3VicmVjb3JkIiwiZ2V0Q3VycmVudFN1Ymxpc3RUZXh0IiwiZmllbGQiLCJmaWVsZElkIiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiZm9ybWF0IiwiZGF0ZUZvcm1hdCIsInRleHQiLCJ2YWx1ZSIsImdldEN1cnJlbnRTdWJsaXN0VmFsdWUiLCJnZXRGaWVsZCIsImdldEZpZWxkcyIsImdldExpbmVDb3VudCIsImxlbmd0aCIsImdldE1hY3JvIiwiZ2V0TWFjcm9zIiwiZ2V0TWF0cml4SGVhZGVyQ291bnQiLCJnZXRNYXRyaXhIZWFkZXJGaWVsZCIsImdldE1hdHJpeEhlYWRlclZhbHVlIiwiZ2V0TWF0cml4U3VibGlzdEZpZWxkIiwiZ2V0TWF0cml4U3VibGlzdFZhbHVlIiwiZ2V0U3VibGlzdCIsImdldFN1Ymxpc3RzIiwiZ2V0U3VibGlzdEZpZWxkIiwiZ2V0U3VibGlzdEZpZWxkcyIsImdldFN1Ymxpc3RTdWJyZWNvcmQiLCJnZXRTdWJsaXN0VGV4dCIsImxpbmUiLCJnZXRTdWJsaXN0VmFsdWUiLCJnZXRTdWJyZWNvcmQiLCJnZXRUZXh0IiwiZ2V0VmFsdWUiLCJoYXNDdXJyZW50U3VibGlzdFN1YnJlY29yZCIsImhhc1N1Ymxpc3RTdWJyZWNvcmQiLCJoYXNTdWJyZWNvcmQiLCJpbnNlcnRMaW5lIiwibW92ZUxpbmUiLCJyZW1vdmVDdXJyZW50U3VibGlzdFN1YnJlY29yZCIsInJlbW92ZUxpbmUiLCJzcGxpY2UiLCJyZW1vdmVTdWJsaXN0U3VicmVjb3JkIiwicmVtb3ZlU3VicmVjb3JkIiwic2F2ZSIsInJlY29yZHMiLCJnZXQiLCJjb3B5IiwiZm9yRWFjaCIsImtleSIsIkRhdGUiLCJ2YWx1ZXMiLCJNYXRoIiwibWF4IiwiQXJyYXkiLCJmcm9tIiwibWFwIiwiY3JlYXRlZFJlY29yZHMiLCJzZXQiLCJzYXZlZFJlY29yZHMiLCJzZWxlY3RMaW5lIiwic2V0Q3VycmVudE1hdHJpeFN1Ymxpc3RWYWx1ZSIsInNldEN1cnJlbnRTdWJsaXN0VGV4dCIsInNldEN1cnJlbnRTdWJsaXN0VmFsdWUiLCJzZXRNYXRyaXhIZWFkZXJWYWx1ZSIsInNldE1hdHJpeFN1Ymxpc3RWYWx1ZSIsInNldFN1Ymxpc3RUZXh0Iiwic2V0U3VibGlzdFZhbHVlIiwic2V0VGV4dCIsInNldFZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2Nrcy9yZWNvcmQvUmVjb3JkLmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYXRlZm5zID0gcmVxdWlyZShcImRhdGUtZm5zXCIpO1xuY29uc3Qgc3RydWN0dXJlZENsb25lID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9hY3R1YWwvc3RydWN0dXJlZC1jbG9uZVwiKTtcbmNvbnN0IHsgcmFuZG9tVVVJRCB9ID0gcmVxdWlyZShcIm5vZGU6Y3J5cHRvXCIpO1xuY29uc3QgU3VpdGVTY3JpcHRNb2NrcyA9IHJlcXVpcmUoXCIuLi8uLi9pbmRleC5janNcIik7XG5jb25zdCB7XG5cdG9wdGlvbnMsXG5cdHJlcXVpcmVkLFxuXHRhZGRQcm9taXNlLFxuXHRkeW5hbWljTW9kZU9ubHksXG5cdHN0YW5kYXJkTW9kZU9ubHksXG5cdGFzc2lnbkNvbnN0cnVjdG9yLFxufSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKTtcblxuQGFzc2lnbkNvbnN0cnVjdG9yKClcbmNsYXNzIFJlY29yZCB7XG5cdGlkID0gbnVsbDtcblx0dHlwZSA9IG51bGw7XG5cdGZpZWxkcyA9IHt9O1xuXHRzdWJsaXN0cyA9IHt9O1xuXHRzdWJyZWNvcmRzID0ge307XG5cdGlzRHluYW1pYyA9IGZhbHNlO1xuXHR2ZXJzaW9uID0gMTtcblxuXHRpbml0aWFsaXplID0gKCkgPT4ge1xuXHRcdHRoaXMuZmllbGRzID0gc3RydWN0dXJlZENsb25lKHRoaXMuZmllbGRzKTtcblx0XHR0aGlzLnN1Ymxpc3RzID0gT2JqZWN0LmVudHJpZXMoc3RydWN0dXJlZENsb25lKHRoaXMuc3VibGlzdHMpIHx8IHt9KS5yZWR1Y2UoKGFjYywgW2xpbmVJZCwgbGluZXNdKSA9PiB7XG5cdFx0XHRhY2NbbGluZUlkXSA9IHtcblx0XHRcdFx0Y3VycmVudGxpbmU6IHt9LFxuXHRcdFx0XHRsaW5lczogXCJsaW5lc1wiIGluIGxpbmVzID8gbGluZXMubGluZXMgOiBsaW5lcyxcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gYWNjO1xuXHRcdH0sIHt9KTtcblx0XHR0aGlzLnN1YnJlY29yZHMgPSBPYmplY3QuZW50cmllcyh0aGlzLnN1YnJlY29yZHMgfHwge30pLnJlZHVjZSgoYWNjLCBbc3VicmVjb3JkSWQsIHN1YnJlY29yZF0pID0+IHtcblx0XHRcdGFjY1tzdWJyZWNvcmRJZF0gPSBuZXcgUmVjb3JkKHN1YnJlY29yZCk7XG5cdFx0XHRyZXR1cm4gYWNjO1xuXHRcdH0sIHt9KTtcblx0fTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG5cdGNhbmNlbExpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdHRoaXMuc2VsZWN0TmV3TGluZShvcHRpb25zLnN1Ymxpc3RJZCk7XG5cdH07XG5cblx0QGR5bmFtaWNNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiaWdub3JlUmVjYWxjXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiKVxuXHRjb21taXRMaW5lID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBzdWJsaXN0ID0gdGhpcz8uc3VibGlzdHM/LltvcHRpb25zLnN1Ymxpc3RJZF07XG5cdFx0aWYgKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCB8fCAhKFwiY3VycmVudGxpbmVcIiBpbiBzdWJsaXN0KSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCk7XG5cdFx0fVxuXHRcdGNvbnN0IGV4aXN0aW5nSW5kZXggPSBzdWJsaXN0LmxpbmVzLmZpbmRJbmRleCgoYSkgPT4gYS5faWQgPT09IHN1Ymxpc3QuY3VycmVudGxpbmUuX2lkKTtcblx0XHRpZiAoZXhpc3RpbmdJbmRleCA+IC0xKSB7XG5cdFx0XHRzdWJsaXN0LmxpbmVzW2V4aXN0aW5nSW5kZXhdID0gc3VibGlzdC5jdXJyZW50bGluZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3VibGlzdC5saW5lcy5wdXNoKHN1Ymxpc3QuY3VycmVudGxpbmUpO1xuXHRcdH1cblx0XHR0aGlzLnNlbGVjdE5ld0xpbmUob3B0aW9ucy5zdWJsaXN0SWQpO1xuXHR9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0ZXhlY3V0ZU1hY3JvID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGZpbmRNYXRyaXhTdWJsaXN0TGluZVdpdGhWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRmaW5kU3VibGlzdExpbmVXaXRoVmFsdWUgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0Q3VycmVudE1hdHJpeFN1Ymxpc3RWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRDdXJyZW50U3VibGlzdEZpZWxkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldEN1cnJlbnRTdWJsaXN0SW5kZXggPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0Q3VycmVudFN1Ymxpc3RTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge307XG5cblx0QGR5bmFtaWNNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIpXG5cdGdldEN1cnJlbnRTdWJsaXN0VGV4dCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdO1xuXHRcdGlmIChzdWJsaXN0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlN1Ymxpc3QgZG9lcyBub3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdGlmICghKFwiY3VycmVudGxpbmVcIiBpbiBzdWJsaXN0KSkge1xuXHRcdFx0dGhpcy5zZWxlY3ROZXdMaW5lKHN1Ymxpc3QpO1xuXHRcdH1cblx0XHRjb25zdCBmaWVsZCA9IHN1Ymxpc3QuY3VycmVudGxpbmVbb3B0aW9ucy5maWVsZElkXTtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZpZWxkKSA9PT0gXCJbb2JqZWN0IERhdGVdXCIpIHtcblx0XHRcdHJldHVybiBkYXRlZm5zLmZvcm1hdChmaWVsZCwgU3VpdGVTY3JpcHRNb2Nrcy5kYXRlRm9ybWF0KTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBmaWVsZCA9PT0gXCJvYmplY3RcIiAmJiBmaWVsZCAhPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGZpZWxkLnRleHQgfHwgZmllbGQudmFsdWU7XG5cdFx0fVxuXHRcdHJldHVybiBmaWVsZDtcblx0fTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIilcblx0Z2V0Q3VycmVudFN1Ymxpc3RWYWx1ZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdO1xuXHRcdGlmIChzdWJsaXN0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRpZiAoIShcImN1cnJlbnRsaW5lXCIgaW4gc3VibGlzdCkpIHtcblx0XHRcdHRoaXMuc2VsZWN0TmV3TGluZShzdWJsaXN0KTtcblx0XHR9XG5cdFx0Y29uc3QgZmllbGQgPSBzdWJsaXN0LmN1cnJlbnRsaW5lW29wdGlvbnMuZmllbGRJZF07XG5cdFx0aWYgKFxuXHRcdFx0dHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmXG5cdFx0XHRmaWVsZCAhPT0gbnVsbCAmJlxuXHRcdFx0IShPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmllbGQpID09PSBcIltvYmplY3QgRGF0ZV1cIilcblx0XHQpIHtcblx0XHRcdHJldHVybiBmaWVsZC52YWx1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZpZWxkO1xuXHR9O1xuXG5cdGdldEZpZWxkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldEZpZWxkcyA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIilcblx0Z2V0TGluZUNvdW50ID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBzdWJsaXN0ID0gdGhpcy5zdWJsaXN0c1tvcHRpb25zLnN1Ymxpc3RJZF07XG5cdFx0aWYgKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH1cblx0XHRyZXR1cm4gc3VibGlzdC5saW5lcy5sZW5ndGg7XG5cdH07XG5cblx0Z2V0TWFjcm8gPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0TWFjcm9zID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldE1hdHJpeEhlYWRlckNvdW50ID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldE1hdHJpeEhlYWRlckZpZWxkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldE1hdHJpeEhlYWRlclZhbHVlID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldE1hdHJpeFN1Ymxpc3RGaWVsZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRNYXRyaXhTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0U3VibGlzdCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRTdWJsaXN0cyA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRTdWJsaXN0RmllbGQgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0U3VibGlzdEZpZWxkcyA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRTdWJsaXN0U3VicmVjb3JkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIilcblx0Z2V0U3VibGlzdFRleHQgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGZpZWxkID0gdGhpcy5zdWJsaXN0c1tvcHRpb25zLnN1Ymxpc3RJZF0ubGluZXNbb3B0aW9ucy5saW5lXVtvcHRpb25zLmZpZWxkSWRdO1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmllbGQpID09PSBcIltvYmplY3QgRGF0ZV1cIikge1xuXHRcdFx0cmV0dXJuIGRhdGVmbnMuZm9ybWF0KGZpZWxkLCBTdWl0ZVNjcmlwdE1vY2tzLmRhdGVGb3JtYXQpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsKSB7XG5cdFx0XHRpZiAoIXRoaXMuaXNEeW5hbWljICYmICEoXCJ0ZXh0XCIgaW4gZmllbGQpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcIkNhbm5vdCB1c2UgZ2V0U3VibGlzdFRleHQgb24gZmllbGQgdGhhdCBoYXMgaGFkIHZhbHVlIGJ1dCBub3QgdGV4dCBzZXQgaW4gc3RhbmRhcmQgbW9kZVwiLFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZpZWxkLnRleHQgfHwgZmllbGQudmFsdWU7XG5cdFx0fVxuXHRcdHJldHVybiBmaWVsZDtcblx0fTtcblxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG5cdGdldFN1Ymxpc3RWYWx1ZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgZmllbGQgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXS5saW5lc1tvcHRpb25zLmxpbmVdW29wdGlvbnMuZmllbGRJZF07XG5cdFx0aWYgKFxuXHRcdFx0dHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmXG5cdFx0XHRmaWVsZCAhPT0gbnVsbCAmJlxuXHRcdFx0IShPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmllbGQpID09PSBcIltvYmplY3QgRGF0ZV1cIilcblx0XHQpIHtcblx0XHRcdHJldHVybiBmaWVsZC52YWx1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZpZWxkO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiZmllbGRJZFwiKVxuXHRAcmVxdWlyZWQoXCJmaWVsZElkXCIpXG5cdGdldFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKCEob3B0aW9ucy5maWVsZElkIGluIHRoaXMuc3VicmVjb3JkcykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlN1YnJlY29yZCBkb2VzIG5vdCBleGlzdC5cIik7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnN1YnJlY29yZHNbb3B0aW9ucy5maWVsZElkXTtcblx0fTtcblxuXHRAb3B0aW9ucyhcImZpZWxkSWRcIilcblx0QHJlcXVpcmVkKFwiZmllbGRJZFwiKVxuXHRnZXRUZXh0ID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW29wdGlvbnMuZmllbGRJZF07XG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmaWVsZCkgPT09IFwiW29iamVjdCBEYXRlXVwiKSB7XG5cdFx0XHRyZXR1cm4gZGF0ZWZucy5mb3JtYXQoZmllbGQsIFN1aXRlU2NyaXB0TW9ja3MuZGF0ZUZvcm1hdCk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgZmllbGQgPT09IFwib2JqZWN0XCIgJiYgZmllbGQgIT09IG51bGwpIHtcblx0XHRcdGlmICghdGhpcy5pc0R5bmFtaWMgJiYgIShcInRleHRcIiBpbiBmaWVsZCkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHVzZSBnZXRUZXh0IG9uIGZpZWxkIHRoYXQgaGFzIGhhZCB2YWx1ZSBidXQgbm90IHRleHQgc2V0IGluIHN0YW5kYXJkIG1vZGVcIik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmllbGQudGV4dCB8fCBmaWVsZC52YWx1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZpZWxkO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiZmllbGRJZFwiKVxuXHRAcmVxdWlyZWQoXCJmaWVsZElkXCIpXG5cdGdldFZhbHVlID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzW29wdGlvbnMuZmllbGRJZF07XG5cdFx0aWYgKHR5cGVvZiBmaWVsZCA9PT0gXCJvYmplY3RcIiAmJiBmaWVsZCAhPT0gbnVsbCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmllbGQpICE9PSBcIltvYmplY3QgRGF0ZV1cIikge1xuXHRcdFx0cmV0dXJuIGZpZWxkLnZhbHVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGQ7XG5cdH07XG5cblx0aGFzQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge307XG5cblx0aGFzU3VibGlzdFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRoYXNTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge307XG5cblx0aW5zZXJ0TGluZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRtb3ZlTGluZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRyZW1vdmVDdXJyZW50U3VibGlzdFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImxpbmVcIiwgXCJpZ25vcmVSZWNhbGNcIiwgXCJsaW5lSW5zdGFuY2VJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJsaW5lXCIpXG5cdHJlbW92ZUxpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkIHx8ICEob3B0aW9ucy5saW5lIGluIHN1Ymxpc3QubGluZXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcblx0XHR9XG5cdFx0c3VibGlzdC5saW5lcy5zcGxpY2Uob3B0aW9ucy5saW5lLCAxKTtcblx0fTtcblxuXHRyZW1vdmVTdWJsaXN0U3VicmVjb3JkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdHJlbW92ZVN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwiZW5hYmxlU291cmNpbmdcIiwgXCJpZ25vcmVNYW5kYXRvcnlGaWVsZHNcIilcblx0c2F2ZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKHRoaXMuaWQgJiYgU3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLmdldCh0aGlzKS52ZXJzaW9uICE9PSB0aGlzLnZlcnNpb24pIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlJlY29yZCBoYXMgY2hhbmdlZFwiKTtcblx0XHR9XG5cdFx0dGhpcy52ZXJzaW9uKys7XG5cdFx0Y29uc3QgY29weSA9IG5ldyBSZWNvcmQodGhpcyk7XG5cdFx0Ly8gY2hhbmdlIGZpZWxkcyB0aGF0IG9ubHkgaGF2ZSB2YWx1ZSB0byBub3QgYmUgYW4gb2JqZWN0IHNvIGdldFRleHQgd29ya3Ncblx0XHRPYmplY3QuZW50cmllcyhjb3B5LmZpZWxkcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSAmJiAhKFwidGV4dFwiIGluIHZhbHVlKSkge1xuXHRcdFx0XHRjb3B5LmZpZWxkc1trZXldID0gdmFsdWUudmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LnZhbHVlcyhjb3B5LnN1Ymxpc3RzKS5mb3JFYWNoKChzdWJsaXN0KSA9PiB7XG5cdFx0XHRzdWJsaXN0LmxpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcblx0XHRcdFx0T2JqZWN0LmVudHJpZXMobGluZSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgJiYgIShcInRleHRcIiBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdGxpbmVba2V5XSA9IHZhbHVlLnZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZiAoIXRoaXMuaWQpIHtcblx0XHRcdHRoaXMuaWQgPSBjb3B5LmlkID0gTWF0aC5tYXgoQXJyYXkuZnJvbShTdWl0ZVNjcmlwdE1vY2tzLnJlY29yZHMudmFsdWVzKCkpLm1hcCgoYSkgPT4gYS5pZCkpICsgMTtcblx0XHRcdFN1aXRlU2NyaXB0TW9ja3MuY3JlYXRlZFJlY29yZHMucHVzaChjb3B5KTtcblx0XHR9XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLnNldChjb3B5KTtcblx0XHRTdWl0ZVNjcmlwdE1vY2tzLnNhdmVkUmVjb3Jkcy5wdXNoKGNvcHkpO1xuXHRcdHJldHVybiB0aGlzLmlkO1xuXHR9O1xuXG5cdC8vIFRPRE86IGVkZ2UgY2FzZSB3aGVyZSBpZiBmaXJzdCBsaW5lIHNlbGVjdCB5b3UgZG8gaXMgbiArIDEgaXQgd2lsbCBnaXZlIGEgbmV3IGxpbmVcblx0QGR5bmFtaWNNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwibGluZVwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJsaW5lXCIpXG5cdHNlbGVjdExpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkIHx8ICEob3B0aW9ucy5saW5lIGluIHN1Ymxpc3QubGluZXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzdWJsaXN0IG9yIGxpbmUgZG9lcyBub3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdHN1Ymxpc3QuY3VycmVudGxpbmUgPSB7IC4uLnN1Ymxpc3QubGluZXNbb3B0aW9ucy5saW5lXSB9O1xuXHR9O1xuXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIilcblx0c2VsZWN0TmV3TGluZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuc3VibGlzdHNbb3B0aW9ucy5zdWJsaXN0SWRdO1xuXHRcdGlmIChzdWJsaXN0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInN1Ymxpc3QgZG9lcyBub3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdHN1Ymxpc3QuY3VycmVudGxpbmUgPSB7XG5cdFx0XHRfaWQ6IHJhbmRvbVVVSUQoKSxcblx0XHR9O1xuXHR9O1xuXG5cdHNldEN1cnJlbnRNYXRyaXhTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge307XG5cblx0QGR5bmFtaWNNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcInRleHRcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcInRleHRcIilcblx0c2V0Q3VycmVudFN1Ymxpc3RUZXh0ID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBzdWJsaXN0ID0gdGhpcz8uc3VibGlzdHM/LltvcHRpb25zLnN1Ymxpc3RJZF07XG5cdFx0aWYgKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCB8fCAhKFwiY3VycmVudGxpbmVcIiBpbiBzdWJsaXN0KSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwic3VibGlzdCBkb2Vzbid0IGV4aXN0IG9yIGxpbmUgaXMgbm90IHNlbGVjdGVkXCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gKHN1Ymxpc3QuY3VycmVudGxpbmVbb3B0aW9ucy5maWVsZElkXSA9IHsgdmFsdWU6IG9wdGlvbnMudGV4dCwgdGV4dDogb3B0aW9ucy50ZXh0IH0pO1xuXHR9O1xuXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJ2YWx1ZVwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwidmFsdWVcIilcblx0c2V0Q3VycmVudFN1Ymxpc3RWYWx1ZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXM/LnN1Ymxpc3RzPy5bb3B0aW9ucy5zdWJsaXN0SWRdO1xuXHRcdGlmIChzdWJsaXN0ID09PSB1bmRlZmluZWQgfHwgIShcImN1cnJlbnRsaW5lXCIgaW4gc3VibGlzdCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInN1Ymxpc3QgZG9lc24ndCBleGlzdCBvciBsaW5lIGlzIG5vdCBzZWxlY3RlZFwiKTtcblx0XHR9XG5cdFx0cmV0dXJuIChzdWJsaXN0LmN1cnJlbnRsaW5lW29wdGlvbnMuZmllbGRJZF0gPSB7IHZhbHVlOiBvcHRpb25zLnZhbHVlIH0pO1xuXHR9O1xuXG5cdHNldE1hdHJpeEhlYWRlclZhbHVlID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdHNldE1hdHJpeFN1Ymxpc3RWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAc3RhbmRhcmRNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIiwgXCJ0ZXh0XCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIsIFwidGV4dFwiKVxuXHRzZXRTdWJsaXN0VGV4dCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXM/LnN1Ymxpc3RzPy5bb3B0aW9ucy5zdWJsaXN0SWRdO1xuXHRcdGlmIChzdWJsaXN0ID09PSB1bmRlZmluZWQgfHwgIShvcHRpb25zLmxpbmUgaW4gc3VibGlzdC5saW5lcykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInN1Ymxpc3Qgb3IgbGluZSBkb2Vzbid0IGV4aXN0XCIpO1xuXHRcdH1cblx0XHRzdWJsaXN0LmxpbmVzW29wdGlvbnMubGluZV1bb3B0aW9ucy5maWVsZElkXSA9IHsgdmFsdWU6IG9wdGlvbnMudGV4dCwgdGV4dDogb3B0aW9ucy50ZXh0IH07XG5cdH07XG5cblx0QHN0YW5kYXJkTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIsIFwidmFsdWVcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIiwgXCJ2YWx1ZVwiKVxuXHRzZXRTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzPy5zdWJsaXN0cz8uW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkIHx8ICEob3B0aW9ucy5saW5lIGluIHN1Ymxpc3QubGluZXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzdWJsaXN0IG9yIGxpbmUgZG9lc24ndCBleGlzdFwiKTtcblx0XHR9XG5cdFx0c3VibGlzdC5saW5lc1tvcHRpb25zLmxpbmVdW29wdGlvbnMuZmllbGRJZF0gPSB7IHZhbHVlOiBvcHRpb25zLnZhbHVlIH07XG5cdH07XG5cblx0QG9wdGlvbnMoXCJmaWVsZElkXCIsIFwidGV4dFwiLCBcImlnbm9yZUZpZWxkQ2hhbmdlXCIpXG5cdEByZXF1aXJlZChcImZpZWxkSWRcIiwgXCJ0ZXh0XCIpXG5cdHNldFRleHQgPSAob3B0aW9ucykgPT4ge1xuXHRcdHRoaXMuZmllbGRzW29wdGlvbnMuZmllbGRJZF0gPSB7IHZhbHVlOiBvcHRpb25zLnRleHQsIHRleHQ6IG9wdGlvbnMudGV4dCB9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiZmllbGRJZFwiLCBcInZhbHVlXCIsIFwiaWdub3JlRmllbGRDaGFuZ2VcIilcblx0QHJlcXVpcmVkKFwiZmllbGRJZFwiLCBcInZhbHVlXCIpXG5cdHNldFZhbHVlID0gKG9wdGlvbnMpID0+IHtcblx0XHR0aGlzLmZpZWxkc1tvcHRpb25zLmZpZWxkSWRdID0geyB2YWx1ZTogb3B0aW9ucy52YWx1ZSB9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY29yZDtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ25DLE1BQU1DLGVBQWUsR0FBR0QsT0FBTyxDQUFDLHNDQUFzQyxDQUFDO0FBQ3ZFLE1BQU07RUFBRUU7QUFBVyxDQUFDLEdBQUdGLE9BQU8sQ0FBQyxhQUFhLENBQUM7QUFDN0MsTUFBTUcsZ0JBQWdCLEdBQUdILE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUNuRCxNQUFNO0VBQ0xJLE9BQU87RUFDUEMsUUFBUTtFQUNSQyxVQUFVO0VBQ1ZDLGVBQWU7RUFDZkMsZ0JBQWdCO0VBQ2hCQztBQUNELENBQUMsR0FBR1QsT0FBTyxDQUFDLG1CQUFtQixDQUFDO0FBQUMsSUFBQVUsT0FBQTtBQUFBQyxJQUFBLEdBRWhDRixpQkFBaUIsQ0FBQyxDQUFDO0FBQUFHLEtBQUEsR0F5QmxCTCxlQUFlLENBQUMsQ0FBQztBQUFBTSxLQUFBLEdBQ2pCVCxPQUFPLENBQUMsV0FBVyxDQUFDO0FBQUFVLEtBQUEsR0FDcEJULFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFBQVUsS0FBQSxHQUtyQlIsZUFBZSxDQUFDLENBQUM7QUFBQVMsS0FBQSxHQUNqQlosT0FBTyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUM7QUFBQWEsS0FBQSxHQUNwQ1osUUFBUSxDQUFDLFdBQVcsQ0FBQztBQUFBYSxLQUFBLEdBZXJCWixVQUFVLENBQUMsQ0FBQztBQUFBYSxLQUFBLEdBZVpaLGVBQWUsQ0FBQyxDQUFDO0FBQUFhLE1BQUEsR0FDakJoQixPQUFPLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztBQUFB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