var _dec, _init_caches, _dec2, _init_records, _dec3, _init_searches, _dec4, _init_taskStatuses;
function createAddInitializerMethod(initializers, decoratorFinishedRef) { return function (initializer) { assertNotFinished(decoratorFinishedRef, "addInitializer"), assertCallable(initializer, "An initializer"), initializers.push(initializer); }; }
function memberDec(dec, name, desc, initializers, kind, isStatic, isPrivate, value) { var kindStr; switch (kind) { case 1: kindStr = "accessor"; break; case 2: kindStr = "method"; break; case 3: kindStr = "getter"; break; case 4: kindStr = "setter"; break; default: kindStr = "field"; } var get, set, ctx = { kind: kindStr, name: isPrivate ? "#" + name : name, static: isStatic, private: isPrivate }, decoratorFinishedRef = { v: !1 }; 0 !== kind && (ctx.addInitializer = createAddInitializerMethod(initializers, decoratorFinishedRef)), 0 === kind ? isPrivate ? (get = desc.get, set = desc.set) : (get = function () { return this[name]; }, set = function (v) { this[name] = v; }) : 2 === kind ? get = function () { return desc.value; } : (1 !== kind && 3 !== kind || (get = function () { return desc.get.call(this); }), 1 !== kind && 4 !== kind || (set = function (v) { desc.set.call(this, v); })), ctx.access = get && set ? { get: get, set: set } : get ? { get: get } : { set: set }; try { return dec(value, ctx); } finally { decoratorFinishedRef.v = !0; } }
function assertNotFinished(decoratorFinishedRef, fnName) { if (decoratorFinishedRef.v) throw new Error("attempted to call " + fnName + " after decoration was finished"); }
function assertCallable(fn, hint) { if ("function" != typeof fn) throw new TypeError(hint + " must be a function"); }
function assertValidReturnValue(kind, value) { var type = typeof value; if (1 === kind) { if ("object" !== type || null === value) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0"); void 0 !== value.get && assertCallable(value.get, "accessor.get"), void 0 !== value.set && assertCallable(value.set, "accessor.set"), void 0 !== value.init && assertCallable(value.init, "accessor.init"); } else if ("function" !== type) { var hint; throw hint = 0 === kind ? "field" : 10 === kind ? "class" : "method", new TypeError(hint + " decorators must return a function or void 0"); } }
function applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, initializers) { var desc, init, value, newValue, get, set, decs = decInfo[0]; if (isPrivate ? desc = 0 === kind || 1 === kind ? { get: decInfo[3], set: decInfo[4] } : 3 === kind ? { get: decInfo[3] } : 4 === kind ? { set: decInfo[3] } : { value: decInfo[3] } : 0 !== kind && (desc = Object.getOwnPropertyDescriptor(base, name)), 1 === kind ? value = { get: desc.get, set: desc.set } : 2 === kind ? value = desc.value : 3 === kind ? value = desc.get : 4 === kind && (value = desc.set), "function" == typeof decs) void 0 !== (newValue = memberDec(decs, name, desc, initializers, kind, isStatic, isPrivate, value)) && (assertValidReturnValue(kind, newValue), 0 === kind ? init = newValue : 1 === kind ? (init = newValue.init, get = newValue.get || value.get, set = newValue.set || value.set, value = { get: get, set: set }) : value = newValue);else for (var i = decs.length - 1; i >= 0; i--) { var newInit; if (void 0 !== (newValue = memberDec(decs[i], name, desc, initializers, kind, isStatic, isPrivate, value))) assertValidReturnValue(kind, newValue), 0 === kind ? newInit = newValue : 1 === kind ? (newInit = newValue.init, get = newValue.get || value.get, set = newValue.set || value.set, value = { get: get, set: set }) : value = newValue, void 0 !== newInit && (void 0 === init ? init = newInit : "function" == typeof init ? init = [init, newInit] : init.push(newInit)); } if (0 === kind || 1 === kind) { if (void 0 === init) init = function (instance, init) { return init; };else if ("function" != typeof init) { var ownInitializers = init; init = function (instance, init) { for (var value = init, i = 0; i < ownInitializers.length; i++) value = ownInitializers[i].call(instance, value); return value; }; } else { var originalInitializer = init; init = function (instance, init) { return originalInitializer.call(instance, init); }; } ret.push(init); } 0 !== kind && (1 === kind ? (desc.get = value.get, desc.set = value.set) : 2 === kind ? desc.value = value : 3 === kind ? desc.get = value : 4 === kind && (desc.set = value), isPrivate ? 1 === kind ? (ret.push(function (instance, args) { return value.get.call(instance, args); }), ret.push(function (instance, args) { return value.set.call(instance, args); })) : 2 === kind ? ret.push(value) : ret.push(function (instance, args) { return value.call(instance, args); }) : Object.defineProperty(base, name, desc)); }
function applyMemberDecs(ret, Class, decInfos) { for (var protoInitializers, staticInitializers, existingProtoNonFields = new Map(), existingStaticNonFields = new Map(), i = 0; i < decInfos.length; i++) { var decInfo = decInfos[i]; if (Array.isArray(decInfo)) { var base, initializers, kind = decInfo[1], name = decInfo[2], isPrivate = decInfo.length > 3, isStatic = kind >= 5; if (isStatic ? (base = Class, 0 !== (kind -= 5) && (initializers = staticInitializers = staticInitializers || [])) : (base = Class.prototype, 0 !== kind && (initializers = protoInitializers = protoInitializers || [])), 0 !== kind && !isPrivate) { var existingNonFields = isStatic ? existingStaticNonFields : existingProtoNonFields, existingKind = existingNonFields.get(name) || 0; if (!0 === existingKind || 3 === existingKind && 4 !== kind || 4 === existingKind && 3 !== kind) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + name); !existingKind && kind > 2 ? existingNonFields.set(name, kind) : existingNonFields.set(name, !0); } applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, initializers); } } pushInitializers(ret, protoInitializers), pushInitializers(ret, staticInitializers); }
function pushInitializers(ret, initializers) { initializers && ret.push(function (instance) { for (var i = 0; i < initializers.length; i++) initializers[i].call(instance); return instance; }); }
function applyClassDecs(ret, targetClass, classDecs) { if (classDecs.length > 0) { for (var initializers = [], newClass = targetClass, name = targetClass.name, i = classDecs.length - 1; i >= 0; i--) { var decoratorFinishedRef = { v: !1 }; try { var nextNewClass = classDecs[i](newClass, { kind: "class", name: name, addInitializer: createAddInitializerMethod(initializers, decoratorFinishedRef) }); } finally { decoratorFinishedRef.v = !0; } void 0 !== nextNewClass && (assertValidReturnValue(10, nextNewClass), newClass = nextNewClass); } ret.push(newClass, function () { for (var i = 0; i < initializers.length; i++) initializers[i].call(newClass); }); } }
function _applyDecs(targetClass, memberDecs, classDecs) { var ret = []; return applyMemberDecs(ret, targetClass, memberDecs), applyClassDecs(ret, targetClass, classDecs), ret; }
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
class SuiteScriptMocks {
  static {
    [_init_caches, _init_records, _init_searches, _init_taskStatuses] = _applyDecs(this, [[_dec, 0, "caches", function () {
      return this.#caches;
    }, function (value) {
      this.#caches = value;
    }], [_dec2, 0, "records", function () {
      return this.#records;
    }, function (value) {
      this.#records = value;
    }], [_dec3, 0, "searches", function () {
      return this.#searches;
    }, function (value) {
      this.#searches = value;
    }], [_dec4, 0, "taskStatuses", function () {
      return this.#taskStatuses;
    }, function (value) {
      this.#taskStatuses = value;
    }]], []);
  }
  dateFormat = "M/d/yyyy";
  #caches = _init_caches(this, new KeyedSet(cache => [cache.name, cache.scope]));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWl0ZUNsb3VkSmVzdFN0dWJzIiwicmVxdWlyZSIsIktleWVkU2V0IiwiYWRkS2V5ZWRTZXRHZXRTZXQiLCJjcmVhdGVVc2VyRXZlbnRDb250ZXh0IiwiVXNlckV2ZW50VHlwZSIsIlN1aXRlU2NyaXB0TW9ja3MiLCJjYWNoZXMiLCJyZWNvcmRzIiwic2VhcmNoZXMiLCJ0YXNrU3RhdHVzZXMiLCJkYXRlRm9ybWF0IiwiY2FjaGUiLCJuYW1lIiwic2NvcGUiLCJyZWNvcmQiLCJpZCIsInR5cGUiLCJzZWFyY2giLCJzZWFyY2hJZCIsInRpdGxlIiwidGFzayIsInJlc2V0Iiwib3V0cHV0QXVkaXRMb2dzIiwib3V0cHV0RGVidWdMb2dzIiwib3V0cHV0RW1lcmdlbmN5TG9ncyIsIm91dHB1dEVycm9yTG9ncyIsImN1cnJlbnRTY3JpcHQiLCJjdXJyZW50VXNlciIsImN1cnJlbnRTZXNzaW9uIiwiZmVhdHVyZXMiLCJzZW50RW1haWxzIiwiY2xlYXIiLCJzYXZlZFJlY29yZHMiLCJjcmVhdGVkUmVjb3JkcyIsImRlbGV0ZWRSZWNvcmRzIiwicnVuU2VhcmNoZXMiLCJzZWFyY2hSZXN1bHRzIiwibG9va3VwRmllbGRzUmVzdWx0cyIsInN1Ym1pdHRlZFRhc2tzIiwic3R1YnMiLCJjdXN0b21TdHVicyIsIm1vZHVsZSIsInBhdGgiLCJjb25zdHJ1Y3RvciIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFN1aXRlQ2xvdWRKZXN0U3R1YnMgPSByZXF1aXJlKFwic3VpdGVjbG91ZC11bml0LXRlc3Rpbmctc3R1YnNcIik7XG5jb25zdCBLZXllZFNldCA9IHJlcXVpcmUoXCIuL2tleWVkLXNldC5janNcIik7XG5jb25zdCB7IGFkZEtleWVkU2V0R2V0U2V0LCBjcmVhdGVVc2VyRXZlbnRDb250ZXh0LCBVc2VyRXZlbnRUeXBlIH0gPSByZXF1aXJlKFwiLi9oZWxwZXJzLmNqc1wiKTtcblxuY2xhc3MgU3VpdGVTY3JpcHRNb2NrcyB7XG5cdGRhdGVGb3JtYXQgPSBcIk0vZC95eXl5XCI7XG5cblx0QGFkZEtleWVkU2V0R2V0U2V0KClcblx0I2NhY2hlcyA9IG5ldyBLZXllZFNldCgoY2FjaGUpID0+IFtjYWNoZS5uYW1lLCBjYWNoZS5zY29wZV0pO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCNyZWNvcmRzID0gbmV3IEtleWVkU2V0KChyZWNvcmQpID0+IFtyZWNvcmQuaWQsIHJlY29yZC50eXBlXSk7XG5cblx0QGFkZEtleWVkU2V0R2V0U2V0KClcblx0I3NlYXJjaGVzID0gbmV3IEtleWVkU2V0KFxuXHRcdChzZWFyY2gpID0+IHNlYXJjaC5pZCxcblx0XHQoc2VhcmNoKSA9PiBzZWFyY2guc2VhcmNoSWQsXG5cdFx0KHNlYXJjaCkgPT4gc2VhcmNoLnRpdGxlXG5cdCk7XG5cblx0QGFkZEtleWVkU2V0R2V0U2V0KClcblx0I3Rhc2tTdGF0dXNlcyA9IG5ldyBLZXllZFNldCgodGFzaykgPT4gdGFzay5pZCk7XG5cblx0cmVzZXQgPSAoKSA9PiB7XG5cdFx0dGhpcy5vdXRwdXRBdWRpdExvZ3MgPSBmYWxzZTtcblx0XHR0aGlzLm91dHB1dERlYnVnTG9ncyA9IGZhbHNlO1xuXHRcdHRoaXMub3V0cHV0RW1lcmdlbmN5TG9ncyA9IGZhbHNlO1xuXHRcdHRoaXMub3V0cHV0RXJyb3JMb2dzID0gZmFsc2U7XG5cblx0XHR0aGlzLmN1cnJlbnRTY3JpcHQgPSB7fTtcblx0XHR0aGlzLmN1cnJlbnRVc2VyID0ge307XG5cdFx0dGhpcy5jdXJyZW50U2Vzc2lvbiA9IHt9O1xuXHRcdHRoaXMuZmVhdHVyZXMgPSB7fTtcblxuXHRcdHRoaXMuc2VudEVtYWlscyA9IFtdO1xuXG5cdFx0dGhpcy4jY2FjaGVzLmNsZWFyKCk7XG5cblx0XHR0aGlzLiNyZWNvcmRzLmNsZWFyKCk7XG5cdFx0dGhpcy5zYXZlZFJlY29yZHMgPSBbXTtcblx0XHR0aGlzLmNyZWF0ZWRSZWNvcmRzID0gW107XG5cdFx0dGhpcy5kZWxldGVkUmVjb3JkcyA9IFtdO1xuXG5cdFx0dGhpcy4jc2VhcmNoZXMuY2xlYXIoKTtcblx0XHR0aGlzLnJ1blNlYXJjaGVzID0gW107XG5cdFx0dGhpcy5zZWFyY2hSZXN1bHRzID0gW107XG5cdFx0dGhpcy5sb29rdXBGaWVsZHNSZXN1bHRzID0gW107XG5cblx0XHR0aGlzLiN0YXNrU3RhdHVzZXMuY2xlYXIoKTtcblx0XHR0aGlzLnN1Ym1pdHRlZFRhc2tzID0gW107XG5cdH07XG5cblx0Y3JlYXRlVXNlckV2ZW50Q29udGV4dCA9IGNyZWF0ZVVzZXJFdmVudENvbnRleHQ7XG5cdFVzZXJFdmVudFR5cGUgPSBVc2VyRXZlbnRUeXBlO1xuXG5cdHN0dWJzID0gW1xuXHRcdC4uLlN1aXRlQ2xvdWRKZXN0U3R1YnMuY3VzdG9tU3R1YnMsXG5cdFx0eyBtb2R1bGU6IFwiTi9jYWNoZVwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL2NhY2hlL2luZGV4LmNqc1wiIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9lbWFpbFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL2VtYWlsL2luZGV4LmNqc1wiIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9lbmNvZGVcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy9lbmNvZGUvaW5kZXguY2pzXCIgfSxcblx0XHR7IG1vZHVsZTogXCJOL3JlY29yZFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3JlY29yZC9pbmRleC5janNcIiB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vcnVudGltZVwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3J1bnRpbWUvaW5kZXguY2pzXCIgfSxcblx0XHR7IG1vZHVsZTogXCJOL3NlYXJjaFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3NlYXJjaC9pbmRleC5janNcIiB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vdGFza1wiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3Rhc2svaW5kZXguY2pzXCIgfSxcblx0XHR7IG1vZHVsZTogXCJOL3VybFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3VybC9pbmRleC5janNcIiB9LFxuXHRcdHtcblx0XHRcdG1vZHVsZTogXCJOL3VpL3NlcnZlcldpZGdldFwiLFxuXHRcdFx0cGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy91aS9zZXJ2ZXJXaWRnZXQvaW5kZXguY2pzXCIsXG5cdFx0fSxcblx0XTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU3VpdGVTY3JpcHRNb2NrcygpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE1BQU1BLG1CQUFtQixHQUFHQyxPQUFPLENBQUMsK0JBQStCLENBQUM7QUFDcEUsTUFBTUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDM0MsTUFBTTtFQUFFRSxpQkFBaUI7RUFBRUMsc0JBQXNCO0VBQUVDO0FBQWMsQ0FBQyxHQUFHSixPQUFPLENBQUMsZUFBZSxDQUFDO0FBQUMsT0FLNUZFLGlCQUFpQixFQUFFO0FBQUEsUUFHbkJBLGlCQUFpQixFQUFFO0FBQUEsUUFHbkJBLGlCQUFpQixFQUFFO0FBQUEsUUFPbkJBLGlCQUFpQixFQUFFO0FBaEJyQixNQUFNRyxnQkFBZ0IsQ0FBQztF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