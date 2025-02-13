var _initClass, _dec, _dec2, _dec3, _init_getPermission, _dec4, _dec5, _init_getPreference;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const {
  options,
  required,
  assignConstructor
} = require("../../helpers.cjs");
let _User;
_dec = assignConstructor();
_dec2 = options("name");
_dec3 = required("name");
_dec4 = options("name");
_dec5 = required("name");
class User {
  static {
    ({
      e: [_init_getPermission, _init_getPreference],
      c: [_User, _initClass]
    } = _applyDecs2203R(this, [[[_dec2, _dec3], 0, "getPermission"], [[_dec4, _dec5], 0, "getPreference"]], [_dec]));
  }
  contact;
  department;
  email;
  id;
  location;
  name;
  role;
  roleCenter;
  roleId;
  subsidiary;
  permissions;
  preferences;
  getPermission = _init_getPermission(this, options => {
    return Boolean(this.permissions[options.name]);
  });
  getPreference = _init_getPreference(this, options => {
    return this.preferences[options.name];
  });
  static {
    _initClass();
  }
}
module.exports = _User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25zIiwicmVxdWlyZWQiLCJhc3NpZ25Db25zdHJ1Y3RvciIsInJlcXVpcmUiLCJfVXNlciIsIl9kZWMiLCJfZGVjMiIsIl9kZWMzIiwiX2RlYzQiLCJfZGVjNSIsIlVzZXIiLCJlIiwiX2luaXRfZ2V0UGVybWlzc2lvbiIsIl9pbml0X2dldFByZWZlcmVuY2UiLCJjIiwiX2luaXRDbGFzcyIsIl9hcHBseURlY3MyMjAzUiIsImNvbnRhY3QiLCJkZXBhcnRtZW50IiwiZW1haWwiLCJpZCIsImxvY2F0aW9uIiwibmFtZSIsInJvbGUiLCJyb2xlQ2VudGVyIiwicm9sZUlkIiwic3Vic2lkaWFyeSIsInBlcm1pc3Npb25zIiwicHJlZmVyZW5jZXMiLCJnZXRQZXJtaXNzaW9uIiwiQm9vbGVhbiIsImdldFByZWZlcmVuY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vY2tzL3J1bnRpbWUvVXNlci5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBvcHRpb25zLCByZXF1aXJlZCwgYXNzaWduQ29uc3RydWN0b3IgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKTtcblxuQGFzc2lnbkNvbnN0cnVjdG9yKClcbmNsYXNzIFVzZXIge1xuXHRjb250YWN0O1xuXHRkZXBhcnRtZW50O1xuXHRlbWFpbDtcblx0aWQ7XG5cdGxvY2F0aW9uO1xuXHRuYW1lO1xuXHRyb2xlO1xuXHRyb2xlQ2VudGVyO1xuXHRyb2xlSWQ7XG5cdHN1YnNpZGlhcnk7XG5cblx0cGVybWlzc2lvbnM7XG5cdHByZWZlcmVuY2VzO1xuXG5cdEBvcHRpb25zKFwibmFtZVwiKVxuXHRAcmVxdWlyZWQoXCJuYW1lXCIpXG5cdGdldFBlcm1pc3Npb24gPSAob3B0aW9ucykgPT4ge1xuXHRcdHJldHVybiBCb29sZWFuKHRoaXMucGVybWlzc2lvbnNbb3B0aW9ucy5uYW1lXSk7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJuYW1lXCIpXG5cdEByZXF1aXJlZChcIm5hbWVcIilcblx0Z2V0UHJlZmVyZW5jZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0cmV0dXJuIHRoaXMucHJlZmVyZW5jZXNbb3B0aW9ucy5uYW1lXTtcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVc2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNO0VBQUVBLE9BQU87RUFBRUMsUUFBUTtFQUFFQztBQUFrQixDQUFDLEdBQUdDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUFDLElBQUFDLEtBQUE7QUFBQUMsSUFBQSxHQUU3RUgsaUJBQWlCLENBQUMsQ0FBQztBQUFBSSxLQUFBLEdBZ0JsQk4sT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUFBTyxLQUFBLEdBQ2ZOLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFBQU8sS0FBQSxHQUtoQlIsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUFBUyxLQUFBLEdBQ2ZSLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUF2QmxCLE1BQUFTLElBQUEsQ0FDVztFQUFBO0lBQUE7TUFBQUMsQ0FBQSxHQUFBQyxtQkFBQSxFQUFBQyxtQkFBQTtNQUFBQyxDQUFBLEdBQUFWLEtBQUEsRUFBQVcsVUFBQTtJQUFBLElBQUFDLGVBQUEsVUFBQVYsS0FBQSxFQUFBQyxLQUFBLDBCQUFBQyxLQUFBLEVBQUFDLEtBQUEsMEJBQUFKLElBQUE7RUFBQTtFQUNWWSxPQUFPO0VBQ1BDLFVBQVU7RUFDVkMsS0FBSztFQUNMQyxFQUFFO0VBQ0ZDLFFBQVE7RUFDUkMsSUFBSTtFQUNKQyxJQUFJO0VBQ0pDLFVBQVU7RUFDVkMsTUFBTTtFQUNOQyxVQUFVO0VBRVZDLFdBQVc7RUFDWEMsV0FBVztFQUlYQyxhQUFhLEdBQUFqQixtQkFBQSxPQUFJWixPQUFPLElBQUs7SUFDNUIsT0FBTzhCLE9BQU8sQ0FBQyxJQUFJLENBQUNILFdBQVcsQ0FBQzNCLE9BQU8sQ0FBQ3NCLElBQUksQ0FBQyxDQUFDO0VBQy9DLENBQUM7RUFJRFMsYUFBYSxHQUFBbEIsbUJBQUEsT0FBSWIsT0FBTyxJQUFLO0lBQzVCLE9BQU8sSUFBSSxDQUFDNEIsV0FBVyxDQUFDNUIsT0FBTyxDQUFDc0IsSUFBSSxDQUFDO0VBQ3RDLENBQUM7RUFBQztJQUFBUCxVQUFBO0VBQUE7QUFDSDtBQUVBaUIsTUFBTSxDQUFDQyxPQUFPLEdBQUd2QixLQUFJIiwiaWdub3JlTGlzdCI6W119