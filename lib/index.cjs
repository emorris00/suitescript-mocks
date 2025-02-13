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
const RuntimeScript = require("./mocks/runtime/Script.cjs");
const RuntimeUser = require("./mocks/runtime/User.cjs");
const RuntimeSession = require("./mocks/runtime/Session.cjs");
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
    this.currentScript = new RuntimeScript();
    this.currentUser = new RuntimeUser();
    this.currentSession = new RuntimeSession();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWl0ZUNsb3VkSmVzdFN0dWJzIiwicmVxdWlyZSIsIktleWVkU2V0IiwiYWRkS2V5ZWRTZXRHZXRTZXQiLCJjcmVhdGVVc2VyRXZlbnRDb250ZXh0IiwiVXNlckV2ZW50VHlwZSIsIlJ1bnRpbWVTY3JpcHQiLCJSdW50aW1lVXNlciIsIlJ1bnRpbWVTZXNzaW9uIiwiYmFzZU1vY2tQYXRoIiwiX2RlYyIsIl9kZWMyIiwiX2RlYzMiLCJfZGVjNCIsIl9kZWM1IiwiU3VpdGVTY3JpcHRNb2NrcyIsIl9pbml0X2NhY2hlcyIsIl9pbml0X2ZpbGVzIiwiX2luaXRfcmVjb3JkcyIsIl9pbml0X3NlYXJjaGVzIiwiX2luaXRfdGFza1N0YXR1c2VzIiwiX2FwcGx5RGVjczIyMDNSIiwiY2FjaGVzIiwidmFsdWUiLCJmaWxlcyIsInJlY29yZHMiLCJzZWFyY2hlcyIsInRhc2tTdGF0dXNlcyIsImUiLCJkYXRlRm9ybWF0IiwiY2FjaGUiLCJuYW1lIiwic2NvcGUiLCJmaWxlIiwiaWQiLCJmb2xkZXIiLCJyZWNvcmQiLCJ0eXBlIiwic2VhcmNoIiwic2VhcmNoSWQiLCJ0aXRsZSIsInRhc2siLCJyZXNldCIsIm91dHB1dEF1ZGl0TG9ncyIsIm91dHB1dERlYnVnTG9ncyIsIm91dHB1dEVtZXJnZW5jeUxvZ3MiLCJvdXRwdXRFcnJvckxvZ3MiLCJjdXJyZW50U2NyaXB0IiwiY3VycmVudFVzZXIiLCJjdXJyZW50U2Vzc2lvbiIsImZlYXR1cmVzIiwic2VudEVtYWlscyIsImNsZWFyIiwic2F2ZWRGaWxlcyIsImNyZWF0ZWRGaWxlcyIsImRlbGV0ZWRGaWxlcyIsInNhdmVkUmVjb3JkcyIsImNyZWF0ZWRSZWNvcmRzIiwiZGVsZXRlZFJlY29yZHMiLCJydW5TZWFyY2hlcyIsInNlYXJjaFJlc3VsdHMiLCJsb29rdXBGaWVsZHNSZXN1bHRzIiwic3VibWl0dGVkVGFza3MiLCJsb2dzIiwiZGlhbG9ncyIsImRpYWxvZ1Jlc3VsdHMiLCJtZXNzYWdlcyIsImdlbmVyYXRlQnl0ZXNSZXN1bHRzIiwiZ2VuZXJhdGVJbnRSZXN1bHRzIiwiZ2VuZXJhdGVVVUlEUmVzdWx0cyIsInN0dWJzIiwiY3VzdG9tU3R1YnMiLCJtb2R1bGUiLCJwYXRoIiwiY29uc3RydWN0b3IiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTdWl0ZUNsb3VkSmVzdFN0dWJzID0gcmVxdWlyZShcInN1aXRlY2xvdWQtdW5pdC10ZXN0aW5nLXN0dWJzXCIpO1xuY29uc3QgS2V5ZWRTZXQgPSByZXF1aXJlKFwiLi9rZXllZC1zZXQuY2pzXCIpO1xuY29uc3QgeyBhZGRLZXllZFNldEdldFNldCwgY3JlYXRlVXNlckV2ZW50Q29udGV4dCwgVXNlckV2ZW50VHlwZSB9ID0gcmVxdWlyZShcIi4vaGVscGVycy5janNcIik7XG5jb25zdCBSdW50aW1lU2NyaXB0ID0gcmVxdWlyZShcIi4vbW9ja3MvcnVudGltZS9TY3JpcHQuY2pzXCIpO1xuY29uc3QgUnVudGltZVVzZXIgPSByZXF1aXJlKFwiLi9tb2Nrcy9ydW50aW1lL1VzZXIuY2pzXCIpO1xuY29uc3QgUnVudGltZVNlc3Npb24gPSByZXF1aXJlKFwiLi9tb2Nrcy9ydW50aW1lL1Nlc3Npb24uY2pzXCIpO1xuXG5jb25zdCBiYXNlTW9ja1BhdGggPSBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzXCI7XG5cbmNsYXNzIFN1aXRlU2NyaXB0TW9ja3Mge1xuXHRkYXRlRm9ybWF0ID0gXCJNL2QveXl5eVwiO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCNjYWNoZXMgPSBuZXcgS2V5ZWRTZXQoKGNhY2hlKSA9PiBbY2FjaGUubmFtZSwgY2FjaGUuc2NvcGVdKTtcblxuXHRAYWRkS2V5ZWRTZXRHZXRTZXQoKVxuXHQjZmlsZXMgPSBuZXcgS2V5ZWRTZXQoXG5cdFx0KGZpbGUpID0+IGZpbGUuaWQsXG5cdFx0KGZpbGUpID0+IFtmaWxlLmZvbGRlciwgZmlsZS5uYW1lXSxcblx0KTtcblxuXHRAYWRkS2V5ZWRTZXRHZXRTZXQoKVxuXHQjcmVjb3JkcyA9IG5ldyBLZXllZFNldCgocmVjb3JkKSA9PiBbcmVjb3JkLmlkLCByZWNvcmQudHlwZV0pO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCNzZWFyY2hlcyA9IG5ldyBLZXllZFNldChcblx0XHQoc2VhcmNoKSA9PiBzZWFyY2guaWQsXG5cdFx0KHNlYXJjaCkgPT4gc2VhcmNoLnNlYXJjaElkLFxuXHRcdChzZWFyY2gpID0+IHNlYXJjaC50aXRsZSxcblx0KTtcblxuXHRAYWRkS2V5ZWRTZXRHZXRTZXQoKVxuXHQjdGFza1N0YXR1c2VzID0gbmV3IEtleWVkU2V0KCh0YXNrKSA9PiB0YXNrLmlkKTtcblxuXHRyZXNldCA9ICgpID0+IHtcblx0XHR0aGlzLm91dHB1dEF1ZGl0TG9ncyA9IGZhbHNlO1xuXHRcdHRoaXMub3V0cHV0RGVidWdMb2dzID0gZmFsc2U7XG5cdFx0dGhpcy5vdXRwdXRFbWVyZ2VuY3lMb2dzID0gZmFsc2U7XG5cdFx0dGhpcy5vdXRwdXRFcnJvckxvZ3MgPSBmYWxzZTtcblxuXHRcdHRoaXMuY3VycmVudFNjcmlwdCA9IG5ldyBSdW50aW1lU2NyaXB0KCk7XG5cdFx0dGhpcy5jdXJyZW50VXNlciA9IG5ldyBSdW50aW1lVXNlcigpO1xuXHRcdHRoaXMuY3VycmVudFNlc3Npb24gPSBuZXcgUnVudGltZVNlc3Npb24oKTtcblx0XHR0aGlzLmZlYXR1cmVzID0ge307XG5cblx0XHR0aGlzLnNlbnRFbWFpbHMgPSBbXTtcblxuXHRcdHRoaXMuI2NhY2hlcy5jbGVhcigpO1xuXG5cdFx0dGhpcy4jZmlsZXMuY2xlYXIoKTtcblx0XHR0aGlzLnNhdmVkRmlsZXMgPSBbXTtcblx0XHR0aGlzLmNyZWF0ZWRGaWxlcyA9IFtdO1xuXHRcdHRoaXMuZGVsZXRlZEZpbGVzID0gW107XG5cblx0XHR0aGlzLiNyZWNvcmRzLmNsZWFyKCk7XG5cdFx0dGhpcy5zYXZlZFJlY29yZHMgPSBbXTtcblx0XHR0aGlzLmNyZWF0ZWRSZWNvcmRzID0gW107XG5cdFx0dGhpcy5kZWxldGVkUmVjb3JkcyA9IFtdO1xuXG5cdFx0dGhpcy4jc2VhcmNoZXMuY2xlYXIoKTtcblx0XHR0aGlzLnJ1blNlYXJjaGVzID0gW107XG5cdFx0dGhpcy5zZWFyY2hSZXN1bHRzID0gW107XG5cdFx0dGhpcy5sb29rdXBGaWVsZHNSZXN1bHRzID0gW107XG5cblx0XHR0aGlzLiN0YXNrU3RhdHVzZXMuY2xlYXIoKTtcblx0XHR0aGlzLnN1Ym1pdHRlZFRhc2tzID0gW107XG5cblx0XHR0aGlzLmxvZ3MgPSBbXTtcblxuXHRcdHRoaXMuZGlhbG9ncyA9IFtdO1xuXHRcdHRoaXMuZGlhbG9nUmVzdWx0cyA9IFtdO1xuXG5cdFx0dGhpcy5tZXNzYWdlcyA9IFtdO1xuXG5cdFx0dGhpcy5nZW5lcmF0ZUJ5dGVzUmVzdWx0cyA9IFtdO1xuXHRcdHRoaXMuZ2VuZXJhdGVJbnRSZXN1bHRzID0gW107XG5cdFx0dGhpcy5nZW5lcmF0ZVVVSURSZXN1bHRzID0gW107XG5cdH07XG5cblx0Y3JlYXRlVXNlckV2ZW50Q29udGV4dCA9IGNyZWF0ZVVzZXJFdmVudENvbnRleHQ7XG5cdFVzZXJFdmVudFR5cGUgPSBVc2VyRXZlbnRUeXBlO1xuXG5cdHN0dWJzID0gW1xuXHRcdC4uLlN1aXRlQ2xvdWRKZXN0U3R1YnMuY3VzdG9tU3R1YnMsXG5cdFx0eyBtb2R1bGU6IFwiTi9jYWNoZVwiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L2NhY2hlL2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL2NvbmZpZ1wiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L2NvbmZpZy9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9jcnlwdG8vcmFuZG9tXCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vY3J5cHRvL3JhbmRvbS9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9lbWFpbFwiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L2VtYWlsL2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL2VuY29kZVwiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L2VuY29kZS9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9maWxlXCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vZmlsZS9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9sb2dcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS9sb2cvaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vcmVjb3JkXCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vcmVjb3JkL2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL3J1bnRpbWVcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS9ydW50aW1lL2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL3NlYXJjaFwiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L3NlYXJjaC9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi90YXNrXCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vdGFzay9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi91aS9kaWFsb2dcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS91aS9kaWFsb2cvaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vdWkvbWVzc2FnZVwiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L3VpL21lc3NhZ2UvaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vdWkvc2VydmVyV2lkZ2V0XCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vdWkvc2VydmVyV2lkZ2V0L2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL3VybFwiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L3VybC9pbmRleC5janNgIH0sXG5cdF07XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHR9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