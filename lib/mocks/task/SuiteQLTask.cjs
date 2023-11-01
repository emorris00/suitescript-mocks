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
let _SuiteQLTask;
_dec = assignConstructor();
_dec2 = options("scriptId", "taskType", "deploymentId", "params");
_dec3 = required("scriptId", "taskType");
class SuiteQLTask extends Task {
  static {
    ({
      e: [_init_addInboundDependency],
      c: [_SuiteQLTask, _initClass]
    } = _applyDecs2203R(this, [[[_dec2, _dec3], 0, "addInboundDependency"]], [_dec]));
  }
  fileId;
  filePath;
  inboundDependencies = [];
  params;
  query;
  addInboundDependency = _init_addInboundDependency(this, options => {
    this.inboundDependencies.push(options);
  });
  static {
    _initClass();
  }
}
module.exports = _SuiteQLTask;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3NpZ25Db25zdHJ1Y3RvciIsIm9wdGlvbnMiLCJyZXF1aXJlZCIsInJlcXVpcmUiLCJUYXNrIiwiX1N1aXRlUUxUYXNrIiwiX2RlYyIsIl9kZWMyIiwiX2RlYzMiLCJTdWl0ZVFMVGFzayIsImUiLCJfaW5pdF9hZGRJbmJvdW5kRGVwZW5kZW5jeSIsImMiLCJfaW5pdENsYXNzIiwiX2FwcGx5RGVjczIyMDNSIiwiZmlsZUlkIiwiZmlsZVBhdGgiLCJpbmJvdW5kRGVwZW5kZW5jaWVzIiwicGFyYW1zIiwicXVlcnkiLCJhZGRJbmJvdW5kRGVwZW5kZW5jeSIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vY2tzL3Rhc2svU3VpdGVRTFRhc2suY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgYXNzaWduQ29uc3RydWN0b3IsIG9wdGlvbnMsIHJlcXVpcmVkIH0gPSByZXF1aXJlKFwiLi4vLi4vaGVscGVycy5janNcIik7XG5jb25zdCB7IFRhc2sgfSA9IHJlcXVpcmUoXCIuL1Rhc2suY2pzXCIpO1xuXG5AYXNzaWduQ29uc3RydWN0b3IoKVxuY2xhc3MgU3VpdGVRTFRhc2sgZXh0ZW5kcyBUYXNrIHtcblx0ZmlsZUlkO1xuXHRmaWxlUGF0aDtcblx0aW5ib3VuZERlcGVuZGVuY2llcyA9IFtdO1xuXHRwYXJhbXM7XG5cdHF1ZXJ5O1xuXG5cdEBvcHRpb25zKFwic2NyaXB0SWRcIiwgXCJ0YXNrVHlwZVwiLCBcImRlcGxveW1lbnRJZFwiLCBcInBhcmFtc1wiKVxuXHRAcmVxdWlyZWQoXCJzY3JpcHRJZFwiLCBcInRhc2tUeXBlXCIpXG5cdGFkZEluYm91bmREZXBlbmRlbmN5ID0gKG9wdGlvbnMpID0+IHtcblx0XHR0aGlzLmluYm91bmREZXBlbmRlbmNpZXMucHVzaChvcHRpb25zKTtcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdWl0ZVFMVGFzaztcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTTtFQUFFQSxpQkFBaUI7RUFBRUMsT0FBTztFQUFFQztBQUFTLENBQUMsR0FBR0MsT0FBTyxDQUFDLG1CQUFtQixDQUFDO0FBQzdFLE1BQU07RUFBRUM7QUFBSyxDQUFDLEdBQUdELE9BQU8sQ0FBQyxZQUFZLENBQUM7QUFBQyxJQUFBRSxZQUFBO0FBQUFDLElBQUEsR0FFdENOLGlCQUFpQixDQUFDLENBQUM7QUFBQU8sS0FBQSxHQVFsQk4sT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQztBQUFBTyxLQUFBLEdBQ3pETixRQUFRLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztBQVRsQyxNQUFBTyxXQUFBLFNBQzBCTCxJQUFJLENBQUM7RUFBQTtJQUFBO01BQUFNLENBQUEsR0FBQUMsMEJBQUE7TUFBQUMsQ0FBQSxHQUFBUCxZQUFBLEVBQUFRLFVBQUE7SUFBQSxJQUFBQyxlQUFBLFVBQUFQLEtBQUEsRUFBQUMsS0FBQSxpQ0FBQUYsSUFBQTtFQUFBO0VBQzlCUyxNQUFNO0VBQ05DLFFBQVE7RUFDUkMsbUJBQW1CLEdBQUcsRUFBRTtFQUN4QkMsTUFBTTtFQUNOQyxLQUFLO0VBSUxDLG9CQUFvQixHQUFBVCwwQkFBQSxPQUFJVixPQUFPLElBQUs7SUFDbkMsSUFBSSxDQUFDZ0IsbUJBQW1CLENBQUNJLElBQUksQ0FBQ3BCLE9BQU8sQ0FBQztFQUN2QyxDQUFDO0VBQUM7SUFBQVksVUFBQTtFQUFBO0FBQ0g7QUFFQVMsTUFBTSxDQUFDQyxPQUFPLEdBQUdkLFlBQVcifQ==