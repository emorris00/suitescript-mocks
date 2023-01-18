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
const serverWidgetStub = require("suitecloud-unit-testing-stubs/stubs/serverWidget.js");
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
  options = [];
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
    if (!Object.values(serverWidgetStub.FieldBreakType).includes(options.breakType)) {
      throw new Error("Invalid value for breakType");
    }
    this.breakType = options.breakType;
    return this;
  });
  updateDisplaySize = _init_updateDisplaySize(this, options => {
    this.height = options.height;
    this.width = options.width;
    return this;
  });
  updateDisplayType = _init_updateDisplayType(this, options => {
    if (!Object.values(serverWidgetStub.FieldDisplayType).includes(options.displayType)) {
      throw new Error("Invalid value for displayType");
    }
    this.displayType = options.displayType;
    return this;
  });
  updateLayoutType = _init_updateLayoutType(this, options => {
    if (!Object.values(serverWidgetStub.FieldLayoutType).includes(options.layoutType)) {
      throw new Error("Invalid value for layoutType");
    }
    this.layoutType = options.layoutType;
    return this;
  });
  static {
    _initClass();
  }
}
module.exports = _Field;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25zIiwicmVxdWlyZWQiLCJhc3NpZ25Db25zdHJ1Y3RvciIsInJlcXVpcmUiLCJzZXJ2ZXJXaWRnZXRTdHViIiwiYWxpYXMiLCJkZWZhdWx0VmFsdWUiLCJoZWxwVGV4dCIsImlkIiwiaXNNYW5kYXRvcnkiLCJsYWJlbCIsImxpbmtUZXh0IiwibWF4TGVuZ3RoIiwicGFkZGluZyIsInJpY2hUZXh0SGVpZ2h0IiwicmljaFRleHRXaWR0aCIsInR5cGUiLCJzb3VyY2UiLCJjb250YWluZXIiLCJoZWxwIiwiaGVpZ2h0Iiwid2lkdGgiLCJhZGRTZWxlY3RPcHRpb24iLCJwdXNoIiwiZ2V0U2VsZWN0T3B0aW9ucyIsInNldEhlbHBUZXh0IiwidXBkYXRlQnJlYWtUeXBlIiwiT2JqZWN0IiwidmFsdWVzIiwiRmllbGRCcmVha1R5cGUiLCJpbmNsdWRlcyIsImJyZWFrVHlwZSIsIkVycm9yIiwidXBkYXRlRGlzcGxheVNpemUiLCJ1cGRhdGVEaXNwbGF5VHlwZSIsIkZpZWxkRGlzcGxheVR5cGUiLCJkaXNwbGF5VHlwZSIsInVwZGF0ZUxheW91dFR5cGUiLCJGaWVsZExheW91dFR5cGUiLCJsYXlvdXRUeXBlIiwibW9kdWxlIiwiZXhwb3J0cyIsIkZpZWxkIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vY2tzL3VpL3NlcnZlcldpZGdldC9GaWVsZC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBvcHRpb25zLCByZXF1aXJlZCwgYXNzaWduQ29uc3RydWN0b3IgfSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9oZWxwZXJzLmNqc1wiKTtcbmNvbnN0IHNlcnZlcldpZGdldFN0dWIgPSByZXF1aXJlKFwic3VpdGVjbG91ZC11bml0LXRlc3Rpbmctc3R1YnMvc3R1YnMvc2VydmVyV2lkZ2V0LmpzXCIpO1xuXG5AYXNzaWduQ29uc3RydWN0b3IoKVxuY2xhc3MgRmllbGQge1xuXHRhbGlhcztcblx0ZGVmYXVsdFZhbHVlO1xuXHRoZWxwVGV4dDtcblx0aWQ7XG5cdGlzTWFuZGF0b3J5ID0gZmFsc2U7XG5cdGxhYmVsO1xuXHRsaW5rVGV4dDtcblx0bWF4TGVuZ3RoO1xuXHRwYWRkaW5nO1xuXHRyaWNoVGV4dEhlaWdodDtcblx0cmljaFRleHRXaWR0aDtcblx0dHlwZTtcblx0c291cmNlO1xuXHRjb250YWluZXI7XG5cdGhlbHA7XG5cdG9wdGlvbnMgPSBbXTtcblx0aGVpZ2h0O1xuXHR3aWR0aDtcblxuXHRAb3B0aW9ucyhcInZhbHVlXCIsIFwidGV4dFwiLCBcImlzU2VsZWN0ZWRcIilcblx0QHJlcXVpcmVkKFwidmFsdWVcIiwgXCJ0ZXh0XCIpXG5cdGFkZFNlbGVjdE9wdGlvbiA9IChvcHRpb25zKSA9PiB7XG5cdFx0dGhpcy5vcHRpb25zLnB1c2gob3B0aW9ucyk7XG5cdH07XG5cblx0Ly8gVE9ET1xuXHRAb3B0aW9ucyhcImZpbHRlclwiLCBcImZpbHRlcm9wZXJhdG9yXCIpXG5cdGdldFNlbGVjdE9wdGlvbnMgPSAob3B0aW9ucykgPT4ge1xuXHRcdHJldHVybiB0aGlzLm9wdGlvbnM7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJoZWxwXCIsIFwic2hvd0lubGluZUZvckFzc2lzdGFudFwiKVxuXHRAcmVxdWlyZWQoXCJoZWxwXCIpXG5cdHNldEhlbHBUZXh0ID0gKG9wdGlvbnMpID0+IHtcblx0XHR0aGlzLmhlbHAgPSBvcHRpb25zLmhlbHA7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJicmVha1R5cGVcIilcblx0QHJlcXVpcmVkKFwiYnJlYWtUeXBlXCIpXG5cdHVwZGF0ZUJyZWFrVHlwZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKCFPYmplY3QudmFsdWVzKHNlcnZlcldpZGdldFN0dWIuRmllbGRCcmVha1R5cGUpLmluY2x1ZGVzKG9wdGlvbnMuYnJlYWtUeXBlKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgYnJlYWtUeXBlXCIpO1xuXHRcdH1cblx0XHR0aGlzLmJyZWFrVHlwZSA9IG9wdGlvbnMuYnJlYWtUeXBlO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdEBvcHRpb25zKFwiaGVpZ2h0XCIsIFwid2lkdGhcIilcblx0QHJlcXVpcmVkKFwiaGVpZ2h0XCIsIFwid2lkdGhcIilcblx0dXBkYXRlRGlzcGxheVNpemUgPSAob3B0aW9ucykgPT4ge1xuXHRcdHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IG9wdGlvbnMud2lkdGg7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJkaXNwbGF5VHlwZVwiKVxuXHRAcmVxdWlyZWQoXCJkaXNwbGF5VHlwZVwiKVxuXHR1cGRhdGVEaXNwbGF5VHlwZSA9IChvcHRpb25zKSA9PiB7XG5cdFx0aWYgKCFPYmplY3QudmFsdWVzKHNlcnZlcldpZGdldFN0dWIuRmllbGREaXNwbGF5VHlwZSkuaW5jbHVkZXMob3B0aW9ucy5kaXNwbGF5VHlwZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIGRpc3BsYXlUeXBlXCIpO1xuXHRcdH1cblx0XHR0aGlzLmRpc3BsYXlUeXBlID0gb3B0aW9ucy5kaXNwbGF5VHlwZTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcblxuXHRAb3B0aW9ucyhcImxheW91dFR5cGVcIilcblx0QHJlcXVpcmVkKFwibGF5b3V0VHlwZVwiKVxuXHR1cGRhdGVMYXlvdXRUeXBlID0gKG9wdGlvbnMpID0+IHtcblx0XHRpZiAoIU9iamVjdC52YWx1ZXMoc2VydmVyV2lkZ2V0U3R1Yi5GaWVsZExheW91dFR5cGUpLmluY2x1ZGVzKG9wdGlvbnMubGF5b3V0VHlwZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIGxheW91dFR5cGVcIik7XG5cdFx0fVxuXHRcdHRoaXMubGF5b3V0VHlwZSA9IG9wdGlvbnMubGF5b3V0VHlwZTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0VBQUVBLE9BQU87RUFBRUMsUUFBUTtFQUFFQztBQUFrQixDQUFDLEdBQUdDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztBQUNoRixNQUFNQyxnQkFBZ0IsR0FBR0QsT0FBTyxDQUFDLHFEQUFxRCxDQUFDO0FBQUM7QUFBQSxPQUV2RkQsaUJBQWlCLEVBQUU7QUFBQSxRQXFCbEJGLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQztBQUFBLFFBQ3RDQyxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztBQUFBLFFBTXpCRCxPQUFPLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDO0FBQUEsUUFLbkNBLE9BQU8sQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLENBQUM7QUFBQSxRQUN6Q0MsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUFBLFFBTWhCRCxPQUFPLENBQUMsV0FBVyxDQUFDO0FBQUEsUUFDcEJDLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFBQSxRQVNyQkQsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7QUFBQSxTQUMxQkMsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7QUFBQSxTQU8zQkQsT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUFBLFNBQ3RCQyxRQUFRLENBQUMsYUFBYSxDQUFDO0FBQUEsU0FTdkJELE9BQU8sQ0FBQyxZQUFZLENBQUM7QUFBQSxTQUNyQkMsUUFBUSxDQUFDLFlBQVksQ0FBQztBQXJFeEIsWUFDWTtFQUFBO0lBQUE7RUFBQTtFQUNYSSxLQUFLO0VBQ0xDLFlBQVk7RUFDWkMsUUFBUTtFQUNSQyxFQUFFO0VBQ0ZDLFdBQVcsR0FBRyxLQUFLO0VBQ25CQyxLQUFLO0VBQ0xDLFFBQVE7RUFDUkMsU0FBUztFQUNUQyxPQUFPO0VBQ1BDLGNBQWM7RUFDZEMsYUFBYTtFQUNiQyxJQUFJO0VBQ0pDLE1BQU07RUFDTkMsU0FBUztFQUNUQyxJQUFJO0VBQ0puQixPQUFPLEdBQUcsRUFBRTtFQUNab0IsTUFBTTtFQUNOQyxLQUFLO0VBSUxDLGVBQWUsK0JBQUl0QixPQUFPLElBQUs7SUFDOUIsSUFBSSxDQUFDQSxPQUFPLENBQUN1QixJQUFJLENBQUN2QixPQUFPLENBQUM7RUFDM0IsQ0FBQzs7RUFFRDtFQUVBd0IsZ0JBQWdCLGdDQUFJeEIsT0FBTyxJQUFLO0lBQy9CLE9BQU8sSUFBSSxDQUFDQSxPQUFPO0VBQ3BCLENBQUM7RUFJRHlCLFdBQVcsMkJBQUl6QixPQUFPLElBQUs7SUFDMUIsSUFBSSxDQUFDbUIsSUFBSSxHQUFHbkIsT0FBTyxDQUFDbUIsSUFBSTtJQUN4QixPQUFPLElBQUk7RUFDWixDQUFDO0VBSURPLGVBQWUsK0JBQUkxQixPQUFPLElBQUs7SUFDOUIsSUFBSSxDQUFDMkIsTUFBTSxDQUFDQyxNQUFNLENBQUN4QixnQkFBZ0IsQ0FBQ3lCLGNBQWMsQ0FBQyxDQUFDQyxRQUFRLENBQUM5QixPQUFPLENBQUMrQixTQUFTLENBQUMsRUFBRTtNQUNoRixNQUFNLElBQUlDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQztJQUMvQztJQUNBLElBQUksQ0FBQ0QsU0FBUyxHQUFHL0IsT0FBTyxDQUFDK0IsU0FBUztJQUNsQyxPQUFPLElBQUk7RUFDWixDQUFDO0VBSURFLGlCQUFpQixpQ0FBSWpDLE9BQU8sSUFBSztJQUNoQyxJQUFJLENBQUNvQixNQUFNLEdBQUdwQixPQUFPLENBQUNvQixNQUFNO0lBQzVCLElBQUksQ0FBQ0MsS0FBSyxHQUFHckIsT0FBTyxDQUFDcUIsS0FBSztJQUMxQixPQUFPLElBQUk7RUFDWixDQUFDO0VBSURhLGlCQUFpQixpQ0FBSWxDLE9BQU8sSUFBSztJQUNoQyxJQUFJLENBQUMyQixNQUFNLENBQUNDLE1BQU0sQ0FBQ3hCLGdCQUFnQixDQUFDK0IsZ0JBQWdCLENBQUMsQ0FBQ0wsUUFBUSxDQUFDOUIsT0FBTyxDQUFDb0MsV0FBVyxDQUFDLEVBQUU7TUFDcEYsTUFBTSxJQUFJSixLQUFLLENBQUMsK0JBQStCLENBQUM7SUFDakQ7SUFDQSxJQUFJLENBQUNJLFdBQVcsR0FBR3BDLE9BQU8sQ0FBQ29DLFdBQVc7SUFDdEMsT0FBTyxJQUFJO0VBQ1osQ0FBQztFQUlEQyxnQkFBZ0IsZ0NBQUlyQyxPQUFPLElBQUs7SUFDL0IsSUFBSSxDQUFDMkIsTUFBTSxDQUFDQyxNQUFNLENBQUN4QixnQkFBZ0IsQ0FBQ2tDLGVBQWUsQ0FBQyxDQUFDUixRQUFRLENBQUM5QixPQUFPLENBQUN1QyxVQUFVLENBQUMsRUFBRTtNQUNsRixNQUFNLElBQUlQLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQztJQUNoRDtJQUNBLElBQUksQ0FBQ08sVUFBVSxHQUFHdkMsT0FBTyxDQUFDdUMsVUFBVTtJQUNwQyxPQUFPLElBQUk7RUFDWixDQUFDO0VBQUM7SUFBQTtFQUFBO0FBQ0g7QUFFQUMsTUFBTSxDQUFDQyxPQUFPLEdBQUdDLE1BQUsifQ==