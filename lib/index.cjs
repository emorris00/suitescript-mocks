var _dec, _init_caches, _dec2, _init_files, _dec3, _init_records, _dec4, _init_searches, _dec5, _init_taskStatuses;
function applyDecs2203RFactory() { function createAddInitializerMethod(e, t) { return function (r) { !function (e, t) { if (e.v) throw new Error("attempted to call " + t + " after decoration was finished"); }(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r); }; } function memberDec(e, t, r, n, a, i, s, o) { var c; switch (a) { case 1: c = "accessor"; break; case 2: c = "method"; break; case 3: c = "getter"; break; case 4: c = "setter"; break; default: c = "field"; } var l, u, f = { kind: c, name: s ? "#" + t : t, static: i, private: s }, p = { v: !1 }; 0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? s ? (l = r.get, u = r.set) : (l = function () { return this[t]; }, u = function (e) { this[t] = e; }) : 2 === a ? l = function () { return r.value; } : (1 !== a && 3 !== a || (l = function () { return r.get.call(this); }), 1 !== a && 4 !== a || (u = function (e) { r.set.call(this, e); })), f.access = l && u ? { get: l, set: u } : l ? { get: l } : { set: u }; try { return e(o, f); } finally { p.v = !0; } } function assertCallable(e, t) { if ("function" != typeof e) throw new TypeError(t + " must be a function"); } function assertValidReturnValue(e, t) { var r = typeof t; if (1 === e) { if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init"); } else if ("function" !== r) { var n; throw n = 0 === e ? "field" : 10 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0"); } } function applyMemberDec(e, t, r, n, a, i, s, o) { var c, l, u, f, p, d, h = r[0]; if (s ? c = 0 === a || 1 === a ? { get: r[3], set: r[4] } : 3 === a ? { get: r[3] } : 4 === a ? { set: r[3] } : { value: r[3] } : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? u = { get: c.get, set: c.set } : 2 === a ? u = c.value : 3 === a ? u = c.get : 4 === a && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, n, c, o, a, i, s, u)) && (assertValidReturnValue(a, f), 0 === a ? l = f : 1 === a ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f);else for (var v = h.length - 1; v >= 0; v--) { var g; if (void 0 !== (f = memberDec(h[v], n, c, o, a, i, s, u))) assertValidReturnValue(a, f), 0 === a ? g = f : 1 === a ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = { get: p, set: d }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)); } if (0 === a || 1 === a) { if (void 0 === l) l = function (e, t) { return t; };else if ("function" != typeof l) { var y = l; l = function (e, t) { for (var r = t, n = 0; n < y.length; n++) r = y[n].call(e, r); return r; }; } else { var m = l; l = function (e, t) { return m.call(e, t); }; } e.push(l); } 0 !== a && (1 === a ? (c.get = u.get, c.set = u.set) : 2 === a ? c.value = u : 3 === a ? c.get = u : 4 === a && (c.set = u), s ? 1 === a ? (e.push(function (e, t) { return u.get.call(e, t); }), e.push(function (e, t) { return u.set.call(e, t); })) : 2 === a ? e.push(u) : e.push(function (e, t) { return u.call(e, t); }) : Object.defineProperty(t, n, c)); } function applyMemberDecs(e, t) { for (var r, n, a = [], i = new Map(), s = new Map(), o = 0; o < t.length; o++) { var c = t[o]; if (Array.isArray(c)) { var l, u, f = c[1], p = c[2], d = c.length > 3, h = f >= 5; if (h ? (l = e, 0 !== (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) { var v = h ? s : i, g = v.get(p) || 0; if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p); !g && f > 2 ? v.set(p, f) : v.set(p, !0); } applyMemberDec(a, l, c, p, f, h, d, u); } } return pushInitializers(a, r), pushInitializers(a, n), a; } function pushInitializers(e, t) { t && e.push(function (e) { for (var r = 0; r < t.length; r++) t[r].call(e); return e; }); } return function (e, t, r) { return { e: applyMemberDecs(e, t), get c() { return function (e, t) { if (t.length > 0) { for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) { var s = { v: !1 }; try { var o = t[i](n, { kind: "class", name: a, addInitializer: createAddInitializerMethod(r, s) }); } finally { s.v = !0; } void 0 !== o && (assertValidReturnValue(10, o), n = o); } return [n, function () { for (var e = 0; e < r.length; e++) r[e].call(n); }]; } }(e, r); } }; }; }
function _applyDecs2203R(e, t, r) { return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r); }
const SuiteCloudJestStubs = require("suitecloud-unit-testing-stubs");
const KeyedSet = require("./keyed-set.cjs");
const {
  addKeyedSetGetSet,
  createUserEventContext,
  UserEventType
} = require("./helpers.cjs");
_dec = addKeyedSetGetSet();
_dec2 = addKeyedSetGetSet();
_dec3 = addKeyedSetGetSet();
_dec4 = addKeyedSetGetSet();
_dec5 = addKeyedSetGetSet();
class SuiteScriptMocks {
  static {
    [_init_caches, _init_files, _init_records, _init_searches, _init_taskStatuses] = _applyDecs2203R(this, [[_dec, 0, "caches", function () {
      return this.#caches;
    }, function (value) {
      this.#caches = value;
    }], [_dec2, 0, "files", function () {
      return this.#files;
    }, function (value) {
      this.#files = value;
    }], [_dec3, 0, "records", function () {
      return this.#records;
    }, function (value) {
      this.#records = value;
    }], [_dec4, 0, "searches", function () {
      return this.#searches;
    }, function (value) {
      this.#searches = value;
    }], [_dec5, 0, "taskStatuses", function () {
      return this.#taskStatuses;
    }, function (value) {
      this.#taskStatuses = value;
    }]], []).e;
  }
  dateFormat = "M/d/yyyy";
  #caches = _init_caches(this, new KeyedSet(cache => [cache.name, cache.scope]));
  #files = _init_files(this, new KeyedSet(file => file.id, file => [file.folder, file.name]));
  #records = _init_records(this, new KeyedSet(record => [record.id, record.type]));
  #searches = _init_searches(this, new KeyedSet(search => search.id, search => search.searchId, search => search.title));
  #taskStatuses = _init_taskStatuses(this, new KeyedSet(task => task.id));
  reset = () => {
    this.outputAuditLogs = false;
    this.outputDebugLogs = false;
    this.outputEmergencyLogs = false;
    this.outputErrorLogs = false;
    this.currentScript = {};
    this.currentUser = {};
    this.currentSession = {};
    this.features = {};
    this.sentEmails = [];
    this.#caches.clear();
    this.#files.clear();
    this.savedFiles = [];
    this.createdFiles = [];
    this.deletedFiles = [];
    this.#records.clear();
    this.savedRecords = [];
    this.createdRecords = [];
    this.deletedRecords = [];
    this.#searches.clear();
    this.runSearches = [];
    this.searchResults = [];
    this.lookupFieldsResults = [];
    this.#taskStatuses.clear();
    this.submittedTasks = [];
    this.logs = [];
  };
  createUserEventContext = createUserEventContext;
  UserEventType = UserEventType;
  stubs = [...SuiteCloudJestStubs.customStubs, {
    module: "N/cache",
    path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/cache/index.cjs"
  }, {
    module: "N/email",
    path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/email/index.cjs"
  }, {
    module: "N/encode",
    path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/encode/index.cjs"
  }, {
    module: "N/record",
    path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/record/index.cjs"
  }, {
    module: "N/runtime",
    path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/runtime/index.cjs"
  }, {
    module: "N/search",
    path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/search/index.cjs"
  }, {
    module: "N/task",
    path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/task/index.cjs"
  }, {
    module: "N/url",
    path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/url/index.cjs"
  }, {
    module: "N/ui/serverWidget",
    path: "<rootDir>/node_modules/suitescript-mocks/lib/mocks/ui/serverWidget/index.cjs"
  }];
  constructor() {
    this.reset();
  }
}
module.exports = new SuiteScriptMocks();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWl0ZUNsb3VkSmVzdFN0dWJzIiwicmVxdWlyZSIsIktleWVkU2V0IiwiYWRkS2V5ZWRTZXRHZXRTZXQiLCJjcmVhdGVVc2VyRXZlbnRDb250ZXh0IiwiVXNlckV2ZW50VHlwZSIsIl9kZWMiLCJfZGVjMiIsIl9kZWMzIiwiX2RlYzQiLCJfZGVjNSIsIlN1aXRlU2NyaXB0TW9ja3MiLCJfaW5pdF9jYWNoZXMiLCJfaW5pdF9maWxlcyIsIl9pbml0X3JlY29yZHMiLCJfaW5pdF9zZWFyY2hlcyIsIl9pbml0X3Rhc2tTdGF0dXNlcyIsIl9hcHBseURlY3MyMjAzUiIsImNhY2hlcyIsInZhbHVlIiwiZmlsZXMiLCJyZWNvcmRzIiwic2VhcmNoZXMiLCJ0YXNrU3RhdHVzZXMiLCJlIiwiZGF0ZUZvcm1hdCIsImNhY2hlIiwibmFtZSIsInNjb3BlIiwiZmlsZSIsImlkIiwiZm9sZGVyIiwicmVjb3JkIiwidHlwZSIsInNlYXJjaCIsInNlYXJjaElkIiwidGl0bGUiLCJ0YXNrIiwicmVzZXQiLCJvdXRwdXRBdWRpdExvZ3MiLCJvdXRwdXREZWJ1Z0xvZ3MiLCJvdXRwdXRFbWVyZ2VuY3lMb2dzIiwib3V0cHV0RXJyb3JMb2dzIiwiY3VycmVudFNjcmlwdCIsImN1cnJlbnRVc2VyIiwiY3VycmVudFNlc3Npb24iLCJmZWF0dXJlcyIsInNlbnRFbWFpbHMiLCJjbGVhciIsInNhdmVkRmlsZXMiLCJjcmVhdGVkRmlsZXMiLCJkZWxldGVkRmlsZXMiLCJzYXZlZFJlY29yZHMiLCJjcmVhdGVkUmVjb3JkcyIsImRlbGV0ZWRSZWNvcmRzIiwicnVuU2VhcmNoZXMiLCJzZWFyY2hSZXN1bHRzIiwibG9va3VwRmllbGRzUmVzdWx0cyIsInN1Ym1pdHRlZFRhc2tzIiwibG9ncyIsInN0dWJzIiwiY3VzdG9tU3R1YnMiLCJtb2R1bGUiLCJwYXRoIiwiY29uc3RydWN0b3IiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTdWl0ZUNsb3VkSmVzdFN0dWJzID0gcmVxdWlyZShcInN1aXRlY2xvdWQtdW5pdC10ZXN0aW5nLXN0dWJzXCIpO1xuY29uc3QgS2V5ZWRTZXQgPSByZXF1aXJlKFwiLi9rZXllZC1zZXQuY2pzXCIpO1xuY29uc3QgeyBhZGRLZXllZFNldEdldFNldCwgY3JlYXRlVXNlckV2ZW50Q29udGV4dCwgVXNlckV2ZW50VHlwZSB9ID0gcmVxdWlyZShcIi4vaGVscGVycy5janNcIik7XG5cbmNsYXNzIFN1aXRlU2NyaXB0TW9ja3Mge1xuXHRkYXRlRm9ybWF0ID0gXCJNL2QveXl5eVwiO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCNjYWNoZXMgPSBuZXcgS2V5ZWRTZXQoKGNhY2hlKSA9PiBbY2FjaGUubmFtZSwgY2FjaGUuc2NvcGVdKTtcblxuXHRAYWRkS2V5ZWRTZXRHZXRTZXQoKVxuXHQjZmlsZXMgPSBuZXcgS2V5ZWRTZXQoXG5cdFx0KGZpbGUpID0+IGZpbGUuaWQsXG5cdFx0KGZpbGUpID0+IFtmaWxlLmZvbGRlciwgZmlsZS5uYW1lXSxcblx0KTtcblxuXHRAYWRkS2V5ZWRTZXRHZXRTZXQoKVxuXHQjcmVjb3JkcyA9IG5ldyBLZXllZFNldCgocmVjb3JkKSA9PiBbcmVjb3JkLmlkLCByZWNvcmQudHlwZV0pO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCNzZWFyY2hlcyA9IG5ldyBLZXllZFNldChcblx0XHQoc2VhcmNoKSA9PiBzZWFyY2guaWQsXG5cdFx0KHNlYXJjaCkgPT4gc2VhcmNoLnNlYXJjaElkLFxuXHRcdChzZWFyY2gpID0+IHNlYXJjaC50aXRsZSxcblx0KTtcblxuXHRAYWRkS2V5ZWRTZXRHZXRTZXQoKVxuXHQjdGFza1N0YXR1c2VzID0gbmV3IEtleWVkU2V0KCh0YXNrKSA9PiB0YXNrLmlkKTtcblxuXHRyZXNldCA9ICgpID0+IHtcblx0XHR0aGlzLm91dHB1dEF1ZGl0TG9ncyA9IGZhbHNlO1xuXHRcdHRoaXMub3V0cHV0RGVidWdMb2dzID0gZmFsc2U7XG5cdFx0dGhpcy5vdXRwdXRFbWVyZ2VuY3lMb2dzID0gZmFsc2U7XG5cdFx0dGhpcy5vdXRwdXRFcnJvckxvZ3MgPSBmYWxzZTtcblxuXHRcdHRoaXMuY3VycmVudFNjcmlwdCA9IHt9O1xuXHRcdHRoaXMuY3VycmVudFVzZXIgPSB7fTtcblx0XHR0aGlzLmN1cnJlbnRTZXNzaW9uID0ge307XG5cdFx0dGhpcy5mZWF0dXJlcyA9IHt9O1xuXG5cdFx0dGhpcy5zZW50RW1haWxzID0gW107XG5cblx0XHR0aGlzLiNjYWNoZXMuY2xlYXIoKTtcblxuXHRcdHRoaXMuI2ZpbGVzLmNsZWFyKCk7XG5cdFx0dGhpcy5zYXZlZEZpbGVzID0gW107XG5cdFx0dGhpcy5jcmVhdGVkRmlsZXMgPSBbXTtcblx0XHR0aGlzLmRlbGV0ZWRGaWxlcyA9IFtdO1xuXG5cdFx0dGhpcy4jcmVjb3Jkcy5jbGVhcigpO1xuXHRcdHRoaXMuc2F2ZWRSZWNvcmRzID0gW107XG5cdFx0dGhpcy5jcmVhdGVkUmVjb3JkcyA9IFtdO1xuXHRcdHRoaXMuZGVsZXRlZFJlY29yZHMgPSBbXTtcblxuXHRcdHRoaXMuI3NlYXJjaGVzLmNsZWFyKCk7XG5cdFx0dGhpcy5ydW5TZWFyY2hlcyA9IFtdO1xuXHRcdHRoaXMuc2VhcmNoUmVzdWx0cyA9IFtdO1xuXHRcdHRoaXMubG9va3VwRmllbGRzUmVzdWx0cyA9IFtdO1xuXG5cdFx0dGhpcy4jdGFza1N0YXR1c2VzLmNsZWFyKCk7XG5cdFx0dGhpcy5zdWJtaXR0ZWRUYXNrcyA9IFtdO1xuXG5cdFx0dGhpcy5sb2dzID0gW107XG5cdH07XG5cblx0Y3JlYXRlVXNlckV2ZW50Q29udGV4dCA9IGNyZWF0ZVVzZXJFdmVudENvbnRleHQ7XG5cdFVzZXJFdmVudFR5cGUgPSBVc2VyRXZlbnRUeXBlO1xuXG5cdHN0dWJzID0gW1xuXHRcdC4uLlN1aXRlQ2xvdWRKZXN0U3R1YnMuY3VzdG9tU3R1YnMsXG5cdFx0eyBtb2R1bGU6IFwiTi9jYWNoZVwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL2NhY2hlL2luZGV4LmNqc1wiIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9lbWFpbFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL2VtYWlsL2luZGV4LmNqc1wiIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9lbmNvZGVcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy9lbmNvZGUvaW5kZXguY2pzXCIgfSxcblx0XHR7IG1vZHVsZTogXCJOL3JlY29yZFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3JlY29yZC9pbmRleC5janNcIiB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vcnVudGltZVwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3J1bnRpbWUvaW5kZXguY2pzXCIgfSxcblx0XHR7IG1vZHVsZTogXCJOL3NlYXJjaFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3NlYXJjaC9pbmRleC5janNcIiB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vdGFza1wiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3Rhc2svaW5kZXguY2pzXCIgfSxcblx0XHR7IG1vZHVsZTogXCJOL3VybFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3VybC9pbmRleC5janNcIiB9LFxuXHRcdHtcblx0XHRcdG1vZHVsZTogXCJOL3VpL3NlcnZlcldpZGdldFwiLFxuXHRcdFx0cGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy91aS9zZXJ2ZXJXaWRnZXQvaW5kZXguY2pzXCIsXG5cdFx0fSxcblx0XTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU3VpdGVTY3JpcHRNb2NrcygpO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNQSxtQkFBbUIsR0FBR0MsT0FBTyxDQUFDLCtCQUErQixDQUFDO0FBQ3BFLE1BQU1DLFFBQVEsR0FBR0QsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQzNDLE1BQU07RUFBRUUsaUJBQWlCO0VBQUVDLHNCQUFzQjtFQUFFQztBQUFjLENBQUMsR0FBR0osT0FBTyxDQUFDLGVBQWUsQ0FBQztBQUFDSyxJQUFBLEdBSzVGSCxpQkFBaUIsQ0FBQyxDQUFDO0FBQUFJLEtBQUEsR0FHbkJKLGlCQUFpQixDQUFDLENBQUM7QUFBQUssS0FBQSxHQU1uQkwsaUJBQWlCLENBQUMsQ0FBQztBQUFBTSxLQUFBLEdBR25CTixpQkFBaUIsQ0FBQyxDQUFDO0FBQUFPLEtBQUEsR0FPbkJQLGlCQUFpQixDQUFDLENBQUM7QUF0QnJCLE1BQU1RLGdCQUFnQixDQUFDO0VBQUE7SUFBQSxDQUFBQyxZQUFBLEVBQUFDLFdBQUEsRUFBQUMsYUFBQSxFQUFBQyxjQUFBLEVBQUFDLGtCQUFBLElBQUFDLGVBQUEsU0FBQVgsSUFBQTtNQUFBLFlBSXRCLENBQUNZLE1BQU07SUFBQSxhQUFBQyxLQUFBO01BQUEsS0FBUCxDQUFDRCxNQUFNLEdBQUFDLEtBQUE7SUFBQSxLQUFBWixLQUFBO01BQUEsWUFHUCxDQUFDYSxLQUFLO0lBQUEsYUFBQUQsS0FBQTtNQUFBLEtBQU4sQ0FBQ0MsS0FBSyxHQUFBRCxLQUFBO0lBQUEsS0FBQVgsS0FBQTtNQUFBLFlBTU4sQ0FBQ2EsT0FBTztJQUFBLGFBQUFGLEtBQUE7TUFBQSxLQUFSLENBQUNFLE9BQU8sR0FBQUYsS0FBQTtJQUFBLEtBQUFWLEtBQUE7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