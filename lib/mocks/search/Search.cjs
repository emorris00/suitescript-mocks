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
const ResultSet = require("./ResultSet.cjs");
const PagedData = require("./PagedData.cjs");
const SuiteScriptMocks = require("../../../index.cjs");
const {
  options,
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
    SuiteScriptMocks.runSearches.push(this);
    return new ResultSet({
      columns: this.columns,
      results: this.results
    });
  };
  runPaged = _init_runPaged(this, options => {
    SuiteScriptMocks.runSearches.push(this);
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
      this.searchId = Math.max(Array.from(SuiteScriptMocks.searches.values()).map(a => a.searchId)) + 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZXN1bHRTZXQiLCJyZXF1aXJlIiwiUGFnZWREYXRhIiwiU3VpdGVTY3JpcHRNb2NrcyIsIm9wdGlvbnMiLCJhc3NpZ25Db25zdHJ1Y3RvciIsImlkIiwic2VhcmNoSWQiLCJzZWFyY2hUeXBlIiwidGl0bGUiLCJjb2x1bW5zIiwiZmlsdGVycyIsInJlc3VsdHMiLCJydW4iLCJydW5TZWFyY2hlcyIsInB1c2giLCJydW5QYWdlZCIsInBhZ2VTaXplIiwiRXJyb3IiLCJzYXZlIiwic2VhcmNoZXMiLCJoYXMiLCJNYXRoIiwibWF4IiwiQXJyYXkiLCJmcm9tIiwidmFsdWVzIiwibWFwIiwiYSIsInNldCIsIlNlYXJjaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9ja3Mvc2VhcmNoL1NlYXJjaC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUmVzdWx0U2V0ID0gcmVxdWlyZShcIi4vUmVzdWx0U2V0LmNqc1wiKTtcbmNvbnN0IFBhZ2VkRGF0YSA9IHJlcXVpcmUoXCIuL1BhZ2VkRGF0YS5janNcIik7XG5jb25zdCBTdWl0ZVNjcmlwdE1vY2tzID0gcmVxdWlyZShcIi4uLy4uLy4uL2luZGV4LmNqc1wiKTtcbmNvbnN0IHsgb3B0aW9ucywgYXNzaWduQ29uc3RydWN0b3IgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKTtcblxuQGFzc2lnbkNvbnN0cnVjdG9yKClcbmNsYXNzIFNlYXJjaCB7XG5cdGlkO1xuXHRzZWFyY2hJZDtcblx0c2VhcmNoVHlwZTtcblx0dGl0bGU7XG5cdGNvbHVtbnM7XG5cdGZpbHRlcnM7XG5cdHJlc3VsdHM7XG5cblx0cnVuID0gKCkgPT4ge1xuXHRcdFN1aXRlU2NyaXB0TW9ja3MucnVuU2VhcmNoZXMucHVzaCh0aGlzKTtcblx0XHRyZXR1cm4gbmV3IFJlc3VsdFNldCh7XG5cdFx0XHRjb2x1bW5zOiB0aGlzLmNvbHVtbnMsXG5cdFx0XHRyZXN1bHRzOiB0aGlzLnJlc3VsdHMsXG5cdFx0fSk7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJwYWdlU2l6ZVwiKVxuXHRydW5QYWdlZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5ydW5TZWFyY2hlcy5wdXNoKHRoaXMpO1xuXHRcdGNvbnN0IHBhZ2VTaXplID0gb3B0aW9ucy5wYWdlU2l6ZSB8fCA1MDtcblx0XHRpZiAocGFnZVNpemUgPCA1IHx8IHBhZ2VTaXplID4gMTAwMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwicGFnZSBzaXplIGlzIG91dHNpZGUgYWxsb3dlZCByYW5nZVwiKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ldyBQYWdlZERhdGEoe1xuXHRcdFx0cmVzdWx0czogdGhpcy5yZXN1bHRzIHx8IFtdLFxuXHRcdFx0cGFnZVNpemU6IHBhZ2VTaXplLFxuXHRcdH0pO1xuXHR9O1xuXG5cdHNhdmUoKSB7XG5cdFx0aWYgKCF0aGlzLnRpdGxlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzZWFyY2ggdGl0bGUgbm90IHNldFwiKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLnNlYXJjaElkIHx8ICFTdWl0ZVNjcmlwdE1vY2tzLnNlYXJjaGVzLmhhcyh7IHNlYXJjaElkOiB0aGlzLnNlYXJjaElkIH0pKSB7XG5cdFx0XHRpZiAoU3VpdGVTY3JpcHRNb2Nrcy5zZWFyY2hlcy5oYXMoeyBpZDogdGhpcy5pZCB9KSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJzZWFyY2ggc2NyaXB0IGlkIGlzIGFscmVhZHkgaW4gdXNlXCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKFN1aXRlU2NyaXB0TW9ja3Muc2VhcmNoZXMuaGFzKHsgdGl0bGU6IHRoaXMudGl0bGUgfSkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwic2VhcmNoIHRpdGxlIGlzIGFscmVhZHkgaW4gdXNlXCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoIXRoaXMuc2VhcmNoSWQpIHtcblx0XHRcdHRoaXMuc2VhcmNoSWQgPSBNYXRoLm1heChBcnJheS5mcm9tKFN1aXRlU2NyaXB0TW9ja3Muc2VhcmNoZXMudmFsdWVzKCkpLm1hcCgoYSkgPT4gYS5zZWFyY2hJZCkpICsgMTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmlkKSB7XG5cdFx0XHR0aGlzLmlkID0gYGN1c3RvbXNlYXJjaF8ke3RoaXMuc2VhcmNoSWR9YDtcblx0XHR9XG5cdFx0U3VpdGVTY3JpcHRNb2Nrcy5zZWFyY2hlcy5zZXQobmV3IFNlYXJjaCh0aGlzKSk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZWFyY2g7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsTUFBTUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDNUMsTUFBTUMsU0FBUyxHQUFHRCxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDNUMsTUFBTUUsZ0JBQWdCLEdBQUdGLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztBQUN0RCxNQUFNO0VBQUVHLE9BQU87RUFBRUM7QUFBa0IsQ0FBQyxHQUFHSixPQUFPLENBQUMsbUJBQW1CLENBQUM7QUFBQztBQUFBLE9BRW5FSSxpQkFBaUIsRUFBRTtBQUFBLFFBa0JsQkQsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQWxCckIsYUFDYTtFQUFBO0lBQUE7RUFBQTtFQUNaRSxFQUFFO0VBQ0ZDLFFBQVE7RUFDUkMsVUFBVTtFQUNWQyxLQUFLO0VBQ0xDLE9BQU87RUFDUEMsT0FBTztFQUNQQyxPQUFPO0VBRVBDLEdBQUcsR0FBRyxNQUFNO0lBQ1hWLGdCQUFnQixDQUFDVyxXQUFXLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDdkMsT0FBTyxJQUFJZixTQUFTLENBQUM7TUFDcEJVLE9BQU8sRUFBRSxJQUFJLENBQUNBLE9BQU87TUFDckJFLE9BQU8sRUFBRSxJQUFJLENBQUNBO0lBQ2YsQ0FBQyxDQUFDO0VBQ0gsQ0FBQztFQUdESSxRQUFRLHdCQUFJWixPQUFPLElBQUs7SUFDdkJELGdCQUFnQixDQUFDVyxXQUFXLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDdkMsTUFBTUUsUUFBUSxHQUFHYixPQUFPLENBQUNhLFFBQVEsSUFBSSxFQUFFO0lBQ3ZDLElBQUlBLFFBQVEsR0FBRyxDQUFDLElBQUlBLFFBQVEsR0FBRyxJQUFJLEVBQUU7TUFDcEMsTUFBTSxJQUFJQyxLQUFLLENBQUMsb0NBQW9DLENBQUM7SUFDdEQ7SUFDQSxPQUFPLElBQUloQixTQUFTLENBQUM7TUFDcEJVLE9BQU8sRUFBRSxJQUFJLENBQUNBLE9BQU8sSUFBSSxFQUFFO01BQzNCSyxRQUFRLEVBQUVBO0lBQ1gsQ0FBQyxDQUFDO0VBQ0gsQ0FBQztFQUVERSxJQUFJLEdBQUc7SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDVixLQUFLLEVBQUU7TUFDaEIsTUFBTSxJQUFJUyxLQUFLLENBQUMsc0JBQXNCLENBQUM7SUFDeEM7SUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDWCxRQUFRLElBQUksQ0FBQ0osZ0JBQWdCLENBQUNpQixRQUFRLENBQUNDLEdBQUcsQ0FBQztNQUFFZCxRQUFRLEVBQUUsSUFBSSxDQUFDQTtJQUFTLENBQUMsQ0FBQyxFQUFFO01BQ2xGLElBQUlKLGdCQUFnQixDQUFDaUIsUUFBUSxDQUFDQyxHQUFHLENBQUM7UUFBRWYsRUFBRSxFQUFFLElBQUksQ0FBQ0E7TUFBRyxDQUFDLENBQUMsRUFBRTtRQUNuRCxNQUFNLElBQUlZLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQztNQUN0RDtNQUNBLElBQUlmLGdCQUFnQixDQUFDaUIsUUFBUSxDQUFDQyxHQUFHLENBQUM7UUFBRVosS0FBSyxFQUFFLElBQUksQ0FBQ0E7TUFBTSxDQUFDLENBQUMsRUFBRTtRQUN6RCxNQUFNLElBQUlTLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQztNQUNsRDtJQUNEO0lBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQ1gsUUFBUSxFQUFFO01BQ25CLElBQUksQ0FBQ0EsUUFBUSxHQUFHZSxJQUFJLENBQUNDLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDQyxJQUFJLENBQUN0QixnQkFBZ0IsQ0FBQ2lCLFFBQVEsQ0FBQ00sTUFBTSxFQUFFLENBQUMsQ0FBQ0MsR0FBRyxDQUFFQyxDQUFDLElBQUtBLENBQUMsQ0FBQ3JCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNwRztJQUNBLElBQUksQ0FBQyxJQUFJLENBQUNELEVBQUUsRUFBRTtNQUNiLElBQUksQ0FBQ0EsRUFBRSxHQUFJLGdCQUFlLElBQUksQ0FBQ0MsUUFBUyxFQUFDO0lBQzFDO0lBQ0FKLGdCQUFnQixDQUFDaUIsUUFBUSxDQUFDUyxHQUFHLENBQUMsSUFBSUMsT0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ2hEO0VBQUM7SUFBQTtFQUFBO0FBQ0Y7QUFFQUMsTUFBTSxDQUFDQyxPQUFPLEdBQUdGLE9BQU0ifQ==