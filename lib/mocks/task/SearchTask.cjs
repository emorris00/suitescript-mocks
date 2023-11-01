var _initClass, _dec, _dec2, _dec3, _init_addInboundDependency;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const {
  assignConstructor,
  options,
  required
} = require("../../helpers.cjs");
const {
  Task
} = require("./Task.cjs");
let _SearchTask;
_dec = assignConstructor();
_dec2 = options("dependentScript");
_dec3 = required("dependentScript");
class SearchTask extends Task {
  static {
    ({
      e: [_init_addInboundDependency],
      c: [_SearchTask, _initClass]
    } = _applyDecs2203R(this, [[[_dec2, _dec3], 0, "addInboundDependency"]], [_dec]));
  }
  fileId;
  filePath;
  id;
  inboundDependencies = [];
  savedSearchId;
  addInboundDependency = _init_addInboundDependency(this, options => {
    this.inboundDependencies.push(options);
  });
  static {
    _initClass();
  }
}
module.exports = _SearchTask;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3NpZ25Db25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJyZXF1aXJlZCIsInJlcXVpcmUiLCJUYXNrIiwiX1NlYXJjaFRhc2siLCJfZGVjIiwiX2RlYzIiLCJfZGVjMyIsIlNlYXJjaFRhc2siLCJlIiwiX2luaXRfYWRkSW5ib3VuZERlcGVuZGVuY3kiLCJjIiwiX2luaXRDbGFzcyIsIl9hcHBseURlY3MyMjAzUiIsImZpbGVJZCIsImZpbGVQYXRoIiwiaWQiLCJpbmJvdW5kRGVwZW5kZW5jaWVzIiwic2F2ZWRTZWFyY2hJZCIsImFkZEluYm91bmREZXBlbmRlbmN5IiwicHVzaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9ja3MvdGFzay9TZWFyY2hUYXNrLmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGFzc2lnbkNvbnN0cnVjdG9yLCBvcHRpb25zLCByZXF1aXJlZCB9ID0gcmVxdWlyZShcIi4uLy4uL2hlbHBlcnMuY2pzXCIpO1xuY29uc3QgeyBUYXNrIH0gPSByZXF1aXJlKFwiLi9UYXNrLmNqc1wiKTtcblxuQGFzc2lnbkNvbnN0cnVjdG9yKClcbmNsYXNzIFNlYXJjaFRhc2sgZXh0ZW5kcyBUYXNrIHtcblx0ZmlsZUlkO1xuXHRmaWxlUGF0aDtcblx0aWQ7XG5cdGluYm91bmREZXBlbmRlbmNpZXMgPSBbXTtcblx0c2F2ZWRTZWFyY2hJZDtcblxuXHRAb3B0aW9ucyhcImRlcGVuZGVudFNjcmlwdFwiKVxuXHRAcmVxdWlyZWQoXCJkZXBlbmRlbnRTY3JpcHRcIilcblx0YWRkSW5ib3VuZERlcGVuZGVuY3kgPSAob3B0aW9ucykgPT4ge1xuXHRcdHRoaXMuaW5ib3VuZERlcGVuZGVuY2llcy5wdXNoKG9wdGlvbnMpO1xuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlYXJjaFRhc2s7XG4iXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU07RUFBRUEsaUJBQWlCO0VBQUVDLE9BQU87RUFBRUM7QUFBUyxDQUFDLEdBQUdDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUM3RSxNQUFNO0VBQUVDO0FBQUssQ0FBQyxHQUFHRCxPQUFPLENBQUMsWUFBWSxDQUFDO0FBQUMsSUFBQUUsV0FBQTtBQUFBQyxJQUFBLEdBRXRDTixpQkFBaUIsQ0FBQyxDQUFDO0FBQUFPLEtBQUEsR0FRbEJOLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUFBTyxLQUFBLEdBQzFCTixRQUFRLENBQUMsaUJBQWlCLENBQUM7QUFUN0IsTUFBQU8sVUFBQSxTQUN5QkwsSUFBSSxDQUFDO0VBQUE7SUFBQTtNQUFBTSxDQUFBLEdBQUFDLDBCQUFBO01BQUFDLENBQUEsR0FBQVAsV0FBQSxFQUFBUSxVQUFBO0lBQUEsSUFBQUMsZUFBQSxVQUFBUCxLQUFBLEVBQUFDLEtBQUEsaUNBQUFGLElBQUE7RUFBQTtFQUM3QlMsTUFBTTtFQUNOQyxRQUFRO0VBQ1JDLEVBQUU7RUFDRkMsbUJBQW1CLEdBQUcsRUFBRTtFQUN4QkMsYUFBYTtFQUliQyxvQkFBb0IsR0FBQVQsMEJBQUEsT0FBSVYsT0FBTyxJQUFLO0lBQ25DLElBQUksQ0FBQ2lCLG1CQUFtQixDQUFDRyxJQUFJLENBQUNwQixPQUFPLENBQUM7RUFDdkMsQ0FBQztFQUFDO0lBQUFZLFVBQUE7RUFBQTtBQUNIO0FBRUFTLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHZCxXQUFVIn0=