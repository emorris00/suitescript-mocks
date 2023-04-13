var _dec, _init_records, _dec2, _init_searches, _dec3, _init_lookupFieldsResults, _dec4, _init_caches;
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
  createUserEventContext,
  addKeyedSetGetSet
} = require("./helpers.cjs");
_dec = addKeyedSetGetSet();
_dec2 = addKeyedSetGetSet();
_dec3 = addKeyedSetGetSet();
_dec4 = addKeyedSetGetSet();
class SuiteScriptMocks {
  static {
    [_init_records, _init_searches, _init_lookupFieldsResults, _init_caches] = _applyDecs(this, [[_dec, 0, "records", function () {
      return this.#records;
    }, function (value) {
      this.#records = value;
    }], [_dec2, 0, "searches", function () {
      return this.#searches;
    }, function (value) {
      this.#searches = value;
    }], [_dec3, 0, "lookupFieldsResults", function () {
      return this.#lookupFieldsResults;
    }, function (value) {
      this.#lookupFieldsResults = value;
    }], [_dec4, 0, "caches", function () {
      return this.#caches;
    }, function (value) {
      this.#caches = value;
    }]], []);
  }
  outputAuditLogs = false;
  outputDebugLogs = false;
  outputEmergencyLogs = false;
  outputErrorLogs = false;
  #records = _init_records(this, new KeyedSet(value => [value.id, value.type]));
  savedRecords = [];
  createdRecords = [];
  #searches = _init_searches(this, new KeyedSet(value => value.id, value => value.searchId, value => value.title));
  searchResults = [];
  #lookupFieldsResults = _init_lookupFieldsResults(this, new KeyedSet(value => [value.id, value.searchId]));
  #caches = _init_caches(this, new KeyedSet(value => [value.name, value.scope]));
  sentEmails = [];
  tasks = [];
  currentScript;
  currentUser;
  currentSession;
  features = {};
  reset = () => {
    this.#records.clear();
    this.savedRecords = [];
    this.createdRecords = [];
    this.#searches.clear();
    this.#lookupFieldsResults.clear();
    this.tasks = [];
    this.#caches.clear();
    this.sentEmails = [];
  };
  createUserEventContext = createUserEventContext;
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
}
module.exports = new SuiteScriptMocks();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWl0ZUNsb3VkSmVzdFN0dWJzIiwicmVxdWlyZSIsIktleWVkU2V0IiwiY3JlYXRlVXNlckV2ZW50Q29udGV4dCIsImFkZEtleWVkU2V0R2V0U2V0IiwiU3VpdGVTY3JpcHRNb2NrcyIsInJlY29yZHMiLCJzZWFyY2hlcyIsImxvb2t1cEZpZWxkc1Jlc3VsdHMiLCJjYWNoZXMiLCJvdXRwdXRBdWRpdExvZ3MiLCJvdXRwdXREZWJ1Z0xvZ3MiLCJvdXRwdXRFbWVyZ2VuY3lMb2dzIiwib3V0cHV0RXJyb3JMb2dzIiwidmFsdWUiLCJpZCIsInR5cGUiLCJzYXZlZFJlY29yZHMiLCJjcmVhdGVkUmVjb3JkcyIsInNlYXJjaElkIiwidGl0bGUiLCJzZWFyY2hSZXN1bHRzIiwibmFtZSIsInNjb3BlIiwic2VudEVtYWlscyIsInRhc2tzIiwiY3VycmVudFNjcmlwdCIsImN1cnJlbnRVc2VyIiwiY3VycmVudFNlc3Npb24iLCJmZWF0dXJlcyIsInJlc2V0IiwiY2xlYXIiLCJzdHVicyIsImN1c3RvbVN0dWJzIiwibW9kdWxlIiwicGF0aCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFN1aXRlQ2xvdWRKZXN0U3R1YnMgPSByZXF1aXJlKFwic3VpdGVjbG91ZC11bml0LXRlc3Rpbmctc3R1YnNcIik7XG5jb25zdCBLZXllZFNldCA9IHJlcXVpcmUoXCIuL2tleWVkLXNldC5janNcIik7XG5jb25zdCB7IGNyZWF0ZVVzZXJFdmVudENvbnRleHQsIGFkZEtleWVkU2V0R2V0U2V0IH0gPSByZXF1aXJlKFwiLi9oZWxwZXJzLmNqc1wiKTtcblxuY2xhc3MgU3VpdGVTY3JpcHRNb2NrcyB7XG5cdG91dHB1dEF1ZGl0TG9ncyA9IGZhbHNlO1xuXHRvdXRwdXREZWJ1Z0xvZ3MgPSBmYWxzZTtcblx0b3V0cHV0RW1lcmdlbmN5TG9ncyA9IGZhbHNlO1xuXHRvdXRwdXRFcnJvckxvZ3MgPSBmYWxzZTtcblxuXHRAYWRkS2V5ZWRTZXRHZXRTZXQoKVxuXHQjcmVjb3JkcyA9IG5ldyBLZXllZFNldCgodmFsdWUpID0+IFt2YWx1ZS5pZCwgdmFsdWUudHlwZV0pO1xuXHRzYXZlZFJlY29yZHMgPSBbXTtcblx0Y3JlYXRlZFJlY29yZHMgPSBbXTtcblxuXHRAYWRkS2V5ZWRTZXRHZXRTZXQoKVxuXHQjc2VhcmNoZXMgPSBuZXcgS2V5ZWRTZXQoXG5cdFx0KHZhbHVlKSA9PiB2YWx1ZS5pZCxcblx0XHQodmFsdWUpID0+IHZhbHVlLnNlYXJjaElkLFxuXHRcdCh2YWx1ZSkgPT4gdmFsdWUudGl0bGVcblx0KTtcblx0c2VhcmNoUmVzdWx0cyA9IFtdO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCNsb29rdXBGaWVsZHNSZXN1bHRzID0gbmV3IEtleWVkU2V0KCh2YWx1ZSkgPT4gW3ZhbHVlLmlkLCB2YWx1ZS5zZWFyY2hJZF0pO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCNjYWNoZXMgPSBuZXcgS2V5ZWRTZXQoKHZhbHVlKSA9PiBbdmFsdWUubmFtZSwgdmFsdWUuc2NvcGVdKTtcblxuXHRzZW50RW1haWxzID0gW107XG5cblx0dGFza3MgPSBbXTtcblxuXHRjdXJyZW50U2NyaXB0O1xuXHRjdXJyZW50VXNlcjtcblx0Y3VycmVudFNlc3Npb247XG5cblx0ZmVhdHVyZXMgPSB7fTtcblxuXHRyZXNldCA9ICgpID0+IHtcblx0XHR0aGlzLiNyZWNvcmRzLmNsZWFyKCk7XG5cdFx0dGhpcy5zYXZlZFJlY29yZHMgPSBbXTtcblx0XHR0aGlzLmNyZWF0ZWRSZWNvcmRzID0gW107XG5cdFx0dGhpcy4jc2VhcmNoZXMuY2xlYXIoKTtcblx0XHR0aGlzLiNsb29rdXBGaWVsZHNSZXN1bHRzLmNsZWFyKCk7XG5cdFx0dGhpcy50YXNrcyA9IFtdO1xuXHRcdHRoaXMuI2NhY2hlcy5jbGVhcigpO1xuXHRcdHRoaXMuc2VudEVtYWlscyA9IFtdO1xuXHR9O1xuXG5cdGNyZWF0ZVVzZXJFdmVudENvbnRleHQgPSBjcmVhdGVVc2VyRXZlbnRDb250ZXh0O1xuXG5cdHN0dWJzID0gW1xuXHRcdC4uLlN1aXRlQ2xvdWRKZXN0U3R1YnMuY3VzdG9tU3R1YnMsXG5cdFx0eyBtb2R1bGU6IFwiTi9jYWNoZVwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL2NhY2hlL2luZGV4LmNqc1wiIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9lbWFpbFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL2VtYWlsL2luZGV4LmNqc1wiIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9lbmNvZGVcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy9lbmNvZGUvaW5kZXguY2pzXCIgfSxcblx0XHR7IG1vZHVsZTogXCJOL3JlY29yZFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3JlY29yZC9pbmRleC5janNcIiB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vcnVudGltZVwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3J1bnRpbWUvaW5kZXguY2pzXCIgfSxcblx0XHR7IG1vZHVsZTogXCJOL3NlYXJjaFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3NlYXJjaC9pbmRleC5janNcIiB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vdGFza1wiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3Rhc2svaW5kZXguY2pzXCIgfSxcblx0XHR7IG1vZHVsZTogXCJOL3VybFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3VybC9pbmRleC5janNcIiB9LFxuXHRcdHtcblx0XHRcdG1vZHVsZTogXCJOL3VpL3NlcnZlcldpZGdldFwiLFxuXHRcdFx0cGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy91aS9zZXJ2ZXJXaWRnZXQvaW5kZXguY2pzXCIsXG5cdFx0fSxcblx0XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU3VpdGVTY3JpcHRNb2NrcygpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE1BQU1BLG1CQUFtQixHQUFHQyxPQUFPLENBQUMsK0JBQStCLENBQUM7QUFDcEUsTUFBTUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDM0MsTUFBTTtFQUFFRSxzQkFBc0I7RUFBRUM7QUFBa0IsQ0FBQyxHQUFHSCxPQUFPLENBQUMsZUFBZSxDQUFDO0FBQUMsT0FRN0VHLGlCQUFpQixFQUFFO0FBQUEsUUFLbkJBLGlCQUFpQixFQUFFO0FBQUEsUUFRbkJBLGlCQUFpQixFQUFFO0FBQUEsUUFHbkJBLGlCQUFpQixFQUFFO0FBdEJyQixNQUFNQyxnQkFBZ0IsQ0FBQztFQUFBO0lBQUE7TUFBQSxZQU90QixDQUFDQyxPQUFPO0lBQUE7TUFBQSxLQUFSLENBQUNBLE9BQU87SUFBQTtNQUFBLFlBS1IsQ0FBQ0MsUUFBUTtJQUFBO01BQUEsS0FBVCxDQUFDQSxRQUFRO0lBQUE7TUFBQSxZQVFULENBQUNDLG1CQUFtQjtJQUFBO01BQUEsS0FBcEIsQ0FBQ0EsbUJBQW1CO0lBQUE7TUFBQSxZQUdwQixDQUFDQyxNQUFNO0lBQUE7TUFBQSxLQUFQLENBQUNBLE1BQU07SUFBQTtFQUFBO0VBdEJQQyxlQUFlLEdBQUcsS0FBSztFQUN2QkMsZUFBZSxHQUFHLEtBQUs7RUFDdkJDLG1CQUFtQixHQUFHLEtBQUs7RUFDM0JDLGVBQWUsR0FBRyxLQUFLO0VBR3ZCLENBQUNQLE9BQU8sdUJB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