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
  createUserEventContext,
  addKeyedSetGetSet
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
    this.#searches.clear();
    this.runSearches = [];
    this.searchResults = [];
    this.lookupFieldsResults = [];
    this.#taskStatuses.clear();
    this.submittedTasks = [];
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
  constructor() {
    this.reset();
  }
}
module.exports = new SuiteScriptMocks();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWl0ZUNsb3VkSmVzdFN0dWJzIiwicmVxdWlyZSIsIktleWVkU2V0IiwiY3JlYXRlVXNlckV2ZW50Q29udGV4dCIsImFkZEtleWVkU2V0R2V0U2V0IiwiU3VpdGVTY3JpcHRNb2NrcyIsImNhY2hlcyIsInJlY29yZHMiLCJzZWFyY2hlcyIsInRhc2tTdGF0dXNlcyIsImNhY2hlIiwibmFtZSIsInNjb3BlIiwicmVjb3JkIiwiaWQiLCJ0eXBlIiwic2VhcmNoIiwic2VhcmNoSWQiLCJ0aXRsZSIsInRhc2siLCJyZXNldCIsIm91dHB1dEF1ZGl0TG9ncyIsIm91dHB1dERlYnVnTG9ncyIsIm91dHB1dEVtZXJnZW5jeUxvZ3MiLCJvdXRwdXRFcnJvckxvZ3MiLCJjdXJyZW50U2NyaXB0IiwiY3VycmVudFVzZXIiLCJjdXJyZW50U2Vzc2lvbiIsImZlYXR1cmVzIiwic2VudEVtYWlscyIsImNsZWFyIiwic2F2ZWRSZWNvcmRzIiwiY3JlYXRlZFJlY29yZHMiLCJydW5TZWFyY2hlcyIsInNlYXJjaFJlc3VsdHMiLCJsb29rdXBGaWVsZHNSZXN1bHRzIiwic3VibWl0dGVkVGFza3MiLCJzdHVicyIsImN1c3RvbVN0dWJzIiwibW9kdWxlIiwicGF0aCIsImNvbnN0cnVjdG9yIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3VpdGVDbG91ZEplc3RTdHVicyA9IHJlcXVpcmUoXCJzdWl0ZWNsb3VkLXVuaXQtdGVzdGluZy1zdHVic1wiKTtcbmNvbnN0IEtleWVkU2V0ID0gcmVxdWlyZShcIi4va2V5ZWQtc2V0LmNqc1wiKTtcbmNvbnN0IHsgY3JlYXRlVXNlckV2ZW50Q29udGV4dCwgYWRkS2V5ZWRTZXRHZXRTZXQgfSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMuY2pzXCIpO1xuXG5jbGFzcyBTdWl0ZVNjcmlwdE1vY2tzIHtcblx0QGFkZEtleWVkU2V0R2V0U2V0KClcblx0I2NhY2hlcyA9IG5ldyBLZXllZFNldCgoY2FjaGUpID0+IFtjYWNoZS5uYW1lLCBjYWNoZS5zY29wZV0pO1xuXG5cdEBhZGRLZXllZFNldEdldFNldCgpXG5cdCNyZWNvcmRzID0gbmV3IEtleWVkU2V0KChyZWNvcmQpID0+IFtyZWNvcmQuaWQsIHJlY29yZC50eXBlXSk7XG5cblx0QGFkZEtleWVkU2V0R2V0U2V0KClcblx0I3NlYXJjaGVzID0gbmV3IEtleWVkU2V0KFxuXHRcdChzZWFyY2gpID0+IHNlYXJjaC5pZCxcblx0XHQoc2VhcmNoKSA9PiBzZWFyY2guc2VhcmNoSWQsXG5cdFx0KHNlYXJjaCkgPT4gc2VhcmNoLnRpdGxlXG5cdCk7XG5cblx0QGFkZEtleWVkU2V0R2V0U2V0KClcblx0I3Rhc2tTdGF0dXNlcyA9IG5ldyBLZXllZFNldCgodGFzaykgPT4gdGFzay5pZCk7XG5cblx0cmVzZXQgPSAoKSA9PiB7XG5cdFx0dGhpcy5vdXRwdXRBdWRpdExvZ3MgPSBmYWxzZTtcblx0XHR0aGlzLm91dHB1dERlYnVnTG9ncyA9IGZhbHNlO1xuXHRcdHRoaXMub3V0cHV0RW1lcmdlbmN5TG9ncyA9IGZhbHNlO1xuXHRcdHRoaXMub3V0cHV0RXJyb3JMb2dzID0gZmFsc2U7XG5cblx0XHR0aGlzLmN1cnJlbnRTY3JpcHQgPSB7fTtcblx0XHR0aGlzLmN1cnJlbnRVc2VyID0ge307XG5cdFx0dGhpcy5jdXJyZW50U2Vzc2lvbiA9IHt9O1xuXHRcdHRoaXMuZmVhdHVyZXMgPSB7fTtcblxuXHRcdHRoaXMuc2VudEVtYWlscyA9IFtdO1xuXG5cdFx0dGhpcy4jY2FjaGVzLmNsZWFyKCk7XG5cblx0XHR0aGlzLiNyZWNvcmRzLmNsZWFyKCk7XG5cdFx0dGhpcy5zYXZlZFJlY29yZHMgPSBbXTtcblx0XHR0aGlzLmNyZWF0ZWRSZWNvcmRzID0gW107XG5cblx0XHR0aGlzLiNzZWFyY2hlcy5jbGVhcigpO1xuXHRcdHRoaXMucnVuU2VhcmNoZXMgPSBbXTtcblx0XHR0aGlzLnNlYXJjaFJlc3VsdHMgPSBbXTtcblx0XHR0aGlzLmxvb2t1cEZpZWxkc1Jlc3VsdHMgPSBbXTtcblxuXHRcdHRoaXMuI3Rhc2tTdGF0dXNlcy5jbGVhcigpO1xuXHRcdHRoaXMuc3VibWl0dGVkVGFza3MgPSBbXTtcblx0fTtcblxuXHRjcmVhdGVVc2VyRXZlbnRDb250ZXh0ID0gY3JlYXRlVXNlckV2ZW50Q29udGV4dDtcblxuXHRzdHVicyA9IFtcblx0XHQuLi5TdWl0ZUNsb3VkSmVzdFN0dWJzLmN1c3RvbVN0dWJzLFxuXHRcdHsgbW9kdWxlOiBcIk4vY2FjaGVcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy9jYWNoZS9pbmRleC5janNcIiB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vZW1haWxcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy9lbWFpbC9pbmRleC5janNcIiB9LFxuXHRcdHsgbW9kdWxlOiBcIk4vZW5jb2RlXCIsIHBhdGg6IFwiPHJvb3REaXI+L25vZGVfbW9kdWxlcy9zdWl0ZXNjcmlwdC1tb2Nrcy9saWIvbW9ja3MvZW5jb2RlL2luZGV4LmNqc1wiIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9yZWNvcmRcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy9yZWNvcmQvaW5kZXguY2pzXCIgfSxcblx0XHR7IG1vZHVsZTogXCJOL3J1bnRpbWVcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy9ydW50aW1lL2luZGV4LmNqc1wiIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi9zZWFyY2hcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy9zZWFyY2gvaW5kZXguY2pzXCIgfSxcblx0XHR7IG1vZHVsZTogXCJOL3Rhc2tcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy90YXNrL2luZGV4LmNqc1wiIH0sXG5cdFx0eyBtb2R1bGU6IFwiTi91cmxcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy91cmwvaW5kZXguY2pzXCIgfSxcblx0XHR7XG5cdFx0XHRtb2R1bGU6IFwiTi91aS9zZXJ2ZXJXaWRnZXRcIixcblx0XHRcdHBhdGg6IFwiPHJvb3REaXI+L25vZGVfbW9kdWxlcy9zdWl0ZXNjcmlwdC1tb2Nrcy9saWIvbW9ja3MvdWkvc2VydmVyV2lkZ2V0L2luZGV4LmNqc1wiLFxuXHRcdH0sXG5cdF07XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFN1aXRlU2NyaXB0TW9ja3MoKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFNQSxtQkFBbUIsR0FBR0MsT0FBTyxDQUFDLCtCQUErQixDQUFDO0FBQ3BFLE1BQU1DLFFBQVEsR0FBR0QsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQzNDLE1BQU07RUFBRUUsc0JBQXNCO0VBQUVDO0FBQWtCLENBQUMsR0FBR0gsT0FBTyxDQUFDLGVBQWUsQ0FBQztBQUFDLE9BRzdFRyxpQkFBaUIsRUFBRTtBQUFBLFFBR25CQSxpQkFBaUIsRUFBRTtBQUFBLFFBR25CQSxpQkFBaUIsRUFBRTtBQUFBLFFBT25CQSxpQkFBaUIsRUFBRTtBQWRyQixNQUFNQyxnQkFBZ0IsQ0FBQztFQUFBO0lBQUE7TUFBQSxZQUV0QixDQUFDQyxNQUFNO0lBQUE7TUFBQSxLQUFQLENBQUNBLE1BQU07SUFBQTtNQUFBLFlBR1AsQ0FBQ0MsT0FBTztJQUFBO01BQUEsS0FBUixDQUFDQSxPQUFPO0lBQUE7TUFBQSxZQUdSLENBQUNDLFFBQVE7SUFBQTtNQUFBLEtBQVQsQ0FBQ0EsUUFBUTtJQUFBO01BQUEsWUFPVCxDQUFDQyxZQUFZO0lBQUE7TUFBQSxLQUFiLENBQUNBLFlBQVk7SUFBQTtFQUFBO0VBYmIsQ0FBQ0gsTUFBTSxzQkFBRyxJQUFJSixRQUFRLENBQUVRLEtBQUssSUFBSyxDQUFDQSxLQUFLLENBQUNDLElBQUksRUFBRUQsS0FBSyxDQUFDRSxLQUFLLENBQUMsQ0FBQztFQUc1RCxDQUFDTCxPQUFPLHVCQUFHLElBQUlMLFFBQVEsQ0FBRVcsTUFBTSxJQUFLLENBQUNBLE1BQU0sQ0FBQ0MsRUFBRSxFQUFFRCxNQUFNLENBQUNFLElBQUksQ0FBQyxDQUFDO0VBRzdELENBQUNQLFFBQVEsd0JBQUcsSUFBSU4sUUFBUSxDQUN0QmMsTUFBTSxJQUFLQSxNQUFNLENBQUNGLEVBQUUsRUFDcEJFLE1BQU0sSUFBS0EsTUFBTSxDQUFDQyxRQUFRLEVBQzFCRCxNQUFNLElBQUtBLE1BQU0sQ0FBQ0UsS0FBSyxDQUN4QjtFQUdELENBQUNULFlBQVksNEJBQUcsSUFBSVAsUUFBUSxDQUFFaUIsSUFBSSxJQUFLQSxJQUFJLENBQUNMLEVBQUUsQ0FBQztFQUUvQ00sS0FBSyxHQUFHLE1BQU07SUFDYixJQUFJLENBQUNDLGVBQWUsR0FBRyxLQUFLO0lBQzVCLElBQUksQ0FBQ0MsZUFBZSxHQUFHLEtBQUs7SUFDNUIsSUFBSSxDQUFDQyxtQkFBbUIsR0FBRyxLQUFLO0lBQ2hDLElBQUksQ0FBQ0MsZUFBZSxHQUFHLEtBQUs7SUFFNUIsSUFBSSxDQUFDQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLElBQUksQ0FBQ0MsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUNyQixJQUFJLENBQUNDLGNBQWMsR0FBRyxDQUFDLENBQUM7SUFDeEIsSUFBSSxDQUFDQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBRWxCLElBQUksQ0FBQ0MsVUFBVSxHQUFHLEVBQUU7SUFFcEIsSUFBSSxDQUFDLENBQUN2QixNQUFNLENBQUN3QixLQUFLLEVBQUU7SUFFcEIsSUFBSSxDQUFDLENBQUN2QixPQUFPLENBQUN1QixLQUFLLEVBQUU7SUFDckIsSUFBSSxDQUFDQyxZQUFZLEdBQUcsRUFBRTtJQUN0QixJQUFJLENBQUNDLGNBQWMsR0FBRyxFQUFFO0lBRXhCLElBQUksQ0FBQyxDQUFDeEIsUUFBUSxDQUFDc0IsS0FBSyxFQUFFO0lBQ3RCLElBQUksQ0FBQ0csV0FBVyxHQUFHLEVBQUU7SUFDckIsSUFBSSxDQUFDQyxhQUFhLEdBQUcsRUFBRTtJQUN2QixJQUFJLENBQUNDLG1CQUFtQixHQUFHLEVBQUU7SUFFN0IsSUFBSSxDQUFDLENBQUMxQixZQUFZLENBQUNxQixLQUFLLEVBQUU7SUFDMUIsSUFBSSxDQUFDTSxjQUFjLEdBQUcsRUFBRTtFQUN6QixDQUFDO0VBRURqQyxzQkFBc0IsR0FBR0Esc0JBQXNCO0VBRS9Da0MsS0FBSyxHQUFHLENBQ1AsR0FBR3JDLG1CQUFtQixDQUFDc0MsV0FBVyxFQUNsQztJQUFFQyxNQUFNLEVBQUUsU0FBUztJQUFFQyxJQUFJLEVBQUU7RUFBcUUsQ0FBQyxFQUNqRztJQUFFRCxNQUFNLEVBQUUsU0FBUztJQUFFQyxJQUFJLEVBQUU7RUFBcUUsQ0FBQyxFQUNqRztJQUFFRCxNQUFNLEVBQUUsVUFBVTtJQUFFQyxJQUFJLEVBQUU7RUFBc0UsQ0FBQyxFQUNuRztJQUFFRCxNQUFNLEVBQUUsVUFBVTtJQUFFQyxJQUFJLEVBQUU7RUFBc0UsQ0FBQyxFQUNuRztJQUFFRCxNQUFNLEVBQUUsV0FBVztJQUFFQyxJQUFJLEVBQUU7RUFBdUUsQ0FBQyxFQUNyRztJQUFFRCxNQUFNLEVBQUUsVUFBVTtJQUFFQyxJQUFJLEVBQUU7RUFBc0UsQ0FBQyxFQUNuRztJQUFFRCxNQUFNLEVBQUUsUUFBUTtJQUFFQyxJQUFJLEVBQUU7RUFBb0UsQ0FBQyxFQUMvRjtJQUFFRCxNQUFNLEVBQUUsT0FBTztJQUFFQyxJQUFJLEVBQUU7RUFBbUUsQ0FBQyxFQUM3RjtJQUNDRCxNQUFNLEVBQUUsbUJBQW1CO0lBQzNCQyxJQUFJLEVBQUU7RUFDUCxDQUFDLENBQ0Q7RUFFREMsV0FBVyxHQUFHO0lBQ2IsSUFBSSxDQUFDckIsS0FBSyxFQUFFO0VBQ2I7QUFDRDtBQUVBbUIsTUFBTSxDQUFDRyxPQUFPLEdBQUcsSUFBSXJDLGdCQUFnQixFQUFFIn0=