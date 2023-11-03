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
    record.fields = {
      ...record.fields,
      ...options.values
    };
    return record.id;
  });
  transform = _init_transform(this, options => {
    const record = this.load(options.fromType, options.fromId, options.isDynamic, options.defaultValues);
    record.type = options.toType;
    record.id = null;
    return record;
  });
}
module.exports = new RecordModule();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZWNvcmRTdHViIiwicmVxdWlyZSIsIlN1aXRlU2NyaXB0TW9ja3MiLCJhZGRQcm9taXNlIiwib3B0aW9ucyIsIlJlY29yZCIsIl9kZWMiLCJfZGVjMiIsIl9kZWMzIiwiX2RlYzQiLCJfZGVjNSIsIl9kZWM2IiwiX2RlYzciLCJfZGVjOCIsIl9kZWM5IiwiX2RlYzEwIiwiX2RlYzExIiwiX2RlYzEyIiwiX2RlYzEzIiwiX2RlYzE0IiwiX2RlYzE1IiwiX2RlYzE2IiwiUmVjb3JkTW9kdWxlIiwiX2luaXRfYXR0YWNoIiwiX2luaXRfY29weSIsIl9pbml0X2NyZWF0ZSIsIl9pbml0X2RlbGV0ZSIsIl9pbml0X2RldGFjaCIsIl9pbml0X2xvYWQiLCJfaW5pdF9zdWJtaXRGaWVsZHMiLCJfaW5pdF90cmFuc2Zvcm0iLCJfYXBwbHlEZWNzMjIwM1IiLCJlIiwiVHlwZSIsImF0dGFjaCIsImNvcHkiLCJyZWNvcmQiLCJsb2FkIiwiaWQiLCJjcmVhdGUiLCJ0eXBlIiwiaXNEeW5hbWljIiwiZmllbGRzIiwiZGVmYXVsdFZhbHVlcyIsImRlbGV0ZSIsInJlYyIsInJlY29yZHMiLCJnZXQiLCJFcnJvciIsImRlbGV0ZWRSZWNvcmRzIiwicHVzaCIsImRldGFjaCIsIkJvb2xlYW4iLCJzdWJtaXRGaWVsZHMiLCJ2YWx1ZXMiLCJ0cmFuc2Zvcm0iLCJmcm9tVHlwZSIsImZyb21JZCIsInRvVHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9ja3MvcmVjb3JkL2luZGV4LmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByZWNvcmRTdHViID0gcmVxdWlyZShcInN1aXRlY2xvdWQtdW5pdC10ZXN0aW5nLXN0dWJzL3N0dWJzL3JlY29yZFwiKTtcbmNvbnN0IFN1aXRlU2NyaXB0TW9ja3MgPSByZXF1aXJlKFwiLi4vLi4vaW5kZXguY2pzXCIpO1xuY29uc3QgeyBhZGRQcm9taXNlLCBvcHRpb25zIH0gPSByZXF1aXJlKFwiLi4vLi4vaGVscGVycy5janNcIik7XG5jb25zdCBSZWNvcmQgPSByZXF1aXJlKFwiLi9SZWNvcmQuY2pzXCIpO1xuXG5jbGFzcyBSZWNvcmRNb2R1bGUge1xuXHRSZWNvcmQgPSBSZWNvcmQ7XG5cblx0VHlwZSA9IHJlY29yZFN0dWIuVHlwZTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwicmVjb3JkXCIsIFwidG9cIiwgXCJhdHRyaWJ1dGVzXCIpXG5cdGF0dGFjaCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwidHlwZVwiLCBcImlkXCIsIFwiaXNEeW5hbWljXCIsIFwiZGVmYXVsdFZhbHVlc1wiKVxuXHRjb3B5ID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCByZWNvcmQgPSB0aGlzLmxvYWQob3B0aW9ucyk7XG5cdFx0cmVjb3JkLmlkID0gbnVsbDtcblx0XHRyZXR1cm4gcmVjb3JkO1xuXHR9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0QG9wdGlvbnMoXCJ0eXBlXCIsIFwiaXNEeW5hbWljXCIsIFwiZGVmYXVsdFZhbHVlc1wiKVxuXHRjcmVhdGUgPSAob3B0aW9ucykgPT4ge1xuXHRcdHJldHVybiBuZXcgUmVjb3JkKHtcblx0XHRcdGlkOiBudWxsLFxuXHRcdFx0dHlwZTogb3B0aW9ucy50eXBlLFxuXHRcdFx0aXNEeW5hbWljOiBvcHRpb25zPy5pc0R5bmFtaWMsXG5cdFx0XHRmaWVsZHM6IG9wdGlvbnM/LmRlZmF1bHRWYWx1ZXMgfHwge30sXG5cdFx0fSk7XG5cdH07XG5cblx0QGFkZFByb21pc2UoKVxuXHRAb3B0aW9ucyhcInR5cGVcIiwgXCJpZFwiKVxuXHRkZWxldGUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IHJlYyA9IFN1aXRlU2NyaXB0TW9ja3MucmVjb3Jkcy5nZXQob3B0aW9ucyk7XG5cdFx0aWYgKCFyZWMpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlJlY29yZCBkb2VzIG5vdCBleGlzdFwiKTtcblx0XHR9XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5kZWxldGVkUmVjb3Jkcy5wdXNoKHJlYyk7XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLmRlbGV0ZShyZWMpO1xuXHRcdHJldHVybiByZWMuaWQ7XG5cdH07XG5cblx0QGFkZFByb21pc2UoKVxuXHRAb3B0aW9ucyhcInJlY29yZFwiLCBcImZyb21cIiwgXCJhdHRyaWJ1dGVzXCIpXG5cdGRldGFjaCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwidHlwZVwiLCBcImlkXCIsIFwiaXNEeW5hbWljXCIsIFwiZGVmYXVsdFZhbHVlc1wiKVxuXHRsb2FkID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCByZWNvcmQgPSBTdWl0ZVNjcmlwdE1vY2tzLnJlY29yZHMuZ2V0KG9wdGlvbnMpO1xuXHRcdGlmICghcmVjb3JkKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJSZWNvcmQgZG9lcyBub3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgUmVjb3JkKHtcblx0XHRcdC4uLnJlY29yZCxcblx0XHRcdGlzRHluYW1pYzogQm9vbGVhbihvcHRpb25zLmlzRHluYW1pYykgfHwgZmFsc2UsXG5cdFx0XHRmaWVsZHM6IHtcblx0XHRcdFx0Li4ucmVjb3JkLmZpZWxkcyxcblx0XHRcdFx0Li4uKG9wdGlvbnMuZGVmYXVsdFZhbHVlcyB8fCB7fSksXG5cdFx0XHR9LFxuXHRcdH0pO1xuXHR9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0QG9wdGlvbnMoXCJ0eXBlXCIsIFwiaWRcIiwgXCJ2YWx1ZXNcIiwgXCJvcHRpb25zXCIpXG5cdHN1Ym1pdEZpZWxkcyA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgcmVjb3JkID0gU3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLmdldChvcHRpb25zKTtcblx0XHRyZWNvcmQuZmllbGRzID0ge1xuXHRcdFx0Li4ucmVjb3JkLmZpZWxkcyxcblx0XHRcdC4uLm9wdGlvbnMudmFsdWVzLFxuXHRcdH07XG5cdFx0cmV0dXJuIHJlY29yZC5pZDtcblx0fTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwiZnJvbVR5cGVcIiwgXCJmcm9tSWRcIiwgXCJ0b1R5cGVcIiwgXCJpc0R5bmFtaWNcIiwgXCJkZWZhdWx0VmFsdWVzXCIpXG5cdHRyYW5zZm9ybSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgcmVjb3JkID0gdGhpcy5sb2FkKG9wdGlvbnMuZnJvbVR5cGUsIG9wdGlvbnMuZnJvbUlkLCBvcHRpb25zLmlzRHluYW1pYywgb3B0aW9ucy5kZWZhdWx0VmFsdWVzKTtcblx0XHRyZWNvcmQudHlwZSA9IG9wdGlvbnMudG9UeXBlO1xuXHRcdHJlY29yZC5pZCA9IG51bGw7XG5cdFx0cmV0dXJuIHJlY29yZDtcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUmVjb3JkTW9kdWxlKCk7XG4iXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDLDRDQUE0QyxDQUFDO0FBQ3hFLE1BQU1DLGdCQUFnQixHQUFHRCxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDbkQsTUFBTTtFQUFFRSxVQUFVO0VBQUVDO0FBQVEsQ0FBQyxHQUFHSCxPQUFPLENBQUMsbUJBQW1CLENBQUM7QUFDNUQsTUFBTUksTUFBTSxHQUFHSixPQUFPLENBQUMsY0FBYyxDQUFDO0FBQUNLLElBQUEsR0FPckNILFVBQVUsQ0FBQyxDQUFDO0FBQUFJLEtBQUEsR0FDWkgsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDO0FBQUFJLEtBQUEsR0FHckNMLFVBQVUsQ0FBQyxDQUFDO0FBQUFNLEtBQUEsR0FDWkwsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQztBQUFBTSxLQUFBLEdBT25EUCxVQUFVLENBQUMsQ0FBQztBQUFBUSxLQUFBLEdBQ1pQLE9BQU8sQ0FBQyxNQUFNLEVBQUUs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