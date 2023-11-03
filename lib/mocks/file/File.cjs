var _initClass, _dec, _dec2, _dec3, _init_appendLine, _dec4, _dec5, _init_getSegments;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const SuiteScriptMocks = require("../../index.cjs");
const {
  options,
  required,
  assignConstructor
} = require("../../helpers.cjs");
const Iterator = require("../../iterator.cjs");
const Reader = require("./Reader.cjs");
let _File;
_dec = assignConstructor();
_dec2 = options("value");
_dec3 = required("value");
_dec4 = options("separator");
_dec5 = required("separator");
class File {
  static {
    ({
      e: [_init_appendLine, _init_getSegments],
      c: [_File, _initClass]
    } = _applyDecs2203R(this, [[[_dec2, _dec3], 0, "appendLine"], [[_dec4, _dec5], 0, "getSegments"]], [_dec]));
  }
  description = "";
  contents = "";
  encoding = "";
  fileType = "";
  folder = null;
  id = null;
  isInactive = false;
  isOnline = false;
  isText = true;
  name = "";
  path = "";
  size = 0;
  url = "";
  savedContents = null;
  frozenContents = null;
  frozenContents2 = null;
  iterators = [];
  readers = [];
  lines = {
    iterator: () => {
      this.iterators.push(new Iterator(this.savedContents?.split(options.separator) || []));
      return this.iterators.at(-1);
    }
  };
  initialize = () => {
    this.frozenContents = this.frozenContents2 = null;
    if (this.id) {
      this.savedContents = this.contents;
    }
  };
  appendLine = _init_appendLine(this, options => {
    this.contents = this.contents ? this.contents.split("\n").concat([options.value]).join("\n") : options.value;
  });
  getContents = () => {
    if (this.savedContents !== null) {
      return this.savedContents;
    }
    if (this.frozenContents === null) {
      this.frozenContents = this.frozenContents2 = this.contents;
    }
    if (this.frozenContents === null) {
      throw new Error("File contents don't exist");
    }
    return this.frozenContents;
  };
  getReader = () => {
    this.iterators.push(new Reader({
      contents: this.savedContents || this.frozenContents2 || ""
    }));
    return this.iterators.at(-1);
  };
  getSegments = _init_getSegments(this, options => {
    if (typeof options.separator !== "string") {
      throw new Error("Separator must be a string.");
    }
    return {
      iterator: () => {
        this.iterators.push(new Iterator(this.savedContents?.split(options.separator) || []));
        return this.iterators.at(-1);
      }
    };
  });
  resetStream = () => {
    this.contents = this.savedContents;
    this.frozenContents2 = null;
    this.iterators.forEach(iterator => {
      iterator.pointer = -1;
    });
    this.readers.forEach(reader => {
      reader.pointer = -1;
      reader.contents = reader.savedContents;
    });
  };
  save = () => {
    if (this.contents === null) {
      throw new Error("File contents don't exist");
    }
    if (!this.folder) {
      throw new Error("Please enter value for folder");
    }
    const copy = new _File(this);
    if (!this.id) {
      this.id = copy.id = Math.max(...Array.from(SuiteScriptMocks.files.values()).map(a => a.id)) + 1;
      SuiteScriptMocks.createdFiles.push(copy);
    }
    SuiteScriptMocks.files.set(copy);
    SuiteScriptMocks.savedFiles.push(copy);
    return this.id;
  };
  static {
    _initClass();
  }
}
module.exports = _File;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWl0ZVNjcmlwdE1vY2tzIiwicmVxdWlyZSIsIm9wdGlvbnMiLCJyZXF1aXJlZCIsImFzc2lnbkNvbnN0cnVjdG9yIiwiSXRlcmF0b3IiLCJSZWFkZXIiLCJfRmlsZSIsIl9kZWMiLCJfZGVjMiIsIl9kZWMzIiwiX2RlYzQiLCJfZGVjNSIsIkZpbGUiLCJlIiwiX2luaXRfYXBwZW5kTGluZSIsIl9pbml0X2dldFNlZ21lbnRzIiwiYyIsIl9pbml0Q2xhc3MiLCJfYXBwbHlEZWNzMjIwM1IiLCJkZXNjcmlwdGlvbiIsImNvbnRlbnRzIiwiZW5jb2RpbmciLCJmaWxlVHlwZSIsImZvbGRlciIsImlkIiwiaXNJbmFjdGl2ZSIsImlzT25saW5lIiwiaXNUZXh0IiwibmFtZSIsInBhdGgiLCJzaXplIiwidXJsIiwic2F2ZWRDb250ZW50cyIsImZyb3plbkNvbnRlbnRzIiwiZnJvemVuQ29udGVudHMyIiwiaXRlcmF0b3JzIiwicmVhZGVycyIsImxpbmVzIiwiaXRlcmF0b3IiLCJwdXNoIiwic3BsaXQiLCJzZXBhcmF0b3IiLCJhdCIsImluaXRpYWxpemUiLCJhcHBlbmRMaW5lIiwiY29uY2F0IiwidmFsdWUiLCJqb2luIiwiZ2V0Q29udGVudHMiLCJFcnJvciIsImdldFJlYWRlciIsImdldFNlZ21lbnRzIiwicmVzZXRTdHJlYW0iLCJmb3JFYWNoIiwicG9pbnRlciIsInJlYWRlciIsInNhdmUiLCJjb3B5IiwiTWF0aCIsIm1heCIsIkFycmF5IiwiZnJvbSIsImZpbGVzIiwidmFsdWVzIiwibWFwIiwiYSIsImNyZWF0ZWRGaWxlcyIsInNldCIsInNhdmVkRmlsZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vY2tzL2ZpbGUvRmlsZS5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3VpdGVTY3JpcHRNb2NrcyA9IHJlcXVpcmUoXCIuLi8uLi9pbmRleC5janNcIik7XG5jb25zdCB7IG9wdGlvbnMsIHJlcXVpcmVkLCBhc3NpZ25Db25zdHJ1Y3RvciB9ID0gcmVxdWlyZShcIi4uLy4uL2hlbHBlcnMuY2pzXCIpO1xuY29uc3QgSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vLi4vaXRlcmF0b3IuY2pzXCIpO1xuY29uc3QgUmVhZGVyID0gcmVxdWlyZShcIi4vUmVhZGVyLmNqc1wiKTtcblxuQGFzc2lnbkNvbnN0cnVjdG9yKClcbmNsYXNzIEZpbGUge1xuXHRkZXNjcmlwdGlvbiA9IFwiXCI7XG5cdGNvbnRlbnRzID0gXCJcIjtcblx0ZW5jb2RpbmcgPSBcIlwiO1xuXHRmaWxlVHlwZSA9IFwiXCI7XG5cdGZvbGRlciA9IG51bGw7XG5cdGlkID0gbnVsbDtcblx0aXNJbmFjdGl2ZSA9IGZhbHNlO1xuXHRpc09ubGluZSA9IGZhbHNlO1xuXHRpc1RleHQgPSB0cnVlO1xuXHRuYW1lID0gXCJcIjtcblx0cGF0aCA9IFwiXCI7XG5cdHNpemUgPSAwO1xuXHR1cmwgPSBcIlwiO1xuXG5cdHNhdmVkQ29udGVudHMgPSBudWxsO1xuXHRmcm96ZW5Db250ZW50cyA9IG51bGw7XG5cdGZyb3plbkNvbnRlbnRzMiA9IG51bGw7XG5cdGl0ZXJhdG9ycyA9IFtdO1xuXHRyZWFkZXJzID0gW107XG5cblx0bGluZXMgPSB7XG5cdFx0aXRlcmF0b3I6ICgpID0+IHtcblx0XHRcdHRoaXMuaXRlcmF0b3JzLnB1c2gobmV3IEl0ZXJhdG9yKHRoaXMuc2F2ZWRDb250ZW50cz8uc3BsaXQob3B0aW9ucy5zZXBhcmF0b3IpIHx8IFtdKSk7XG5cdFx0XHRyZXR1cm4gdGhpcy5pdGVyYXRvcnMuYXQoLTEpO1xuXHRcdH0sXG5cdH07XG5cblx0aW5pdGlhbGl6ZSA9ICgpID0+IHtcblx0XHR0aGlzLmZyb3plbkNvbnRlbnRzID0gdGhpcy5mcm96ZW5Db250ZW50czIgPSBudWxsO1xuXHRcdGlmICh0aGlzLmlkKSB7XG5cdFx0XHR0aGlzLnNhdmVkQ29udGVudHMgPSB0aGlzLmNvbnRlbnRzO1xuXHRcdH1cblx0fTtcblxuXHRAb3B0aW9ucyhcInZhbHVlXCIpXG5cdEByZXF1aXJlZChcInZhbHVlXCIpXG5cdGFwcGVuZExpbmUgPSAob3B0aW9ucykgPT4ge1xuXHRcdHRoaXMuY29udGVudHMgPSB0aGlzLmNvbnRlbnRzID8gdGhpcy5jb250ZW50cy5zcGxpdChcIlxcblwiKS5jb25jYXQoW29wdGlvbnMudmFsdWVdKS5qb2luKFwiXFxuXCIpIDogb3B0aW9ucy52YWx1ZTtcblx0fTtcblxuXHRnZXRDb250ZW50cyA9ICgpID0+IHtcblx0XHRpZiAodGhpcy5zYXZlZENvbnRlbnRzICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zYXZlZENvbnRlbnRzO1xuXHRcdH1cblx0XHRpZiAodGhpcy5mcm96ZW5Db250ZW50cyA9PT0gbnVsbCkge1xuXHRcdFx0dGhpcy5mcm96ZW5Db250ZW50cyA9IHRoaXMuZnJvemVuQ29udGVudHMyID0gdGhpcy5jb250ZW50cztcblx0XHR9XG5cdFx0aWYgKHRoaXMuZnJvemVuQ29udGVudHMgPT09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkZpbGUgY29udGVudHMgZG9uJ3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmZyb3plbkNvbnRlbnRzO1xuXHR9O1xuXG5cdGdldFJlYWRlciA9ICgpID0+IHtcblx0XHR0aGlzLml0ZXJhdG9ycy5wdXNoKG5ldyBSZWFkZXIoeyBjb250ZW50czogdGhpcy5zYXZlZENvbnRlbnRzIHx8IHRoaXMuZnJvemVuQ29udGVudHMyIHx8IFwiXCIgfSkpO1xuXHRcdHJldHVybiB0aGlzLml0ZXJhdG9ycy5hdCgtMSk7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJzZXBhcmF0b3JcIilcblx0QHJlcXVpcmVkKFwic2VwYXJhdG9yXCIpXG5cdGdldFNlZ21lbnRzID0gKG9wdGlvbnMpID0+IHtcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuc2VwYXJhdG9yICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJTZXBhcmF0b3IgbXVzdCBiZSBhIHN0cmluZy5cIik7XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHRpdGVyYXRvcjogKCkgPT4ge1xuXHRcdFx0XHR0aGlzLml0ZXJhdG9ycy5wdXNoKG5ldyBJdGVyYXRvcih0aGlzLnNhdmVkQ29udGVudHM/LnNwbGl0KG9wdGlvbnMuc2VwYXJhdG9yKSB8fCBbXSkpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5pdGVyYXRvcnMuYXQoLTEpO1xuXHRcdFx0fSxcblx0XHR9O1xuXHR9O1xuXG5cdHJlc2V0U3RyZWFtID0gKCkgPT4ge1xuXHRcdHRoaXMuY29udGVudHMgPSB0aGlzLnNhdmVkQ29udGVudHM7XG5cdFx0dGhpcy5mcm96ZW5Db250ZW50czIgPSBudWxsO1xuXHRcdHRoaXMuaXRlcmF0b3JzLmZvckVhY2goKGl0ZXJhdG9yKSA9PiB7XG5cdFx0XHRpdGVyYXRvci5wb2ludGVyID0gLTE7XG5cdFx0fSk7XG5cdFx0dGhpcy5yZWFkZXJzLmZvckVhY2goKHJlYWRlcikgPT4ge1xuXHRcdFx0cmVhZGVyLnBvaW50ZXIgPSAtMTtcblx0XHRcdHJlYWRlci5jb250ZW50cyA9IHJlYWRlci5zYXZlZENvbnRlbnRzO1xuXHRcdH0pO1xuXHR9O1xuXG5cdHNhdmUgPSAoKSA9PiB7XG5cdFx0aWYgKHRoaXMuY29udGVudHMgPT09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkZpbGUgY29udGVudHMgZG9uJ3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5mb2xkZXIpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBlbnRlciB2YWx1ZSBmb3IgZm9sZGVyXCIpO1xuXHRcdH1cblx0XHRjb25zdCBjb3B5ID0gbmV3IEZpbGUodGhpcyk7XG5cdFx0aWYgKCF0aGlzLmlkKSB7XG5cdFx0XHR0aGlzLmlkID0gY29weS5pZCA9IE1hdGgubWF4KC4uLkFycmF5LmZyb20oU3VpdGVTY3JpcHRNb2Nrcy5maWxlcy52YWx1ZXMoKSkubWFwKChhKSA9PiBhLmlkKSkgKyAxO1xuXHRcdFx0U3VpdGVTY3JpcHRNb2Nrcy5jcmVhdGVkRmlsZXMucHVzaChjb3B5KTtcblx0XHR9XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5maWxlcy5zZXQoY29weSk7XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5zYXZlZEZpbGVzLnB1c2goY29weSk7XG5cdFx0cmV0dXJuIHRoaXMuaWQ7XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZTtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTUEsZ0JBQWdCLEdBQUdDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUNuRCxNQUFNO0VBQUVDLE9BQU87RUFBRUMsUUFBUTtFQUFFQztBQUFrQixDQUFDLEdBQUdILE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUM3RSxNQUFNSSxRQUFRLEdBQUdKLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztBQUM5QyxNQUFNSyxNQUFNLEdBQUdMLE9BQU8sQ0FBQyxjQUFjLENBQUM7QUFBQyxJQUFBTSxLQUFBO0FBQUFDLElBQUEsR0FFdENKLGlCQUFpQixDQUFDLENBQUM7QUFBQUssS0FBQSxHQW9DbEJQLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFBQVEsS0FBQSxHQUNoQlAsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUFBUSxLQUFBLEdBdUJqQlQsT0FBTyxDQUFDLFdBQVcsQ0FBQztBQUFBVSxLQUFBLEdBQ3BCVCxRQUFRLENBQUMsV0FBVyxDQUFDO0FBN0R2QixNQUFBVSxJQUFBLENBQ1c7RUFBQTtJQUFBO01BQUFDLENBQUEsR0FBQUMsZ0JBQUEsRUFBQUMsaUJBQUE7TUFBQUMsQ0FBQSxHQUFBVixLQUFBLEVBQUFXLFVBQUE7SUFBQSxJQUFBQyxlQUFBLFVBQUFWLEtBQUEsRUFBQUMsS0FBQSx1QkFBQUMsS0FBQSxFQUFBQyxLQUFBLHdCQUFBSixJQUFBO0VBQUE7RUFDVlksV0FBVyxHQUFHLEVBQUU7RUFDaEJDLFFBQVEsR0FBRyxFQUFFO0VBQ2JDLFFBQVEsR0FBRyxFQUFFO0VBQ2JDLFFBQVEsR0FB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