var _initClass, _dec, _dec2, _dec3, _init_addSelectOption, _dec4, _init_getSelectOptions, _dec5, _dec6, _init_setHelpText, _dec7, _dec8, _init_updateBreakType, _dec9, _dec10, _init_updateDisplaySize, _dec11, _dec12, _init_updateDisplayType, _dec13, _dec14, _init_updateLayoutType;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const {
  options,
  required,
  assignConstructor
} = require("../../../helpers.cjs");
const serverWidgetStub = require("suitecloud-unit-testing-stubs/stubs/serverWidget.js");
let _Field;
_dec = assignConstructor();
_dec2 = options("value", "text", "isSelected");
_dec3 = required("value", "text");
_dec4 = options("filter", "filteroperator");
_dec5 = options("help", "showInlineForAssistant");
_dec6 = required("help");
_dec7 = options("breakType");
_dec8 = required("breakType");
_dec9 = options("height", "width");
_dec10 = required("height", "width");
_dec11 = options("displayType");
_dec12 = required("displayType");
_dec13 = options("layoutType");
_dec14 = required("layoutType");
class Field {
  static {
    ({
      e: [_init_addSelectOption, _init_getSelectOptions, _init_setHelpText, _init_updateBreakType, _init_updateDisplaySize, _init_updateDisplayType, _init_updateLayoutType],
      c: [_Field, _initClass]
    } = _applyDecs2203R(this, [[[_dec2, _dec3], 0, "addSelectOption"], [_dec4, 0, "getSelectOptions"], [[_dec5, _dec6], 0, "setHelpText"], [[_dec7, _dec8], 0, "updateBreakType"], [[_dec9, _dec10], 0, "updateDisplaySize"], [[_dec11, _dec12], 0, "updateDisplayType"], [[_dec13, _dec14], 0, "updateLayoutType"]], [_dec]));
  }
  alias;
  defaultValue;
  helpText;
  id;
  isMandatory = false;
  label;
  linkText;
  maxLength;
  padding;
  richTextHeight;
  richTextWidth;
  type;
  source;
  container;
  help;
  options = [];
  height;
  width;
  addSelectOption = _init_addSelectOption(this, options => {
    this.options.push(options);
  });

  // TODO
  getSelectOptions = _init_getSelectOptions(this, options => {
    return this.options;
  });
  setHelpText = _init_setHelpText(this, options => {
    this.help = options.help;
    return this;
  });
  updateBreakType = _init_updateBreakType(this, options => {
    if (!Object.values(serverWidgetStub.FieldBreakType).includes(options.breakType)) {
      throw new Error("Invalid value for breakType");
    }
    this.breakType = options.breakType;
    return this;
  });
  updateDisplaySize = _init_updateDisplaySize(this, options => {
    this.height = options.height;
    this.width = options.width;
    return this;
  });
  updateDisplayType = _init_updateDisplayType(this, options => {
    if (!Object.values(serverWidgetStub.FieldDisplayType).includes(options.displayType)) {
      throw new Error("Invalid value for displayType");
    }
    this.displayType = options.displayType;
    return this;
  });
  updateLayoutType = _init_updateLayoutType(this, options => {
    if (!Object.values(serverWidgetStub.FieldLayoutType).includes(options.layoutType)) {
      throw new Error("Invalid value for layoutType");
    }
    this.layoutType = options.layoutType;
    return this;
  });
  static {
    _initClass();
  }
}
module.exports = _Field;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25zIiwicmVxdWlyZWQiLCJhc3NpZ25Db25zdHJ1Y3RvciIsInJlcXVpcmUiLCJzZXJ2ZXJXaWRnZXRTdHViIiwiX0ZpZWxkIiwiX2RlYyIsIl9kZWMyIiwiX2RlYzMiLCJfZGVjNCIsIl9kZWM1IiwiX2RlYzYiLCJfZGVjNyIsIl9kZWM4IiwiX2RlYzkiLCJfZGVjMTAiLCJfZGVjMTEiLCJfZGVjMTIiLCJfZGVjMTMiLCJfZGVjMTQiLCJGaWVsZCIsImUiLCJfaW5pdF9hZGRTZWxlY3RPcHRpb24iLCJfaW5pdF9nZXRTZWxlY3RPcHRpb25zIiwiX2luaXRfc2V0SGVscFRleHQiLCJfaW5pdF91cGRhdGVCcmVha1R5cGUiLCJfaW5pdF91cGRhdGVEaXNwbGF5U2l6ZSIsIl9pbml0X3VwZGF0ZURpc3BsYXlUeXBlIiwiX2luaXRfdXBkYXRlTGF5b3V0VHlwZSIsImMiLCJfaW5pdENsYXNzIiwiX2FwcGx5RGVjczIyMDNSIiwiYWxpYXMiLCJkZWZhdWx0VmFsdWUiLCJoZWxwVGV4dCIsImlkIiwiaXNNYW5kYXRvcnkiLCJsYWJlbCIsImxpbmtUZXh0IiwibWF4TGVuZ3RoIiwicGFkZGluZyIsInJpY2hUZXh0SGVpZ2h0IiwicmljaFRleHRXaWR0aCIsInR5cGUiLCJzb3VyY2UiLCJjb250YWluZXIiLCJoZWxwIiwiaGVpZ2h0Iiwid2lkdGgiLCJhZGRTZWxlY3RPcHRpb24iLCJwdXNoIiwiZ2V0U2VsZWN0T3B0aW9ucyIsInNldEhlbHBUZXh0IiwidXBkYXRlQnJlYWtUeXBlIiwiT2JqZWN0IiwidmFsdWVzIiwiRmllbGRCcmVha1R5cGUiLCJpbmNsdWRlcyIsImJyZWFrVHlwZSIsIkVycm9yIiwidXBkYXRlRGlzcGxheVNpemUiLCJ1cGRhdGVEaXNwbGF5VHlwZSIsIkZpZWxkRGlzcGxheVR5cGUiLCJkaXNwbGF5VHlwZSIsInVwZGF0ZUxheW91dFR5cGUiLCJGaWVsZExheW91dFR5cGUiLCJsYXlvdXRUeXBlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2Nrcy91aS9zZXJ2ZXJXaWRnZXQvRmllbGQuY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgb3B0aW9ucywgcmVxdWlyZWQsIGFzc2lnbkNvbnN0cnVjdG9yIH0gPSByZXF1aXJlKFwiLi4vLi4vLi4vaGVscGVycy5janNcIik7XG5jb25zdCBzZXJ2ZXJXaWRnZXRTdHViID0gcmVxdWlyZShcInN1aXRlY2xvdWQtdW5pdC10ZXN0aW5nLXN0dWJzL3N0dWJzL3NlcnZlcldpZGdldC5qc1wiKTtcblxuQGFzc2lnbkNvbnN0cnVjdG9yKClcbmNsYXNzIEZpZWxkIHtcblx0YWxpYXM7XG5cdGRlZmF1bHRWYWx1ZTtcblx0aGVscFRleHQ7XG5cdGlkO1xuXHRpc01hbmRhdG9yeSA9IGZhbHNlO1xuXHRsYWJlbDtcblx0bGlua1RleHQ7XG5cdG1heExlbmd0aDtcblx0cGFkZGluZztcblx0cmljaFRleHRIZWlnaHQ7XG5cdHJpY2hUZXh0V2lkdGg7XG5cdHR5cGU7XG5cdHNvdXJjZTtcblx0Y29udGFpbmVyO1xuXHRoZWxwO1xuXHRvcHRpb25zID0gW107XG5cdGhlaWdodDtcblx0d2lkdGg7XG5cblx0QG9wdGlvbnMoXCJ2YWx1ZVwiLCBcInRleHRcIiwgXCJpc1NlbGVjdGVkXCIpXG5cdEByZXF1aXJlZChcInZhbHVlXCIsIFwidGV4dFwiKVxuXHRhZGRTZWxlY3RPcHRpb24gPSAob3B0aW9ucykgPT4ge1xuXHRcdHRoaXMub3B0aW9ucy5wdXNoKG9wdGlvbnMpO1xuXHR9O1xuXG5cdC8vIFRPRE9cblx0QG9wdGlvbnMoXCJmaWx0ZXJcIiwgXCJmaWx0ZXJvcGVyYXRvclwiKVxuXHRnZXRTZWxlY3RPcHRpb25zID0gKG9wdGlvbnMpID0+IHtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiaGVscFwiLCBcInNob3dJbmxpbmVGb3JBc3Npc3RhbnRcIilcblx0QHJlcXVpcmVkKFwiaGVscFwiKVxuXHRzZXRIZWxwVGV4dCA9IChvcHRpb25zKSA9PiB7XG5cdFx0dGhpcy5oZWxwID0gb3B0aW9ucy5oZWxwO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiYnJlYWtUeXBlXCIpXG5cdEByZXF1aXJlZChcImJyZWFrVHlwZVwiKVxuXHR1cGRhdGVCcmVha1R5cGUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGlmICghT2JqZWN0LnZhbHVlcyhzZXJ2ZXJXaWRnZXRTdHViLkZpZWxkQnJlYWtUeXBlKS5pbmNsdWRlcyhvcHRpb25zLmJyZWFrVHlwZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIGJyZWFrVHlwZVwiKTtcblx0XHR9XG5cdFx0dGhpcy5icmVha1R5cGUgPSBvcHRpb25zLmJyZWFrVHlwZTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHRAb3B0aW9ucyhcImhlaWdodFwiLCBcIndpZHRoXCIpXG5cdEByZXF1aXJlZChcImhlaWdodFwiLCBcIndpZHRoXCIpXG5cdHVwZGF0ZURpc3BsYXlTaXplID0gKG9wdGlvbnMpID0+IHtcblx0XHR0aGlzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSBvcHRpb25zLndpZHRoO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiZGlzcGxheVR5cGVcIilcblx0QHJlcXVpcmVkKFwiZGlzcGxheVR5cGVcIilcblx0dXBkYXRlRGlzcGxheVR5cGUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGlmICghT2JqZWN0LnZhbHVlcyhzZXJ2ZXJXaWRnZXRTdHViLkZpZWxkRGlzcGxheVR5cGUpLmluY2x1ZGVzKG9wdGlvbnMuZGlzcGxheVR5cGUpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBkaXNwbGF5VHlwZVwiKTtcblx0XHR9XG5cdFx0dGhpcy5kaXNwbGF5VHlwZSA9IG9wdGlvbnMuZGlzcGxheVR5cGU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJsYXlvdXRUeXBlXCIpXG5cdEByZXF1aXJlZChcImxheW91dFR5cGVcIilcblx0dXBkYXRlTGF5b3V0VHlwZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKCFPYmplY3QudmFsdWVzKHNlcnZlcldpZGdldFN0dWIuRmllbGRMYXlvdXRUeXBlKS5pbmNsdWRlcyhvcHRpb25zLmxheW91dFR5cGUpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBsYXlvdXRUeXBlXCIpO1xuXHRcdH1cblx0XHR0aGlzLmxheW91dFR5cGUgPSBvcHRpb25zLmxheW91dFR5cGU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmllbGQ7XG4iXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU07RUFBRUEsT0FBTztFQUFFQyxRQUFRO0VBQUVDO0FBQWtCLENBQUMsR0FBR0MsT0FBTyxDQUFDLHNCQUFzQixDQUFDO0FBQ2hGLE1BQU1DLGdCQUFnQixHQUFHRCxPQUFPLENBQUMscURBQXFELENBQUM7QUFBQyxJQUFBRSxNQUFBO0FBQUFDLElBQUEsR0FFdkZKLGlCQUFpQixDQUFDLENBQUM7QUFBQUssS0FBQSxHQXFCbEJQLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQztBQUFBUSxLQUFBLEdBQ3RDUCxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztBQUFBUSxLQUFBLEdBTXpCVCxPQUFPLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDO0FBQUFVLEtBQUEsR0FLbkNWLE9BQU8sQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLENBQUM7QUFBQVcsS0FBQSxHQUN6Q1YsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUFBVyxLQUFBLEdBTWhCWixPQUFPLENBQUMsV0FBVyxDQUFDO0FBQUFhLEtBQUEsR0FDcEJaLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFBQWEsS0FBQSxHQVNyQmQs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