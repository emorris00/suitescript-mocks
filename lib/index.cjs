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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWl0ZUNsb3VkSmVzdFN0dWJzIiwicmVxdWlyZSIsIktleWVkU2V0IiwiYWRkS2V5ZWRTZXRHZXRTZXQiLCJjcmVhdGVVc2VyRXZlbnRDb250ZXh0IiwiVXNlckV2ZW50VHlwZSIsImJhc2VNb2NrUGF0aCIsIl9kZWMiLCJfZGVjMiIsIl9kZWMzIiwiX2RlYzQiLCJfZGVjNSIsIlN1aXRlU2NyaXB0TW9ja3MiLCJfaW5pdF9jYWNoZXMiLCJfaW5pdF9maWxlcyIsIl9pbml0X3JlY29yZHMiLCJfaW5pdF9zZWFyY2hlcyIsIl9pbml0X3Rhc2tTdGF0dXNlcyIsIl9hcHBseURlY3MyMjAzUiIsImNhY2hlcyIsInZhbHVlIiwiZmlsZXMiLCJyZWNvcmRzIiwic2VhcmNoZXMiLCJ0YXNrU3RhdHVzZXMiLCJlIiwiZGF0ZUZvcm1hdCIsImNhY2hlIiwibmFtZSIsInNjb3BlIiwiZmlsZSIsImlkIiwiZm9sZGVyIiwicmVjb3JkIiwidHlwZSIsInNlYXJjaCIsInNlYXJjaElkIiwidGl0bGUiLCJ0YXNrIiwicmVzZXQiLCJvdXRwdXRBdWRpdExvZ3MiLCJvdXRwdXREZWJ1Z0xvZ3MiLCJvdXRwdXRFbWVyZ2VuY3lMb2dzIiwib3V0cHV0RXJyb3JMb2dzIiwiY3VycmVudFNjcmlwdCIsImN1cnJlbnRVc2VyIiwiY3VycmVudFNlc3Npb24iLCJmZWF0dXJlcyIsInNlbnRFbWFpbHMiLCJjbGVhciIsInNhdmVkRmlsZXMiLCJjcmVhdGVkRmlsZXMiLCJkZWxldGVkRmlsZXMiLCJzYXZlZFJlY29yZHMiLCJjcmVhdGVkUmVjb3JkcyIsImRlbGV0ZWRSZWNvcmRzIiwicnVuU2VhcmNoZXMiLCJzZWFyY2hSZXN1bHRzIiwibG9va3VwRmllbGRzUmVzdWx0cyIsInN1Ym1pdHRlZFRhc2tzIiwibG9ncyIsInN0dWJzIiwiY3VzdG9tU3R1YnMiLCJtb2R1bGUiLCJwYXRoIiwiY29uc3RydWN0b3IiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTdWl0ZUNsb3VkSmVzdFN0dWJzID0gcmVxdWlyZShcInN1aXRlY2xvdWQtdW5pdC10ZXN0aW5nLXN0dWJzXCIpO1xuY29uc3QgS2V5ZWRTZXQgPSByZXF1aXJlKFwiLi9rZXllZC1zZXQuY2pzXCIpO1xuY29uc3QgeyBhZGRLZXllZFNldEdldFNldCwgY3JlYXRlVXNlckV2ZW50Q29udGV4dCwgVXNlckV2ZW50VHlwZSB9ID0gcmVxdWlyZShcIi4vaGVscGVycy5janNcIik7XG5cbmNvbnN0IGJhc2VNb2NrUGF0aCA9IFwiPHJvb3REaXI+L25vZGVfbW9kdWxlcy9zdWl0ZXNjcmlwdC1tb2Nrcy9saWIvbW9ja3NcIjtcblxuY2xhc3MgU3VpdGVTY3JpcHRNb2NrcyB7XG5cdGRhdGVGb3JtYXQgPSBcIk0vZC95eXl5XCI7XG5cblx0QGFkZEtleWVkU2V0R2V0U2V0KClcblx0I2NhY2hlcyA9IG5ldyBLZXllZFNldCgoY2FjaGUpID0+IFtjYWNoZS5uYW1lLCBjYWNoZS5zY29wZV0pO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCNmaWxlcyA9IG5ldyBLZXllZFNldChcblx0XHQoZmlsZSkgPT4gZmlsZS5pZCxcblx0XHQoZmlsZSkgPT4gW2ZpbGUuZm9sZGVyLCBmaWxlLm5hbWVdLFxuXHQpO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCNyZWNvcmRzID0gbmV3IEtleWVkU2V0KChyZWNvcmQpID0+IFtyZWNvcmQuaWQsIHJlY29yZC50eXBlXSk7XG5cblx0QGFkZEtleWVkU2V0R2V0U2V0KClcblx0I3NlYXJjaGVzID0gbmV3IEtleWVkU2V0KFxuXHRcdChzZWFyY2gpID0+IHNlYXJjaC5pZCxcblx0XHQoc2VhcmNoKSA9PiBzZWFyY2guc2VhcmNoSWQsXG5cdFx0KHNlYXJjaCkgPT4gc2VhcmNoLnRpdGxlLFxuXHQpO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCN0YXNrU3RhdHVzZXMgPSBuZXcgS2V5ZWRTZXQoKHRhc2spID0+IHRhc2suaWQpO1xuXG5cdHJlc2V0ID0gKCkgPT4ge1xuXHRcdHRoaXMub3V0cHV0QXVkaXRMb2dzID0gZmFsc2U7XG5cdFx0dGhpcy5vdXRwdXREZWJ1Z0xvZ3MgPSBmYWxzZTtcblx0XHR0aGlzLm91dHB1dEVtZXJnZW5jeUxvZ3MgPSBmYWxzZTtcblx0XHR0aGlzLm91dHB1dEVycm9yTG9ncyA9IGZhbHNlO1xuXG5cdFx0dGhpcy5jdXJyZW50U2NyaXB0ID0ge307XG5cdFx0dGhpcy5jdXJyZW50VXNlciA9IHt9O1xuXHRcdHRoaXMuY3VycmVudFNlc3Npb24gPSB7fTtcblx0XHR0aGlzLmZlYXR1cmVzID0ge307XG5cblx0XHR0aGlzLnNlbnRFbWFpbHMgPSBbXTtcblxuXHRcdHRoaXMuI2NhY2hlcy5jbGVhcigpO1xuXG5cdFx0dGhpcy4jZmlsZXMuY2xlYXIoKTtcblx0XHR0aGlzLnNhdmVkRmlsZXMgPSBbXTtcblx0XHR0aGlzLmNyZWF0ZWRGaWxlcyA9IFtdO1xuXHRcdHRoaXMuZGVsZXRlZEZpbGVzID0gW107XG5cblx0XHR0aGlzLiNyZWNvcmRzLmNsZWFyKCk7XG5cdFx0dGhpcy5zYXZlZFJlY29yZHMgPSBbXTtcblx0XHR0aGlzLmNyZWF0ZWRSZWNvcmRzID0gW107XG5cdFx0dGhpcy5kZWxldGVkUmVjb3JkcyA9IFtdO1xuXG5cdFx0dGhpcy4jc2VhcmNoZXMuY2xlYXIoKTtcblx0XHR0aGlzLnJ1blNlYXJjaGVzID0gW107XG5cdFx0dGhpcy5zZWFyY2hSZXN1bHRzID0gW107XG5cdFx0dGhpcy5sb29rdXBGaWVsZHNSZXN1bHRzID0gW107XG5cblx0XHR0aGlzLiN0YXNrU3RhdHVzZXMuY2xlYXIoKTtcblx0XHR0aGlzLnN1Ym1pdHRlZFRhc2tzID0gW107XG5cblx0XHR0aGlzLmxvZ3MgPSBbXTtcblx0fTtcblxuXHRjcmVhdGVVc2VyRXZlbnRDb250ZXh0ID0gY3JlYXRlVXNlckV2ZW50Q29udGV4dDtcblx0VXNlckV2ZW50VHlwZSA9IFVzZXJFdmVudFR5cGU7XG5cblx0c3R1YnMgPSBbXG5cdFx0Li4uU3VpdGVDbG91ZEplc3RTdHVicy5jdXN0b21TdHVicyxcblx0XHR7IG1vZHVsZTogXCJOL2NhY2hlXCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vY2FjaGUvaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vY29uZmlnXCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vY29uZmlnL2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL2VtYWlsXCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vZW1haWwvaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vZW5jb2RlXCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vZW5jb2RlL2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL2ZpbGVcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS9maWxlL2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL2xvZ1wiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L2xvZy9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9yZWNvcmRcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS9yZWNvcmQvaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vcnVudGltZVwiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L3J1bnRpbWUvaW5kZXguY2pzYCB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vc2VhcmNoXCIsIHBhdGg6IGAke2Jhc2VNb2NrUGF0aH0vc2VhcmNoL2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL3Rhc2tcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS90YXNrL2luZGV4LmNqc2AgfSxcblx0XHR7IG1vZHVsZTogXCJOL3VpL3NlcnZlcldpZGdldFwiLCBwYXRoOiBgJHtiYXNlTW9ja1BhdGh9L3VpL3NlcnZlcldpZGdldC9pbmRleC5janNgIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi91cmxcIiwgcGF0aDogYCR7YmFzZU1vY2tQYXRofS91cmwvaW5kZXguY2pzYCB9LFxuXHRdO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMucmVzZXQoKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTdWl0ZVNjcmlwdE1vY2tzKCk7XG4iXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU1BLG1CQUFtQixHQUFHQyxPQUFPLENBQUMsK0JBQStCLENBQUM7QUFDcEUsTUFBTUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDM0MsTUFBTTtFQUFFRSxpQkFBaUI7RUFBRUMsc0JBQXNCO0VBQUVDO0FBQWMsQ0FBQyxHQUFHSixPQUFPLENBQUMsZUFBZSxDQUFDO0FBRTdGLE1BQU1LLFlBQVksR0FBRyxvREFBb0Q7QUFBQ0MsSUFBQSxHQUt4RUosaUJBQWlCLENBQUMsQ0FBQztBQUFBSyxLQUFBLEdBR25CTCxpQkFBaUIsQ0FBQyxDQUFDO0FBQUFNLEtBQUEsR0FNbkJOLGlCQUFpQixDQUFDLENBQUM7QUFBQU8sS0FBQSxHQUduQlAsaUJBQWlCLENBQUMsQ0FBQztBQUFBUSxLQUFBLEdBT25CUixpQkFBaUIsQ0FBQyxDQUFDO0FBdEJyQixNQUFNUyxnQkFBZ0IsQ0FBQztFQUFBO0lBQUEsQ0FBQUMsWUFBQSxFQUFBQyxXQUFBLEVBQUFDLGFBQUEsRUFBQUMsY0FBQSxFQUFBQyxrQkFBQSxJQUFBQyxlQUFBLFNBQUFYLElBQUE7TUFBQSxZQUl0QixDQUFDWSxNQUFNO0lBQUEsYUFBQUMsS0FBQTtNQUFBLEtBQVAsQ0FBQ0QsTUFBTSxHQUFBQyxLQUFBO0lBQUEsS0FBQVosS0FBQTtNQUFBLFlBR1AsQ0FBQ2EsS0FBSztJQUFBLGFBQUFELEtBQUE7TUFBQSxLQUFOLENBQUNDLEtBQUssR0FBQUQsS0FBQTtJQUFBLEtBQUFYLEtBQUE7TUFBQSxZQU1OLENBQUNhLE9BQU87SUFBQSxhQUFBRixLQUFBO01BQUEsS0FBUixDQUFDRSxPQUFPLEdBQUFGLEtBQUE7SUFBQSxLQUFBVixLQUFBO01BQUEsWUFHUixDQUFDYSxRQUFRO0lBQUEsYUFBQUgsS0FBQTtNQUFBLEtBQVQsQ0FBQ0csUUFBUSxHQUFBSCxLQUFBO0lBQUEsS0FBQVQsS0FBQTtNQUFBLFlBT1QsQ0FBQ2EsWUFBWTtJQUFBLGFBQUFKLEtBQUE7TUFBQSxLQUFiLENBQUNJLFlBQVksR0FBQUosS0FBQTtJQUFBLFNBQUFLLENBQUE7RUFBQTtFQXRCYkMsVUFBVSxHQUFHLFVBQVU7RUFHdkIsQ0FBQ1AsTUFBTSxHQUFBTixZQUFBLE9BQUcsSUFBSVgsUUFBUSxDQUFFeUIsS0FBSyxJQUFLLENBQUNBLEtBQUssQ0FBQ0MsSUFBSSxFQUFFRCxLQUFLLENBQUNFLEtBQUssQ0FBQyxDQUFDO0VBRzVELENBQUNSLEtBQUssR0FBQVAsV0FBQSxPQUFHLElBQUlaLFFBQVEsQ0FDbkI0QixJQUFJLElBQUtBLElBQUksQ0FBQ0MsRUFBRSxFQUNoQkQsSUFBSSxJQUFLLENBQUNBLElBQUksQ0FBQ0UsTUFBTSxFQUFFRixJQUFJLENBQUNGLElBQUksQ0FDbEMsQ0FBQztFQUdELENBQUNOLE9BQU8sR0FBQVAsYUFBQSxPQUFHLElBQUliLFFBQVEsQ0FBRStCLE1BQU0sSUFBSyxDQUFDQSxNQUFNLENBQUNGLEVBQUUsRUFBRUUsTUFBTSxDQUFDQyxJQUFJLENBQUMsQ0FBQztFQUc3RCxDQUFDWCxRQUFRLEdBQUFQLGNBQUEsT0FBRyxJQUFJZCxRQUFRLENBQ3RCaUMsTUFBTSxJQUFLQSxNQUFNLENBQUNKLEVBQUUsRUFDcEJJLE1BQU0sSUFBS0EsTUFBTSxDQUFDQyxRQUFRLEVBQzFCRCxNQUFNLElBQUtBLE1BQU0sQ0FBQ0UsS0FDcEIsQ0FBQztFQUdELENBQUNiLFlBQVksR0FBQVAsa0JBQUEsT0FBRyxJQUFJZixRQUFRLENBQUVvQyxJQUFJLElBQUtBLElBQUksQ0FBQ1AsRUFBRSxDQUFDO0VBRS9DUSxLQUFLLEdBQUdBLENBQUEsS0FBTTtJQUNiLElBQUksQ0FBQ0MsZUFBZSxHQUFHLEtBQUs7SUFDNUIsSUFBSSxDQUFDQyxlQUFlLEdBQUcsS0FBSztJQUM1QixJQUFJLENBQUNDLG1CQUFtQixHQUFHLEtBQUs7SUFDaEMsSUFBSSxDQUFDQyxlQUFlLEdBQUcsS0FBSztJQUU1QixJQUFJLENBQUNDLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDdkIsSUFBSSxDQUFDQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLElBQUksQ0FBQ0MsY0FBYyxHQUFHLENBQUMsQ0FBQztJQUN4QixJQUFJLENBQUNDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFFbEIsSUFBSSxDQUFDQyxVQUFVLEdBQUcsRUFBRTtJQUVwQixJQUFJLENBQUMsQ0FBQzdCLE1BQU0sQ0FBQzhCLEtBQUssQ0FBQyxDQUFDO0lBRXBCLElBQUksQ0FBQyxDQUFDNUIsS0FBSyxDQUFDNEIsS0FBSyxDQUFDLENBQUM7SUFDbkIsSUFBSSxDQUFDQyxVQUFVLEdBQUcsRUFBRTtJQUNwQixJQUFJLENBQUNDLFlBQVksR0FBRyxFQUFFO0lBQ3RCLElBQUksQ0FBQ0MsWUFBWSxHQUFHLEVBQUU7SUFFdEIsSUFBSSxDQUFDLENBQUM5QixPQUFPLENBQUMyQixLQUFLLENBQUMsQ0FBQztJQUNyQixJQUFJLENBQUNJLFlBQVksR0FBRyxFQUFFO0lBQ3RCLElBQUksQ0FBQ0MsY0FBYyxHQUFHLEVBQUU7SUFDeEIsSUFBSSxDQUFDQyxjQUFjLEdBQUcsRUFBRTtJQUV4QixJQUFJLENBQUMsQ0FBQ2hDLFFBQVEsQ0FBQzBCLEtBQUssQ0FBQyxDQUFDO0lBQ3RCLElBQUksQ0FBQ08sV0FBVyxHQUFHLEVBQUU7SUFDckIsSUFBSSxDQUFDQyxhQUFhLEdBQUcsRUFBRTtJQUN2QixJQUFJLENBQUNDLG1CQUFtQixHQUFHLEVBQUU7SUFFN0IsSUFBSSxDQUFDLENBQUNsQyxZQUFZLENBQUN5QixLQUFLLENBQUMsQ0FBQztJQUMxQixJQUFJLENBQUNVLGNBQWMsR0FBRyxFQUFFO0lBRXhCLElBQUksQ0FBQ0MsSUFBSSxHQUFHLEVBQUU7RUFDZixDQUFDO0VBRUR4RCxzQkFBc0IsR0FBR0Esc0JBQXNCO0VBQy9DQyxhQUFhLEdBQUdBLGFBQWE7RUFFN0J3RCxLQUFLLEdBQUcsQ0FDUCxHQUFHN0QsbUJBQW1CLENBQUM4RCxXQUFXLEVBQ2xDO0lBQUVDLE1BQU0sRUFBRSxTQUFTO0lBQUVDLElBQUksRUFBRyxHQUFFMUQsWUFBYTtFQUFrQixDQUFDLEVBQzlEO0lBQUV5RCxNQUFNLEVBQUUsVUFBVTtJQUFFQyxJQUFJLEVBQUcsR0FBRTFELFlBQWE7RUFBbUIsQ0FBQyxFQUNoRTtJQUFFeUQsTUFBTSxFQUFFLFNBQVM7SUFBRUMsSUFBSSxFQUFHLEdBQUUxRCxZQUFhO0VBQWtCLENBQUMsRUFDOUQ7SUFBRXlELE1BQU0sRUFBRSxVQUFVO0lBQUVDLElBQUksRUFBRyxHQUFFMUQsWUFBYTtFQUFtQixDQUFDLEVBQ2hFO0lBQUV5RCxNQUFNLEVBQUUsUUFBUTtJQUFFQyxJQUFJLEVBQUcsR0FBRTFELFlBQWE7RUFBaUIsQ0FBQyxFQUM1RDtJQUFFeUQsTUFBTSxFQUFFLE9BQU87SUFBRUMsSUFBSSxFQUFHLEdBQUUxRCxZQUFhO0VBQWdCLENBQUMsRUFDMUQ7SUFBRXlELE1BQU0sRUFBRSxVQUFVO0lBQUVDLElBQUksRUFBRyxHQUFFMUQsWUFBYTtFQUFtQixDQUFDLEVBQ2hFO0lBQUV5RCxNQUFNLEVBQUUsV0FBVztJQUFFQyxJQUFJLEVBQUcsR0FBRTFELFlBQWE7RUFBb0IsQ0FBQyxFQUNsRTtJQUFFeUQsTUFBTSxFQUFFLFVBQVU7SUFBRUMsSUFBSSxFQUFHLEdBQUUxRCxZQUFhO0VBQW1CLENBQUMsRUFDaEU7SUFBRXlELE1BQU0sRUFBRSxRQUFRO0lBQUVDLElBQUksRUFBRyxHQUFFMUQsWUFBYTtFQUFpQixDQUFDLEVBQzVEO0lBQUV5RCxNQUFNLEVBQUUsbUJBQW1CO0lBQUVDLElBQUksRUFBRyxHQUFFMUQsWUFBYTtFQUE0QixDQUFDLEVBQ2xGO0lBQUV5RCxNQUFNLEVBQUUsT0FBTztJQUFFQyxJQUFJLEVBQUcsR0FBRTFELFlBQWE7RUFBZ0IsQ0FBQyxDQUMxRDtFQUVEMkQsV0FBV0EsQ0FBQSxFQUFHO0lBQ2IsSUFBSSxDQUFDMUIsS0FBSyxDQUFDLENBQUM7RUFDYjtBQUNEO0FBRUF3QixNQUFNLENBQUNHLE9BQU8sR0FBRyxJQUFJdEQsZ0JBQWdCLENBQUMsQ0FBQyJ9