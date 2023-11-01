var _initClass, _dec, _dec2, _init_setWhenOrderedBy;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const {
  options,
  assignConstructor
} = require("../../helpers.cjs");
let _Column;
_dec = assignConstructor();
_dec2 = options("name", "join");
class Column {
  static {
    ({
      e: [_init_setWhenOrderedBy],
      c: [_Column, _initClass]
    } = _applyDecs2203R(this, [[_dec2, 0, "setWhenOrderedBy"]], [_dec]));
  }
  name;
  join;
  summary;
  formula;
  function;
  label;
  sort;
  initialize() {
    if (this.sort && !["ASC", "DESC", "NONE"].includes(this.sort)) {
      throw new Error(`Column.sort must be one of ["ASC","DESC","NONE"]`);
    }
  }
  setWhenOrderedBy = _init_setWhenOrderedBy(this, () => {});
  equals = column2 => {
    const format = value => String(value ? value : "").toLowerCase();
    return ["name", "join", "summary", "formula", "function"].every(key => format(this[key]) == format(column2[key]));
  };
  static {
    _initClass();
  }
}
module.exports = _Column;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25zIiwiYXNzaWduQ29uc3RydWN0b3IiLCJyZXF1aXJlIiwiX0NvbHVtbiIsIl9kZWMiLCJfZGVjMiIsIkNvbHVtbiIsImUiLCJfaW5pdF9zZXRXaGVuT3JkZXJlZEJ5IiwiYyIsIl9pbml0Q2xhc3MiLCJfYXBwbHlEZWNzMjIwM1IiLCJuYW1lIiwiam9pbiIsInN1bW1hcnkiLCJmb3JtdWxhIiwiZnVuY3Rpb24iLCJsYWJlbCIsInNvcnQiLCJpbml0aWFsaXplIiwiaW5jbHVkZXMiLCJFcnJvciIsInNldFdoZW5PcmRlcmVkQnkiLCJlcXVhbHMiLCJjb2x1bW4yIiwiZm9ybWF0IiwidmFsdWUiLCJTdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImV2ZXJ5Iiwia2V5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2Nrcy9zZWFyY2gvQ29sdW1uLmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IG9wdGlvbnMsIGFzc2lnbkNvbnN0cnVjdG9yIH0gPSByZXF1aXJlKFwiLi4vLi4vaGVscGVycy5janNcIik7XG5cbkBhc3NpZ25Db25zdHJ1Y3RvcigpXG5jbGFzcyBDb2x1bW4ge1xuXHRuYW1lO1xuXHRqb2luO1xuXHRzdW1tYXJ5O1xuXHRmb3JtdWxhO1xuXHRmdW5jdGlvbjtcblx0bGFiZWw7XG5cdHNvcnQ7XG5cblx0aW5pdGlhbGl6ZSgpIHtcblx0XHRpZiAodGhpcy5zb3J0ICYmICFbXCJBU0NcIiwgXCJERVNDXCIsIFwiTk9ORVwiXS5pbmNsdWRlcyh0aGlzLnNvcnQpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYENvbHVtbi5zb3J0IG11c3QgYmUgb25lIG9mIFtcIkFTQ1wiLFwiREVTQ1wiLFwiTk9ORVwiXWApO1xuXHRcdH1cblx0fVxuXG5cdEBvcHRpb25zKFwibmFtZVwiLCBcImpvaW5cIilcblx0c2V0V2hlbk9yZGVyZWRCeSA9ICgpID0+IHt9O1xuXG5cdGVxdWFscyA9IChjb2x1bW4yKSA9PiB7XG5cdFx0Y29uc3QgZm9ybWF0ID0gKHZhbHVlKSA9PiBTdHJpbmcodmFsdWUgPyB2YWx1ZSA6IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRyZXR1cm4gW1wibmFtZVwiLCBcImpvaW5cIiwgXCJzdW1tYXJ5XCIsIFwiZm9ybXVsYVwiLCBcImZ1bmN0aW9uXCJdLmV2ZXJ5KFxuXHRcdFx0KGtleSkgPT4gZm9ybWF0KHRoaXNba2V5XSkgPT0gZm9ybWF0KGNvbHVtbjJba2V5XSksXG5cdFx0KTtcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb2x1bW47XG4iXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU07RUFBRUEsT0FBTztFQUFFQztBQUFrQixDQUFDLEdBQUdDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUFDLElBQUFDLE9BQUE7QUFBQUMsSUFBQSxHQUVuRUgsaUJBQWlCLENBQUMsQ0FBQztBQUFBSSxLQUFBLEdBZ0JsQkwsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7QUFoQnpCLE1BQUFNLE1BQUEsQ0FDYTtFQUFBO0lBQUE7TUFBQUMsQ0FBQSxHQUFBQyxzQkFBQTtNQUFBQyxDQUFBLEdBQUFOLE9BQUEsRUFBQU8sVUFBQTtJQUFBLElBQUFDLGVBQUEsU0FBQU4sS0FBQSw0QkFBQUQsSUFBQTtFQUFBO0VBQ1pRLElBQUk7RUFDSkMsSUFBSTtFQUNKQyxPQUFPO0VBQ1BDLE9BQU87RUFDUEMsUUFBUTtFQUNSQyxLQUFLO0VBQ0xDLElBQUk7RUFFSkMsVUFBVUEsQ0FBQSxFQUFHO0lBQ1osSUFBSSxJQUFJLENBQUNELElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQ0UsUUFBUSxDQUFDLElBQUksQ0FBQ0YsSUFBSSxDQUFDLEVBQUU7TUFDOUQsTUFBTSxJQUFJRyxLQUFLLENBQUUsa0RBQWlELENBQUM7SUFDcEU7RUFDRDtFQUdBQyxnQkFBZ0IsR0FBQWQsc0JBQUEsT0FBRyxNQUFNLENBQUMsQ0FBQztFQUUzQmUsTUFBTSxHQUFJQyxPQUFPLElBQUs7SUFDckIsTUFBTUMsTUFBTSxHQUFJQyxLQUFLLElBQUtDLE1BQU0sQ0FBQ0QsS0FBSyxHQUFHQSxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUNFLFdBQVcsQ0FBQyxDQUFDO0lBRWxFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUNDLEtBQUssQ0FDN0RDLEdBQUcsSUFBS0wsTUFBTSxDQUFDLElBQUksQ0FBQ0ssR0FBRyxDQUFDLENBQUMsSUFBSUwsTUFBTSxDQUFDRCxPQUFPLENBQUNNLEdBQUcsQ0FBQyxDQUNsRCxDQUFDO0VBQ0YsQ0FBQztFQUFDO0lBQUFwQixVQUFBO0VBQUE7QUFDSDtBQUVBcUIsTUFBTSxDQUFDQyxPQUFPLEdBQUcxQixPQUFNIn0=