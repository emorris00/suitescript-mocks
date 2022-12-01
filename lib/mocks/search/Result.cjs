var _initClass, _dec, _dec2, _init_getText, _dec3, _init_getValue;
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
const Column = require("./Column");
const {
  options,
  assignConstructor,
  toRecord
} = require("../../helpers.cjs");
let _Result;
_dec = assignConstructor();
_dec2 = options("name", "join", "summary", "func");
_dec3 = options("name", "join", "summary", "func");
class Result {
  static {
    [_init_getText, _init_getValue, _Result, _initClass] = _applyDecs(this, [[_dec2, 0, "getText"], [_dec3, 0, "getValue"]], [_dec]);
  }
  id;
  recordType;
  columns;
  values = [];
  getText = _init_getText(this, options => {
    const column = typeof options.name === "object" && options.name instanceof Column ? options.name : new Column(options);
    const index = this.columns.findIndex(a => toRecord(a) == toRecord(column));
    const field = this.values[index];
    return typeof field === "object" && field !== null ? field.text || field.value : field;
  });
  getValue = _init_getValue(this, options => {
    const column = typeof options.name === "object" && options.name instanceof Column ? options.name : new Column(options);
    const index = this.columns.findIndex(a => toRecord(a) == toRecord(column));
    const field = this.values[index];
    return typeof field === "object" && field !== null ? field.value : field;
  });
  static {
    _initClass();
  }
}
module.exports = _Result;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb2x1bW4iLCJyZXF1aXJlIiwib3B0aW9ucyIsImFzc2lnbkNvbnN0cnVjdG9yIiwidG9SZWNvcmQiLCJpZCIsInJlY29yZFR5cGUiLCJjb2x1bW5zIiwidmFsdWVzIiwiZ2V0VGV4dCIsImNvbHVtbiIsIm5hbWUiLCJpbmRleCIsImZpbmRJbmRleCIsImEiLCJmaWVsZCIsInRleHQiLCJ2YWx1ZSIsImdldFZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyIsIlJlc3VsdCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2Nrcy9zZWFyY2gvUmVzdWx0LmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDb2x1bW4gPSByZXF1aXJlKFwiLi9Db2x1bW5cIilcbmNvbnN0IHsgb3B0aW9ucywgYXNzaWduQ29uc3RydWN0b3IsIHRvUmVjb3JkIH0gPSByZXF1aXJlKFwiLi4vLi4vaGVscGVycy5janNcIik7XG5cbkBhc3NpZ25Db25zdHJ1Y3RvcigpXG5jbGFzcyBSZXN1bHQge1xuICAgIGlkXG4gICAgcmVjb3JkVHlwZVxuICAgIGNvbHVtbnNcbiAgICB2YWx1ZXMgPSBbXVxuXG4gICAgQG9wdGlvbnMoXCJuYW1lXCIsIFwiam9pblwiLCBcInN1bW1hcnlcIiwgXCJmdW5jXCIpXG4gICAgZ2V0VGV4dCA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBjb25zdCBjb2x1bW4gPSB0eXBlb2Ygb3B0aW9ucy5uYW1lID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMubmFtZSBpbnN0YW5jZW9mIENvbHVtblxuICAgICAgICAgICAgPyBvcHRpb25zLm5hbWVcbiAgICAgICAgICAgIDogbmV3IENvbHVtbihvcHRpb25zKVxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY29sdW1ucy5maW5kSW5kZXgoYSA9PiB0b1JlY29yZChhKSA9PSB0b1JlY29yZChjb2x1bW4pKVxuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMudmFsdWVzW2luZGV4XVxuICAgICAgICByZXR1cm4gdHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsID8gKGZpZWxkLnRleHQgfHwgZmllbGQudmFsdWUpIDogZmllbGRcbiAgICB9XG5cbiAgICBAb3B0aW9ucyhcIm5hbWVcIiwgXCJqb2luXCIsIFwic3VtbWFyeVwiLCBcImZ1bmNcIilcbiAgICBnZXRWYWx1ZSA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBjb25zdCBjb2x1bW4gPSB0eXBlb2Ygb3B0aW9ucy5uYW1lID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMubmFtZSBpbnN0YW5jZW9mIENvbHVtblxuICAgICAgICAgICAgPyBvcHRpb25zLm5hbWVcbiAgICAgICAgICAgIDogbmV3IENvbHVtbihvcHRpb25zKVxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY29sdW1ucy5maW5kSW5kZXgoYSA9PiB0b1JlY29yZChhKSA9PSB0b1JlY29yZChjb2x1bW4pKVxuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMudmFsdWVzW2luZGV4XVxuICAgICAgICByZXR1cm4gdHlwZW9mIGZpZWxkID09PSBcIm9iamVjdFwiICYmIGZpZWxkICE9PSBudWxsID8gZmllbGQudmFsdWUgOiBmaWVsZFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsTUFBTUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ2xDLE1BQU07RUFBRUMsT0FBTztFQUFFQyxpQkFBaUI7RUFBRUM7QUFBUyxDQUFDLEdBQUdILE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUFDO0FBQUEsT0FFN0VFLGlCQUFpQixFQUFFO0FBQUEsUUFPZkQsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQztBQUFBLFFBVTFDQSxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDO0FBakIvQyxhQUNhO0VBQUE7SUFBQTtFQUFBO0VBQ1RHLEVBQUU7RUFDRkMsVUFBVTtFQUNWQyxPQUFPO0VBQ1BDLE1BQU0sR0FBRyxFQUFFO0VBR1hDLE9BQU8sdUJBQUdQLE9BQU8sSUFBSTtJQUNqQixNQUFNUSxNQUFNLEdBQUcsT0FBT1IsT0FBTyxDQUFDUyxJQUFJLEtBQUssUUFBUSxJQUFJVCxPQUFPLENBQUNTLElBQUksWUFBWVgsTUFBTSxHQUMzRUUsT0FBTyxDQUFDUyxJQUFJLEdBQ1osSUFBSVgsTUFBTSxDQUFDRSxPQUFPLENBQUM7SUFDekIsTUFBTVUsS0FBSyxHQUFHLElBQUksQ0FBQ0wsT0FBTyxDQUFDTSxTQUFTLENBQUNDLENBQUMsSUFBSVYsUUFBUSxDQUFDVSxDQUFDLENBQUMsSUFBSVYsUUFBUSxDQUFDTSxNQUFNLENBQUMsQ0FBQztJQUMxRSxNQUFNSyxLQUFLLEdBQUcsSUFBSSxDQUFDUCxNQUFNLENBQUNJLEtBQUssQ0FBQztJQUNoQyxPQUFPLE9BQU9HLEtBQUssS0FBSyxRQUFRLElBQUlBLEtBQUssS0FBSyxJQUFJLEdBQUlBLEtBQUssQ0FBQ0MsSUFBSSxJQUFJRCxLQUFLLENBQUNFLEtBQUssR0FBSUYsS0FBSztFQUM1RixDQUFDO0VBR0RHLFFBQVEsd0JBQUdoQixPQUFPLElBQUk7SUFDbEIsTUFBTVEsTUFBTSxHQUFHLE9BQU9SLE9BQU8sQ0FBQ1MsSUFBSSxLQUFLLFFBQVEsSUFBSVQsT0FBTyxDQUFDUyxJQUFJLFlBQVlYLE1BQU0sR0FDM0VFLE9BQU8sQ0FBQ1MsSUFBSSxHQUNaLElBQUlYLE1BQU0sQ0FBQ0UsT0FBTyxDQUFDO0lBQ3pCLE1BQU1VLEtBQUssR0FBRyxJQUFJLENBQUNMLE9BQU8sQ0FBQ00sU0FBUyxDQUFDQyxDQUFDLElBQUlWLFFBQVEsQ0FBQ1UsQ0FBQyxDQUFDLElBQUlWLFFBQVEsQ0FBQ00sTUFBTSxDQUFDLENBQUM7SUFDMUUsTUFBTUssS0FBSyxHQUFHLElBQUksQ0FBQ1AsTUFBTSxDQUFDSSxLQUFLLENBQUM7SUFDaEMsT0FBTyxPQUFPRyxLQUFLLEtBQUssUUFBUSxJQUFJQSxLQUFLLEtBQUssSUFBSSxHQUFHQSxLQUFLLENBQUNFLEtBQUssR0FBR0YsS0FBSztFQUM1RSxDQUFDO0VBQUE7SUFBQTtFQUFBO0FBQ0w7QUFFQUksTUFBTSxDQUFDQyxPQUFPLEdBQUdDLE9BQU0ifQ==