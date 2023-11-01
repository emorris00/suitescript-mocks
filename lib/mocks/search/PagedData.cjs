var _initClass, _dec, _dec2, _dec3, _dec4, _init_fetch;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const {
  addPromise,
  options,
  required,
  assignConstructor
} = require("../../helpers.cjs");
const PageRange = require("./PageRange.cjs");
const Page = require("./Page.cjs");
let _PagedData;
_dec = assignConstructor();
_dec2 = addPromise();
_dec3 = options("index");
_dec4 = required("index");
class PagedData {
  static {
    ({
      e: [_init_fetch],
      c: [_PagedData, _initClass]
    } = _applyDecs2203R(this, [[[_dec2, _dec3, _dec4], 0, "fetch"]], [_dec]));
  }
  results = [];
  pageSize = 50;
  searchDefinition;
  get count() {
    return this.results.length;
  }
  get pageRanges() {
    return new Array(Math.ceil(this.count / this.pageSize)).fill(0).map((_, index) => new PageRange({
      index
    }));
  }
  fetch = _init_fetch(this, options => {
    const index = +options.index;
    if (!(index in this.pageRanges)) {
      throw new Error("invalid page index");
    }
    return new Page({
      data: this.results.slice(index * this.pageSize, index * this.pageSize + this.pageSize),
      isFirst: index === 0,
      isLast: index === this.pageRanges.length - 1,
      pagedData: this,
      pageRange: new PageRange({
        index
      })
    });
  });
  static {
    _initClass();
  }
}
module.exports = _PagedData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhZGRQcm9taXNlIiwib3B0aW9ucyIsInJlcXVpcmVkIiwiYXNzaWduQ29uc3RydWN0b3IiLCJyZXF1aXJlIiwiUGFnZVJhbmdlIiwiUGFnZSIsIl9QYWdlZERhdGEiLCJfZGVjIiwiX2RlYzIiLCJfZGVjMyIsIl9kZWM0IiwiUGFnZWREYXRhIiwiZSIsIl9pbml0X2ZldGNoIiwiYyIsIl9pbml0Q2xhc3MiLCJfYXBwbHlEZWNzMjIwM1IiLCJyZXN1bHRzIiwicGFnZVNpemUiLCJzZWFyY2hEZWZpbml0aW9uIiwiY291bnQiLCJsZW5ndGgiLCJwYWdlUmFuZ2VzIiwiQXJyYXkiLCJNYXRoIiwiY2VpbCIsImZpbGwiLCJtYXAiLCJfIiwiaW5kZXgiLCJmZXRjaCIsIkVycm9yIiwiZGF0YSIsInNsaWNlIiwiaXNGaXJzdCIsImlzTGFzdCIsInBhZ2VkRGF0YSIsInBhZ2VSYW5nZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9ja3Mvc2VhcmNoL1BhZ2VkRGF0YS5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBhZGRQcm9taXNlLCBvcHRpb25zLCByZXF1aXJlZCwgYXNzaWduQ29uc3RydWN0b3IgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKTtcbmNvbnN0IFBhZ2VSYW5nZSA9IHJlcXVpcmUoXCIuL1BhZ2VSYW5nZS5janNcIik7XG5jb25zdCBQYWdlID0gcmVxdWlyZShcIi4vUGFnZS5janNcIik7XG5cbkBhc3NpZ25Db25zdHJ1Y3RvcigpXG5jbGFzcyBQYWdlZERhdGEge1xuXHRyZXN1bHRzID0gW107XG5cdHBhZ2VTaXplID0gNTA7XG5cdHNlYXJjaERlZmluaXRpb247XG5cblx0Z2V0IGNvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLnJlc3VsdHMubGVuZ3RoO1xuXHR9XG5cblx0Z2V0IHBhZ2VSYW5nZXMoKSB7XG5cdFx0cmV0dXJuIG5ldyBBcnJheShNYXRoLmNlaWwodGhpcy5jb3VudCAvIHRoaXMucGFnZVNpemUpKS5maWxsKDApLm1hcCgoXywgaW5kZXgpID0+IG5ldyBQYWdlUmFuZ2UoeyBpbmRleCB9KSk7XG5cdH1cblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwiaW5kZXhcIilcblx0QHJlcXVpcmVkKFwiaW5kZXhcIilcblx0ZmV0Y2ggPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGluZGV4ID0gK29wdGlvbnMuaW5kZXg7XG5cdFx0aWYgKCEoaW5kZXggaW4gdGhpcy5wYWdlUmFuZ2VzKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBwYWdlIGluZGV4XCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IFBhZ2Uoe1xuXHRcdFx0ZGF0YTogdGhpcy5yZXN1bHRzLnNsaWNlKGluZGV4ICogdGhpcy5wYWdlU2l6ZSwgaW5kZXggKiB0aGlzLnBhZ2VTaXplICsgdGhpcy5wYWdlU2l6ZSksXG5cdFx0XHRpc0ZpcnN0OiBpbmRleCA9PT0gMCxcblx0XHRcdGlzTGFzdDogaW5kZXggPT09IHRoaXMucGFnZVJhbmdlcy5sZW5ndGggLSAxLFxuXHRcdFx0cGFnZWREYXRhOiB0aGlzLFxuXHRcdFx0cGFnZVJhbmdlOiBuZXcgUGFnZVJhbmdlKHsgaW5kZXggfSksXG5cdFx0fSk7XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZWREYXRhO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNO0VBQUVBLFVBQVU7RUFBRUMsT0FBTztFQUFFQyxRQUFRO0VBQUVDO0FBQWtCLENBQUMsR0FBR0MsT0FBTyxDQUFDLG1CQUFtQixDQUFDO0FBQ3pGLE1BQU1DLFNBQVMsR0FBR0QsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQzVDLE1BQU1FLElBQUksR0FBR0YsT0FBTyxDQUFDLFlBQVksQ0FBQztBQUFDLElBQUFHLFVBQUE7QUFBQUMsSUFBQSxHQUVsQ0wsaUJBQWlCLENBQUMsQ0FBQztBQUFBTSxLQUFBLEdBY2xCVCxVQUFVLENBQUMsQ0FBQztBQUFBVSxLQUFBLEdBQ1pULE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFBQVUsS0FBQSxHQUNoQlQsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQWhCbkIsTUFBQVUsU0FBQSxDQUNnQjtFQUFBO0lBQUE7TUFBQUMsQ0FBQSxHQUFBQyxXQUFBO01BQUFDLENBQUEsR0FBQVIsVUFBQSxFQUFBUyxVQUFBO0lBQUEsSUFBQUMsZUFBQSxVQUFBUixLQUFBLEVBQUFDLEtBQUEsRUFBQUMsS0FBQSxrQkFBQUgsSUFBQTtFQUFBO0VBQ2ZVLE9BQU8sR0FBRyxFQUFFO0VBQ1pDLFFBQVEsR0FBRyxFQUFFO0VBQ2JDLGdCQUFnQjtFQUVoQixJQUFJQyxLQUFLQSxDQUFBLEVBQUc7SUFDWCxPQUFPLElBQUksQ0FBQ0gsT0FBTyxDQUFDSSxNQUFNO0VBQzNCO0VBRUEsSUFBSUMsVUFBVUEsQ0FBQSxFQUFHO0lBQ2hCLE9BQU8sSUFBSUMsS0FBSyxDQUFDQyxJQUFJLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUNMLEtBQUssR0FBRyxJQUFJLENBQUNGLFFBQVEsQ0FBQyxDQUFDLENBQUNRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLENBQUNDLENBQUMsRUFBRUMsS0FBSyxLQUFLLElBQUl6QixTQUFTLENBQUM7TUFBRXlCO0lBQU0sQ0FBQyxDQUFDLENBQUM7RUFDNUc7RUFLQUMsS0FBSyxHQUFBakIsV0FBQSxPQUFJYixPQUFPLElBQUs7SUFDcEIsTUFBTTZCLEtBQUssR0FBRyxDQUFDN0IsT0FBTyxDQUFDNkIsS0FBSztJQUM1QixJQUFJLEVBQUVBLEtBQUssSUFBSSxJQUFJLENBQUNQLFVBQVUsQ0FBQyxFQUFFO01BQ2hDLE1BQU0sSUFBSVMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO0lBQ3RDO0lBQ0EsT0FBTyxJQUFJMUIsSUFBSSxDQUFDO01BQ2YyQixJQUFJLEVBQUUsSUFBSSxDQUFDZixPQUFPLENBQUNnQixLQUFLLENBQUNKLEtBQUssR0FBRyxJQUFJLENBQUNYLFFBQVEsRUFBRVcsS0FBSyxHQUFHLElBQUksQ0FBQ1gsUUFBUSxHQUFHLElBQUksQ0FBQ0EsUUFBUSxDQUFDO01BQ3RGZ0IsT0FBTyxFQUFFTCxLQUFLLEtBQUssQ0FBQztNQUNwQk0sTUFBTSxFQUFFTixLQUFLLEtBQUssSUFBSSxDQUFDUCxVQUFVLENBQUNELE1BQU0sR0FBRyxDQUFDO01BQzVDZSxTQUFTLEVBQUUsSUFBSTtNQUNmQyxTQUFTLEVBQUUsSUFBSWpDLFNBQVMsQ0FBQztRQUFFeUI7TUFBTSxDQUFDO0lBQ25DLENBQUMsQ0FBQztFQUNILENBQUM7RUFBQztJQUFBZCxVQUFBO0VBQUE7QUFDSDtBQUVBdUIsTUFBTSxDQUFDQyxPQUFPLEdBQUc1QixVQUFTIn0=