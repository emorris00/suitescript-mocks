var _dec, _dec2, _init_attach, _dec3, _dec4, _init_copy, _dec5, _dec6, _init_create, _dec7, _dec8, _init_delete, _dec9, _dec10, _init_detach, _dec11, _dec12, _init_load, _dec13, _dec14, _init_submitFields, _dec15, _dec16, _init_transform;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const recordStub = require("suitecloud-unit-testing-stubs/stubs/record");
const SuiteScriptMocks = require("../../index.cjs");
const {
  addPromise,
  options
} = require("../../helpers.cjs");
const Record = require("./Record.cjs");
const Field = require("./Field.cjs");
const Sublist = require("./Sublist.cjs");
_dec = addPromise();
_dec2 = options("record", "to", "attributes");
_dec3 = addPromise();
_dec4 = options("type", "id", "isDynamic", "defaultValues");
_dec5 = addPromise();
_dec6 = options("type", "isDynamic", "defaultValues");
_dec7 = addPromise();
_dec8 = options("type", "id");
_dec9 = addPromise();
_dec10 = options("record", "from", "attributes");
_dec11 = addPromise();
_dec12 = options("type", "id", "isDynamic", "defaultValues");
_dec13 = addPromise();
_dec14 = options("type", "id", "values", "options");
_dec15 = addPromise();
_dec16 = options("fromType", "fromId", "toType", "isDynamic", "defaultValues");
class RecordModule {
  static {
    [_init_attach, _init_copy, _init_create, _init_delete, _init_detach, _init_load, _init_submitFields, _init_transform] = _applyDecs2203R(this, [[[_dec, _dec2], 0, "attach"], [[_dec3, _dec4], 0, "copy"], [[_dec5, _dec6], 0, "create"], [[_dec7, _dec8], 0, "delete"], [[_dec9, _dec10], 0, "detach"], [[_dec11, _dec12], 0, "load"], [[_dec13, _dec14], 0, "submitFields"], [[_dec15, _dec16], 0, "transform"]], []).e;
  }
  Record = Record;
  Field = Field;
  Sublist = Sublist;
  Type = recordStub.Type;
  attach = _init_attach(this, options => {});
  copy = _init_copy(this, options => {
    const record = this.load(options);
    record.id = null;
    return record;
  });
  create = _init_create(this, options => {
    return new Record({
      id: null,
      type: options.type,
      isDynamic: options?.isDynamic,
      fields: options?.defaultValues || {}
    });
  });
  delete = _init_delete(this, options => {
    const rec = SuiteScriptMocks.records.get(options);
    if (!rec) {
      throw new Error("Record does not exist");
    }
    SuiteScriptMocks.deletedRecords.push(rec);
    SuiteScriptMocks.records.delete(rec);
    return rec.id;
  });
  detach = _init_detach(this, options => {});
  load = _init_load(this, options => {
    const record = SuiteScriptMocks.records.get(options);
    if (!record) {
      throw new Error("Record does not exist");
    }
    return new Record({
      ...record,
      isDynamic: Boolean(options.isDynamic) || false,
      fields: {
        ...record.fields,
        ...(options.defaultValues || {})
      }
    });
  });
  submitFields = _init_submitFields(this, options => {
    const record = SuiteScriptMocks.records.get(options);
    if (!record) {
      throw new Error("Record does not exist");
    }
    const copy = new Record({
      ...record,
      fields: {
        ...record.fields,
        ...options.values
      },
      version: record.version + 1
    });
    SuiteScriptMocks.records.set(copy);
    return copy.id;
  });
  transform = _init_transform(this, options => {
    const record = this.load(options.fromType, options.fromId, options.isDynamic, options.defaultValues);
    record.type = options.toType;
    record.id = null;
    return record;
  });
}
module.exports = new RecordModule();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZWNvcmRTdHViIiwicmVxdWlyZSIsIlN1aXRlU2NyaXB0TW9ja3MiLCJhZGRQcm9taXNlIiwib3B0aW9ucyIsIlJlY29yZCIsIkZpZWxkIiwiU3VibGlzdCIsIl9kZWMiLCJfZGVjMiIsIl9kZWMzIiwiX2RlYzQiLCJfZGVjNSIsIl9kZWM2IiwiX2RlYzciLCJfZGVjOCIsIl9kZWM5IiwiX2RlYzEwIiwiX2RlYzExIiwiX2RlYzEyIiwiX2RlYzEzIiwiX2RlYzE0IiwiX2RlYzE1IiwiX2RlYzE2IiwiUmVjb3JkTW9kdWxlIiwiX2luaXRfYXR0YWNoIiwiX2luaXRfY29weSIsIl9pbml0X2NyZWF0ZSIsIl9pbml0X2RlbGV0ZSIsIl9pbml0X2RldGFjaCIsIl9pbml0X2xvYWQiLCJfaW5pdF9zdWJtaXRGaWVsZHMiLCJfaW5pdF90cmFuc2Zvcm0iLCJfYXBwbHlEZWNzMjIwM1IiLCJlIiwiVHlwZSIsImF0dGFjaCIsImNvcHkiLCJyZWNvcmQiLCJsb2FkIiwiaWQiLCJjcmVhdGUiLCJ0eXBlIiwiaXNEeW5hbWljIiwiZmllbGRzIiwiZGVmYXVsdFZhbHVlcyIsImRlbGV0ZSIsInJlYyIsInJlY29yZHMiLCJnZXQiLCJFcnJvciIsImRlbGV0ZWRSZWNvcmRzIiwicHVzaCIsImRldGFjaCIsIkJvb2xlYW4iLCJzdWJtaXRGaWVsZHMiLCJ2YWx1ZXMiLCJ2ZXJzaW9uIiwic2V0IiwidHJhbnNmb3JtIiwiZnJvbVR5cGUiLCJmcm9tSWQiLCJ0b1R5cGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vY2tzL3JlY29yZC9pbmRleC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmVjb3JkU3R1YiA9IHJlcXVpcmUoXCJzdWl0ZWNsb3VkLXVuaXQtdGVzdGluZy1zdHVicy9zdHVicy9yZWNvcmRcIik7XG5jb25zdCBTdWl0ZVNjcmlwdE1vY2tzID0gcmVxdWlyZShcIi4uLy4uL2luZGV4LmNqc1wiKTtcbmNvbnN0IHsgYWRkUHJvbWlzZSwgb3B0aW9ucyB9ID0gcmVxdWlyZShcIi4uLy4uL2hlbHBlcnMuY2pzXCIpO1xuY29uc3QgUmVjb3JkID0gcmVxdWlyZShcIi4vUmVjb3JkLmNqc1wiKTtcbmNvbnN0IEZpZWxkID0gcmVxdWlyZShcIi4vRmllbGQuY2pzXCIpO1xuY29uc3QgU3VibGlzdCA9IHJlcXVpcmUoXCIuL1N1Ymxpc3QuY2pzXCIpO1xuXG5jbGFzcyBSZWNvcmRNb2R1bGUge1xuXHRSZWNvcmQgPSBSZWNvcmQ7XG5cdEZpZWxkID0gRmllbGQ7XG5cdFN1Ymxpc3QgPSBTdWJsaXN0O1xuXG5cdFR5cGUgPSByZWNvcmRTdHViLlR5cGU7XG5cblx0QGFkZFByb21pc2UoKVxuXHRAb3B0aW9ucyhcInJlY29yZFwiLCBcInRvXCIsIFwiYXR0cmlidXRlc1wiKVxuXHRhdHRhY2ggPSAob3B0aW9ucykgPT4ge307XG5cblx0QGFkZFByb21pc2UoKVxuXHRAb3B0aW9ucyhcInR5cGVcIiwgXCJpZFwiLCBcImlzRHluYW1pY1wiLCBcImRlZmF1bHRWYWx1ZXNcIilcblx0Y29weSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgcmVjb3JkID0gdGhpcy5sb2FkKG9wdGlvbnMpO1xuXHRcdHJlY29yZC5pZCA9IG51bGw7XG5cdFx0cmV0dXJuIHJlY29yZDtcblx0fTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwidHlwZVwiLCBcImlzRHluYW1pY1wiLCBcImRlZmF1bHRWYWx1ZXNcIilcblx0Y3JlYXRlID0gKG9wdGlvbnMpID0+IHtcblx0XHRyZXR1cm4gbmV3IFJlY29yZCh7XG5cdFx0XHRpZDogbnVsbCxcblx0XHRcdHR5cGU6IG9wdGlvbnMudHlwZSxcblx0XHRcdGlzRHluYW1pYzogb3B0aW9ucz8uaXNEeW5hbWljLFxuXHRcdFx0ZmllbGRzOiBvcHRpb25zPy5kZWZhdWx0VmFsdWVzIHx8IHt9LFxuXHRcdH0pO1xuXHR9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0QG9wdGlvbnMoXCJ0eXBlXCIsIFwiaWRcIilcblx0ZGVsZXRlID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCByZWMgPSBTdWl0ZVNjcmlwdE1vY2tzLnJlY29yZHMuZ2V0KG9wdGlvbnMpO1xuXHRcdGlmICghcmVjKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJSZWNvcmQgZG9lcyBub3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdFN1aXRlU2NyaXB0TW9ja3MuZGVsZXRlZFJlY29yZHMucHVzaChyZWMpO1xuXHRcdFN1aXRlU2NyaXB0TW9ja3MucmVjb3Jkcy5kZWxldGUocmVjKTtcblx0XHRyZXR1cm4gcmVjLmlkO1xuXHR9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0QG9wdGlvbnMoXCJyZWNvcmRcIiwgXCJmcm9tXCIsIFwiYXR0cmlidXRlc1wiKVxuXHRkZXRhY2ggPSAob3B0aW9ucykgPT4ge307XG5cblx0QGFkZFByb21pc2UoKVxuXHRAb3B0aW9ucyhcInR5cGVcIiwgXCJpZFwiLCBcImlzRHluYW1pY1wiLCBcImRlZmF1bHRWYWx1ZXNcIilcblx0bG9hZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgcmVjb3JkID0gU3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLmdldChvcHRpb25zKTtcblx0XHRpZiAoIXJlY29yZCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUmVjb3JkIGRvZXMgbm90IGV4aXN0XCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IFJlY29yZCh7XG5cdFx0XHQuLi5yZWNvcmQsXG5cdFx0XHRpc0R5bmFtaWM6IEJvb2xlYW4ob3B0aW9ucy5pc0R5bmFtaWMpIHx8IGZhbHNlLFxuXHRcdFx0ZmllbGRzOiB7XG5cdFx0XHRcdC4uLnJlY29yZC5maWVsZHMsXG5cdFx0XHRcdC4uLihvcHRpb25zLmRlZmF1bHRWYWx1ZXMgfHwge30pLFxuXHRcdFx0fSxcblx0XHR9KTtcblx0fTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwidHlwZVwiLCBcImlkXCIsIFwidmFsdWVzXCIsIFwib3B0aW9uc1wiKVxuXHRzdWJtaXRGaWVsZHMgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHJlY29yZCA9IFN1aXRlU2NyaXB0TW9ja3MucmVjb3Jkcy5nZXQob3B0aW9ucyk7XG5cdFx0aWYgKCFyZWNvcmQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlJlY29yZCBkb2VzIG5vdCBleGlzdFwiKTtcblx0XHR9XG5cdFx0Y29uc3QgY29weSA9IG5ldyBSZWNvcmQoe1xuXHRcdFx0Li4ucmVjb3JkLFxuXHRcdFx0ZmllbGRzOiB7XG5cdFx0XHRcdC4uLnJlY29yZC5maWVsZHMsXG5cdFx0XHRcdC4uLm9wdGlvbnMudmFsdWVzLFxuXHRcdFx0fSxcblx0XHRcdHZlcnNpb246IHJlY29yZC52ZXJzaW9uICsgMSxcblx0XHR9KTtcblx0XHRTdWl0ZVNjcmlwdE1vY2tzLnJlY29yZHMuc2V0KGNvcHkpO1xuXHRcdHJldHVybiBjb3B5LmlkO1xuXHR9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0QG9wdGlvbnMoXCJmcm9tVHlwZVwiLCBcImZyb21JZFwiLCBcInRvVHlwZVwiLCBcImlzRHluYW1pY1wiLCBcImRlZmF1bHRWYWx1ZXNcIilcblx0dHJhbnNmb3JtID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCByZWNvcmQgPSB0aGlzLmxvYWQob3B0aW9ucy5mcm9tVHlwZSwgb3B0aW9ucy5mcm9tSWQsIG9wdGlvbnMuaXNEeW5hbWljLCBvcHRpb25zLmRlZmF1bHRWYWx1ZXMpO1xuXHRcdHJlY29yZC50eXBlID0gb3B0aW9ucy50b1R5cGU7XG5cdFx0cmVjb3JkLmlkID0gbnVsbDtcblx0XHRyZXR1cm4gcmVjb3JkO1xuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBSZWNvcmRNb2R1bGUoKTtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsNENBQTRDLENBQUM7QUFDeEUsTUFBTUMsZ0JBQWdCLEdBQUdELE9BQU8sQ0FBQyxpQkFBaUIsQ0FB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