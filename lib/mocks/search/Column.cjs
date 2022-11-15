var _dec, _init_setWhenOrderedBy;
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
const {
  Record
} = require("@bloomberg/record-tuple-polyfill");
const {
  options
} = require("../../helpers.cjs");
_dec = options("name", "join");
class Column {
  static {
    [_init_setWhenOrderedBy] = _applyDecs(this, [[_dec, 0, "setWhenOrderedBy"]], []);
  }
  constructor({
    name,
    join,
    summary,
    formula,
    "function": func,
    label,
    sort
  }) {
    this.name = name;
    this.join = join;
    this.summary = summary;
    this.formula = formula;
    this.function = func;
    this.label = label;
    this.sort = sort;
  }
  setWhenOrderedBy = _init_setWhenOrderedBy(this, () => {
    // idk what this is supposed to do
  });
  toRecord() {
    return Record({
      name: this.name,
      join: this.join,
      summary: this.summary,
      formula: this.formula,
      function: this.function,
      label: this.label,
      sort: this.sort
    });
  }
}
module.exports = Column;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWNvcmQiLCJyZXF1aXJlIiwib3B0aW9ucyIsIkNvbHVtbiIsImNvbnN0cnVjdG9yIiwibmFtZSIsImpvaW4iLCJzdW1tYXJ5IiwiZm9ybXVsYSIsImZ1bmMiLCJsYWJlbCIsInNvcnQiLCJmdW5jdGlvbiIsInNldFdoZW5PcmRlcmVkQnkiLCJ0b1JlY29yZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9ja3Mvc2VhcmNoL0NvbHVtbi5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBSZWNvcmQgfSA9IHJlcXVpcmUoXCJAYmxvb21iZXJnL3JlY29yZC10dXBsZS1wb2x5ZmlsbFwiKVxyXG5jb25zdCB7IG9wdGlvbnMgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKVxyXG5cclxuY2xhc3MgQ29sdW1uIHtcclxuICAgIGNvbnN0cnVjdG9yKHtuYW1lLCBqb2luLCBzdW1tYXJ5LCBmb3JtdWxhLCBcImZ1bmN0aW9uXCI6IGZ1bmMsIGxhYmVsLCBzb3J0fSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5qb2luID0gam9pblxyXG4gICAgICAgIHRoaXMuc3VtbWFyeSA9IHN1bW1hcnlcclxuICAgICAgICB0aGlzLmZvcm11bGEgPSBmb3JtdWxhXHJcbiAgICAgICAgdGhpcy5mdW5jdGlvbiA9IGZ1bmNcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWxcclxuICAgICAgICB0aGlzLnNvcnQgPSBzb3J0XHJcbiAgICB9XHJcblxyXG4gICAgQG9wdGlvbnMoXCJuYW1lXCIsIFwiam9pblwiKVxyXG4gICAgc2V0V2hlbk9yZGVyZWRCeSA9ICgpID0+IHtcclxuICAgICAgICAvLyBpZGsgd2hhdCB0aGlzIGlzIHN1cHBvc2VkIHRvIGRvXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRvUmVjb3JkKCkge1xyXG4gICAgICAgIHJldHVybiBSZWNvcmQoe1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIGpvaW46IHRoaXMuam9pbixcclxuICAgICAgICAgICAgc3VtbWFyeTogdGhpcy5zdW1tYXJ5LFxyXG4gICAgICAgICAgICBmb3JtdWxhOiB0aGlzLmZvcm11bGEsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uOiB0aGlzLmZ1bmN0aW9uLFxyXG4gICAgICAgICAgICBsYWJlbDogdGhpcy5sYWJlbCxcclxuICAgICAgICAgICAgc29ydDogdGhpcy5zb3J0XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb2x1bW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtFQUFFQTtBQUFPLENBQUMsR0FBR0MsT0FBTyxDQUFDLGtDQUFrQyxDQUFDO0FBQzlELE1BQU07RUFBRUM7QUFBUSxDQUFDLEdBQUdELE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUFBLE9BYTNDQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztBQVg1QixNQUFNQyxNQUFNLENBQUM7RUFBQTtJQUFBO0VBQUE7RUFDVEMsV0FBVyxDQUFDO0lBQUNDLElBQUk7SUFBRUMsSUFBSTtJQUFFQyxPQUFPO0lBQUVDLE9BQU87SUFBRSxVQUFVLEVBQUVDLElBQUk7SUFBRUMsS0FBSztJQUFFQztFQUFJLENBQUMsRUFBRTtJQUN2RSxJQUFJLENBQUNOLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUNDLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUNDLE9BQU8sR0FBR0EsT0FBTztJQUN0QixJQUFJLENBQUNDLE9BQU8sR0FBR0EsT0FBTztJQUN0QixJQUFJLENBQUNJLFFBQVEsR0FBR0gsSUFBSTtJQUNwQixJQUFJLENBQUNDLEtBQUssR0FBR0EsS0FBSztJQUNsQixJQUFJLENBQUNDLElBQUksR0FBR0EsSUFBSTtFQUNwQjtFQUdBRSxnQkFBZ0IsZ0NBQUcsTUFBTTtJQUNyQjtFQUFBLENBQ0g7RUFFREMsUUFBUSxHQUFHO0lBQ1AsT0FBT2QsTUFBTSxDQUFDO01BQ1ZLLElBQUksRUFBRSxJQUFJLENBQUNBLElBQUk7TUFDZkMsSUFBSSxFQUFFLElBQUksQ0FBQ0EsSUFBSTtNQUNmQyxPQUFPLEVBQUUsSUFBSSxDQUFDQSxPQUFPO01BQ3JCQyxPQUFPLEVBQUUsSUFBSSxDQUFDQSxPQUFPO01BQ3JCSSxRQUFRLEVBQUUsSUFBSSxDQUFDQSxRQUFRO01BQ3ZCRixLQUFLLEVBQUUsSUFBSSxDQUFDQSxLQUFLO01BQ2pCQyxJQUFJLEVBQUUsSUFBSSxDQUFDQTtJQUNmLENBQUMsQ0FBQztFQUNOO0FBQ0o7QUFFQUksTUFBTSxDQUFDQyxPQUFPLEdBQUdiLE1BQU0ifQ==