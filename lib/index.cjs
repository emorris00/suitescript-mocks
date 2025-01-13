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
const baseMockPath = "<rootDir>/node_modules/suitescript-mocks/lib/mocks";
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
    this.dialogs = [];
    this.dialogResults = [];
    this.messages = [];
    this.generateBytesResults = [];
    this.generateIntResults = [];
    this.generateUUIDResults = [];
  };
  createUserEventContext = createUserEventContext;
  UserEventType = UserEventType;
  stubs = [...SuiteCloudJestStubs.customStubs, {
    module: "N/cache",
    path: `${baseMockPath}/cache/index.cjs`
  }, {
    module: "N/config",
    path: `${baseMockPath}/config/index.cjs`
  }, {
    module: "N/crypto/random",
    path: `${baseMockPath}/crypto/random/index.cjs`
  }, {
    module: "N/email",
    path: `${baseMockPath}/email/index.cjs`
  }, {
    module: "N/encode",
    path: `${baseMockPath}/encode/index.cjs`
  }, {
    module: "N/file",
    path: `${baseMockPath}/file/index.cjs`
  }, {
    module: "N/log",
    path: `${baseMockPath}/log/index.cjs`
  }, {
    module: "N/record",
    path: `${baseMockPath}/record/index.cjs`
  }, {
    module: "N/runtime",
    path: `${baseMockPath}/runtime/index.cjs`
  }, {
    module: "N/search",
    path: `${baseMockPath}/search/index.cjs`
  }, {
    module: "N/task",
    path: `${baseMockPath}/task/index.cjs`
  }, {
    module: "N/ui/dialog",
    path: `${baseMockPath}/ui/dialog/index.cjs`
  }, {
    module: "N/ui/message",
    path: `${baseMockPath}/ui/message/index.cjs`
  }, {
    module: "N/ui/serverWidget",
    path: `${baseMockPath}/ui/serverWidget/index.cjs`
  }, {
    module: "N/url",
    path: `${baseMockPath}/url/index.cjs`
  }];
  constructor() {
    this.reset();
  }
}
module.exports = new SuiteScriptMocks();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWl0ZUNsb3VkSmVzdFN0dWJzIiwicmVxdWlyZSIsIktleWVkU2V0IiwiYWRkS2V5ZWRTZXRHZXRTZXQiLCJjcmVhdGVVc2VyRXZlbnRDb250ZXh0IiwiVXNlckV2ZW50VHlwZSIsImJhc2VNb2NrUGF0aCIsIl9kZWMiLCJfZGVjMiIsIl9kZWMzIiwiX2RlYzQiLCJfZGVjNSIsIlN1aXRlU2NyaXB0TW9ja3MiLCJfaW5pdF9jYWNoZXMiLCJfaW5pdF9maWxlcyIsIl9pbml0X3JlY29yZHMiLCJfaW5pdF9zZWFyY2hlcyIsIl9pbml0X3Rhc2tTdGF0dXNlcyIsIl9hcHBseURlY3MyMjAzUiIsImNhY2hlcyIsInZhbHVlIiwiZmlsZXMiLCJyZWNvcmRzIiwic2VhcmNoZXMiLCJ0YXNrU3RhdHVzZXMiLCJlIiwiZGF0ZUZvcm1hdCIsImNhY2hlIiwibmFtZSIsInNjb3BlIiwiZmlsZSIsImlkIiwiZm9sZGVyIiwicmVjb3JkIiwidHlwZSIsInNlYXJjaCIsInNlYXJjaElkIiwidGl0bGUiLCJ0YXNrIiwicmVzZXQiLCJvdXRwdXRBdWRpdExvZ3MiLCJvdXRwdXREZWJ1Z0xvZ3MiLCJvdXRwdXRFbWVyZ2VuY3lMb2dzIiwib3V0cHV0RXJyb3JMb2dzIiwiY3VycmVudFNjcmlwdCIsImN1cnJlbnRVc2VyIiwiY3VycmVudFNlc3Npb24iLCJmZWF0dXJlcyIsInNlbnRFbWFpbHMiLCJjbGVhciIsInNhdmVkRmlsZXMiLCJjcmVhdGVkRmlsZXMiLCJkZWxldGVkRmlsZXMiLCJzYXZlZFJlY29yZHMiLCJjcmVhdGVkUmVjb3JkcyIsImRlbGV0ZWRSZWNvcmRzIiwicnVuU2VhcmNoZXMiLCJzZWFyY2hSZXN1bHRzIiwibG9va3VwRmllbGRzUmVzdWx0cyIsInN1Ym1pdHRlZFRhc2tzIiwibG9ncyIsImRpYWxvZ3MiLCJkaWFsb2dSZXN1bHRzIiwibWVzc2FnZXMiLCJnZW5lcmF0ZUJ5dGVzUmVzdWx0cyIsImdlbmVyYXRlSW50UmVzdWx0cyIsImdlbmVyYXRlVVVJRFJlc3VsdHMiLCJzdHVicyIsImN1c3RvbVN0dWJzIiwibW9kdWxlIiwicGF0aCIsImNvbnN0cnVjdG9yIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3VpdGVDbG91ZEplc3RTdHVicyA9IHJlcXVpcmUoXCJzdWl0ZWNsb3VkLXVuaXQtdGVzdGluZy1zdHVic1wiKTtcbmNvbnN0IEtleWVkU2V0ID0gcmVxdWlyZShcIi4va2V5ZWQtc2V0LmNqc1wiKTtcbmNvbnN0IHsgYWRkS2V5ZWRTZXRHZXRTZXQsIGNyZWF0ZVVzZXJFdmVudENvbnRleHQsIFVzZXJFdmVudFR5cGUgfSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMuY2pzXCIpO1xuXG5jb25zdCBiYXNlTW9ja1BhdGggPSBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzXCI7XG5cbmNsYXNzIFN1aXRlU2NyaXB0TW9ja3Mge1xuXHRkYXRlRm9ybWF0ID0gXCJNL2QveXl5eVwiO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCNjYWNoZXMgPSBuZXcgS2V5ZWRTZXQoKGNhY2hlKSA9PiBbY2FjaGUubmFtZSwgY2FjaGUuc2NvcGVdKTtcblxuXHRAYWRkS2V5ZWRTZXRHZXRTZXQoKVxuXHQjZmlsZXMgPSBuZXcgS2V5ZWRTZXQoXG5cdFx0KGZpbGUpID0+IGZpbGUuaWQsXG5cdFx0KGZpbGUpID0+IFtmaWxlLmZvbGRlciwgZmlsZS5uYW1lXSxcblx0KTtcblxuXHRAYWRkS2V5ZWRTZXRHZXRTZXQoKVxuXHQjcmVjb3JkcyA9IG5ldyBLZXllZFNldCgocmVjb3JkKSA9PiBbcmVjb3JkLmlkLCByZWNvcmQudHlwZV0pO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCNzZWFyY2hlcyA9IG5ldyBLZXllZFNldChcblx0XHQoc2VhcmNoKSA9PiBzZWFyY2guaWQsXG5cdFx0KHNlYXJjaCkgPT4gc2VhcmNoLnNlYXJjaElkLFxuXHRcdChzZWFyY2gpID0+IHNlYXJjaC50aXRsZSxcblx0KTtcblxuXHRAYWRkS2V5ZWRTZXRHZXRTZXQoKVxuXHQjdGFza1N0YXR1c2VzID0gbmV3IEtleWVkU2V0KCh0YXNrKSA9PiB0YXNrLmlkKTtcblxuXHRyZXNldCA9ICgpID0+IHtcblx0XHR0aGlzLm91dHB1dEF1ZGl0TG9ncyA9IGZhbHNlO1xuXHRcdHRoaXMub3V0cHV0RGVidWdMb2dzID0gZmFsc2U7XG5cdFx0dGhpcy5vdXRwdXRFbWVyZ2VuY3lMb2dzID0gZmFsc2U7XG5cdFx0dGhpcy5vdXRwdXRFcnJvckxvZ3MgPSBmYWxzZTtcblxuXHRcdHRoaXMuY3VycmVudFNjcmlwdCA9IHt9O1xuXHRcdHRoaXMuY3VycmVudFVzZXIgPSB7fTtcblx0XHR0aGlzLmN1cnJlbnRTZXNzaW9uID0ge307XG5cdFx0dGhpcy5mZWF0dXJlcyA9IHt9O1xuXG5cdFx0dGhpcy5zZW50RW1haWxzID0gW107XG5cblx0XHR0aGlzLiNjYWNoZXMuY2xlYXIoKTtcblxuXHRcdHRoaXMuI2ZpbGVzLmNsZWFyKCk7XG5cdFx0dGhpcy5zYXZlZEZpbGVzID0gW107XG5cdFx0dGhpcy5jcmVhdGVkRmlsZXMgPSBbXTtcblx0XHR0aGlzLmRlbGV0ZWRGaWxlcyA9IFtdO1xuXG5cdFx0dGhpcy4jcmVjb3Jkcy5jbGVhcigpO1xuXHRcdHRoaXMuc2F2ZWRSZWNvcmRzID0gW107XG5cdFx0dGhpcy5jcmVhdGVkUmVjb3JkcyA9IFtdO1xuXHRcdHRoaXMuZGVsZXRlZFJlY29yZHMgPSBbXTtcblxuXHRcdHRoaXMuI3NlYXJjaGVzLmNsZWFyKCk7XG5cdFx0dGhpcy5ydW5TZWFyY2hlcyA9IFtdO1xuXHRcdHRoaXMuc2VhcmNoUmVzdWx0cyA9IFtdO1xuXHRcdHRoaXMubG9va3VwRmllbGRzUmVzdWx0cyA9IFtdO1xuXG5cdFx0dGhpcy4jdGFza1N0YXR1c2VzLmNsZWFyKCk7XG5cdFx0dGhpcy5zdWJtaXR0ZWRUYXNrcyA9IFtdO1xuXG5cdFx0dGhpcy5sb2dzID0gW107XG5cblx0XHR0aGlzLmRpYWxvZ3MgPSBbXTtcblx0XHR0aGlzLmRpYWxvZ1Jlc3VsdHMgPSBbXTtcblxuXHRcdHRoaXMubWVzc2FnZXMgPSBbXTtcblxuXHRcdHRoaXMuZ2VuZXJhdGVCeXRlc1Jlc3VsdHMgPSBbXTtcblx0XHR0aGlzLmdlbmVyYXRlSW50UmVzdWx0cyA9IFtdO1xuXHRcdHRoaXMuZ2VuZXJhdGVVVUlEUmVzdWx0cyA9IFtdO1xuXHR9O1xuXG5cdGNyZWF0ZVVzZXJFdmVudENvbnRleHQgPSBjcmVhdGVVc2VyRXZlbnRDb250ZXh0O1xuXHRVc2VyRXZlbnRUeXBlID0gVXNlckV2ZW50VHlwZTtcblxuXHRzdHVicyA9IFtcblx0XHQuLi5TdWl0ZUNsb3VkSmVzdFN0dWJzLmN1c3RvbVN0dWJzLFxuXHRcdHsgbW9kdWxlOiBcIk4vY2FjaGVcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS9jYWNoZS9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9jb25maWdcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS9jb25maWcvaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vY3J5cHRvL3JhbmRvbVwiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L2NyeXB0by9yYW5kb20vaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vZW1haWxcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS9lbWFpbC9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9lbmNvZGVcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS9lbmNvZGUvaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vZmlsZVwiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L2ZpbGUvaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vbG9nXCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vbG9nL2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL3JlY29yZFwiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L3JlY29yZC9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9ydW50aW1lXCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vcnVudGltZS9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9zZWFyY2hcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS9zZWFyY2gvaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vdGFza1wiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L3Rhc2svaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vdWkvZGlhbG9nXCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vdWkvZGlhbG9nL2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL3VpL21lc3NhZ2VcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS91aS9tZXNzYWdlL2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL3VpL3NlcnZlcldpZGdldFwiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L3VpL3NlcnZlcldpZGdldC9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi91cmxcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS91cmwvaW5kZXguY2pzYCB9LFxuXHRdO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMucmVzZXQoKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTdWl0ZVNjcmlwdE1vY2tzKCk7XG4iXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU1BLG1CQUFtQixHQUFHQyxPQUFPLENBQUMsK0JBQStCLENBQUM7QUFDcEUsTUFBTUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDM0MsTUFBTTtFQUFFRSxpQkFBaUI7RUFBRUMsc0JBQXNCO0VBQUVDO0FBQWMsQ0FBQyxHQUFHSixPQUFPLENBQUMsZUFBZSxDQUFDO0FBRTdGLE1BQU1LLFlBQVksR0FBRyxvREFBb0Q7QUFBQ0MsSUFBQSxHQUt4RUosaUJB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