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
  #records = _init_records(this, new KeyedSet(value => [value.id, value.type]));
  savedRecords = [];
  createdRecords = [];
  #searches = _init_searches(this, new KeyedSet(value => value.id, value => value.searchId, value => value.title));
  searchResults = [];
  #lookupFieldsResults = _init_lookupFieldsResults(this, new KeyedSet(value => [value.id, value.searchId]));
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
  };
  createUserEventContext = createUserEventContext;
  stubs = [...SuiteCloudJestStubs.customStubs, {
    module: "N/record",
    path: "<rootDir>/node_modules/netsuite-mocks/lib/mocks/record"
  }, {
    module: "N/runtime",
    path: "<rootDir>/node_modules/netsuite-mocks/lib/mocks/runtime"
  }, {
    module: "N/search",
    path: "<rootDir>/node_modules/netsuite-mocks/lib/mocks/search"
  }];
}
module.exports = new SuiteScriptMocks();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWl0ZUNsb3VkSmVzdFN0dWJzIiwicmVxdWlyZSIsIktleWVkU2V0IiwiY3JlYXRlVXNlckV2ZW50Q29udGV4dCIsImtleWVkU2V0R2V0U2V0IiwiU3VpdGVTY3JpcHRNb2NrcyIsInJlY29yZHMiLCJzZWFyY2hlcyIsImxvb2t1cEZpZWxkc1Jlc3VsdHMiLCJ2YWx1ZSIsImlkIiwidHlwZSIsInNhdmVkUmVjb3JkcyIsImNyZWF0ZWRSZWNvcmRzIiwic2VhcmNoSWQiLCJ0aXRsZSIsInNlYXJjaFJlc3VsdHMiLCJjdXJyZW50U2NyaXB0IiwiY3VycmVudFVzZXIiLCJjdXJyZW50U2Vzc2lvbiIsImZlYXR1cmVzIiwicmVzZXQiLCJjbGVhciIsInN0dWJzIiwiY3VzdG9tU3R1YnMiLCJtb2R1bGUiLCJwYXRoIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3VpdGVDbG91ZEplc3RTdHVicyA9IHJlcXVpcmUoXCJzdWl0ZWNsb3VkLXVuaXQtdGVzdGluZy1zdHVic1wiKVxuY29uc3QgS2V5ZWRTZXQgPSByZXF1aXJlKFwiLi9rZXllZC1zZXQuY2pzXCIpXG5jb25zdCB7IGNyZWF0ZVVzZXJFdmVudENvbnRleHQsIGtleWVkU2V0R2V0U2V0IH0gPSByZXF1aXJlKFwiLi9oZWxwZXJzLmNqc1wiKTtcblxuY2xhc3MgU3VpdGVTY3JpcHRNb2NrcyB7XG4gICAgQGtleWVkU2V0R2V0U2V0KClcbiAgICAjcmVjb3JkcyA9IG5ldyBLZXllZFNldCh2YWx1ZSA9PiBbdmFsdWUuaWQsIHZhbHVlLnR5cGVdKVxuICAgIHNhdmVkUmVjb3JkcyA9IFtdXG4gICAgY3JlYXRlZFJlY29yZHMgPSBbXVxuXG4gICAgQGtleWVkU2V0R2V0U2V0KClcbiAgICAjc2VhcmNoZXMgPSBuZXcgS2V5ZWRTZXQodmFsdWUgPT4gdmFsdWUuaWQsIHZhbHVlID0+IHZhbHVlLnNlYXJjaElkLCB2YWx1ZSA9PiB2YWx1ZS50aXRsZSlcblxuICAgIHNlYXJjaFJlc3VsdHMgPSBbXVxuXG4gICAgQGtleWVkU2V0R2V0U2V0KClcbiAgICAjbG9va3VwRmllbGRzUmVzdWx0cyA9IG5ldyBLZXllZFNldCh2YWx1ZSA9PiBbdmFsdWUuaWQsIHZhbHVlLnNlYXJjaElkXSlcblxuICAgIGN1cnJlbnRTY3JpcHRcbiAgICBjdXJyZW50VXNlclxuICAgIGN1cnJlbnRTZXNzaW9uXG5cbiAgICBmZWF0dXJlcyA9IHt9XG5cbiAgICByZXNldCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy4jcmVjb3Jkcy5jbGVhcigpXG4gICAgICAgIHRoaXMuc2F2ZWRSZWNvcmRzID0gW11cbiAgICAgICAgdGhpcy5jcmVhdGVkUmVjb3JkcyA9IFtdXG4gICAgICAgIHRoaXMuI3NlYXJjaGVzLmNsZWFyKClcbiAgICAgICAgdGhpcy4jbG9va3VwRmllbGRzUmVzdWx0cy5jbGVhcigpXG4gICAgfVxuXG4gICAgY3JlYXRlVXNlckV2ZW50Q29udGV4dCA9IGNyZWF0ZVVzZXJFdmVudENvbnRleHQ7XG5cbiAgICBzdHVicyA9IFtcbiAgICAgICAgLi4uU3VpdGVDbG91ZEplc3RTdHVicy5jdXN0b21TdHVicyxcbiAgICAgICAgeyBtb2R1bGU6IFwiTi9yZWNvcmRcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL25ldHN1aXRlLW1vY2tzL2xpYi9tb2Nrcy9yZWNvcmRcIiB9LFxuICAgICAgICB7IG1vZHVsZTogXCJOL3J1bnRpbWVcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL25ldHN1aXRlLW1vY2tzL2xpYi9tb2Nrcy9ydW50aW1lXCIgfSxcbiAgICAgICAgeyBtb2R1bGU6IFwiTi9zZWFyY2hcIiwgcGF0aDogXCI8cm9vdERpcj4vbm9kZV9tb2R1bGVzL25ldHN1aXRlLW1vY2tzL2xpYi9tb2Nrcy9zZWFyY2hcIiB9LFxuICAgIF1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU3VpdGVTY3JpcHRNb2NrcygpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE1BQU1BLG1CQUFtQixHQUFHQyxPQUFPLENBQUMsK0JBQStCLENBQUM7QUFDcEUsTUFBTUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDM0MsTUFBTTtFQUFFRSxzQkFBc0I7RUFBRUM7QUFBZSxDQUFDLEdBQUdILE9BQU8sQ0FBQyxlQUFlLENBQUM7QUFBQyxPQUd2RUcsY0FBYyxFQUFFO0FBQUEsUUFLaEJBLGNBQWMsRUFBRTtBQUFBLFFBS2hCQSxjQUFjLEVBQUU7QUFYckIsTUFBTUMsZ0JBQWdCLENBQUM7RUFBQTtJQUFBO01BQUEsWUFFbkIsQ0FBQ0MsT0FBTztJQUFBO01BQUEsS0FBUixDQUFDQSxPQUFPO0lBQUE7TUFBQSxZQUtSLENBQUNDLFFBQVE7SUFBQTtNQUFBLEtBQVQsQ0FBQ0EsUUFBUTtJQUFBO01BQUEsWUFLVCxDQUFDQyxtQkFBbUI7SUFBQTtNQUFBLEtBQXBCLENBQUNBLG1CQUFtQjtJQUFBO0VBQUE7RUFWcEIsQ0FBQ0YsT0FBTyx1QkFBRyxJQUFJSixRQUFRLENBQUNPLEtBQUssSUFBSSxDQUFDQSxLQUFLLENBQUNDLEVBQUUsRUFBRUQsS0FBSyxDQUFDRSxJQUFJLENBQUMsQ0FBQztFQUN4REMsWUFBWSxHQUFHLEVBQUU7RUFDakJDLGNBQWMsR0FBRyxFQUFFO0VBR25CLENBQUNOLFFBQVEsd0JBQUcsSUFBSUwsUUFBUSxDQUFDTyxLQUFLLElBQUlBLEtBQUssQ0FBQ0MsRUFBRSxFQUFFRCxLQUFLLElBQUlBLEtBQUssQ0FBQ0ssUUFBUSxFQUFFTCxLQUFLLElBQUlBLEtBQUssQ0FBQ00sS0FBSyxDQUFDO0VBRTFGQyxhQUFhLEdBQUcsRUFBRTtFQUdsQixDQUFDUixtQkFBbUIsbUNBQUcsSUFBSU4sUUFBUSxDQUFDTyxLQUFLLElBQUksQ0FBQ0EsS0FBSyxDQUFDQyxFQUFFLEVBQUVELEtBQUssQ0FBQ0ssUUFBUSxDQUFDLENBQUM7RUFFeEVHLGFBQWE7RUFDYkMsV0FBVztFQUNYQyxjQUFjO0VBRWRDLFFBQVEsR0FBRyxDQUFDLENBQUM7RUFFYkMsS0FBSyxHQUFHLE1BQU07SUFDVixJQUFJLENBQUMsQ0FBQ2YsT0FBTyxDQUFDZ0IsS0FBSyxFQUFFO0lBQ3JCLElBQUksQ0FBQ1YsWUFBWSxHQUFHLEVBQUU7SUFDdEIsSUFBSSxDQUFDQyxjQUFjLEdBQUcsRUFBRTtJQUN4QixJQUFJLENBQUMsQ0FBQ04sUUFBUSxDQUFDZSxLQUFLLEVBQUU7SUFDdEIsSUFBSSxDQUFDLENBQUNkLG1CQUFtQixDQUFDYyxLQUFLLEVBQUU7RUFDckMsQ0FBQztFQUVEbkIsc0JBQXNCLEdBQUdBLHNCQUFzQjtFQUUvQ29CLEtBQUssR0FBRyxDQUNKLEdBQUd2QixtQkFBbUIsQ0FBQ3dCLFdBQVcsRUFDbEM7SUFBRUMsTUFBTSxFQUFFLFVBQVU7SUFBRUMsSUFBSSxFQUFFO0VBQXlELENBQUMsRUFDdEY7SUFBRUQsTUFBTSxFQUFFLFdBQVc7SUFBRUMsSUFBSSxFQUFFO0VBQTBELENBQUMsRUFDeEY7SUFBRUQsTUFBTSxFQUFFLFVBQVU7SUFBRUMsSUFBSSxFQUFFO0VBQXlELENBQUMsQ0FDekY7QUFDTDtBQUVBRCxNQUFNLENBQUNFLE9BQU8sR0FBRyxJQUFJdEIsZ0JBQWdCLEVBQUUifQ==