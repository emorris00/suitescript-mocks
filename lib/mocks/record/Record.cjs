var _initClass, _dec, _dec2, _dec3, _dec4, _init_cancelLine, _dec5, _dec6, _dec7, _init_commitLine, _dec8, _init_executeMacro, _dec9, _dec10, _init_findSublistLineWithValue, _dec11, _init_getCurrentMatrixSublistValue, _dec12, _dec13, _dec14, _init_getCurrentSublistField, _dec15, _dec16, _dec17, _init_getCurrentSublistIndex, _dec18, _dec19, _init_getCurrentSublistSubrecord, _dec20, _dec21, _dec22, _init_getCurrentSublistText, _dec23, _dec24, _dec25, _init_getCurrentSublistValue, _dec26, _dec27, _init_getField, _dec28, _dec29, _init_getLineCount, _dec30, _dec31, _init_getSublist, _dec32, _dec33, _init_getSublistField, _dec34, _dec35, _init_getSublistFields, _dec36, _dec37, _init_getSublistSubrecord, _dec38, _dec39, _init_getSublistText, _dec40, _dec41, _init_getSublistValue, _dec42, _dec43, _init_getSubrecord, _dec44, _dec45, _init_getText, _dec46, _dec47, _init_getValue, _dec48, _dec49, _dec50, _init_hasCurrentSublistSubrecord, _dec51, _dec52, _init_hasSublistSubrecord, _dec53, _dec54, _init_hasSubrecord, _dec55, _dec56, _init_insertLine, _dec57, _dec58, _dec59, _init_removeCurrentSublistSubrecord, _dec60, _dec61, _init_removeLine, _dec62, _dec63, _dec64, _init_removeSublistSubrecord, _dec65, _dec66, _init_removeSubrecord, _dec67, _dec68, _init_save, _dec69, _dec70, _dec71, _init_selectLine, _dec72, _dec73, _dec74, _init_selectNewLine, _dec75, _dec76, _dec77, _init_setCurrentSublistText, _dec78, _dec79, _dec80, _init_setCurrentSublistValue, _dec81, _dec82, _dec83, _init_setSublistText, _dec84, _dec85, _dec86, _init_setSublistValue, _dec87, _dec88, _init_setText, _dec89, _dec90, _init_setValue;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const datefns = require("date-fns");
const structuredClone = require("core-js-pure/actual/structured-clone");
const {
  randomUUID
} = require("node:crypto");
const SuiteScriptMocks = require("../../index.cjs");
const Field = require("./Field.cjs");
const Sublist = require("./Sublist.cjs");
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
_dec9 = options("sublistId", "fieldId", "value");
_dec10 = required("sublistId", "fieldId", "value");
_dec11 = dynamicModeOnly();
_dec12 = dynamicModeOnly();
_dec13 = options("sublistId", "fieldId");
_dec14 = required("sublistId", "fieldId");
_dec15 = dynamicModeOnly();
_dec16 = options("sublistId");
_dec17 = required("sublistId");
_dec18 = dynamicModeOnly();
_dec19 = options("sublistId", "fieldId");
_dec20 = dynamicModeOnly();
_dec21 = options("sublistId", "fieldId");
_dec22 = required("sublistId", "fieldId");
_dec23 = dynamicModeOnly();
_dec24 = options("sublistId", "fieldId");
_dec25 = required("sublistId", "fieldId");
_dec26 = options("fieldId");
_dec27 = required("fieldId");
_dec28 = options("sublistId");
_dec29 = required("sublistId");
_dec30 = options("sublistId");
_dec31 = required("sublistId");
_dec32 = options("sublistId", "fieldId", "line");
_dec33 = required("sublistId", "fieldId", "line");
_dec34 = options("sublistId");
_dec35 = required("sublistId");
_dec36 = options("sublistId", "fieldId", "line");
_dec37 = required("sublistId", "fieldId", "line");
_dec38 = options("sublistId", "fieldId", "line");
_dec39 = required("sublistId", "fieldId", "line");
_dec40 = options("sublistId", "fieldId", "line");
_dec41 = required("sublistId", "fieldId", "line");
_dec42 = options("fieldId");
_dec43 = required("fieldId");
_dec44 = options("fieldId");
_dec45 = required("fieldId");
_dec46 = options("fieldId");
_dec47 = required("fieldId");
_dec48 = dynamicModeOnly();
_dec49 = options("sublistId", "fieldId");
_dec50 = required("sublistId", "fieldId");
_dec51 = options("sublistId", "fieldId", "line");
_dec52 = required("sublistId", "fieldId", "line");
_dec53 = options("fieldId");
_dec54 = required("fieldId");
_dec55 = options("sublistId", "line", "ignoreRecalc");
_dec56 = required("sublistId", "line");
_dec57 = dynamicModeOnly();
_dec58 = options("sublistId", "fieldId");
_dec59 = required("sublistId", "fieldId");
_dec60 = options("sublistId", "line", "ignoreRecalc", "lineInstanceId");
_dec61 = required("sublistId", "line");
_dec62 = standardModeOnly();
_dec63 = options("sublistId", "fieldId", "line");
_dec64 = required("sublistId", "fieldId", "line");
_dec65 = options("fieldId");
_dec66 = required("fieldId");
_dec67 = addPromise();
_dec68 = options("enableSourcing", "ignoreMandatoryFields");
_dec69 = dynamicModeOnly();
_dec70 = options("sublistId", "line");
_dec71 = required("sublistId", "line");
_dec72 = dynamicModeOnly();
_dec73 = options("sublistId");
_dec74 = required("sublistId");
_dec75 = dynamicModeOnly();
_dec76 = options("sublistId", "fieldId", "text");
_dec77 = required("sublistId", "fieldId", "text");
_dec78 = dynamicModeOnly();
_dec79 = options("sublistId", "fieldId", "value");
_dec80 = required("sublistId", "fieldId", "value");
_dec81 = standardModeOnly();
_dec82 = options("sublistId", "fieldId", "line", "text");
_dec83 = required("sublistId", "fieldId", "line", "text");
_dec84 = standardModeOnly();
_dec85 = options("sublistId", "fieldId", "line", "value");
_dec86 = required("sublistId", "fieldId", "line", "value");
_dec87 = options("fieldId", "text", "ignoreFieldChange");
_dec88 = required("fieldId", "text");
_dec89 = options("fieldId", "value", "ignoreFieldChange");
_dec90 = required("fieldId", "value");
class Record {
  static {
    ({
      e: [_init_cancelLine, _init_commitLine, _init_executeMacro, _init_findSublistLineWithValue, _init_getCurrentMatrixSublistValue, _init_getCurrentSublistField, _init_getCurrentSublistIndex, _init_getCurrentSublistSubrecord, _init_getCurrentSublistText, _init_getCurrentSublistValue, _init_getField, _init_getLineCount, _init_getSublist, _init_getSublistField, _init_getSublistFields, _init_getSublistSubrecord, _init_getSublistText, _init_getSublistValue, _init_getSubrecord, _init_getText, _init_getValue, _init_hasCurrentSublistSubrecord, _init_hasSublistSubrecord, _init_hasSubrecord, _init_insertLine, _init_removeCurrentSublistSubrecord, _init_removeLine, _init_removeSublistSubrecord, _init_removeSubrecord, _init_save, _init_selectLine, _init_selectNewLine, _init_setCurrentSublistText, _init_setCurrentSublistValue, _init_setSublistText, _init_setSublistValue, _init_setText, _init_setValue],
      c: [_Record, _initClass]
    } = _applyDecs2203R(this, [[[_dec2, _dec3, _dec4], 0, "cancelLine"], [[_dec5, _dec6, _dec7], 0, "commitLine"], [_dec8, 0, "executeMacro"], [[_dec9, _dec10], 0, "findSublistLineWithValue"], [_dec11, 0, "getCurrentMatrixSublistValue"], [[_dec12, _dec13, _dec14], 0, "getCurrentSublistField"], [[_dec15, _dec16, _dec17], 0, "getCurrentSublistIndex"], [[_dec18, _dec19], 0, "getCurrentSublistSubrecord"], [[_dec20, _dec21, _dec22], 0, "getCurrentSublistText"], [[_dec23, _dec24, _dec25], 0, "getCurrentSublistValue"], [[_dec26, _dec27], 0, "getField"], [[_dec28, _dec29], 0, "getLineCount"], [[_dec30, _dec31], 0, "getSublist"], [[_dec32, _dec33], 0, "getSublistField"], [[_dec34, _dec35], 0, "getSublistFields"], [[_dec36, _dec37], 0, "getSublistSubrecord"], [[_dec38, _dec39], 0, "getSublistText"], [[_dec40, _dec41], 0, "getSublistValue"], [[_dec42, _dec43], 0, "getSubrecord"], [[_dec44, _dec45], 0, "getText"], [[_dec46, _dec47], 0, "getValue"], [[_dec48, _dec49, _dec50], 0, "hasCurrentSublistSubrecord"], [[_dec51, _dec52], 0, "hasSublistSubrecord"], [[_dec53, _dec54], 0, "hasSubrecord"], [[_dec55, _dec56], 0, "insertLine"], [[_dec57, _dec58, _dec59], 0, "removeCurrentSublistSubrecord"], [[_dec60, _dec61], 0, "removeLine"], [[_dec62, _dec63, _dec64], 0, "removeSublistSubrecord"], [[_dec65, _dec66], 0, "removeSubrecord"], [[_dec67, _dec68], 0, "save"], [[_dec69, _dec70, _dec71], 0, "selectLine"], [[_dec72, _dec73, _dec74], 0, "selectNewLine"], [[_dec75, _dec76, _dec77], 0, "setCurrentSublistText"], [[_dec78, _dec79, _dec80], 0, "setCurrentSublistValue"], [[_dec81, _dec82, _dec83], 0, "setSublistText"], [[_dec84, _dec85, _dec86], 0, "setSublistValue"], [[_dec87, _dec88], 0, "setText"], [[_dec89, _dec90], 0, "setValue"]], [_dec]));
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
    this.sublists = Object.entries(this.sublists || {}).reduce((acc, [lineId, lines]) => {
      acc[lineId] = {
        currentline: {},
        lines: [...(("lines" in lines ? lines.lines : lines) || [])]
      };
      acc[lineId].lines = acc[lineId].lines.map(line => {
        line = {
          ...line
        };
        line._id = line._id || randomUUID();
        Object.entries(line).forEach(([key, value]) => {
          if (value instanceof _Record) {
            line[key] = new _Record(value);
          } else {
            line[key] = structuredClone(value);
          }
        });
        return line;
      });
      return acc;
    }, {});
    this.subrecords = Object.entries(this.subrecords || {}).reduce((acc, [subrecordId, subrecord]) => {
      acc[subrecordId] = new _Record(subrecord);
      return acc;
    }, {});
  };
  #getSublist(options) {
    const sublist = this.sublists[options.sublistId];
    if (!sublist) {
      throw new Error("Sublist does not exist");
    }
    return sublist;
  }
  #getLine(options) {
    const sublist = this.#getSublist(options);
    const line = sublist.lines[options.line];
    if (!line) {
      throw new Error("Line does not exist");
    }
    return line;
  }
  cancelLine = _init_cancelLine(this, options => {
    this.selectNewLine(options.sublistId);
    return this;
  });
  commitLine = _init_commitLine(this, options => {
    const sublist = this.#getSublist(options);
    if (!sublist.currentline._id) {
      sublist.currentline._id = randomUUID();
    }
    sublist.lines[this.getCurrentSublistIndex(options.sublistId)] = sublist.currentline;
    this.selectNewLine(options.sublistId);
    return this;
  });
  executeMacro = _init_executeMacro(this, options => {});
  findMatrixSublistLineWithValue = options => {};
  findSublistLineWithValue = _init_findSublistLineWithValue(this, options => {
    for (let i = 0; i < this.getLineCount(options.sublistId); i++) {
      if (this.getSublistValue(options.sublistId, options.fieldId, i) == options.value) {
        return i;
      }
    }
    return -1;
  });
  getCurrentMatrixSublistValue = _init_getCurrentMatrixSublistValue(this, options => {});
  getCurrentSublistField = _init_getCurrentSublistField(this, options => {
    const sublist = this.#getSublist(options);
    if (options.fieldId in sublist.currentline) {
      return new Field({
        id: options.fieldId,
        label: options.fieldId,
        sublistId: options.sublistId
      });
    }
    return null;
  });
  getCurrentSublistIndex = _init_getCurrentSublistIndex(this, options => {
    const sublist = this?.sublists?.[options.sublistId];
    if (sublist) {
      const existingIndex = sublist?.lines.findIndex(a => a._id === sublist.currentline._id);
      return existingIndex > -1 ? existingIndex : sublist?.lines.length;
    }
    return -1;
  });
  getCurrentSublistSubrecord = _init_getCurrentSublistSubrecord(this, options => {
    const sublist = this.#getSublist(options);
    if (!(options.fieldId in sublist.currentline) || !(sublist.currentline[options.fieldId] instanceof _Record)) {
      throw new Error(`Field ${options.fieldId} is not a subrecord field`);
    }
    return sublist.currentline[options.fieldId];
  });
  getCurrentSublistText = _init_getCurrentSublistText(this, options => {
    const sublist = this.#getSublist(options);
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
    // this is correct, suitescript doesn't error when supplying a sublistId that doesn't exist
    if (sublist === undefined) {
      return null;
    }
    const field = sublist.currentline[options.fieldId];
    if (typeof field === "object" && field !== null && !(Object.prototype.toString.call(field) === "[object Date]")) {
      return field.value;
    }
    return field;
  });
  getField = _init_getField(this, options => {
    if (options.fieldId in this.fields) {
      return new Field({
        id: options.fieldId,
        label: options.fieldId
      });
    }
    return null;
  });
  getFields = () => {
    return Object.keys(this.fields);
  };
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
  getSublist = _init_getSublist(this, options => {
    if (options.sublistId in this.sublists) {
      return new Sublist({
        id: options.sublistId
      });
    }
    return null;
  });
  getSublists = () => {
    return Object.keys(this.sublists);
  };
  getSublistField = _init_getSublistField(this, options => {
    const line = this.#getLine(options);
    if (options.fieldId in line) {
      return new Field({
        id: options.fieldId,
        label: options.fieldId,
        sublistId: options.sublistId
      });
    }
    return null;
  });
  getSublistFields = _init_getSublistFields(this, options => {
    const sublist = this.#getSublist(options);
    return Object.keys(sublist.lines[0] || {}).filter(id => id !== "_id");
  });
  getSublistSubrecord = _init_getSublistSubrecord(this, options => {
    const line = this.#getLine(options);
    if (!(options.fieldId in line) || !(line[options.fieldId] instanceof _Record)) {
      throw new Error(`Field ${options.fieldId} is not a subrecord field`);
    }
    return line[options.fieldId];
  });
  getSublistText = _init_getSublistText(this, options => {
    const line = this.#getLine(options);
    const field = line[options.fieldId];
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
    const line = this.#getLine(options);
    const field = line[options.fieldId];
    if (typeof field === "object" && field !== null && !(Object.prototype.toString.call(field) === "[object Date]")) {
      return field.value;
    }
    return field;
  });
  getSubrecord = _init_getSubrecord(this, options => {
    if (!(options.fieldId in this.subrecords)) {
      throw new Error(`Field ${options.fieldId} is not a subrecord field`);
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
  hasCurrentSublistSubrecord = _init_hasCurrentSublistSubrecord(this, options => {
    return Boolean(this.getCurrentSublistSubrecord(options));
  });
  hasSublistSubrecord = _init_hasSublistSubrecord(this, options => {
    return Boolean(this.getSublistSubrecord(options));
  });
  hasSubrecord = _init_hasSubrecord(this, options => {
    return Boolean(this.getSubrecord(options));
  });
  insertLine = _init_insertLine(this, options => {
    const sublist = this.sublists[options.sublistId];
    if (!sublist) {
      throw new Error("Sublist does not exist");
    }
    if (options.line < 0 || options.line > sublist.lines.length) {
      throw new Error("Line is outside valid range");
    }
    sublist.lines.splice(options.line, 0, {});
    if (this.isDynamic) {
      this.selectLine(options);
    }
    return this;
  });

  // @options("sublistId", "from", "to")
  // @required("sublistId", "from", "to")
  // moveLine = (options) => {
  // 	const sublist = this.#getSublist(options);
  // 	if (options.from < 0 || options.from > sublist.lines.length - 1) {
  // 		throw new Error("From is outside valid range");
  // 	}
  // 	if (options.to < 0 || options.to > sublist.lines.length) {
  // 		throw new Error("To is outside valid range");
  // 	}
  // 	// if (options.to > options.from) {
  // 	// 	options.to--;
  // 	// }
  // 	const line = sublist.lines.splice(options.from, 1);
  // 	sublist.lines.splice(options.to, 0, line);
  // 	return this;
  // };

  removeCurrentSublistSubrecord = _init_removeCurrentSublistSubrecord(this, options => {
    const sublist = this.#getSublist(options);
    if (!(options.fieldId in sublist.currentline) || !(sublist.currentline[options.fieldId] instanceof _Record)) {
      throw new Error(`Field ${options.fieldId} is not a subrecord field`);
    }
    sublist.currentline[options.fieldId] = null;
    return this;
  });
  removeLine = _init_removeLine(this, options => {
    const sublist = this.#getSublist(options);
    this.#getLine(options);
    sublist.lines.splice(options.line, 1);
    if (this.isDynamic) {
      if (sublist.lines.length > 0) {
        this.selectLine(options.sublistId, 0);
      } else {
        this.selectNewLine(options.sublistId);
      }
    }
    return this;
  });
  removeSublistSubrecord = _init_removeSublistSubrecord(this, options => {
    const line = this.#getLine(options);
    if (!(options.fieldId in line) || !(line[options.fieldId] instanceof _Record)) {
      throw new Error(`Field ${options.fieldId} is not a subrecord field`);
    }
    line[options.fieldId] = null;
    return this;
  });
  removeSubrecord = _init_removeSubrecord(this, options => {
    if (!(options.fieldId in this.subrecords)) {
      throw new Error(`Field ${options.fieldId} is not a subrecord field`);
    }
    this.subrecords[options.fieldId] = null;
    return this;
  });
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
      this.id = copy.id = Math.max(...Array.from(SuiteScriptMocks.records.values()).map(a => a.id)) + 1;
      SuiteScriptMocks.createdRecords.push(copy);
    }
    SuiteScriptMocks.records.set(copy);
    SuiteScriptMocks.savedRecords.push(copy);
    return this.id;
  });
  selectLine = _init_selectLine(this, options => {
    const sublist = this.#getSublist(options);
    if (options.line != this.getCurrentSublistIndex(options.sublistId)) {
      const line = this.#getLine(options);
      sublist.currentline = {
        ...line
      };
      sublist.lines = sublist.lines.filter(a => a._id);
    }
    return this;
  });
  selectNewLine = _init_selectNewLine(this, options => {
    const sublist = this.#getSublist(options);
    sublist.currentline = {};
    sublist.lines = sublist.lines.filter(a => a._id);
    return this;
  });
  setCurrentMatrixSublistValue = options => {};
  setCurrentSublistText = _init_setCurrentSublistText(this, options => {
    const sublist = this.#getSublist(options);
    sublist.currentline[options.fieldId] = {
      value: options.text,
      text: options.text
    };
    return this;
  });
  setCurrentSublistValue = _init_setCurrentSublistValue(this, options => {
    const sublist = this.#getSublist(options);
    sublist.currentline[options.fieldId] = {
      value: options.value
    };
    return this;
  });
  setMatrixHeaderValue = options => {};
  setMatrixSublistValue = options => {};
  setSublistText = _init_setSublistText(this, options => {
    const line = this.#getLine(options);
    line[options.fieldId] = {
      value: options.text,
      text: options.text
    };
    return this;
  });
  setSublistValue = _init_setSublistValue(this, options => {
    const line = this.#getLine(options);
    line[options.fieldId] = {
      value: options.value
    };
    return this;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkYXRlZm5zIiwicmVxdWlyZSIsInN0cnVjdHVyZWRDbG9uZSIsInJhbmRvbVVVSUQiLCJTdWl0ZVNjcmlwdE1vY2tzIiwiRmllbGQiLCJTdWJsaXN0Iiwib3B0aW9ucyIsInJlcXVpcmVkIiwiYWRkUHJvbWlzZSIsImR5bmFtaWNNb2RlT25seSIsInN0YW5kYXJkTW9kZU9ubHkiLCJhc3NpZ25Db25zdHJ1Y3RvciIsIl9SZWNvcmQiLCJfZGVjIiwiX2RlYzIiLCJfZGVjMyIsIl9kZWM0IiwiX2RlYzUiLCJfZGVjNiIsIl9kZWM3IiwiX2RlYzgiLCJfZGVjOSIsIl9kZWMxMCIsIl9kZWMxMSIsIl9kZWMxMiIsIl9kZWMxMyIsIl9kZWMxNCIsIl9kZWMxNSIsIl9kZWMxNiIsIl9kZWMxNyIsIl9kZWMxOCIsIl9kZWMxOSIsIl9kZWMyMCIsIl9kZWMyMSIsIl9kZWMyMiIsIl9kZWMyMyIsIl9kZWMyNCIsIl9kZWMyNSIsIl9kZWMyNiIsIl9kZWMyNyIsIl9kZWMyOCIsIl9kZWMyOSIsIl9kZWMzMCIsIl9kZWMzMSIsIl9kZWMzMiIsIl9kZWMzMyIsIl9kZWMzNCIsIl9kZWMzNSIsIl9kZWMzNiIsIl9kZWMzNyIsIl9kZWMzOCIsIl9kZWMzOSIsIl9kZWM0MCIsIl9kZWM0MSIsIl9kZWM0MiIsIl9kZWM0MyIsIl9kZWM0NCIsIl9kZWM0NSIsIl9kZWM0NiIsIl9kZWM0NyIsIl9kZWM0OCIsIl9kZWM0OSIsIl9kZWM1MCIsIl9kZWM1MSIsIl9kZWM1MiIsIl9kZWM1MyIsIl9kZWM1NCIsIl9kZWM1NSIsIl9kZWM1NiIsIl9kZWM1NyIsIl9kZWM1OCIsIl9kZWM1OSIsIl9kZWM2MCIsIl9kZWM2MSIsIl9kZWM2MiIsIl9kZWM2MyIsIl9kZWM2NCIsIl9kZWM2NSIsIl9kZWM2NiIsIl9kZWM2NyIsIl9kZWM2OCIsIl9kZWM2OSIsIl9kZWM3MCIsIl9kZWM3MSIsIl9kZWM3MiIsIl9kZWM3MyIsIl9kZWM3NCIsIl9kZWM3NSIsIl9kZWM3NiIsIl9kZWM3NyIsIl9kZWM3OCIsIl9kZWM3OSIsIl9kZWM4MCIsIl9kZWM4MSIsIl9kZWM4MiIsIl9kZWM4MyIsIl9kZWM4NCIsIl9kZWM4NSIsIl9kZWM4NiIsIl9kZWM4NyIsIl9kZWM4OCIsIl9kZWM4OSIsIl9kZWM5MCIsIlJlY29yZCIsImUiLCJfaW5pdF9jYW5jZWxMaW5lIiwiX2luaXRfY29tbWl0TGluZSIsIl9pbml0X2V4ZWN1dGVNYWNybyIsIl9pbml0X2ZpbmRTdWJsaXN0TGluZVdpdGhWYWx1ZSIsIl9pbml0X2dldEN1cnJlbnRNYXRyaXhTdWJsaXN0VmFsdWUiLCJfaW5pdF9nZXRDdXJyZW50U3VibGlzdEZpZWxkIiwiX2luaXRfZ2V0Q3VycmVudFN1Ymxpc3RJbmRleCIsIl9pbml0X2dldEN1cnJlbnRTdWJsaXN0U3VicmVjb3JkIiwiX2luaXRfZ2V0Q3VycmVudFN1Ymxpc3RUZXh0IiwiX2luaXRfZ2V0Q3VycmVudFN1Ymxpc3RWYWx1ZSIsIl9pbml0X2dldEZpZWxkIiwiX2luaXRfZ2V0TGluZUNvdW50IiwiX2luaXRfZ2V0U3VibGlzdCIsIl9pbml0X2dldFN1Ymxpc3RGaWVsZCIsIl9pbml0X2dldFN1Ymxpc3RGaWVsZHMiLCJfaW5pdF9nZXRTdWJsaXN0U3VicmVjb3JkIiwiX2luaXRfZ2V0U3VibGlzdFRleHQiLCJfaW5pdF9nZXRTdWJsaXN0VmFsdWUiLCJfaW5pdF9nZXRTdWJyZWNvcmQiLCJfaW5pdF9nZXRUZXh0IiwiX2luaXRfZ2V0VmFsdWUiLCJfaW5pdF9oYXNDdXJyZW50U3VibGlzdFN1YnJlY29yZCIsIl9pbml0X2hhc1N1Ymxpc3RTdWJyZWNvcmQiLCJfaW5pdF9oYXNTdWJyZWNvcmQiLCJfaW5pdF9pbnNlcnRMaW5lIiwiX2luaXRfcmVtb3ZlQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQiLCJfaW5pdF9yZW1vdmVMaW5lIiwiX2luaXRfcmVtb3ZlU3VibGlzdFN1YnJlY29yZCIsIl9pbml0X3JlbW92ZVN1YnJlY29yZCIsIl9pbml0X3NhdmUiLCJfaW5pdF9zZWxlY3RMaW5lIiwiX2luaXRfc2VsZWN0TmV3TGluZSIsIl9pbml0X3NldEN1cnJlbnRTdWJsaXN0VGV4dCIsIl9pbml0X3NldEN1cnJlbnRTdWJsaXN0VmFsdWUiLCJfaW5pdF9zZXRTdWJsaXN0VGV4dCIsIl9pbml0X3NldFN1Ymxpc3RWYWx1ZSIsIl9pbml0X3NldFRleHQiLCJfaW5pdF9zZXRWYWx1ZSIsImMiLCJfaW5pdENsYXNzIiwiX2FwcGx5RGVjczIyMDNSIiwiaWQiLCJ0eXBlIiwiZmllbGRzIiwic3VibGlzdHMiLCJzdWJyZWNvcmRzIiwiaXNEeW5hbWljIiwidmVyc2lvbiIsImluaXRpYWxpemUiLCJPYmplY3QiLCJlbnRyaWVzIiwicmVkdWNlIiwiYWNjIiwibGluZUlkIiwibGluZXMiLCJjdXJyZW50bGluZSIsIm1hcCIsImxpbmUiLCJfaWQiLCJmb3JFYWNoIiwia2V5IiwidmFsdWUiLCJzdWJyZWNvcmRJZCIsInN1YnJlY29yZCIsImdldFN1Ymxpc3QiLCIjZ2V0U3VibGlzdCIsInN1Ymxpc3QiLCJzdWJsaXN0SWQiLCJFcnJvciIsImdldExpbmUiLCIjZ2V0TGluZSIsImNhbmNlbExpbmUiLCJzZWxlY3ROZXdMaW5lIiwiY29tbWl0TGluZSIsImdldEN1cnJlbnRTdWJsaXN0SW5kZXgiLCJleGVjdXRlTWFjcm8iLCJmaW5kTWF0cml4U3VibGlzdExpbmVXaXRoVmFsdWUiLCJmaW5kU3VibGlzdExpbmVXaXRoVmFsdWUiLCJpIiwiZ2V0TGluZUNvdW50IiwiZ2V0U3VibGlzdFZhbHVlIiwiZmllbGRJZCIsImdldEN1cnJlbnRNYXRyaXhTdWJsaXN0VmFsdWUiLCJnZXRDdXJyZW50U3VibGlzdEZpZWxkIiwibGFiZWwiLCJleGlzdGluZ0luZGV4IiwiZmluZEluZGV4IiwiYSIsImxlbmd0aCIsImdldEN1cnJlbnRTdWJsaXN0U3VicmVjb3JkIiwiZ2V0Q3VycmVudFN1Ymxpc3RUZXh0IiwiZmllbGQiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJmb3JtYXQiLCJkYXRlRm9ybWF0IiwidGV4dCIsImdldEN1cnJlbnRTdWJsaXN0VmFsdWUiLCJ1bmRlZmluZWQiLCJnZXRGaWVsZCIsImdldEZpZWxkcyIsImtleXMiLCJnZXRNYWNybyIsImdldE1hY3JvcyIsImdldE1hdHJpeEhlYWRlckNvdW50IiwiZ2V0TWF0cml4SGVhZGVyRmllbGQiLCJnZXRNYXRyaXhIZWFkZXJWYWx1ZSIsImdldE1hdHJpeFN1Ymxpc3RGaWVsZCIsImdldE1hdHJpeFN1Ymxpc3RWYWx1ZSIsImdldFN1Ymxpc3RzIiwiZ2V0U3VibGlzdEZpZWxkIiwiZ2V0U3VibGlzdEZpZWxkcyIsImZpbHRlciIsImdldFN1Ymxpc3RTdWJyZWNvcmQiLCJnZXRTdWJsaXN0VGV4dCIsImdldFN1YnJlY29yZCIsImdldFRleHQiLCJnZXRWYWx1ZSIsImhhc0N1cnJlbnRTdWJsaXN0U3VicmVjb3JkIiwiQm9vbGVhbiIsImhhc1N1Ymxpc3RTdWJyZWNvcmQiLCJoYXNTdWJyZWNvcmQiLCJpbnNlcnRMaW5lIiwic3BsaWNlIiwic2VsZWN0TGluZSIsInJlbW92ZUN1cnJlbnRTdWJsaXN0U3VicmVjb3JkIiwicmVtb3ZlTGluZSIsInJlbW92ZVN1Ymxpc3RTdWJyZWNvcmQiLCJyZW1vdmVTdWJyZWNvcmQiLCJzYXZlIiwicmVjb3JkcyIsImdldCIsImNvcHkiLCJEYXRlIiwidmFsdWVzIiwiTWF0aCIsIm1heCIsIkFycmF5IiwiZnJvbSIsImNyZWF0ZWRSZWNvcmRzIiwicHVzaCIsInNldCIsInNhdmVkUmVjb3JkcyIsInNldEN1cnJlbnRNYXRyaXhTdWJsaXN0VmFsdWUiLCJzZXRDdXJyZW50U3VibGlzdFRleHQiLCJzZXRDdXJyZW50U3VibGlzdFZhbHVlIiwic2V0TWF0cml4SGVhZGVyVmFsdWUiLCJzZXRNYXRyaXhTdWJsaXN0VmFsdWUiLCJzZXRTdWJsaXN0VGV4dCIsInNldFN1Ymxpc3RWYWx1ZSIsInNldFRleHQiLCJzZXRWYWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9ja3MvcmVjb3JkL1JlY29yZC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGF0ZWZucyA9IHJlcXVpcmUoXCJkYXRlLWZuc1wiKTtcbmNvbnN0IHN0cnVjdHVyZWRDbG9uZSA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvYWN0dWFsL3N0cnVjdHVyZWQtY2xvbmVcIik7XG5jb25zdCB7IHJhbmRvbVVVSUQgfSA9IHJlcXVpcmUoXCJub2RlOmNyeXB0b1wiKTtcbmNvbnN0IFN1aXRlU2NyaXB0TW9ja3MgPSByZXF1aXJlKFwiLi4vLi4vaW5kZXguY2pzXCIpO1xuY29uc3QgRmllbGQgPSByZXF1aXJlKFwiLi9GaWVsZC5janNcIik7XG5jb25zdCBTdWJsaXN0ID0gcmVxdWlyZShcIi4vU3VibGlzdC5janNcIik7XG5jb25zdCB7XG5cdG9wdGlvbnMsXG5cdHJlcXVpcmVkLFxuXHRhZGRQcm9taXNlLFxuXHRkeW5hbWljTW9kZU9ubHksXG5cdHN0YW5kYXJkTW9kZU9ubHksXG5cdGFzc2lnbkNvbnN0cnVjdG9yLFxufSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKTtcblxuQGFzc2lnbkNvbnN0cnVjdG9yKClcbmNsYXNzIFJlY29yZCB7XG5cdGlkID0gbnVsbDtcblx0dHlwZSA9IG51bGw7XG5cdGZpZWxkcyA9IHt9O1xuXHRzdWJsaXN0cyA9IHt9O1xuXHRzdWJyZWNvcmRzID0ge307XG5cdGlzRHluYW1pYyA9IGZhbHNlO1xuXHR2ZXJzaW9uID0gMTtcblxuXHRpbml0aWFsaXplID0gKCkgPT4ge1xuXHRcdHRoaXMuZmllbGRzID0gc3RydWN0dXJlZENsb25lKHRoaXMuZmllbGRzKTtcblx0XHR0aGlzLnN1Ymxpc3RzID0gT2JqZWN0LmVudHJpZXModGhpcy5zdWJsaXN0cyB8fCB7fSkucmVkdWNlKChhY2MsIFtsaW5lSWQsIGxpbmVzXSkgPT4ge1xuXHRcdFx0YWNjW2xpbmVJZF0gPSB7XG5cdFx0XHRcdGN1cnJlbnRsaW5lOiB7fSxcblx0XHRcdFx0bGluZXM6IFsuLi4oKFwibGluZXNcIiBpbiBsaW5lcyA/IGxpbmVzLmxpbmVzIDogbGluZXMpIHx8IFtdKV0sXG5cdFx0XHR9O1xuXHRcdFx0YWNjW2xpbmVJZF0ubGluZXMgPSBhY2NbbGluZUlkXS5saW5lcy5tYXAoKGxpbmUpID0+IHtcblx0XHRcdFx0bGluZSA9IHsgLi4ubGluZSB9O1xuXHRcdFx0XHRsaW5lLl9pZCA9IGxpbmUuX2lkIHx8IHJhbmRvbVVVSUQoKTtcblx0XHRcdFx0T2JqZWN0LmVudHJpZXMobGluZSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgUmVjb3JkKSB7XG5cdFx0XHRcdFx0XHRsaW5lW2tleV0gPSBuZXcgUmVjb3JkKHZhbHVlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bGluZVtrZXldID0gc3RydWN0dXJlZENsb25lKHZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gbGluZTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGFjYztcblx0XHR9LCB7fSk7XG5cdFx0dGhpcy5zdWJyZWNvcmRzID0gT2JqZWN0LmVudHJpZXModGhpcy5zdWJyZWNvcmRzIHx8IHt9KS5yZWR1Y2UoKGFjYywgW3N1YnJlY29yZElkLCBzdWJyZWNvcmRdKSA9PiB7XG5cdFx0XHRhY2Nbc3VicmVjb3JkSWRdID0gbmV3IFJlY29yZChzdWJyZWNvcmQpO1xuXHRcdFx0cmV0dXJuIGFjYztcblx0XHR9LCB7fSk7XG5cdH07XG5cblx0I2dldFN1Ymxpc3Qob3B0aW9ucykge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoIXN1Ymxpc3QpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlN1Ymxpc3QgZG9lcyBub3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdHJldHVybiBzdWJsaXN0O1xuXHR9XG5cblx0I2dldExpbmUob3B0aW9ucykge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLiNnZXRTdWJsaXN0KG9wdGlvbnMpO1xuXHRcdGNvbnN0IGxpbmUgPSBzdWJsaXN0LmxpbmVzW29wdGlvbnMubGluZV07XG5cdFx0aWYgKCFsaW5lKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJMaW5lIGRvZXMgbm90IGV4aXN0XCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIilcblx0Y2FuY2VsTGluZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0dGhpcy5zZWxlY3ROZXdMaW5lKG9wdGlvbnMuc3VibGlzdElkKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJpZ25vcmVSZWNhbGNcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG5cdGNvbW1pdExpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLiNnZXRTdWJsaXN0KG9wdGlvbnMpO1xuXHRcdGlmICghc3VibGlzdC5jdXJyZW50bGluZS5faWQpIHtcblx0XHRcdHN1Ymxpc3QuY3VycmVudGxpbmUuX2lkID0gcmFuZG9tVVVJRCgpO1xuXHRcdH1cblx0XHRzdWJsaXN0LmxpbmVzW3RoaXMuZ2V0Q3VycmVudFN1Ymxpc3RJbmRleChvcHRpb25zLnN1Ymxpc3RJZCldID0gc3VibGlzdC5jdXJyZW50bGluZTtcblx0XHR0aGlzLnNlbGVjdE5ld0xpbmUob3B0aW9ucy5zdWJsaXN0SWQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0ZXhlY3V0ZU1hY3JvID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGZpbmRNYXRyaXhTdWJsaXN0TGluZVdpdGhWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJ2YWx1ZVwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwidmFsdWVcIilcblx0ZmluZFN1Ymxpc3RMaW5lV2l0aFZhbHVlID0gKG9wdGlvbnMpID0+IHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2V0TGluZUNvdW50KG9wdGlvbnMuc3VibGlzdElkKTsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5nZXRTdWJsaXN0VmFsdWUob3B0aW9ucy5zdWJsaXN0SWQsIG9wdGlvbnMuZmllbGRJZCwgaSkgPT0gb3B0aW9ucy52YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9O1xuXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRnZXRDdXJyZW50TWF0cml4U3VibGlzdFZhbHVlID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiKVxuXHRnZXRDdXJyZW50U3VibGlzdEZpZWxkID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBzdWJsaXN0ID0gdGhpcy4jZ2V0U3VibGlzdChvcHRpb25zKTtcblx0XHRpZiAob3B0aW9ucy5maWVsZElkIGluIHN1Ymxpc3QuY3VycmVudGxpbmUpIHtcblx0XHRcdHJldHVybiBuZXcgRmllbGQoeyBpZDogb3B0aW9ucy5maWVsZElkLCBsYWJlbDogb3B0aW9ucy5maWVsZElkLCBzdWJsaXN0SWQ6IG9wdGlvbnMuc3VibGlzdElkIH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG5cdGdldEN1cnJlbnRTdWJsaXN0SW5kZXggPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzPy5zdWJsaXN0cz8uW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCkge1xuXHRcdFx0Y29uc3QgZXhpc3RpbmdJbmRleCA9IHN1Ymxpc3Q/LmxpbmVzLmZpbmRJbmRleCgoYSkgPT4gYS5faWQgPT09IHN1Ymxpc3QuY3VycmVudGxpbmUuX2lkKTtcblx0XHRcdHJldHVybiBleGlzdGluZ0luZGV4ID4gLTEgPyBleGlzdGluZ0luZGV4IDogc3VibGlzdD8ubGluZXMubGVuZ3RoO1xuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH07XG5cblx0QGR5bmFtaWNNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiKVxuXHRnZXRDdXJyZW50U3VibGlzdFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuI2dldFN1Ymxpc3Qob3B0aW9ucyk7XG5cdFx0aWYgKCEob3B0aW9ucy5maWVsZElkIGluIHN1Ymxpc3QuY3VycmVudGxpbmUpIHx8ICEoc3VibGlzdC5jdXJyZW50bGluZVtvcHRpb25zLmZpZWxkSWRdIGluc3RhbmNlb2YgUmVjb3JkKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBGaWVsZCAke29wdGlvbnMuZmllbGRJZH0gaXMgbm90IGEgc3VicmVjb3JkIGZpZWxkYCk7XG5cdFx0fVxuXHRcdHJldHVybiBzdWJsaXN0LmN1cnJlbnRsaW5lW29wdGlvbnMuZmllbGRJZF07XG5cdH07XG5cblx0QGR5bmFtaWNNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIpXG5cdGdldEN1cnJlbnRTdWJsaXN0VGV4dCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuI2dldFN1Ymxpc3Qob3B0aW9ucyk7XG5cdFx0Y29uc3QgZmllbGQgPSBzdWJsaXN0LmN1cnJlbnRsaW5lW29wdGlvbnMuZmllbGRJZF07XG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmaWVsZCkgPT09IFwiW29iamVjdCBEYXRlXVwiKSB7XG5cdFx0XHRyZXR1cm4gZGF0ZWZucy5mb3JtYXQoZmllbGQsIFN1aXRlU2NyaXB0TW9ja3MuZGF0ZUZvcm1hdCk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgZmllbGQgPT09IFwib2JqZWN0XCIgJiYgZmllbGQgIT09IG51bGwpIHtcblx0XHRcdHJldHVybiBmaWVsZC50ZXh0IHx8IGZpZWxkLnZhbHVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmllbGQ7XG5cdH07XG5cblx0QGR5bmFtaWNNb2RlT25seSgpXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIpXG5cdGdldEN1cnJlbnRTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHQvLyB0aGlzIGlzIGNvcnJlY3QsIHN1aXRlc2NyaXB0IGRvZXNuJ3QgZXJyb3Igd2hlbiBzdXBwbHlpbmcgYSBzdWJsaXN0SWQgdGhhdCBkb2Vzbid0IGV4aXN0XG5cdFx0aWYgKHN1Ymxpc3QgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGNvbnN0IGZpZWxkID0gc3VibGlzdC5jdXJyZW50bGluZVtvcHRpb25zLmZpZWxkSWRdO1xuXHRcdGlmIChcblx0XHRcdHR5cGVvZiBmaWVsZCA9PT0gXCJvYmplY3RcIiAmJlxuXHRcdFx0ZmllbGQgIT09IG51bGwgJiZcblx0XHRcdCEoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZpZWxkKSA9PT0gXCJbb2JqZWN0IERhdGVdXCIpXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gZmllbGQudmFsdWU7XG5cdFx0fVxuXHRcdHJldHVybiBmaWVsZDtcblx0fTtcblxuXHRAb3B0aW9ucyhcImZpZWxkSWRcIilcblx0QHJlcXVpcmVkKFwiZmllbGRJZFwiKVxuXHRnZXRGaWVsZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKG9wdGlvbnMuZmllbGRJZCBpbiB0aGlzLmZpZWxkcykge1xuXHRcdFx0cmV0dXJuIG5ldyBGaWVsZCh7IGlkOiBvcHRpb25zLmZpZWxkSWQsIGxhYmVsOiBvcHRpb25zLmZpZWxkSWQgfSk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9O1xuXG5cdGdldEZpZWxkcyA9ICgpID0+IHtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5maWVsZHMpO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiKVxuXHRnZXRMaW5lQ291bnQgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoc3VibGlzdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fVxuXHRcdHJldHVybiBzdWJsaXN0LmxpbmVzLmxlbmd0aDtcblx0fTtcblxuXHRnZXRNYWNybyA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRnZXRNYWNyb3MgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0TWF0cml4SGVhZGVyQ291bnQgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0TWF0cml4SGVhZGVyRmllbGQgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0TWF0cml4SGVhZGVyVmFsdWUgPSAob3B0aW9ucykgPT4ge307XG5cblx0Z2V0TWF0cml4U3VibGlzdEZpZWxkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldE1hdHJpeFN1Ymxpc3RWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIilcblx0Z2V0U3VibGlzdCA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKG9wdGlvbnMuc3VibGlzdElkIGluIHRoaXMuc3VibGlzdHMpIHtcblx0XHRcdHJldHVybiBuZXcgU3VibGlzdCh7IGlkOiBvcHRpb25zLnN1Ymxpc3RJZCB9KTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH07XG5cblx0Z2V0U3VibGlzdHMgPSAoKSA9PiB7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuc3VibGlzdHMpO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIilcblx0Z2V0U3VibGlzdEZpZWxkID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBsaW5lID0gdGhpcy4jZ2V0TGluZShvcHRpb25zKTtcblx0XHRpZiAob3B0aW9ucy5maWVsZElkIGluIGxpbmUpIHtcblx0XHRcdHJldHVybiBuZXcgRmllbGQoeyBpZDogb3B0aW9ucy5maWVsZElkLCBsYWJlbDogb3B0aW9ucy5maWVsZElkLCBzdWJsaXN0SWQ6IG9wdGlvbnMuc3VibGlzdElkIH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fTtcblxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIilcblx0Z2V0U3VibGlzdEZpZWxkcyA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuI2dldFN1Ymxpc3Qob3B0aW9ucyk7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHN1Ymxpc3QubGluZXNbMF0gfHwge30pLmZpbHRlcigoaWQpID0+IGlkICE9PSBcIl9pZFwiKTtcblx0fTtcblxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG5cdGdldFN1Ymxpc3RTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGxpbmUgPSB0aGlzLiNnZXRMaW5lKG9wdGlvbnMpO1xuXHRcdGlmICghKG9wdGlvbnMuZmllbGRJZCBpbiBsaW5lKSB8fCAhKGxpbmVbb3B0aW9ucy5maWVsZElkXSBpbnN0YW5jZW9mIFJlY29yZCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRmllbGQgJHtvcHRpb25zLmZpZWxkSWR9IGlzIG5vdCBhIHN1YnJlY29yZCBmaWVsZGApO1xuXHRcdH1cblx0XHRyZXR1cm4gbGluZVtvcHRpb25zLmZpZWxkSWRdO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIilcblx0Z2V0U3VibGlzdFRleHQgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGxpbmUgPSB0aGlzLiNnZXRMaW5lKG9wdGlvbnMpO1xuXHRcdGNvbnN0IGZpZWxkID0gbGluZVtvcHRpb25zLmZpZWxkSWRdO1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmllbGQpID09PSBcIltvYmplY3QgRGF0ZV1cIikge1xuXHRcdFx0cmV0dXJuIGRhdGVmbnMuZm9ybWF0KGZpZWxkLCBTdWl0ZVNjcmlwdE1vY2tzLmRhdGVGb3JtYXQpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsKSB7XG5cdFx0XHRpZiAoIXRoaXMuaXNEeW5hbWljICYmICEoXCJ0ZXh0XCIgaW4gZmllbGQpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcIkNhbm5vdCB1c2UgZ2V0U3VibGlzdFRleHQgb24gZmllbGQgdGhhdCBoYXMgaGFkIHZhbHVlIGJ1dCBub3QgdGV4dCBzZXQgaW4gc3RhbmRhcmQgbW9kZVwiLFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZpZWxkLnRleHQgfHwgZmllbGQudmFsdWU7XG5cdFx0fVxuXHRcdHJldHVybiBmaWVsZDtcblx0fTtcblxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG5cdGdldFN1Ymxpc3RWYWx1ZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgbGluZSA9IHRoaXMuI2dldExpbmUob3B0aW9ucyk7XG5cdFx0Y29uc3QgZmllbGQgPSBsaW5lW29wdGlvbnMuZmllbGRJZF07XG5cdFx0aWYgKFxuXHRcdFx0dHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmXG5cdFx0XHRmaWVsZCAhPT0gbnVsbCAmJlxuXHRcdFx0IShPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmllbGQpID09PSBcIltvYmplY3QgRGF0ZV1cIilcblx0XHQpIHtcblx0XHRcdHJldHVybiBmaWVsZC52YWx1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZpZWxkO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiZmllbGRJZFwiKVxuXHRAcmVxdWlyZWQoXCJmaWVsZElkXCIpXG5cdGdldFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKCEob3B0aW9ucy5maWVsZElkIGluIHRoaXMuc3VicmVjb3JkcykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRmllbGQgJHtvcHRpb25zLmZpZWxkSWR9IGlzIG5vdCBhIHN1YnJlY29yZCBmaWVsZGApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5zdWJyZWNvcmRzW29wdGlvbnMuZmllbGRJZF07XG5cdH07XG5cblx0QG9wdGlvbnMoXCJmaWVsZElkXCIpXG5cdEByZXF1aXJlZChcImZpZWxkSWRcIilcblx0Z2V0VGV4dCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1tvcHRpb25zLmZpZWxkSWRdO1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmllbGQpID09PSBcIltvYmplY3QgRGF0ZV1cIikge1xuXHRcdFx0cmV0dXJuIGRhdGVmbnMuZm9ybWF0KGZpZWxkLCBTdWl0ZVNjcmlwdE1vY2tzLmRhdGVGb3JtYXQpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsKSB7XG5cdFx0XHRpZiAoIXRoaXMuaXNEeW5hbWljICYmICEoXCJ0ZXh0XCIgaW4gZmllbGQpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCB1c2UgZ2V0VGV4dCBvbiBmaWVsZCB0aGF0IGhhcyBoYWQgdmFsdWUgYnV0IG5vdCB0ZXh0IHNldCBpbiBzdGFuZGFyZCBtb2RlXCIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZpZWxkLnRleHQgfHwgZmllbGQudmFsdWU7XG5cdFx0fVxuXHRcdHJldHVybiBmaWVsZDtcblx0fTtcblxuXHRAb3B0aW9ucyhcImZpZWxkSWRcIilcblx0QHJlcXVpcmVkKFwiZmllbGRJZFwiKVxuXHRnZXRWYWx1ZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgZmllbGQgPSB0aGlzLmZpZWxkc1tvcHRpb25zLmZpZWxkSWRdO1xuXHRcdGlmICh0eXBlb2YgZmllbGQgPT09IFwib2JqZWN0XCIgJiYgZmllbGQgIT09IG51bGwgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZpZWxkKSAhPT0gXCJbb2JqZWN0IERhdGVdXCIpIHtcblx0XHRcdHJldHVybiBmaWVsZC52YWx1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZpZWxkO1xuXHR9O1xuXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiKVxuXHRoYXNDdXJyZW50U3VibGlzdFN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0cmV0dXJuIEJvb2xlYW4odGhpcy5nZXRDdXJyZW50U3VibGlzdFN1YnJlY29yZChvcHRpb25zKSk7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwibGluZVwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwibGluZVwiKVxuXHRoYXNTdWJsaXN0U3VicmVjb3JkID0gKG9wdGlvbnMpID0+IHtcblx0XHRyZXR1cm4gQm9vbGVhbih0aGlzLmdldFN1Ymxpc3RTdWJyZWNvcmQob3B0aW9ucykpO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiZmllbGRJZFwiKVxuXHRAcmVxdWlyZWQoXCJmaWVsZElkXCIpXG5cdGhhc1N1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0cmV0dXJuIEJvb2xlYW4odGhpcy5nZXRTdWJyZWNvcmQob3B0aW9ucykpO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwibGluZVwiLCBcImlnbm9yZVJlY2FsY1wiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJsaW5lXCIpXG5cdGluc2VydExpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLnN1Ymxpc3RzW29wdGlvbnMuc3VibGlzdElkXTtcblx0XHRpZiAoIXN1Ymxpc3QpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlN1Ymxpc3QgZG9lcyBub3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdGlmIChvcHRpb25zLmxpbmUgPCAwIHx8IG9wdGlvbnMubGluZSA+IHN1Ymxpc3QubGluZXMubGVuZ3RoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJMaW5lIGlzIG91dHNpZGUgdmFsaWQgcmFuZ2VcIik7XG5cdFx0fVxuXHRcdHN1Ymxpc3QubGluZXMuc3BsaWNlKG9wdGlvbnMubGluZSwgMCwge30pO1xuXHRcdGlmICh0aGlzLmlzRHluYW1pYykge1xuXHRcdFx0dGhpcy5zZWxlY3RMaW5lKG9wdGlvbnMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHQvLyBAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZyb21cIiwgXCJ0b1wiKVxuXHQvLyBAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmcm9tXCIsIFwidG9cIilcblx0Ly8gbW92ZUxpbmUgPSAob3B0aW9ucykgPT4ge1xuXHQvLyBcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLiNnZXRTdWJsaXN0KG9wdGlvbnMpO1xuXHQvLyBcdGlmIChvcHRpb25zLmZyb20gPCAwIHx8IG9wdGlvbnMuZnJvbSA+IHN1Ymxpc3QubGluZXMubGVuZ3RoIC0gMSkge1xuXHQvLyBcdFx0dGhyb3cgbmV3IEVycm9yKFwiRnJvbSBpcyBvdXRzaWRlIHZhbGlkIHJhbmdlXCIpO1xuXHQvLyBcdH1cblx0Ly8gXHRpZiAob3B0aW9ucy50byA8IDAgfHwgb3B0aW9ucy50byA+IHN1Ymxpc3QubGluZXMubGVuZ3RoKSB7XG5cdC8vIFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUbyBpcyBvdXRzaWRlIHZhbGlkIHJhbmdlXCIpO1xuXHQvLyBcdH1cblx0Ly8gXHQvLyBpZiAob3B0aW9ucy50byA+IG9wdGlvbnMuZnJvbSkge1xuXHQvLyBcdC8vIFx0b3B0aW9ucy50by0tO1xuXHQvLyBcdC8vIH1cblx0Ly8gXHRjb25zdCBsaW5lID0gc3VibGlzdC5saW5lcy5zcGxpY2Uob3B0aW9ucy5mcm9tLCAxKTtcblx0Ly8gXHRzdWJsaXN0LmxpbmVzLnNwbGljZShvcHRpb25zLnRvLCAwLCBsaW5lKTtcblx0Ly8gXHRyZXR1cm4gdGhpcztcblx0Ly8gfTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIilcblx0cmVtb3ZlQ3VycmVudFN1Ymxpc3RTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLiNnZXRTdWJsaXN0KG9wdGlvbnMpO1xuXHRcdGlmICghKG9wdGlvbnMuZmllbGRJZCBpbiBzdWJsaXN0LmN1cnJlbnRsaW5lKSB8fCAhKHN1Ymxpc3QuY3VycmVudGxpbmVbb3B0aW9ucy5maWVsZElkXSBpbnN0YW5jZW9mIFJlY29yZCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRmllbGQgJHtvcHRpb25zLmZpZWxkSWR9IGlzIG5vdCBhIHN1YnJlY29yZCBmaWVsZGApO1xuXHRcdH1cblx0XHRzdWJsaXN0LmN1cnJlbnRsaW5lW29wdGlvbnMuZmllbGRJZF0gPSBudWxsO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwic3VibGlzdElkXCIsIFwibGluZVwiLCBcImlnbm9yZVJlY2FsY1wiLCBcImxpbmVJbnN0YW5jZUlkXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImxpbmVcIilcblx0cmVtb3ZlTGluZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuI2dldFN1Ymxpc3Qob3B0aW9ucyk7XG5cdFx0dGhpcy4jZ2V0TGluZShvcHRpb25zKTtcblx0XHRzdWJsaXN0LmxpbmVzLnNwbGljZShvcHRpb25zLmxpbmUsIDEpO1xuXHRcdGlmICh0aGlzLmlzRHluYW1pYykge1xuXHRcdFx0aWYgKHN1Ymxpc3QubGluZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR0aGlzLnNlbGVjdExpbmUob3B0aW9ucy5zdWJsaXN0SWQsIDApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZWxlY3ROZXdMaW5lKG9wdGlvbnMuc3VibGlzdElkKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0QHN0YW5kYXJkTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIpXG5cdHJlbW92ZVN1Ymxpc3RTdWJyZWNvcmQgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGxpbmUgPSB0aGlzLiNnZXRMaW5lKG9wdGlvbnMpO1xuXHRcdGlmICghKG9wdGlvbnMuZmllbGRJZCBpbiBsaW5lKSB8fCAhKGxpbmVbb3B0aW9ucy5maWVsZElkXSBpbnN0YW5jZW9mIFJlY29yZCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRmllbGQgJHtvcHRpb25zLmZpZWxkSWR9IGlzIG5vdCBhIHN1YnJlY29yZCBmaWVsZGApO1xuXHRcdH1cblx0XHRsaW5lW29wdGlvbnMuZmllbGRJZF0gPSBudWxsO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiZmllbGRJZFwiKVxuXHRAcmVxdWlyZWQoXCJmaWVsZElkXCIpXG5cdHJlbW92ZVN1YnJlY29yZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKCEob3B0aW9ucy5maWVsZElkIGluIHRoaXMuc3VicmVjb3JkcykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRmllbGQgJHtvcHRpb25zLmZpZWxkSWR9IGlzIG5vdCBhIHN1YnJlY29yZCBmaWVsZGApO1xuXHRcdH1cblx0XHR0aGlzLnN1YnJlY29yZHNbb3B0aW9ucy5maWVsZElkXSA9IG51bGw7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0QGFkZFByb21pc2UoKVxuXHRAb3B0aW9ucyhcImVuYWJsZVNvdXJjaW5nXCIsIFwiaWdub3JlTWFuZGF0b3J5RmllbGRzXCIpXG5cdHNhdmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGlmICh0aGlzLmlkICYmIFN1aXRlU2NyaXB0TW9ja3MucmVjb3Jkcy5nZXQodGhpcykudmVyc2lvbiAhPT0gdGhpcy52ZXJzaW9uKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJSZWNvcmQgaGFzIGNoYW5nZWRcIik7XG5cdFx0fVxuXHRcdHRoaXMudmVyc2lvbisrO1xuXHRcdGNvbnN0IGNvcHkgPSBuZXcgUmVjb3JkKHRoaXMpO1xuXHRcdC8vIGNoYW5nZSBmaWVsZHMgdGhhdCBvbmx5IGhhdmUgdmFsdWUgdG8gbm90IGJlIGFuIG9iamVjdCBzbyBnZXRUZXh0IHdvcmtzXG5cdFx0T2JqZWN0LmVudHJpZXMoY29weS5maWVsZHMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkgJiYgIShcInRleHRcIiBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0Y29weS5maWVsZHNba2V5XSA9IHZhbHVlLnZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC52YWx1ZXMoY29weS5zdWJsaXN0cykuZm9yRWFjaCgoc3VibGlzdCkgPT4ge1xuXHRcdFx0c3VibGlzdC5saW5lcy5mb3JFYWNoKChsaW5lKSA9PiB7XG5cdFx0XHRcdE9iamVjdC5lbnRyaWVzKGxpbmUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpICYmICEoXCJ0ZXh0XCIgaW4gdmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRsaW5lW2tleV0gPSB2YWx1ZS52YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0aWYgKCF0aGlzLmlkKSB7XG5cdFx0XHR0aGlzLmlkID0gY29weS5pZCA9IE1hdGgubWF4KC4uLkFycmF5LmZyb20oU3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLnZhbHVlcygpKS5tYXAoKGEpID0+IGEuaWQpKSArIDE7XG5cdFx0XHRTdWl0ZVNjcmlwdE1vY2tzLmNyZWF0ZWRSZWNvcmRzLnB1c2goY29weSk7XG5cdFx0fVxuXHRcdFN1aXRlU2NyaXB0TW9ja3MucmVjb3Jkcy5zZXQoY29weSk7XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5zYXZlZFJlY29yZHMucHVzaChjb3B5KTtcblx0XHRyZXR1cm4gdGhpcy5pZDtcblx0fTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJsaW5lXCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImxpbmVcIilcblx0c2VsZWN0TGluZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuI2dldFN1Ymxpc3Qob3B0aW9ucyk7XG5cdFx0aWYgKG9wdGlvbnMubGluZSAhPSB0aGlzLmdldEN1cnJlbnRTdWJsaXN0SW5kZXgob3B0aW9ucy5zdWJsaXN0SWQpKSB7XG5cdFx0XHRjb25zdCBsaW5lID0gdGhpcy4jZ2V0TGluZShvcHRpb25zKTtcblx0XHRcdHN1Ymxpc3QuY3VycmVudGxpbmUgPSB7IC4uLmxpbmUgfTtcblx0XHRcdHN1Ymxpc3QubGluZXMgPSBzdWJsaXN0LmxpbmVzLmZpbHRlcigoYSkgPT4gYS5faWQpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIpXG5cdHNlbGVjdE5ld0xpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLiNnZXRTdWJsaXN0KG9wdGlvbnMpO1xuXHRcdHN1Ymxpc3QuY3VycmVudGxpbmUgPSB7fTtcblx0XHRzdWJsaXN0LmxpbmVzID0gc3VibGlzdC5saW5lcy5maWx0ZXIoKGEpID0+IGEuX2lkKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHRzZXRDdXJyZW50TWF0cml4U3VibGlzdFZhbHVlID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBkeW5hbWljTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJ0ZXh0XCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJ0ZXh0XCIpXG5cdHNldEN1cnJlbnRTdWJsaXN0VGV4dCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3Qgc3VibGlzdCA9IHRoaXMuI2dldFN1Ymxpc3Qob3B0aW9ucyk7XG5cdFx0c3VibGlzdC5jdXJyZW50bGluZVtvcHRpb25zLmZpZWxkSWRdID0geyB2YWx1ZTogb3B0aW9ucy50ZXh0LCB0ZXh0OiBvcHRpb25zLnRleHQgfTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHRAZHluYW1pY01vZGVPbmx5KClcblx0QG9wdGlvbnMoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwidmFsdWVcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcInZhbHVlXCIpXG5cdHNldEN1cnJlbnRTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHN1Ymxpc3QgPSB0aGlzLiNnZXRTdWJsaXN0KG9wdGlvbnMpO1xuXHRcdHN1Ymxpc3QuY3VycmVudGxpbmVbb3B0aW9ucy5maWVsZElkXSA9IHsgdmFsdWU6IG9wdGlvbnMudmFsdWUgfTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHRzZXRNYXRyaXhIZWFkZXJWYWx1ZSA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRzZXRNYXRyaXhTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge307XG5cblx0QHN0YW5kYXJkTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIsIFwidGV4dFwiKVxuXHRAcmVxdWlyZWQoXCJzdWJsaXN0SWRcIiwgXCJmaWVsZElkXCIsIFwibGluZVwiLCBcInRleHRcIilcblx0c2V0U3VibGlzdFRleHQgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGxpbmUgPSB0aGlzLiNnZXRMaW5lKG9wdGlvbnMpO1xuXHRcdGxpbmVbb3B0aW9ucy5maWVsZElkXSA9IHsgdmFsdWU6IG9wdGlvbnMudGV4dCwgdGV4dDogb3B0aW9ucy50ZXh0IH07XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0QHN0YW5kYXJkTW9kZU9ubHkoKVxuXHRAb3B0aW9ucyhcInN1Ymxpc3RJZFwiLCBcImZpZWxkSWRcIiwgXCJsaW5lXCIsIFwidmFsdWVcIilcblx0QHJlcXVpcmVkKFwic3VibGlzdElkXCIsIFwiZmllbGRJZFwiLCBcImxpbmVcIiwgXCJ2YWx1ZVwiKVxuXHRzZXRTdWJsaXN0VmFsdWUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGxpbmUgPSB0aGlzLiNnZXRMaW5lKG9wdGlvbnMpO1xuXHRcdGxpbmVbb3B0aW9ucy5maWVsZElkXSA9IHsgdmFsdWU6IG9wdGlvbnMudmFsdWUgfTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHRAb3B0aW9ucyhcImZpZWxkSWRcIiwgXCJ0ZXh0XCIsIFwiaWdub3JlRmllbGRDaGFuZ2VcIilcblx0QHJlcXVpcmVkKFwiZmllbGRJZFwiLCBcInRleHRcIilcblx0c2V0VGV4dCA9IChvcHRpb25zKSA9PiB7XG5cdFx0dGhpcy5maWVsZHNbb3B0aW9ucy5maWVsZElkXSA9IHsgdmFsdWU6IG9wdGlvbnMudGV4dCwgdGV4dDogb3B0aW9ucy50ZXh0IH07XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJmaWVsZElkXCIsIFwidmFsdWVcIiwgXCJpZ25vcmVGaWVsZENoYW5nZVwiKVxuXHRAcmVxdWlyZWQoXCJmaWVsZElkXCIsIFwidmFsdWVcIilcblx0c2V0VmFsdWUgPSAob3B0aW9ucykgPT4ge1xuXHRcdHRoaXMuZmllbGRzW29wdGlvbnMuZmllbGRJZF0gPSB7IHZhbHVlOiBvcHRpb25zLnZhbHVlIH07XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVjb3JkO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDbkMsTUFBTUMsZUFBZSxHQUFHRCxPQUFPLENBQUMsc0NBQXNDLENBQUM7QUFDdkUsTUFBTTtFQUFFRTtBQUFXLENBQUMsR0FBR0YsT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUM3QyxNQUFNRyxnQkFBZ0IsR0FBR0gsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQ25ELE1BQU1JLEtBQUssR0FBR0osT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUNwQyxNQUFNSyxPQUFPLEdBQUdMLE9BQU8sQ0FBQyxlQUFlLENBQUM7QUFDeEMsTUFBTTtFQUNMTSxPQUFPO0VBQ1BDLFFBQVE7RUFDUkMsVUFBVTtFQUNWQyxlQUFlO0VBQ2ZDLGdCQUFnQjtFQUNoQkM7QUFDRCxDQUFDLEdBQUdYLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUFDLElBQUFZLE9BQUE7QUFBQUMsSUFBQSxHQUVoQ0YsaUJBQWlCLENBQUMsQ0FBQztBQUFBRyxLQUFBLEdBc0RsQkwsZUFBZSxDQUFDLENBQUM7QUFBQU0sS0FBQSxHQUNqQlQsT0FBTyxDQUFDLFdBQVcsQ0FBQztBQUFBVSxLQUFBLEdBQ3BCVCxRQUFRLENBQUMsV0FBVyxDQUFDO0FBQUFVLEtBQUEsR0FNckJSLGVBQWUsQ0FBQyxDQUFDO0FBQUFTLEtBQUEsR0FDakJaLE9BQU8sQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDO0FBQUFhLEtBQUEsR0FDcENaLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFBQWEsS0FBQSxHQVdyQlosVUFBVSxDQUFDLENBQUM7QUFBQWEsS0FBQSxHQUtaZixPQUFPLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFP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S0FBQSxFQUFBQyxLQUFBLEVBQUFDLEtBQUEsc0JBQUFDLEtBQUEsd0JBQUFDLEtBQUEsRUFBQUMsTUFBQSxvQ0FBQUMsTUFBQSx3Q0FBQUMsTUFBQSxFQUFBQyxNQUFBLEVBQUFDLE1BQUEsbUNBQUFDLE1BQUEsRUFBQUMsTUFBQSxFQUFBQyxNQUFBLG1DQUFBQyxNQUFBLEVBQUFDLE1BQUEsdUNBQUFDLE1BQUEsRUFBQUMsTUFBQSxFQUFBQyxNQUFBLGtDQUFBQyxNQUFBLEVBQUFDLE1BQUEsRUFBQUMsTUFBQSxtQ0FBQUMsTUFBQSxFQUFBQyxNQUFBLHFCQUFBQyxNQUFBLEVBQUFDLE1BQUEseUJBQUFDLE1BQUEsRUFBQUMsTUFBQSx1QkFBQUMsTUFBQSxFQUFBQyxNQUFBLDRCQUFBQyxNQUFBLEVBQUFDLE1BQUEsNkJBQUFDLE1BQUEsRUFBQUMsTUFBQSxnQ0FBQUMsTUFBQSxFQUFBQyxNQUFBLDJCQUFBQyxNQUFBLEVBQUFDLE1BQUEsNEJBQUFDLE1BQUEsRUFBQUMsTUFBQSx5QkFBQUMsTUFBQSxFQUFBQyxNQUFBLG9CQUFBQyxNQUFBLEVBQUFDLE1BQUEscUJBQUFDLE1BQUEsRUFBQUMsTUFBQSxFQUFBQyxNQUFBLHVDQUFBQyxNQUFBLEVBQUFDLE1BQUEsZ0NBQUFDLE1BQUEsRUFBQUMsTUFBQSx5QkFBQUMsTUFBQSxFQUFBQyxNQUFBLHVCQUFBQyxNQUFBLEVBQUFDLE1BQUEsRUFBQUMsTUFBQSwwQ0FBQUMsTUFBQSxFQUFBQyxNQUFBLHVCQUFBQyxNQUFBLEVBQUFDLE1BQUEsRUFBQUMsTUFBQSxtQ0FBQUMsTUFBQSxFQUFBQyxNQUFBLDRCQUFBQyxNQUFBLEVBQUFDLE1BQUEsaUJBQUFDLE1BQUEsRUFBQUMsTUFBQSxFQUFBQyxNQUFBLHVCQUFBQyxNQUFBLEVBQUFDLE1BQUEsRUFBQUMsTUFBQSwwQkFBQUMsTUFBQSxFQUFBQyxNQUFBLEVBQUFDLE1BQUEsa0NBQUFDLE1BQUEsRUFBQUMsTUFBQSxFQUFBQyxNQUFBLG1DQUFBQyxNQUFBLEVBQUFDLE1BQUEsRUFBQUMsTUFBQSwyQkFB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