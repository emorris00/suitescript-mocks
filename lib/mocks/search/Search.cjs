var _initClass, _dec, _dec2, _init_runPaged;
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
const Column = require("./Column.cjs");
const ResultSet = require("./ResultSet.cjs");
const PagedData = require("./PagedData.cjs");
const SuiteScriptMocks = require("../../../index.cjs");
const {
  options,
  addPromise,
  assignConstructor
} = require("../../helpers.cjs");
let _Search;
_dec = assignConstructor();
_dec2 = options("pageSize");
class Search {
  static {
    [_init_runPaged, _Search, _initClass] = _applyDecs(this, [[_dec2, 0, "runPaged"]], [_dec]);
  }
  id;
  searchId;
  searchType;
  title;
  columns;
  filters;
  results;
  run = () => {
    return new ResultSet({
      columns: this.columns,
      results: this.results
    });
  };
  runPaged = _init_runPaged(this, options => {
    const pageSize = options.pageSize || 50;
    if (pageSize < 5 || pageSize > 1000) {
      throw new Error("page size is outside allowed range");
    }
    return new PagedData({
      results: this.results || [],
      pageSize: pageSize
    });
  });
  save() {
    if (!this.title) {
      throw new Error("search title not set");
    }
    if (!this.searchId || !SuiteScriptMocks.searches.has({
      searchId: this.searchId
    })) {
      if (SuiteScriptMocks.searches.has({
        id: this.id
      })) {
        throw new Error("search script id is already in use");
      }
      if (SuiteScriptMocks.searches.has({
        title: this.title
      })) {
        throw new Error("search title is already in use");
      }
    }
    if (!this.searchId) {
      this.searchId = Math.max(SuiteScriptMocks.searches.map(a => a.searchId)) + 1;
    }
    if (!this.id) {
      this.id = `customsearch_${this.searchId}`;
    }
    SuiteScriptMocks.searches.set(new _Search(this));
  }
  static {
    _initClass();
  }
}
module.exports = _Search;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb2x1bW4iLCJyZXF1aXJlIiwiUmVzdWx0U2V0IiwiUGFnZWREYXRhIiwiU3VpdGVTY3JpcHRNb2NrcyIsIm9wdGlvbnMiLCJhZGRQcm9taXNlIiwiYXNzaWduQ29uc3RydWN0b3IiLCJpZCIsInNlYXJjaElkIiwic2VhcmNoVHlwZSIsInRpdGxlIiwiY29sdW1ucyIsImZpbHRlcnMiLCJyZXN1bHRzIiwicnVuIiwicnVuUGFnZWQiLCJwYWdlU2l6ZSIsIkVycm9yIiwic2F2ZSIsInNlYXJjaGVzIiwiaGFzIiwiTWF0aCIsIm1heCIsIm1hcCIsImEiLCJzZXQiLCJTZWFyY2giLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vY2tzL3NlYXJjaC9TZWFyY2guY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENvbHVtbiA9IHJlcXVpcmUoXCIuL0NvbHVtbi5janNcIilcbmNvbnN0IFJlc3VsdFNldCA9IHJlcXVpcmUoXCIuL1Jlc3VsdFNldC5janNcIilcbmNvbnN0IFBhZ2VkRGF0YSA9IHJlcXVpcmUoXCIuL1BhZ2VkRGF0YS5janNcIilcbmNvbnN0IFN1aXRlU2NyaXB0TW9ja3MgPSByZXF1aXJlKFwiLi4vLi4vLi4vaW5kZXguY2pzXCIpXG5jb25zdCB7IG9wdGlvbnMsIGFkZFByb21pc2UsIGFzc2lnbkNvbnN0cnVjdG9yIH0gPSByZXF1aXJlKFwiLi4vLi4vaGVscGVycy5janNcIilcblxuQGFzc2lnbkNvbnN0cnVjdG9yKClcbmNsYXNzIFNlYXJjaCB7XG4gICAgaWRcbiAgICBzZWFyY2hJZFxuICAgIHNlYXJjaFR5cGVcbiAgICB0aXRsZVxuICAgIGNvbHVtbnNcbiAgICBmaWx0ZXJzXG4gICAgcmVzdWx0c1xuXG4gICAgcnVuID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdFNldCh7XG4gICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNvbHVtbnMsXG4gICAgICAgICAgICByZXN1bHRzOiB0aGlzLnJlc3VsdHNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBAb3B0aW9ucyhcInBhZ2VTaXplXCIpXG4gICAgcnVuUGFnZWQgPSBvcHRpb25zID0+IHtcbiAgICAgICAgY29uc3QgcGFnZVNpemUgPSBvcHRpb25zLnBhZ2VTaXplIHx8IDUwXG4gICAgICAgIGlmKHBhZ2VTaXplIDwgNSB8fCBwYWdlU2l6ZSA+IDEwMDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInBhZ2Ugc2l6ZSBpcyBvdXRzaWRlIGFsbG93ZWQgcmFuZ2VcIilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBhZ2VkRGF0YSh7XG4gICAgICAgICAgICByZXN1bHRzOiB0aGlzLnJlc3VsdHMgfHwgW10sXG4gICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemVcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICBpZighdGhpcy50aXRsZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2VhcmNoIHRpdGxlIG5vdCBzZXRcIilcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5zZWFyY2hJZCB8fCAhU3VpdGVTY3JpcHRNb2Nrcy5zZWFyY2hlcy5oYXMoe3NlYXJjaElkOiB0aGlzLnNlYXJjaElkfSkpIHtcbiAgICAgICAgICAgIGlmKFN1aXRlU2NyaXB0TW9ja3Muc2VhcmNoZXMuaGFzKHtpZDogdGhpcy5pZH0pKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2VhcmNoIHNjcmlwdCBpZCBpcyBhbHJlYWR5IGluIHVzZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoU3VpdGVTY3JpcHRNb2Nrcy5zZWFyY2hlcy5oYXMoe3RpdGxlOiB0aGlzLnRpdGxlfSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZWFyY2ggdGl0bGUgaXMgYWxyZWFkeSBpbiB1c2VcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5zZWFyY2hJZCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJZCA9IE1hdGgubWF4KFN1aXRlU2NyaXB0TW9ja3Muc2VhcmNoZXMubWFwKGEgPT4gYS5zZWFyY2hJZCkpICsgMVxuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmlkKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gYGN1c3RvbXNlYXJjaF8ke3RoaXMuc2VhcmNoSWR9YFxuICAgICAgICB9XG4gICAgICAgIFN1aXRlU2NyaXB0TW9ja3Muc2VhcmNoZXMuc2V0KG5ldyBTZWFyY2godGhpcykpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlYXJjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFNQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxjQUFjLENBQUM7QUFDdEMsTUFBTUMsU0FBUyxHQUFHRCxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDNUMsTUFBTUUsU0FBUyxHQUFHRixPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDNUMsTUFBTUcsZ0JBQWdCLEdBQUdILE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztBQUN0RCxNQUFNO0VBQUVJLE9BQU87RUFBRUMsVUFBVTtFQUFFQztBQUFrQixDQUFDLEdBQUdOLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUFBO0FBQUEsT0FFOUVNLGlCQUFpQixFQUFFO0FBQUEsUUFpQmZGLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFqQnhCLGFBQ2E7RUFBQTtJQUFBO0VBQUE7RUFDVEcsRUFBRTtFQUNGQyxRQUFRO0VBQ1JDLFVBQVU7RUFDVkMsS0FBSztFQUNMQyxPQUFPO0VBQ1BDLE9BQU87RUFDUEMsT0FBTztFQUVQQyxHQUFHLEdBQUcsTUFBTTtJQUNSLE9BQU8sSUFBSWIsU0FBUyxDQUFDO01BQ2pCVSxPQUFPLEVBQUUsSUFBSSxDQUFDQSxPQUFPO01BQ3JCRSxPQUFPLEVBQUUsSUFBSSxDQUFDQTtJQUNsQixDQUFDLENBQUM7RUFDTixDQUFDO0VBR0RFLFFBQVEsd0JBQUdYLE9BQU8sSUFBSTtJQUNsQixNQUFNWSxRQUFRLEdBQUdaLE9BQU8sQ0FBQ1ksUUFBUSxJQUFJLEVBQUU7SUFDdkMsSUFBR0EsUUFBUSxHQUFHLENBQUMsSUFBSUEsUUFBUSxHQUFHLElBQUksRUFBRTtNQUNoQyxNQUFNLElBQUlDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQztJQUN6RDtJQUNBLE9BQU8sSUFBSWYsU0FBUyxDQUFDO01BQ2pCVyxPQUFPLEVBQUUsSUFBSSxDQUFDQSxPQUFPLElBQUksRUFBRTtNQUMzQkcsUUFBUSxFQUFFQTtJQUNkLENBQUMsQ0FBQztFQUNOLENBQUM7RUFFREUsSUFBSSxHQUFHO0lBQ0gsSUFBRyxDQUFDLElBQUksQ0FBQ1IsS0FBSyxFQUFFO01BQ1osTUFBTSxJQUFJTyxLQUFLLENBQUMsc0JBQXNCLENBQUM7SUFDM0M7SUFDQSxJQUFHLENBQUMsSUFBSSxDQUFDVCxRQUFRLElBQUksQ0FBQ0wsZ0JBQWdCLENBQUNnQixRQUFRLENBQUNDLEdBQUcsQ0FBQztNQUFDWixRQUFRLEVBQUUsSUFBSSxDQUFDQTtJQUFRLENBQUMsQ0FBQyxFQUFFO01BQzVFLElBQUdMLGdCQUFnQixDQUFDZ0IsUUFBUSxDQUFDQyxHQUFHLENBQUM7UUFBQ2IsRUFBRSxFQUFFLElBQUksQ0FBQ0E7TUFBRSxDQUFDLENBQUMsRUFBRTtRQUM3QyxNQUFNLElBQUlVLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQztNQUN6RDtNQUNBLElBQUdkLGdCQUFnQixDQUFDZ0IsUUFBUSxDQUFDQyxHQUFHLENBQUM7UUFBQ1YsS0FBSyxFQUFFLElBQUksQ0FBQ0E7TUFBSyxDQUFDLENBQUMsRUFBRTtRQUNuRCxNQUFNLElBQUlPLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQztNQUNyRDtJQUNKO0lBQ0EsSUFBRyxDQUFDLElBQUksQ0FBQ1QsUUFBUSxFQUFFO01BQ2YsSUFBSSxDQUFDQSxRQUFRLEdBQUdhLElBQUksQ0FBQ0MsR0FBRyxDQUFDbkIsZ0JBQWdCLENBQUNnQixRQUFRLENBQUNJLEdBQUcsQ0FBQ0MsQ0FBQyxJQUFJQSxDQUFDLENBQUNoQixRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDaEY7SUFDQSxJQUFHLENBQUMsSUFBSSxDQUFDRCxFQUFFLEVBQUU7TUFDVCxJQUFJLENBQUNBLEVBQUUsR0FBSSxnQkFBZSxJQUFJLENBQUNDLFFBQVMsRUFBQztJQUM3QztJQUNBTCxnQkFBZ0IsQ0FBQ2dCLFFBQVEsQ0FBQ00sR0FBRyxDQUFDLElBQUlDLE9BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNuRDtFQUFDO0lBQUE7RUFBQTtBQUNMO0FBRUFDLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHRixPQUFNIn0=