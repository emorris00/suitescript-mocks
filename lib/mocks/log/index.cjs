var _dec, _dec2, _init_audit, _dec3, _dec4, _init_debug, _dec5, _dec6, _init_emergency, _dec7, _dec8, _init_error;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const {
  options,
  required
} = require("../../helpers.cjs");
const SuiteScriptMocks = require("../../index.cjs");
_dec = options("title", "details");
_dec2 = required("title");
_dec3 = options("title", "details");
_dec4 = required("title");
_dec5 = options("title", "details");
_dec6 = required("title");
_dec7 = options("title", "details");
_dec8 = required("title");
class LogModule {
  static {
    [_init_audit, _init_debug, _init_emergency, _init_error] = _applyDecs2203R(this, [[[_dec, _dec2], 0, "audit"], [[_dec3, _dec4], 0, "debug"], [[_dec5, _dec6], 0, "emergency"], [[_dec7, _dec8], 0, "error"]], []).e;
  }
  audit = _init_audit(this, options => {
    SuiteScriptMocks.logs.push({
      ...options,
      type: "audit"
    });
    if (SuiteScriptMocks.outputAuditLogs) {
      console.info(options);
    }
  });
  debug = _init_debug(this, options => {
    SuiteScriptMocks.logs.push({
      ...options,
      type: "debug"
    });
    if (SuiteScriptMocks.outputDebugLogs) {
      console.log(options);
    }
  });
  emergency = _init_emergency(this, options => {
    SuiteScriptMocks.logs.push({
      ...options,
      type: "emergency"
    });
    if (SuiteScriptMocks.outputEmergencyLogs) {
      console.error(options);
    }
  });
  error = _init_error(this, options => {
    SuiteScriptMocks.logs.push({
      ...options,
      type: "error"
    });
    if (SuiteScriptMocks.outputErrorLogs) {
      console.error(options);
    }
  });
}
module.exports = new LogModule();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25zIiwicmVxdWlyZWQiLCJyZXF1aXJlIiwiU3VpdGVTY3JpcHRNb2NrcyIsIl9kZWMiLCJfZGVjMiIsIl9kZWMzIiwiX2RlYzQiLCJfZGVjNSIsIl9kZWM2IiwiX2RlYzciLCJfZGVjOCIsIkxvZ01vZHVsZSIsIl9pbml0X2F1ZGl0IiwiX2luaXRfZGVidWciLCJfaW5pdF9lbWVyZ2VuY3kiLCJfaW5pdF9lcnJvciIsIl9hcHBseURlY3MyMjAzUiIsImUiLCJhdWRpdCIsImxvZ3MiLCJwdXNoIiwidHlwZSIsIm91dHB1dEF1ZGl0TG9ncyIsImNvbnNvbGUiLCJpbmZvIiwiZGVidWciLCJvdXRwdXREZWJ1Z0xvZ3MiLCJsb2ciLCJlbWVyZ2VuY3kiLCJvdXRwdXRFbWVyZ2VuY3lMb2dzIiwiZXJyb3IiLCJvdXRwdXRFcnJvckxvZ3MiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vY2tzL2xvZy9pbmRleC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBvcHRpb25zLCByZXF1aXJlZCB9ID0gcmVxdWlyZShcIi4uLy4uL2hlbHBlcnMuY2pzXCIpO1xuY29uc3QgU3VpdGVTY3JpcHRNb2NrcyA9IHJlcXVpcmUoXCIuLi8uLi9pbmRleC5janNcIik7XG5cbmNsYXNzIExvZ01vZHVsZSB7XG5cdEBvcHRpb25zKFwidGl0bGVcIiwgXCJkZXRhaWxzXCIpXG5cdEByZXF1aXJlZChcInRpdGxlXCIpXG5cdGF1ZGl0ID0gKG9wdGlvbnMpID0+IHtcblx0XHRTdWl0ZVNjcmlwdE1vY2tzLmxvZ3MucHVzaCh7IC4uLm9wdGlvbnMsIHR5cGU6IFwiYXVkaXRcIiB9KTtcblx0XHRpZiAoU3VpdGVTY3JpcHRNb2Nrcy5vdXRwdXRBdWRpdExvZ3MpIHtcblx0XHRcdGNvbnNvbGUuaW5mbyhvcHRpb25zKTtcblx0XHR9XG5cdH07XG5cblx0QG9wdGlvbnMoXCJ0aXRsZVwiLCBcImRldGFpbHNcIilcblx0QHJlcXVpcmVkKFwidGl0bGVcIilcblx0ZGVidWcgPSAob3B0aW9ucykgPT4ge1xuXHRcdFN1aXRlU2NyaXB0TW9ja3MubG9ncy5wdXNoKHsgLi4ub3B0aW9ucywgdHlwZTogXCJkZWJ1Z1wiIH0pO1xuXHRcdGlmIChTdWl0ZVNjcmlwdE1vY2tzLm91dHB1dERlYnVnTG9ncykge1xuXHRcdFx0Y29uc29sZS5sb2cob3B0aW9ucyk7XG5cdFx0fVxuXHR9O1xuXG5cdEBvcHRpb25zKFwidGl0bGVcIiwgXCJkZXRhaWxzXCIpXG5cdEByZXF1aXJlZChcInRpdGxlXCIpXG5cdGVtZXJnZW5jeSA9IChvcHRpb25zKSA9PiB7XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5sb2dzLnB1c2goeyAuLi5vcHRpb25zLCB0eXBlOiBcImVtZXJnZW5jeVwiIH0pO1xuXHRcdGlmIChTdWl0ZVNjcmlwdE1vY2tzLm91dHB1dEVtZXJnZW5jeUxvZ3MpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3Iob3B0aW9ucyk7XG5cdFx0fVxuXHR9O1xuXG5cdEBvcHRpb25zKFwidGl0bGVcIiwgXCJkZXRhaWxzXCIpXG5cdEByZXF1aXJlZChcInRpdGxlXCIpXG5cdGVycm9yID0gKG9wdGlvbnMpID0+IHtcblx0XHRTdWl0ZVNjcmlwdE1vY2tzLmxvZ3MucHVzaCh7IC4uLm9wdGlvbnMsIHR5cGU6IFwiZXJyb3JcIiB9KTtcblx0XHRpZiAoU3VpdGVTY3JpcHRNb2Nrcy5vdXRwdXRFcnJvckxvZ3MpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3Iob3B0aW9ucyk7XG5cdFx0fVxuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBMb2dNb2R1bGUoKTtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTTtFQUFFQSxPQUFPO0VBQUVDO0FBQVMsQ0FBQyxHQUFHQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7QUFDMUQsTUFBTUMsZ0JBQWdCLEdBQUdELE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUFDRSxJQUFBLEdBR2xESixPQUFPLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztBQUFBSyxLQUFBLEdBQzNCSixRQUFRLENBQUMsT0FBTyxDQUFDO0FBQUFLLEtBQUEsR0FRakJOLE9BQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO0FBQUFPLEtBQUEsR0FDM0JOLFFBQVEsQ0FBQyxPQUFPLENBQUM7QUFBQU8sS0FBQSxHQVFqQlIsT0FBTyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7QUFBQVMsS0FBQSxHQUMzQlIsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUFBUyxLQUFBLEdBUWpCVixPQUFPLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztBQUFBVyxLQUFBLEdBQzNCVixRQUFRLENBQUMsT0FBTyxDQUFDO0FBN0JuQixNQUFNVyxTQUFTLENBQUM7RUFBQTtJQUFBLENBQUFDLFdBQUEsRUFBQUMsV0FBQSxFQUFBQyxlQUFBLEVBQUFDLFdBQUEsSUFBQUMsZUFBQSxVQUFBYixJQUFBLEVBQUFDLEtBQUEsa0JBQUFDLEtBQUEsRUFBQUMsS0FBQSxrQkFBQUMsS0FBQSxFQUFBQyxLQUFBLHNCQUFBQyxLQUFBLEVBQUFDLEtBQUEscUJBQUFPLENBQUE7RUFBQTtFQUdmQyxLQUFLLEdBQUFOLFdBQUEsT0FBSWIsT0FBTyxJQUFLO0lBQ3BCRyxnQkFBZ0IsQ0FBQ2lCLElBQUksQ0FBQ0MsSUFBSSxDQUFDO01BQUUsR0FBR3JCLE9BQU87TUFBRXNCLElBQUksRUFBRTtJQUFRLENBQUMsQ0FBQztJQUN6RCxJQUFJbkIsZ0JBQWdCLENBQUNvQixlQUFlLEVBQUU7TUFDckNDLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDekIsT0FBTyxDQUFDO0lBQ3RCO0VBQ0QsQ0FBQztFQUlEMEIsS0FBSyxHQUFBWixXQUFBLE9BQUlkLE9BQU8sSUFBSztJQUNwQkcsZ0JBQWdCLENBQUNpQixJQUFJLENBQUNDLElBQUksQ0FBQztNQUFFLEdBQUdyQixPQUFPO01BQUVzQixJQUFJLEVBQUU7SUFBUSxDQUFDLENBQUM7SUFDekQsSUFBSW5CLGdCQUFnQixDQUFDd0IsZUFBZSxFQUFFO01BQ3JDSCxPQUFPLENBQUNJLEdBQUcsQ0FBQzVCLE9BQU8sQ0FBQztJQUNyQjtFQUNELENBQUM7RUFJRDZCLFNBQVMsR0FBQWQsZUFBQSxPQUFJZixPQUFPLElBQUs7SUFDeEJHLGdCQUFnQixDQUFDaUIsSUFBSSxDQUFDQyxJQUFJLENBQUM7TUFBRSxHQUFHckIsT0FBTztNQUFFc0IsSUFBSSxFQUFFO0lBQVksQ0FBQyxDQUFDO0lBQzdELElBQUluQixnQkFBZ0IsQ0FBQzJCLG1CQUFtQixFQUFFO01BQ3pDTixPQUFPLENBQUNPLEtBQUssQ0FBQy9CLE9BQU8sQ0FBQztJQUN2QjtFQUNELENBQUM7RUFJRCtCLEtBQUssR0FBQWYsV0FBQSxPQUFJaEIsT0FBTyxJQUFLO0lBQ3BCRyxnQkFBZ0IsQ0FBQ2lCLElBQUksQ0FBQ0MsSUFBSSxDQUFDO01BQUUsR0FBR3JCLE9BQU87TUFBRXNCLElBQUksRUFBRTtJQUFRLENBQUMsQ0FBQztJQUN6RCxJQUFJbkIsZ0JBQWdCLENBQUM2QixlQUFlLEVBQUU7TUFDckNSLE9BQU8sQ0FBQ08sS0FBSyxDQUFDL0IsT0FBTyxDQUFDO0lBQ3ZCO0VBQ0QsQ0FBQztBQUNGO0FBRUFpQyxNQUFNLENBQUNDLE9BQU8sR0FBRyxJQUFJdEIsU0FBUyxDQUFDLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=