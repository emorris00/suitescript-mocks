var _initProto;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
function fieldInitDecorator(target) {
  return function (...args) {
    return function (_, context) {
      if (context.kind === "field") {
        return function (value) {
          /* eslint-disable */
          return target(...args).bind(this)(value, context);
        };
      }
    };
  };
}
class Decorators {
  static {
    [_initProto] = _applyDecs2203R(this, [[fieldInitDecorator, 2, "options"], [fieldInitDecorator, 2, "required"], [fieldInitDecorator, 2, "addPromise"], [fieldInitDecorator, 2, "dynamicModeOnly"], [fieldInitDecorator, 2, "standardModeOnly"], [fieldInitDecorator, 2, "addKeyedSetGetSet"]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  options(...keys) {
    return function (value) {
      return function (...options) {
        if (typeof options[0] !== "object") {
          options = options.reduce((acc, cur, i) => {
            acc[keys[i]] = cur;
            return acc;
          }, {});
        } else {
          options = options[0];
        }
        return value(options);
      };
    };
  }
  required(...keys) {
    return function (value) {
      return function (options) {
        keys.forEach(key => {
          if (!(key in options) || options[key] === undefined) {
            throw new Error(`missing required option '${key}'`);
          }
        });
        return value(options);
      };
    };
  }
  addPromise() {
    return function (value) {
      value.promise = async function (...args) {
        value(...args);
      };
      return value;
    };
  }
  dynamicModeOnly() {
    return function (value) {
      return function (...args) {
        /* eslint-disable */
        if (!this.isDynamic) {
          throw new Error(`cannot be run in standard mode`);
        }
        return value(...args);
      };
    };
  }
  standardModeOnly() {
    return function (value) {
      return function (...args) {
        /* eslint-disable */
        if (this.isDynamic) {
          throw new Error(`cannot be run in dynamic mode`);
        }
        return value(...args);
      };
    };
  }
  addKeyedSetGetSet() {
    return function (value, context) {
      /* eslint-disable */
      Object.defineProperty(this, context.name.replace("#", ""), {
        get: () => value,
        set: values => {
          value.clear();
          for (const a of values) {
            value.add(a);
          }
        }
      });
      return value;
    };
  }
  assignConstructor() {
    return function (target, context) {
      return class extends target {
        constructor(values) {
          super();
          if (typeof values === "object" && values !== undefined) {
            Object.entries(values).forEach(([key, value]) => {
              if (key in this && typeof this[key] !== "function") {
                this[key] = value;
              }
            });
          }
          this?.initialize?.();
        }
      };
    };
  }
}
const UserEventType = {
  APPROVE: "approve",
  CANCEL: "cancel",
  CHANGEPASSWORD: "changepassword",
  COPY: "copy",
  CREATE: "create",
  DELETE: "delete",
  DROPSHIP: "dropship",
  EDIT: "edit",
  EDITFORECAST: "editforecast",
  EMAIL: "email",
  MARKCOMPLETE: "markcomplete",
  ORDERITEMS: "orderitems",
  PACK: "pack",
  PAYBILLS: "paybills",
  PRINT: "print",
  QUICKVIEW: "quickview",
  REASSIGN: "reassign",
  REJECT: "reject",
  SHIP: "ship",
  SPECIALORDER: "specialorder",
  TRANSFORM: "transform",
  VIEW: "view",
  XEDIT: "xedit"
};
function createUserEventContext(type, oldRecord, newRecord) {
  return {
    type,
    oldRecord,
    newRecord,
    UserEventType
  };
}
const decorators = new Decorators();
module.exports = {
  options: decorators.options,
  required: decorators.required,
  addPromise: decorators.addPromise,
  dynamicModeOnly: decorators.dynamicModeOnly,
  standardModeOnly: decorators.standardModeOnly,
  addKeyedSetGetSet: decorators.addKeyedSetGetSet,
  assignConstructor: decorators.assignConstructor,
  UserEventType,
  createUserEventContext
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmaWVsZEluaXREZWNvcmF0b3IiLCJ0YXJnZXQiLCJhcmdzIiwiXyIsImNvbnRleHQiLCJraW5kIiwidmFsdWUiLCJiaW5kIiwiRGVjb3JhdG9ycyIsIl9pbml0UHJvdG8iLCJfYXBwbHlEZWNzMjIwM1IiLCJlIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwia2V5cyIsInJlZHVjZSIsImFjYyIsImN1ciIsImkiLCJyZXF1aXJlZCIsImZvckVhY2giLCJrZXkiLCJ1bmRlZmluZWQiLCJFcnJvciIsImFkZFByb21pc2UiLCJwcm9taXNlIiwiZHluYW1pY01vZGVPbmx5IiwiaXNEeW5hbWljIiwic3RhbmRhcmRNb2RlT25seSIsImFkZEtleWVkU2V0R2V0U2V0IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJuYW1lIiwicmVwbGFjZSIsImdldCIsInNldCIsInZhbHVlcyIsImNsZWFyIiwiYSIsImFkZCIsImFzc2lnbkNvbnN0cnVjdG9yIiwiZW50cmllcyIsImluaXRpYWxpemUiLCJVc2VyRXZlbnRUeXBlIiwiQVBQUk9WRSIsIkNBTkNFTCIsIkNIQU5HRVBBU1NXT1JEIiwiQ09QWSIsIkNSRUFURSIsIkRFTEVURSIsIkRST1BTSElQIiwiRURJVCIsIkVESVRGT1JFQ0FTVCIsIkVNQUlMIiwiTUFSS0NPTVBMRVRFIiwiT1JERVJJVEVNUyIsIlBBQ0siLCJQQVlCSUxMUyIsIlBSSU5UIiwiUVVJQ0tWSUVXIiwiUkVBU1NJR04iLCJSRUpFQ1QiLCJTSElQIiwiU1BFQ0lBTE9SREVSIiwiVFJBTlNGT1JNIiwiVklFVyIsIlhFRElUIiwiY3JlYXRlVXNlckV2ZW50Q29udGV4dCIsInR5cGUiLCJvbGRSZWNvcmQiLCJuZXdSZWNvcmQiLCJkZWNvcmF0b3JzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzLmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmaWVsZEluaXREZWNvcmF0b3IodGFyZ2V0KSB7XG5cdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoXywgY29udGV4dCkge1xuXHRcdFx0aWYgKGNvbnRleHQua2luZCA9PT0gXCJmaWVsZFwiKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXHRcdFx0XHRcdHJldHVybiB0YXJnZXQoLi4uYXJncykuYmluZCh0aGlzKSh2YWx1ZSwgY29udGV4dCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcbn1cblxuY2xhc3MgRGVjb3JhdG9ycyB7XG5cdEBmaWVsZEluaXREZWNvcmF0b3Jcblx0b3B0aW9ucyguLi5rZXlzKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5vcHRpb25zKSB7XG5cdFx0XHRcdGlmICh0eXBlb2Ygb3B0aW9uc1swXSAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRcdG9wdGlvbnMgPSBvcHRpb25zLnJlZHVjZSgoYWNjLCBjdXIsIGkpID0+IHtcblx0XHRcdFx0XHRcdGFjY1trZXlzW2ldXSA9IGN1cjtcblx0XHRcdFx0XHRcdHJldHVybiBhY2M7XG5cdFx0XHRcdFx0fSwge30pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG9wdGlvbnMgPSBvcHRpb25zWzBdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2YWx1ZShvcHRpb25zKTtcblx0XHRcdH07XG5cdFx0fTtcblx0fVxuXG5cdEBmaWVsZEluaXREZWNvcmF0b3Jcblx0cmVxdWlyZWQoLi4ua2V5cykge1xuXHRcdHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdFx0XHRrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHRcdGlmICghKGtleSBpbiBvcHRpb25zKSB8fCBvcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBtaXNzaW5nIHJlcXVpcmVkIG9wdGlvbiAnJHtrZXl9J2ApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiB2YWx1ZShvcHRpb25zKTtcblx0XHRcdH07XG5cdFx0fTtcblx0fVxuXG5cdEBmaWVsZEluaXREZWNvcmF0b3Jcblx0YWRkUHJvbWlzZSgpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHR2YWx1ZS5wcm9taXNlID0gYXN5bmMgZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0dmFsdWUoLi4uYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH07XG5cdH1cblxuXHRAZmllbGRJbml0RGVjb3JhdG9yXG5cdGR5bmFtaWNNb2RlT25seSgpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgKi9cblx0XHRcdFx0aWYgKCF0aGlzLmlzRHluYW1pYykge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgY2Fubm90IGJlIHJ1biBpbiBzdGFuZGFyZCBtb2RlYCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZhbHVlKC4uLmFyZ3MpO1xuXHRcdFx0fTtcblx0XHR9O1xuXHR9XG5cblx0QGZpZWxkSW5pdERlY29yYXRvclxuXHRzdGFuZGFyZE1vZGVPbmx5KCkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXHRcdFx0XHRpZiAodGhpcy5pc0R5bmFtaWMpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBiZSBydW4gaW4gZHluYW1pYyBtb2RlYCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZhbHVlKC4uLmFyZ3MpO1xuXHRcdFx0fTtcblx0XHR9O1xuXHR9XG5cblx0QGZpZWxkSW5pdERlY29yYXRvclxuXHRhZGRLZXllZFNldEdldFNldCgpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBjb250ZXh0KSB7XG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGNvbnRleHQubmFtZS5yZXBsYWNlKFwiI1wiLCBcIlwiKSwge1xuXHRcdFx0XHRnZXQ6ICgpID0+IHZhbHVlLFxuXHRcdFx0XHRzZXQ6ICh2YWx1ZXMpID0+IHtcblx0XHRcdFx0XHR2YWx1ZS5jbGVhcigpO1xuXHRcdFx0XHRcdGZvciAoY29uc3QgYSBvZiB2YWx1ZXMpIHtcblx0XHRcdFx0XHRcdHZhbHVlLmFkZChhKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9O1xuXHR9XG5cblx0YXNzaWduQ29uc3RydWN0b3IoKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGNvbnRleHQpIHtcblx0XHRcdHJldHVybiBjbGFzcyBleHRlbmRzIHRhcmdldCB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yKHZhbHVlcykge1xuXHRcdFx0XHRcdHN1cGVyKCk7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZXMgPT09IFwib2JqZWN0XCIgJiYgdmFsdWVzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5lbnRyaWVzKHZhbHVlcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChrZXkgaW4gdGhpcyAmJiB0eXBlb2YgdGhpc1trZXldICE9PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXM/LmluaXRpYWxpemU/LigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH07XG5cdH1cbn1cblxuY29uc3QgVXNlckV2ZW50VHlwZSA9IHtcblx0QVBQUk9WRTogXCJhcHByb3ZlXCIsXG5cdENBTkNFTDogXCJjYW5jZWxcIixcblx0Q0hBTkdFUEFTU1dPUkQ6IFwiY2hhbmdlcGFzc3dvcmRcIixcblx0Q09QWTogXCJjb3B5XCIsXG5cdENSRUFURTogXCJjcmVhdGVcIixcblx0REVMRVRFOiBcImRlbGV0ZVwiLFxuXHREUk9QU0hJUDogXCJkcm9wc2hpcFwiLFxuXHRFRElUOiBcImVkaXRcIixcblx0RURJVEZPUkVDQVNUOiBcImVkaXRmb3JlY2FzdFwiLFxuXHRFTUFJTDogXCJlbWFpbFwiLFxuXHRNQVJLQ09NUExFVEU6IFwibWFya2NvbXBsZXRlXCIsXG5cdE9SREVSSVRFTVM6IFwib3JkZXJpdGVtc1wiLFxuXHRQQUNLOiBcInBhY2tcIixcblx0UEFZQklMTFM6IFwicGF5YmlsbHNcIixcblx0UFJJTlQ6IFwicHJpbnRcIixcblx0UVVJQ0tWSUVXOiBcInF1aWNrdmlld1wiLFxuXHRSRUFTU0lHTjogXCJyZWFzc2lnblwiLFxuXHRSRUpFQ1Q6IFwicmVqZWN0XCIsXG5cdFNISVA6IFwic2hpcFwiLFxuXHRTUEVDSUFMT1JERVI6IFwic3BlY2lhbG9yZGVyXCIsXG5cdFRSQU5TRk9STTogXCJ0cmFuc2Zvcm1cIixcblx0VklFVzogXCJ2aWV3XCIsXG5cdFhFRElUOiBcInhlZGl0XCIsXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVVc2VyRXZlbnRDb250ZXh0KHR5cGUsIG9sZFJlY29yZCwgbmV3UmVjb3JkKSB7XG5cdHJldHVybiB7XG5cdFx0dHlwZSxcblx0XHRvbGRSZWNvcmQsXG5cdFx0bmV3UmVjb3JkLFxuXHRcdFVzZXJFdmVudFR5cGUsXG5cdH07XG59XG5cbmNvbnN0IGRlY29yYXRvcnMgPSBuZXcgRGVjb3JhdG9ycygpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0b3B0aW9uczogZGVjb3JhdG9ycy5vcHRpb25zLFxuXHRyZXF1aXJlZDogZGVjb3JhdG9ycy5yZXF1aXJlZCxcblx0YWRkUHJvbWlzZTogZGVjb3JhdG9ycy5hZGRQcm9taXNlLFxuXHRkeW5hbWljTW9kZU9ubHk6IGRlY29yYXRvcnMuZHluYW1pY01vZGVPbmx5LFxuXHRzdGFuZGFyZE1vZGVPbmx5OiBkZWNvcmF0b3JzLnN0YW5kYXJkTW9kZU9ubHksXG5cdGFkZEtleWVkU2V0R2V0U2V0OiBkZWNvcmF0b3JzLmFkZEtleWVkU2V0R2V0U2V0LFxuXHRhc3NpZ25Db25zdHJ1Y3RvcjogZGVjb3JhdG9ycy5hc3NpZ25Db25zdHJ1Y3Rvcixcblx0VXNlckV2ZW50VHlwZSxcblx0Y3JlYXRlVXNlckV2ZW50Q29udGV4dCxcbn07XG4iXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQVNBLGtCQUFrQkEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ25DLE9BQU8sVUFBVSxHQUFHQyxJQUFJLEVBQUU7SUFDekIsT0FBTyxVQUFVQyxDQUFDLEVBQUVDLE9BQU8sRUFBRTtNQUM1QixJQUFJQSxPQUFPLENBQUNDLElBQUksS0FBSyxPQUFPLEVBQUU7UUFDN0IsT0FBTyxVQUFVQyxLQUFLLEVBQUU7VUFDdkI7VUFDQSxPQUFPTCxNQUFNLENBQUMsR0FBR0MsSUFBSSxDQUFDLENBQUNLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQ0QsS0FBSyxFQUFFRixPQUFPLENBQUM7UUFDbEQsQ0FBQztNQUNGO0lBQ0QsQ0FBQztFQUNGLENBQUM7QUFDRjtBQUVBLE1BQU1JLFVBQVUsQ0FBQztFQUFBO0lBQUEsQ0FBQUMsVUFBQSxJQUFBQyxlQUFBLFNBQ2ZWLGtCQUFrQixrQkFpQmxCQSxrQkFBa0IsbUJBY2xCQSxrQkFBa0IscUJBVWxCQSxrQkFBa0IsMEJBYWxCQSxrQkFBa0IsMkJBYWxCQSxrQkFBa0IsZ0NBQUFXLENBQUE7RUFBQTtFQUFBQyxZQUFBLEdBQUFWLElBQUE7SUFBQU8sVUFBQTtFQUFBO0VB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