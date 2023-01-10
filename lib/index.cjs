var _dec, _init_records, _dec2, _init_searches, _dec3, _init_lookupFieldsResults;
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
  keyedSetGetSet
} = require("./helpers.cjs");
_dec = keyedSetGetSet();
_dec2 = keyedSetGetSet();
_dec3 = keyedSetGetSet();
class SuiteScriptMocks {
  static {
    [_init_records, _init_searches, _init_lookupFieldsResults] = _applyDecs(this, [[_dec, 0, "records", function () {
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
    }]], []);
  }
  outputDebugLogs = false;
  outputErrorLogs = true;
  outputAuditLogs = false;
  #records = _init_records(this, new KeyedSet(value => [value.id, value.type]));
  savedRecords = [];
  createdRecords = [];
  #searches = _init_searches(this, new KeyedSet(value => value.id, value => value.searchId, value => value.title));
  searchResults = [];
  #lookupFieldsResults = _init_lookupFieldsResults(this, new KeyedSet(value => [value.id, value.searchId]));
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
  };
  createUserEventContext = createUserEventContext;
  stubs = [...SuiteCloudJestStubs.customStubs, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWl0ZUNsb3VkSmVzdFN0dWJzIiwicmVxdWlyZSIsIktleWVkU2V0IiwiY3JlYXRlVXNlckV2ZW50Q29udGV4dCIsImtleWVkU2V0R2V0U2V0IiwiU3VpdGVTY3JpcHRNb2NrcyIsInJlY29yZHMiLCJzZWFyY2hlcyIsImxvb2t1cEZpZWxkc1Jlc3VsdHMiLCJvdXRwdXREZWJ1Z0xvZ3MiLCJvdXRwdXRFcnJvckxvZ3MiLCJvdXRwdXRBdWRpdExvZ3MiLCJ2YWx1ZSIsImlkIiwidHlwZSIsInNhdmVkUmVjb3JkcyIsImNyZWF0ZWRSZWNvcmRzIiwic2VhcmNoSWQiLCJ0aXRsZSIsInNlYXJjaFJlc3VsdHMiLCJ0YXNrcyIsImN1cnJlbnRTY3JpcHQiLCJjdXJyZW50VXNlciIsImN1cnJlbnRTZXNzaW9uIiwiZmVhdHVyZXMiLCJyZXNldCIsImNsZWFyIiwic3R1YnMiLCJjdXN0b21TdHVicyIsIm1vZHVsZSIsInBhdGgiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTdWl0ZUNsb3VkSmVzdFN0dWJzID0gcmVxdWlyZShcInN1aXRlY2xvdWQtdW5pdC10ZXN0aW5nLXN0dWJzXCIpXG5jb25zdCBLZXllZFNldCA9IHJlcXVpcmUoXCIuL2tleWVkLXNldC5janNcIilcbmNvbnN0IHsgY3JlYXRlVXNlckV2ZW50Q29udGV4dCwga2V5ZWRTZXRHZXRTZXQgfSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMuY2pzXCIpO1xuXG5jbGFzcyBTdWl0ZVNjcmlwdE1vY2tzIHtcbiAgICBvdXRwdXREZWJ1Z0xvZ3MgPSBmYWxzZVxuICAgIG91dHB1dEVycm9yTG9ncyA9IHRydWVcbiAgICBvdXRwdXRBdWRpdExvZ3MgPSBmYWxzZVxuXG4gICAgQGtleWVkU2V0R2V0U2V0KClcbiAgICAjcmVjb3JkcyA9IG5ldyBLZXllZFNldCh2YWx1ZSA9PiBbdmFsdWUuaWQsIHZhbHVlLnR5cGVdKVxuICAgIHNhdmVkUmVjb3JkcyA9IFtdXG4gICAgY3JlYXRlZFJlY29yZHMgPSBbXVxuXG4gICAgQGtleWVkU2V0R2V0U2V0KClcbiAgICAjc2VhcmNoZXMgPSBuZXcgS2V5ZWRTZXQodmFsdWUgPT4gdmFsdWUuaWQsIHZhbHVlID0+IHZhbHVlLnNlYXJjaElkLCB2YWx1ZSA9PiB2YWx1ZS50aXRsZSlcbiAgICBzZWFyY2hSZXN1bHRzID0gW11cblxuICAgIEBrZXllZFNldEdldFNldCgpXG4gICAgI2xvb2t1cEZpZWxkc1Jlc3VsdHMgPSBuZXcgS2V5ZWRTZXQodmFsdWUgPT4gW3ZhbHVlLmlkLCB2YWx1ZS5zZWFyY2hJZF0pXG5cbiAgICB0YXNrcyA9IFtdXG5cbiAgICBjdXJyZW50U2NyaXB0XG4gICAgY3VycmVudFVzZXJcbiAgICBjdXJyZW50U2Vzc2lvblxuXG4gICAgZmVhdHVyZXMgPSB7fVxuXG4gICAgcmVzZXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuI3JlY29yZHMuY2xlYXIoKVxuICAgICAgICB0aGlzLnNhdmVkUmVjb3JkcyA9IFtdXG4gICAgICAgIHRoaXMuY3JlYXRlZFJlY29yZHMgPSBbXVxuICAgICAgICB0aGlzLiNzZWFyY2hlcy5jbGVhcigpXG4gICAgICAgIHRoaXMuI2xvb2t1cEZpZWxkc1Jlc3VsdHMuY2xlYXIoKVxuICAgICAgICB0aGlzLnRhc2tzID0gW11cbiAgICB9XG5cbiAgICBjcmVhdGVVc2VyRXZlbnRDb250ZXh0ID0gY3JlYXRlVXNlckV2ZW50Q29udGV4dDtcblxuICAgIHN0dWJzID0gW1xuICAgICAgICAuLi5TdWl0ZUNsb3VkSmVzdFN0dWJzLmN1c3RvbVN0dWJzLFxuICAgICAgICB7IG1vZHVsZTogXCJOL3JlY29yZFwiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3JlY29yZC9pbmRleC5janNcIiB9LFxuICAgICAgICB7IG1vZHVsZTogXCJOL3J1bnRpbWVcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy9ydW50aW1lL2luZGV4LmNqc1wiIH0sXG4gICAgICAgIHsgbW9kdWxlOiBcIk4vc2VhcmNoXCIsIHBhdGg6IFwiPHJvb3REaXI+L25vZGVfbW9kdWxlcy9zdWl0ZXNjcmlwdC1tb2Nrcy9saWIvbW9ja3Mvc2VhcmNoL2luZGV4LmNqc1wiIH0sXG4gICAgICAgIHsgbW9kdWxlOiBcIk4vdGFza1wiLCBwYXRoOiBcIjxyb290RGlyPi9ub2RlX21vZHVsZXMvc3VpdGVzY3JpcHQtbW9ja3MvbGliL21vY2tzL3Rhc2svaW5kZXguY2pzXCIgfSxcbiAgICAgICAgeyBtb2R1bGU6IFwiTi91cmxcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy91cmwvaW5kZXguY2pzXCIgfSxcbiAgICAgICAgeyBtb2R1bGU6IFwiTi91aS9zZXJ2ZXJXaWRnZXRcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL3N1aXRlc2NyaXB0LW1vY2tzL2xpYi9tb2Nrcy91aS9zZXJ2ZXJXaWRnZXQvaW5kZXguY2pzXCIgfSxcbiAgICBdXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFN1aXRlU2NyaXB0TW9ja3MoKSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFNQSxtQkFBbUIsR0FBR0MsT0FBTyxDQUFDLCtCQUErQixDQUFDO0FBQ3BFLE1BQU1DLFFBQVEsR0FBR0QsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBQzNDLE1BQU07RUFBRUUsc0JBQXNCO0VBQUVDO0FBQWUsQ0FBQyxHQUFHSCxPQUFPLENBQUMsZUFBZSxDQUFDO0FBQUMsT0FPdkVHLGNBQWMsRUFBRTtBQUFBLFFBS2hCQSxjQUFjLEVBQUU7QUFBQSxRQUloQkEsY0FBYyxFQUFFO0FBZHJCLE1BQU1DLGdCQUFnQixDQUFDO0VBQUE7SUFBQTtNQUFBLFlBTW5CLENBQUNDLE9BQU87SUFBQTtNQUFBLEtBQVIsQ0FBQ0EsT0FBTztJQUFBO01BQUEsWUFLUixDQUFDQyxRQUFRO0lBQUE7TUFBQSxLQUFULENBQUNBLFFBQVE7SUFBQTtNQUFBLFlBSVQsQ0FBQ0MsbUJBQW1CO0lBQUE7TUFBQSxLQUFwQixDQUFDQSxtQkFBbUI7SUFBQTtFQUFBO0VBZHBCQyxlQUFlLEdBQUcsS0FBSztFQUN2QkMsZUFBZSxHQUFHLElBQUk7RUFDdEJDLGVBQWUsR0FBRyxLQUFLO0VBR3ZCLENBQUNMLE9BQU8sdUJBQUcsSUFBSUosUUFBUSxDQUFDVSxLQUFLLElBQUksQ0FBQ0EsS0FBSyxDQUFDQyxFQUFFLEVBQUVELEtBQUssQ0FBQ0UsSUFBSSxDQUFDLENBQUM7RUFDeERDLFlBQVksR0FBRyxFQUFFO0VBQ2pCQyxjQUFjLEdBQUcsRUFBRTtFQUduQixDQUFDVCxRQUFRLHdCQUFHLElBQUlMLFFBQVEsQ0FBQ1UsS0FBSyxJQUFJQSxLQUFLLENBQUNDLEVBQUUsRUFBRUQsS0FBSyxJQUFJQSxLQUFLLENBQUNLLFFBQVEsRUFBRUwsS0FBSyxJQUFJQSxLQUFLLENBQUNNLEtBQUssQ0FBQztFQUMxRkMsYUFBYSxHQUFHLEVBQUU7RUFHbEIsQ0FBQ1gsbUJBQW1CLG1DQUFHLElBQUlOLFFBQVEsQ0FBQ1UsS0FBSyxJQUFJLENBQUNBLEtBQUssQ0FBQ0MsRUFBRSxFQUFFRCxLQUFLLENBQUNLLFFBQVEsQ0FBQyxDQUFDO0VBRXhFRyxLQUFLLEdBQUcsRUFBRTtFQUVWQyxhQUFhO0VBQ2JDLFdBQVc7RUFDWEMsY0FBYztFQUVkQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0VBRWJDLEtBQUssR0FBRyxNQUFNO0lBQ1YsSUFBSSxDQUFDLENBQUNuQixPQUFPLENBQUNvQixLQUFLLEVBQUU7SUFDckIsSUFBSSxDQUFDWCxZQUFZLEdBQUcsRUFBRTtJQUN0QixJQUFJLENBQUNDLGNBQWMsR0FBRyxFQUFFO0lBQ3hCLElBQUksQ0FBQyxDQUFDVCxRQUFRLENBQUNtQixLQUFLLEVBQUU7SUFDdEIsSUFBSSxDQUFDLENBQUNsQixtQkFBbUIsQ0FBQ2tCLEtBQUssRUFBRTtJQUNqQyxJQUFJLENBQUNOLEtBQUssR0FBRyxFQUFFO0VBQ25CLENBQUM7RUFFRGpCLHNCQUFzQixHQUFHQSxzQkFBc0I7RUFFL0N3QixLQUFLLEdBQUcsQ0FDSixHQUFHM0IsbUJBQW1CLENBQUM0QixXQUFXLEVBQ2xDO0lBQUVDLE1BQU0sRUFBRSxVQUFVO0lBQUVDLElBQUksRUFBRTtFQUFzRSxDQUFDLEVBQ25HO0lBQUVELE1BQU0sRUFBRSxXQUFXO0lBQUVDLElBQUksRUFBRTtFQUF1RSxDQUFDLEVBQ3JHO0lBQUVELE1BQU0sRUFBRSxVQUFVO0lBQUVDLElBQUksRUFBRTtFQUFzRSxDQUFDLEVBQ25HO0lBQUVELE1BQU0sRUFBRSxRQUFRO0lBQUVDLElBQUksRUFBRTtFQUFvRSxDQUFDLEVBQy9GO0lBQUVELE1BQU0sRUFBRSxPQUFPO0lBQUVDLElBQUksRUFBRTtFQUFtRSxDQUFDLEVBQzdGO0lBQUVELE1BQU0sRUFBRSxtQkFBbUI7SUFBRUMsSUFBSSxFQUFFO0VBQStFLENBQUMsQ0FDeEg7QUFDTDtBQUVBRCxNQUFNLENBQUNFLE9BQU8sR0FBRyxJQUFJMUIsZ0JBQWdCLEVBQUUifQ==