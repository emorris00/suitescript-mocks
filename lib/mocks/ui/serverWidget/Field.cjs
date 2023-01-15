var _initClass, _dec, _dec2, _dec3, _init_addSelectOption, _dec4, _init_getSelectOptions, _dec5, _dec6, _init_setHelpText, _dec7, _dec8, _init_updateBreakType, _dec9, _dec10, _init_updateDisplaySize, _dec11, _dec12, _init_updateDisplayType, _dec13, _dec14, _init_updateLayoutType;
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
  options,
  required,
  assignConstructor
} = require("../../../helpers.cjs");
let _Field;
_dec = assignConstructor();
_dec2 = options("value", "text", "isSelected");
_dec3 = required("value", "text");
_dec4 = options("filter", "filteroperator");
_dec5 = options("help", "showInlineForAssistant");
_dec6 = required("help");
_dec7 = options("breakType");
_dec8 = required("breakType");
_dec9 = options("height", "width");
_dec10 = required("height", "width");
_dec11 = options("displayType");
_dec12 = required("displayType");
_dec13 = options("layoutType");
_dec14 = required("layoutType");
class Field {
  static {
    [_init_addSelectOption, _init_getSelectOptions, _init_setHelpText, _init_updateBreakType, _init_updateDisplaySize, _init_updateDisplayType, _init_updateLayoutType, _Field, _initClass] = _applyDecs(this, [[[_dec2, _dec3], 0, "addSelectOption"], [_dec4, 0, "getSelectOptions"], [[_dec5, _dec6], 0, "setHelpText"], [[_dec7, _dec8], 0, "updateBreakType"], [[_dec9, _dec10], 0, "updateDisplaySize"], [[_dec11, _dec12], 0, "updateDisplayType"], [[_dec13, _dec14], 0, "updateLayoutType"]], [_dec]);
  }
  alias;
  defaultValue;
  helpText;
  id;
  isMandatory = false;
  label;
  linkText;
  maxLength;
  padding;
  richTextHeight;
  richTextWidth;
  type;
  source;
  container;
  help;
  options;
  height;
  width;
  addSelectOption = _init_addSelectOption(this, options => {
    this.options.push(options);
  });

  // TODO
  getSelectOptions = _init_getSelectOptions(this, options => {
    return this.options;
  });
  setHelpText = _init_setHelpText(this, options => {
    this.help = options.help;
    return this;
  });
  updateBreakType = _init_updateBreakType(this, options => {
    this.breakType = options.breakType;
    return this;
  });
  updateDisplaySize = _init_updateDisplaySize(this, options => {
    this.height = options.height;
    this.width = options.width;
    return this;
  });
  updateDisplayType = _init_updateDisplayType(this, options => {
    this.displayType = options.displayType;
    return this;
  });
  updateLayoutType = _init_updateLayoutType(this, options => {
    this.layoutType = options.layoutType;
    return this;
  });
  static {
    _initClass();
  }
}
module.exports = _Field;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25zIiwicmVxdWlyZWQiLCJhc3NpZ25Db25zdHJ1Y3RvciIsInJlcXVpcmUiLCJhbGlhcyIsImRlZmF1bHRWYWx1ZSIsImhlbHBUZXh0IiwiaWQiLCJpc01hbmRhdG9yeSIsImxhYmVsIiwibGlua1RleHQiLCJtYXhMZW5ndGgiLCJwYWRkaW5nIiwicmljaFRleHRIZWlnaHQiLCJyaWNoVGV4dFdpZHRoIiwidHlwZSIsInNvdXJjZSIsImNvbnRhaW5lciIsImhlbHAiLCJoZWlnaHQiLCJ3aWR0aCIsImFkZFNlbGVjdE9wdGlvbiIsInB1c2giLCJnZXRTZWxlY3RPcHRpb25zIiwic2V0SGVscFRleHQiLCJ1cGRhdGVCcmVha1R5cGUiLCJicmVha1R5cGUiLCJ1cGRhdGVEaXNwbGF5U2l6ZSIsInVwZGF0ZURpc3BsYXlUeXBlIiwiZGlzcGxheVR5cGUiLCJ1cGRhdGVMYXlvdXRUeXBlIiwibGF5b3V0VHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJGaWVsZCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2Nrcy91aS9zZXJ2ZXJXaWRnZXQvRmllbGQuY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgb3B0aW9ucywgcmVxdWlyZWQsIGFzc2lnbkNvbnN0cnVjdG9yIH0gPSByZXF1aXJlKFwiLi4vLi4vLi4vaGVscGVycy5janNcIik7XG5cbkBhc3NpZ25Db25zdHJ1Y3RvcigpXG5jbGFzcyBGaWVsZCB7XG5cdGFsaWFzO1xuXHRkZWZhdWx0VmFsdWU7XG5cdGhlbHBUZXh0O1xuXHRpZDtcblx0aXNNYW5kYXRvcnkgPSBmYWxzZTtcblx0bGFiZWw7XG5cdGxpbmtUZXh0O1xuXHRtYXhMZW5ndGg7XG5cdHBhZGRpbmc7XG5cdHJpY2hUZXh0SGVpZ2h0O1xuXHRyaWNoVGV4dFdpZHRoO1xuXHR0eXBlO1xuXHRzb3VyY2U7XG5cdGNvbnRhaW5lcjtcblx0aGVscDtcblx0b3B0aW9ucztcblx0aGVpZ2h0O1xuXHR3aWR0aDtcblxuXHRAb3B0aW9ucyhcInZhbHVlXCIsIFwidGV4dFwiLCBcImlzU2VsZWN0ZWRcIilcblx0QHJlcXVpcmVkKFwidmFsdWVcIiwgXCJ0ZXh0XCIpXG5cdGFkZFNlbGVjdE9wdGlvbiA9IChvcHRpb25zKSA9PiB7XG5cdFx0dGhpcy5vcHRpb25zLnB1c2gob3B0aW9ucyk7XG5cdH07XG5cblx0Ly8gVE9ET1xuXHRAb3B0aW9ucyhcImZpbHRlclwiLCBcImZpbHRlcm9wZXJhdG9yXCIpXG5cdGdldFNlbGVjdE9wdGlvbnMgPSAob3B0aW9ucykgPT4ge1xuXHRcdHJldHVybiB0aGlzLm9wdGlvbnM7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJoZWxwXCIsIFwic2hvd0lubGluZUZvckFzc2lzdGFudFwiKVxuXHRAcmVxdWlyZWQoXCJoZWxwXCIpXG5cdHNldEhlbHBUZXh0ID0gKG9wdGlvbnMpID0+IHtcblx0XHR0aGlzLmhlbHAgPSBvcHRpb25zLmhlbHA7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJicmVha1R5cGVcIilcblx0QHJlcXVpcmVkKFwiYnJlYWtUeXBlXCIpXG5cdHVwZGF0ZUJyZWFrVHlwZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0dGhpcy5icmVha1R5cGUgPSBvcHRpb25zLmJyZWFrVHlwZTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHRAb3B0aW9ucyhcImhlaWdodFwiLCBcIndpZHRoXCIpXG5cdEByZXF1aXJlZChcImhlaWdodFwiLCBcIndpZHRoXCIpXG5cdHVwZGF0ZURpc3BsYXlTaXplID0gKG9wdGlvbnMpID0+IHtcblx0XHR0aGlzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0O1xuXHRcdHRoaXMud2lkdGggPSBvcHRpb25zLndpZHRoO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiZGlzcGxheVR5cGVcIilcblx0QHJlcXVpcmVkKFwiZGlzcGxheVR5cGVcIilcblx0dXBkYXRlRGlzcGxheVR5cGUgPSAob3B0aW9ucykgPT4ge1xuXHRcdHRoaXMuZGlzcGxheVR5cGUgPSBvcHRpb25zLmRpc3BsYXlUeXBlO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwibGF5b3V0VHlwZVwiKVxuXHRAcmVxdWlyZWQoXCJsYXlvdXRUeXBlXCIpXG5cdHVwZGF0ZUxheW91dFR5cGUgPSAob3B0aW9ucykgPT4ge1xuXHRcdHRoaXMubGF5b3V0VHlwZSA9IG9wdGlvbnMubGF5b3V0VHlwZTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0VBQUVBLE9BQU87RUFBRUMsUUFBUTtFQUFFQztBQUFrQixDQUFDLEdBQUdDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztBQUFDO0FBQUEsT0FFaEZELGlCQUFpQixFQUFFO0FBQUEsUUFxQmxCRixPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUM7QUFBQSxRQUN0Q0MsUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7QUFBQSxRQU16QkQsT0FBTyxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQztBQUFBLFFBS25DQSxPQUFPLENBQUMsTUFBTSxFQUFFLHdCQUF3QixDQUFDO0FBQUEsUUFDekNDLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFBQSxRQU1oQkQsT0FBTyxDQUFDLFdBQVcsQ0FBQztBQUFBLFFBQ3BCQyxRQUFRLENBQUMsV0FBVyxDQUFDO0FBQUEsUUFNckJELE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO0FBQUEsU0FDMUJDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO0FBQUEsU0FPM0JELE9BQU8sQ0FBQyxhQUFhLENBQUM7QUFBQSxTQUN0QkMsUUFBUSxDQUFDLGFBQWEsQ0FBQztBQUFBLFNBTXZCRCxPQUFPLENBQUMsWUFBWSxDQUFDO0FBQUEsU0FDckJDLFFBQVEsQ0FBQyxZQUFZLENBQUM7QUEvRHhCLFlBQ1k7RUFBQTtJQUFBO0VBQUE7RUFDWEcsS0FBSztFQUNMQyxZQUFZO0VBQ1pDLFFBQVE7RUFDUkMsRUFBRTtFQUNGQyxXQUFXLEdBQUcsS0FBSztFQUNuQkMsS0FBSztFQUNMQyxRQUFRO0VBQ1JDLFNBQVM7RUFDVEMsT0FBTztFQUNQQyxjQUFjO0VBQ2RDLGFBQWE7RUFDYkMsSUFBSTtFQUNKQyxNQUFNO0VBQ05DLFNBQVM7RUFDVEMsSUFBSTtFQUNKbEIsT0FBTztFQUNQbUIsTUFBTTtFQUNOQyxLQUFLO0VBSUxDLGVBQWUsK0JBQUlyQixPQUFPLElBQUs7SUFDOUIsSUFBSSxDQUFDQSxPQUFPLENBQUNzQixJQUFJLENBQUN0QixPQUFPLENBQUM7RUFDM0IsQ0FBQzs7RUFFRDtFQUVBdUIsZ0JBQWdCLGdDQUFJdkIsT0FBTyxJQUFLO0lBQy9CLE9BQU8sSUFBSSxDQUFDQSxPQUFPO0VBQ3BCLENBQUM7RUFJRHdCLFdBQVcsMkJBQUl4QixPQUFPLElBQUs7SUFDMUIsSUFBSSxDQUFDa0IsSUFBSSxHQUFHbEIsT0FBTyxDQUFDa0IsSUFBSTtJQUN4QixPQUFPLElBQUk7RUFDWixDQUFDO0VBSURPLGVBQWUsK0JBQUl6QixPQUFPLElBQUs7SUFDOUIsSUFBSSxDQUFDMEIsU0FBUyxHQUFHMUIsT0FBTyxDQUFDMEIsU0FBUztJQUNsQyxPQUFPLElBQUk7RUFDWixDQUFDO0VBSURDLGlCQUFpQixpQ0FBSTNCLE9BQU8sSUFBSztJQUNoQyxJQUFJLENBQUNtQixNQUFNLEdBQUduQixPQUFPLENBQUNtQixNQUFNO0lBQzVCLElBQUksQ0FBQ0MsS0FBSyxHQUFHcEIsT0FBTyxDQUFDb0IsS0FBSztJQUMxQixPQUFPLElBQUk7RUFDWixDQUFDO0VBSURRLGlCQUFpQixpQ0FBSTVCLE9BQU8sSUFBSztJQUNoQyxJQUFJLENBQUM2QixXQUFXLEdBQUc3QixPQUFPLENBQUM2QixXQUFXO0lBQ3RDLE9BQU8sSUFBSTtFQUNaLENBQUM7RUFJREMsZ0JBQWdCLGdDQUFJOUIsT0FBTyxJQUFLO0lBQy9CLElBQUksQ0FBQytCLFVBQVUsR0FBRy9CLE9BQU8sQ0FBQytCLFVBQVU7SUFDcEMsT0FBTyxJQUFJO0VBQ1osQ0FBQztFQUFDO0lBQUE7RUFBQTtBQUNIO0FBRUFDLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHQyxNQUFLIn0=