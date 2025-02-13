var _initClass, _dec, _dec2, _init_runPaged;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const ResultSet = require("./ResultSet.cjs");
const PagedData = require("./PagedData.cjs");
const SuiteScriptMocks = require("../../../index.cjs");
const {
  options,
  assignConstructor
} = require("../../helpers.cjs");
let _Search;
_dec = assignConstructor();
_dec2 = options("pageSize");
class Search {
  static {
    ({
      e: [_init_runPaged],
      c: [_Search, _initClass]
    } = _applyDecs2203R(this, [[_dec2, 0, "runPaged"]], [_dec]));
  }
  id;
  searchId;
  searchType;
  title;
  columns;
  filters;
  results;
  run = () => {
    SuiteScriptMocks.runSearches.push(this);
    return new ResultSet({
      columns: this.columns,
      results: this.results
    });
  };
  runPaged = _init_runPaged(this, options => {
    SuiteScriptMocks.runSearches.push(this);
    const pageSize = options.pageSize || 50;
    if (pageSize < 5 || pageSize > 1000) {
      throw new Error("page size is outside allowed range");
    }
    return new PagedData({
      results: this.results || [],
      pageSize: pageSize
    });
  });
  save() {
    if (!this.title) {
      throw new Error("search title not set");
    }
    if (!this.searchId || !SuiteScriptMocks.searches.has({
      searchId: this.searchId
    })) {
      if (SuiteScriptMocks.searches.has({
        id: this.id
      })) {
        throw new Error("search script id is already in use");
      }
      if (SuiteScriptMocks.searches.has({
        title: this.title
      })) {
        throw new Error("search title is already in use");
      }
    }
    if (!this.searchId) {
      this.searchId = Math.max(...Array.from(SuiteScriptMocks.searches.values()).map(a => a.searchId)) + 1;
    }
    if (!this.id) {
      this.id = `customsearch_${this.searchId}`;
    }
    SuiteScriptMocks.searches.set(new _Search(this));
  }
  static {
    _initClass();
  }
}
module.exports = _Search;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZXN1bHRTZXQiLCJyZXF1aXJlIiwiUGFnZWREYXRhIiwiU3VpdGVTY3JpcHRNb2NrcyIsIm9wdGlvbnMiLCJhc3NpZ25Db25zdHJ1Y3RvciIsIl9TZWFyY2giLCJfZGVjIiwiX2RlYzIiLCJTZWFyY2giLCJlIiwiX2luaXRfcnVuUGFnZWQiLCJjIiwiX2luaXRDbGFzcyIsIl9hcHBseURlY3MyMjAzUiIsImlkIiwic2VhcmNoSWQiLCJzZWFyY2hUeXBlIiwidGl0bGUiLCJjb2x1bW5zIiwiZmlsdGVycyIsInJlc3VsdHMiLCJydW4iLCJydW5TZWFyY2hlcyIsInB1c2giLCJydW5QYWdlZCIsInBhZ2VTaXplIiwiRXJyb3IiLCJzYXZlIiwic2VhcmNoZXMiLCJoYXMiLCJNYXRoIiwibWF4IiwiQXJyYXkiLCJmcm9tIiwidmFsdWVzIiwibWFwIiwiYSIsInNldCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9ja3Mvc2VhcmNoL1NlYXJjaC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUmVzdWx0U2V0ID0gcmVxdWlyZShcIi4vUmVzdWx0U2V0LmNqc1wiKTtcbmNvbnN0IFBhZ2VkRGF0YSA9IHJlcXVpcmUoXCIuL1BhZ2VkRGF0YS5janNcIik7XG5jb25zdCBTdWl0ZVNjcmlwdE1vY2tzID0gcmVxdWlyZShcIi4uLy4uLy4uL2luZGV4LmNqc1wiKTtcbmNvbnN0IHsgb3B0aW9ucywgYXNzaWduQ29uc3RydWN0b3IgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKTtcblxuQGFzc2lnbkNvbnN0cnVjdG9yKClcbmNsYXNzIFNlYXJjaCB7XG5cdGlkO1xuXHRzZWFyY2hJZDtcblx0c2VhcmNoVHlwZTtcblx0dGl0bGU7XG5cdGNvbHVtbnM7XG5cdGZpbHRlcnM7XG5cdHJlc3VsdHM7XG5cblx0cnVuID0gKCkgPT4ge1xuXHRcdFN1aXRlU2NyaXB0TW9ja3MucnVuU2VhcmNoZXMucHVzaCh0aGlzKTtcblx0XHRyZXR1cm4gbmV3IFJlc3VsdFNldCh7XG5cdFx0XHRjb2x1bW5zOiB0aGlzLmNvbHVtbnMsXG5cdFx0XHRyZXN1bHRzOiB0aGlzLnJlc3VsdHMsXG5cdFx0fSk7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJwYWdlU2l6ZVwiKVxuXHRydW5QYWdlZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5ydW5TZWFyY2hlcy5wdXNoKHRoaXMpO1xuXHRcdGNvbnN0IHBhZ2VTaXplID0gb3B0aW9ucy5wYWdlU2l6ZSB8fCA1MDtcblx0XHRpZiAocGFnZVNpemUgPCA1IHx8IHBhZ2VTaXplID4gMTAwMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwicGFnZSBzaXplIGlzIG91dHNpZGUgYWxsb3dlZCByYW5nZVwiKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ldyBQYWdlZERhdGEoe1xuXHRcdFx0cmVzdWx0czogdGhpcy5yZXN1bHRzIHx8IFtdLFxuXHRcdFx0cGFnZVNpemU6IHBhZ2VTaXplLFxuXHRcdH0pO1xuXHR9O1xuXG5cdHNhdmUoKSB7XG5cdFx0aWYgKCF0aGlzLnRpdGxlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzZWFyY2ggdGl0bGUgbm90IHNldFwiKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLnNlYXJjaElkIHx8ICFTdWl0ZVNjcmlwdE1vY2tzLnNlYXJjaGVzLmhhcyh7IHNlYXJjaElkOiB0aGlzLnNlYXJjaElkIH0pKSB7XG5cdFx0XHRpZiAoU3VpdGVTY3JpcHRNb2Nrcy5zZWFyY2hlcy5oYXMoeyBpZDogdGhpcy5pZCB9KSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzZWFyY2ggc2NyaXB0IGlkIGlzIGFscmVhZHkgaW4gdXNlXCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKFN1aXRlU2NyaXB0TW9ja3Muc2VhcmNoZXMuaGFzKHsgdGl0bGU6IHRoaXMudGl0bGUgfSkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwic2VhcmNoIHRpdGxlIGlzIGFscmVhZHkgaW4gdXNlXCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoIXRoaXMuc2VhcmNoSWQpIHtcblx0XHRcdHRoaXMuc2VhcmNoSWQgPSBNYXRoLm1heCguLi5BcnJheS5mcm9tKFN1aXRlU2NyaXB0TW9ja3Muc2VhcmNoZXMudmFsdWVzKCkpLm1hcCgoYSkgPT4gYS5zZWFyY2hJZCkpICsgMTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmlkKSB7XG5cdFx0XHR0aGlzLmlkID0gYGN1c3RvbXNlYXJjaF8ke3RoaXMuc2VhcmNoSWR9YDtcblx0XHR9XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5zZWFyY2hlcy5zZXQobmV3IFNlYXJjaCh0aGlzKSk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZWFyY2g7XG4iXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU1BLFNBQVMsR0FBR0MsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQzVDLE1BQU1DLFNBQVMsR0FBR0QsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQzVDLE1BQU1FLGdCQUFnQixHQUFHRixPQUFPLENBQUMsb0JBQW9CLENBQUM7QUFDdEQsTUFBTTtFQUFFRyxPQUFPO0VBQUVDO0FBQWtCLENBQUMsR0FBR0osT0FBTyxDQUFDLG1CQUFtQixDQUFDO0FBQUMsSUFBQUssT0FBQTtBQUFBQyxJQUFBLEdBRW5FRixpQkFBaUIsQ0FBQyxDQUFDO0FBQUFHLEtBQUEsR0FrQmxCSixPQUFPLENBQUMsVUFBVSxDQUFDO0FBbEJyQixNQUFBSyxNQUFBLENBQ2E7RUFBQTtJQUFBO01BQUFDLENBQUEsR0FBQUMsY0FBQTtNQUFBQyxDQUFBLEdBQUFOLE9BQUEsRUFBQU8sVUFBQTtJQUFBLElBQUFDLGVBQUEsU0FBQU4sS0FBQSxvQkFBQUQsSUFBQTtFQUFBO0VBQ1pRLEVBQUU7RUFDRkMsUUFBUTtFQUNSQyxVQUFVO0VBQ1ZDLEtBQUs7RUFDTEMsT0FBTztFQUNQQyxPQUFPO0VBQ1BDLE9BQU87RUFFUEMsR0FBRyxHQUFHQSxDQUFBLEtBQU07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