var _dec, _init_copy, _dec2, _init_create, _dec3, _dec4, _init_delete, _dec5, _dec6, _init_load;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const fileStub = require("suitecloud-unit-testing-stubs/stubs/file");
const {
  options,
  required
} = require("../../helpers.cjs");
const SuiteScriptMocks = require("../../index.cjs");
const Reader = require("./Reader.cjs");
const File = require("./File.cjs");
_dec = required("folder", "id");
_dec2 = required("name", "fileType");
_dec3 = options("id");
_dec4 = required("id");
_dec5 = options("id");
_dec6 = required("id");
class FileModule {
  static {
    [_init_copy, _init_create, _init_delete, _init_load] = _applyDecs2203R(this, [[_dec, 0, "copy"], [_dec2, 0, "create"], [[_dec3, _dec4], 0, "delete"], [[_dec5, _dec6], 0, "load"]], []).e;
  }
  Encoding = fileStub.Encoding;
  NameConflictResolution = fileStub.NameConflictResolution;
  Type = fileStub.Type;
  File = File;
  Reader = Reader;
  copy = _init_copy(this, options => {
    const file = this.load(options.id);
    file.id = null;
    file.folder = options.folder;
    const resolutionType = options.conflictResolution || this.NameConflictResolution.FAIL;
    if (!Object.values(this.NameConflictResolution).includes(resolutionType)) {
      throw new Error("Invalid value for conflictResolution");
    }
    let existingFile = SuiteScriptMocks.files.get({
      folder: options.folder,
      name: file.name
    });
    if (existingFile) {
      switch (resolutionType) {
        case this.NameConflictResolution.FAIL:
          throw new Error("File with that name already exists in that folder");
        case this.NameConflictResolution.OVERWRITE:
        case this.NameConflictResolution.OVERWRITE_CONTENT_AND_ATTRIBUTES:
          file.id = existingFile.id;
          break;
        case this.NameConflictResolution.RENAME_TO_UNIQUE:
          while (existingFile) {
            const curNum = +file.name.match(/^.+\((\d+)\)\.[a-z]+$/i)?.[1] || 0;
            file.name = file.name.replace(/^(.+?)(\(\d+\))?\.([a-z]+)$/i, `$1(${curNum + 1}).$3`);
            existingFile = SuiteScriptMocks.files.get({
              folder: options.folder,
              name: file.name
            });
          }
      }
    }
    file.save();
    return file;
  });
  create = _init_create(this, options => {
    return new File(options);
  });
  delete = _init_delete(this, options => {
    const file = SuiteScriptMocks.files.get(options);
    if (!file) {
      throw new Error("File does not exist");
    }
    SuiteScriptMocks.deletedFiles.push(file);
    SuiteScriptMocks.files.delete(file);
    return file.id;
  });
  load = _init_load(this, options => {
    const file = SuiteScriptMocks.files.get(options);
    if (!file) {
      throw new Error("File does not exist");
    }
    file.savedContents = file.contents;
    return new File({
      ...file
    });
  });
}
module.exports = new FileModule();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmaWxlU3R1YiIsInJlcXVpcmUiLCJvcHRpb25zIiwicmVxdWlyZWQiLCJTdWl0ZVNjcmlwdE1vY2tzIiwiUmVhZGVyIiwiRmlsZSIsIl9kZWMiLCJfZGVjMiIsIl9kZWMzIiwiX2RlYzQiLCJfZGVjNSIsIl9kZWM2IiwiRmlsZU1vZHVsZSIsIl9pbml0X2NvcHkiLCJfaW5pdF9jcmVhdGUiLCJfaW5pdF9kZWxldGUiLCJfaW5pdF9sb2FkIiwiX2FwcGx5RGVjczIyMDNSIiwiZSIsIkVuY29kaW5nIiwiTmFtZUNvbmZsaWN0UmVzb2x1dGlvbiIsIlR5cGUiLCJjb3B5IiwiZmlsZSIsImxvYWQiLCJpZCIsImZvbGRlciIsInJlc29sdXRpb25UeXBlIiwiY29uZmxpY3RSZXNvbHV0aW9uIiwiRkFJTCIsIk9iamVjdCIsInZhbHVlcyIsImluY2x1ZGVzIiwiRXJyb3IiLCJleGlzdGluZ0ZpbGUiLCJmaWxlcyIsImdldCIsIm5hbWUiLCJPVkVSV1JJVEUiLCJPVkVSV1JJVEVfQ09OVEVOVF9BTkRfQVRUUklCVVRFUyIsIlJFTkFNRV9UT19VTklRVUUiLCJjdXJOdW0iLCJtYXRjaCIsInJlcGxhY2UiLCJzYXZlIiwiY3JlYXRlIiwiZGVsZXRlIiwiZGVsZXRlZEZpbGVzIiwicHVzaCIsInNhdmVkQ29udGVudHMiLCJjb250ZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9ja3MvZmlsZS9pbmRleC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZmlsZVN0dWIgPSByZXF1aXJlKFwic3VpdGVjbG91ZC11bml0LXRlc3Rpbmctc3R1YnMvc3R1YnMvZmlsZVwiKTtcbmNvbnN0IHsgb3B0aW9ucywgcmVxdWlyZWQgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKTtcbmNvbnN0IFN1aXRlU2NyaXB0TW9ja3MgPSByZXF1aXJlKFwiLi4vLi4vaW5kZXguY2pzXCIpO1xuY29uc3QgUmVhZGVyID0gcmVxdWlyZShcIi4vUmVhZGVyLmNqc1wiKTtcbmNvbnN0IEZpbGUgPSByZXF1aXJlKFwiLi9GaWxlLmNqc1wiKTtcblxuY2xhc3MgRmlsZU1vZHVsZSB7XG5cdEVuY29kaW5nID0gZmlsZVN0dWIuRW5jb2Rpbmc7XG5cdE5hbWVDb25mbGljdFJlc29sdXRpb24gPSBmaWxlU3R1Yi5OYW1lQ29uZmxpY3RSZXNvbHV0aW9uO1xuXHRUeXBlID0gZmlsZVN0dWIuVHlwZTtcblxuXHRGaWxlID0gRmlsZTtcblx0UmVhZGVyID0gUmVhZGVyO1xuXG5cdEByZXF1aXJlZChcImZvbGRlclwiLCBcImlkXCIpXG5cdGNvcHkgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGZpbGUgPSB0aGlzLmxvYWQob3B0aW9ucy5pZCk7XG5cdFx0ZmlsZS5pZCA9IG51bGw7XG5cdFx0ZmlsZS5mb2xkZXIgPSBvcHRpb25zLmZvbGRlcjtcblx0XHRjb25zdCByZXNvbHV0aW9uVHlwZSA9IG9wdGlvbnMuY29uZmxpY3RSZXNvbHV0aW9uIHx8IHRoaXMuTmFtZUNvbmZsaWN0UmVzb2x1dGlvbi5GQUlMO1xuXHRcdGlmICghT2JqZWN0LnZhbHVlcyh0aGlzLk5hbWVDb25mbGljdFJlc29sdXRpb24pLmluY2x1ZGVzKHJlc29sdXRpb25UeXBlKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgY29uZmxpY3RSZXNvbHV0aW9uXCIpO1xuXHRcdH1cblx0XHRsZXQgZXhpc3RpbmdGaWxlID0gU3VpdGVTY3JpcHRNb2Nrcy5maWxlcy5nZXQoeyBmb2xkZXI6IG9wdGlvbnMuZm9sZGVyLCBuYW1lOiBmaWxlLm5hbWUgfSk7XG5cdFx0aWYgKGV4aXN0aW5nRmlsZSkge1xuXHRcdFx0c3dpdGNoIChyZXNvbHV0aW9uVHlwZSkge1xuXHRcdFx0XHRjYXNlIHRoaXMuTmFtZUNvbmZsaWN0UmVzb2x1dGlvbi5GQUlMOlxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkZpbGUgd2l0aCB0aGF0IG5hbWUgYWxyZWFkeSBleGlzdHMgaW4gdGhhdCBmb2xkZXJcIik7XG5cdFx0XHRcdGNhc2UgdGhpcy5OYW1lQ29uZmxpY3RSZXNvbHV0aW9uLk9WRVJXUklURTpcblx0XHRcdFx0Y2FzZSB0aGlzLk5hbWVDb25mbGljdFJlc29sdXRpb24uT1ZFUldSSVRFX0NPTlRFTlRfQU5EX0FUVFJJQlVURVM6XG5cdFx0XHRcdFx0ZmlsZS5pZCA9IGV4aXN0aW5nRmlsZS5pZDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSB0aGlzLk5hbWVDb25mbGljdFJlc29sdXRpb24uUkVOQU1FX1RPX1VOSVFVRTpcblx0XHRcdFx0XHR3aGlsZSAoZXhpc3RpbmdGaWxlKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBjdXJOdW0gPSArZmlsZS5uYW1lLm1hdGNoKC9eLitcXCgoXFxkKylcXClcXC5bYS16XSskL2kpPy5bMV0gfHwgMDtcblx0XHRcdFx0XHRcdGZpbGUubmFtZSA9IGZpbGUubmFtZS5yZXBsYWNlKC9eKC4rPykoXFwoXFxkK1xcKSk/XFwuKFthLXpdKykkL2ksIGAkMSgke2N1ck51bSArIDF9KS4kM2ApO1xuXHRcdFx0XHRcdFx0ZXhpc3RpbmdGaWxlID0gU3VpdGVTY3JpcHRNb2Nrcy5maWxlcy5nZXQoeyBmb2xkZXI6IG9wdGlvbnMuZm9sZGVyLCBuYW1lOiBmaWxlLm5hbWUgfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRmaWxlLnNhdmUoKTtcblx0XHRyZXR1cm4gZmlsZTtcblx0fTtcblxuXHRAcmVxdWlyZWQoXCJuYW1lXCIsIFwiZmlsZVR5cGVcIilcblx0Y3JlYXRlID0gKG9wdGlvbnMpID0+IHtcblx0XHRyZXR1cm4gbmV3IEZpbGUob3B0aW9ucyk7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJpZFwiKVxuXHRAcmVxdWlyZWQoXCJpZFwiKVxuXHRkZWxldGUgPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGZpbGUgPSBTdWl0ZVNjcmlwdE1vY2tzLmZpbGVzLmdldChvcHRpb25zKTtcblx0XHRpZiAoIWZpbGUpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkZpbGUgZG9lcyBub3QgZXhpc3RcIik7XG5cdFx0fVxuXHRcdFN1aXRlU2NyaXB0TW9ja3MuZGVsZXRlZEZpbGVzLnB1c2goZmlsZSk7XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5maWxlcy5kZWxldGUoZmlsZSk7XG5cdFx0cmV0dXJuIGZpbGUuaWQ7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJpZFwiKVxuXHRAcmVxdWlyZWQoXCJpZFwiKVxuXHRsb2FkID0gKG9wdGlvbnMpID0+IHtcblx0XHRjb25zdCBmaWxlID0gU3VpdGVTY3JpcHRNb2Nrcy5maWxlcy5nZXQob3B0aW9ucyk7XG5cdFx0aWYgKCFmaWxlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJGaWxlIGRvZXMgbm90IGV4aXN0XCIpO1xuXHRcdH1cblx0XHRmaWxlLnNhdmVkQ29udGVudHMgPSBmaWxlLmNvbnRlbnRzO1xuXHRcdHJldHVybiBuZXcgRmlsZSh7IC4uLmZpbGUgfSk7XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEZpbGVNb2R1bGUoKTtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsMENBQTBDLENBQUM7QUFDcEUsTUFBTTtFQUFFQyxPQUFPO0VBQUVDO0FBQVMsQ0FBQyxHQUFHRixPQUFPLENBQUMsbUJBQW1CLENBQUM7QUFDMUQsTUFBTUcsZ0JBQWdCLEdBQUdILE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUNuRCxNQUFNSSxNQUFNLEdBQUdKLE9BQU8sQ0FBQyxjQUFjLENBQUM7QUFDdEMsTUFBTUssSUFBSSxHQUFHTCxPQUFPLENBQUMsWUFBWSxDQUFDO0FBQUNNLElBQUEsR0FVakNKLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO0FBQUFLLEtBQUEsR0E4QnhCTCxRQUFRLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQztBQUFBTSxLQUFBLEdBSzVCUCxPQUFPLENBQUMsSUFBSSxD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