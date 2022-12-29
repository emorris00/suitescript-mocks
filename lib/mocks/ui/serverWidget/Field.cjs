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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25zIiwicmVxdWlyZWQiLCJhc3NpZ25Db25zdHJ1Y3RvciIsInJlcXVpcmUiLCJhbGlhcyIsImRlZmF1bHRWYWx1ZSIsImhlbHBUZXh0IiwiaWQiLCJpc01hbmRhdG9yeSIsImxhYmVsIiwibGlua1RleHQiLCJtYXhMZW5ndGgiLCJwYWRkaW5nIiwicmljaFRleHRIZWlnaHQiLCJyaWNoVGV4dFdpZHRoIiwidHlwZSIsInNvdXJjZSIsImNvbnRhaW5lciIsImhlbHAiLCJoZWlnaHQiLCJ3aWR0aCIsImFkZFNlbGVjdE9wdGlvbiIsInB1c2giLCJnZXRTZWxlY3RPcHRpb25zIiwic2V0SGVscFRleHQiLCJ1cGRhdGVCcmVha1R5cGUiLCJicmVha1R5cGUiLCJ1cGRhdGVEaXNwbGF5U2l6ZSIsInVwZGF0ZURpc3BsYXlUeXBlIiwiZGlzcGxheVR5cGUiLCJ1cGRhdGVMYXlvdXRUeXBlIiwibGF5b3V0VHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJGaWVsZCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2Nrcy91aS9zZXJ2ZXJXaWRnZXQvRmllbGQuY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgb3B0aW9ucywgcmVxdWlyZWQsIGFzc2lnbkNvbnN0cnVjdG9yIH0gPSByZXF1aXJlKFwiLi4vLi4vLi4vaGVscGVycy5janNcIik7XG5cbkBhc3NpZ25Db25zdHJ1Y3RvcigpXG5jbGFzcyBGaWVsZCB7XG4gICAgYWxpYXNcbiAgICBkZWZhdWx0VmFsdWVcbiAgICBoZWxwVGV4dFxuICAgIGlkXG4gICAgaXNNYW5kYXRvcnkgPSBmYWxzZVxuICAgIGxhYmVsXG4gICAgbGlua1RleHRcbiAgICBtYXhMZW5ndGhcbiAgICBwYWRkaW5nXG4gICAgcmljaFRleHRIZWlnaHRcbiAgICByaWNoVGV4dFdpZHRoXG4gICAgdHlwZVxuICAgIHNvdXJjZVxuICAgIGNvbnRhaW5lclxuICAgIGhlbHBcbiAgICBvcHRpb25zXG4gICAgaGVpZ2h0XG4gICAgd2lkdGhcblxuICAgIEBvcHRpb25zKFwidmFsdWVcIiwgXCJ0ZXh0XCIsIFwiaXNTZWxlY3RlZFwiKVxuICAgIEByZXF1aXJlZChcInZhbHVlXCIsIFwidGV4dFwiKVxuICAgIGFkZFNlbGVjdE9wdGlvbiA9IG9wdGlvbnMgPT4ge1xuICAgICAgICB0aGlzLm9wdGlvbnMucHVzaChvcHRpb25zKVxuICAgIH1cblxuICAgIC8vIFRPRE9cbiAgICBAb3B0aW9ucyhcImZpbHRlclwiLCBcImZpbHRlcm9wZXJhdG9yXCIpXG4gICAgZ2V0U2VsZWN0T3B0aW9ucyA9IG9wdGlvbnMgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zXG4gICAgfVxuXG4gICAgQG9wdGlvbnMoXCJoZWxwXCIsIFwic2hvd0lubGluZUZvckFzc2lzdGFudFwiKVxuICAgIEByZXF1aXJlZChcImhlbHBcIilcbiAgICBzZXRIZWxwVGV4dCA9IG9wdGlvbnMgPT4ge1xuICAgICAgICB0aGlzLmhlbHAgPSBvcHRpb25zLmhlbHBcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBAb3B0aW9ucyhcImJyZWFrVHlwZVwiKVxuICAgIEByZXF1aXJlZChcImJyZWFrVHlwZVwiKVxuICAgIHVwZGF0ZUJyZWFrVHlwZSA9IG9wdGlvbnMgPT4ge1xuICAgICAgICB0aGlzLmJyZWFrVHlwZSA9IG9wdGlvbnMuYnJlYWtUeXBlXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgQG9wdGlvbnMoXCJoZWlnaHRcIiwgXCJ3aWR0aFwiKVxuICAgIEByZXF1aXJlZChcImhlaWdodFwiLCBcIndpZHRoXCIpXG4gICAgdXBkYXRlRGlzcGxheVNpemUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodFxuICAgICAgICB0aGlzLndpZHRoID0gb3B0aW9ucy53aWR0aFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIEBvcHRpb25zKFwiZGlzcGxheVR5cGVcIilcbiAgICBAcmVxdWlyZWQoXCJkaXNwbGF5VHlwZVwiKVxuICAgIHVwZGF0ZURpc3BsYXlUeXBlID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIHRoaXMuZGlzcGxheVR5cGUgPSBvcHRpb25zLmRpc3BsYXlUeXBlXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgQG9wdGlvbnMoXCJsYXlvdXRUeXBlXCIpXG4gICAgQHJlcXVpcmVkKFwibGF5b3V0VHlwZVwiKVxuICAgIHVwZGF0ZUxheW91dFR5cGUgPSBvcHRpb25zID0+IHtcbiAgICAgICAgdGhpcy5sYXlvdXRUeXBlID0gb3B0aW9ucy5sYXlvdXRUeXBlXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE1BQU07RUFBRUEsT0FBTztFQUFFQyxRQUFRO0VBQUVDO0FBQWtCLENBQUMsR0FBR0MsT0FBTyxDQUFDLHNCQUFzQixDQUFDO0FBQUM7QUFBQSxPQUVoRkQsaUJBQWlCLEVBQUU7QUFBQSxRQXFCZkYsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDO0FBQUEsUUFDdENDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO0FBQUEsUUFNekJELE9BQU8sQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUM7QUFBQSxRQUtuQ0EsT0FBTyxDQUFDLE1BQU0sRUFBRSx3QkFBd0IsQ0FBQztBQUFBLFFBQ3pDQyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQUEsUUFNaEJELE9BQU8sQ0FBQyxXQUFXLENBQUM7QUFBQSxRQUNwQkMsUUFBUSxDQUFDLFdBQVcsQ0FBQztBQUFBLFFBTXJCRCxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQztBQUFBLFNBQzFCQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQztBQUFBLFNBTzNCRCxPQUFPLENBQUMsYUFBYSxDQUFDO0FBQUEsU0FDdEJDLFFBQVEsQ0FBQyxhQUFhLENBQUM7QUFBQSxTQU12QkQsT0FBTyxDQUFDLFlBQVksQ0FBQztBQUFBLFNBQ3JCQyxRQUFRLENBQUMsWUFBWSxDQUFDO0FBL0QzQixZQUNZO0VBQUE7SUFBQTtFQUFBO0VBQ1JHLEtBQUs7RUFDTEMsWUFBWTtFQUNaQyxRQUFRO0VBQ1JDLEVBQUU7RUFDRkMsV0FBVyxHQUFHLEtBQUs7RUFDbkJDLEtBQUs7RUFDTEMsUUFBUTtFQUNSQyxTQUFTO0VBQ1RDLE9BQU87RUFDUEMsY0FBYztFQUNkQyxhQUFhO0VBQ2JDLElBQUk7RUFDSkMsTUFBTTtFQUNOQyxTQUFTO0VBQ1RDLElBQUk7RUFDSmxCLE9BQU87RUFDUG1CLE1BQU07RUFDTkMsS0FBSztFQUlMQyxlQUFlLCtCQUFHckIsT0FBTyxJQUFJO0lBQ3pCLElBQUksQ0FBQ0EsT0FBTyxDQUFDc0IsSUFBSSxDQUFDdEIsT0FBTyxDQUFDO0VBQzlCLENBQUM7O0VBRUQ7RUFFQXVCLGdCQUFnQixnQ0FBR3ZCLE9BQU8sSUFBSTtJQUMxQixPQUFPLElBQUksQ0FBQ0EsT0FBTztFQUN2QixDQUFDO0VBSUR3QixXQUFXLDJCQUFHeEIsT0FBTyxJQUFJO0lBQ3JCLElBQUksQ0FBQ2tCLElBQUksR0FBR2xCLE9BQU8sQ0FBQ2tCLElBQUk7SUFDeEIsT0FBTyxJQUFJO0VBQ2YsQ0FBQztFQUlETyxlQUFlLCtCQUFHekIsT0FBTyxJQUFJO0lBQ3pCLElBQUksQ0FBQzBCLFNBQVMsR0FBRzFCLE9BQU8sQ0FBQzBCLFNBQVM7SUFDbEMsT0FBTyxJQUFJO0VBQ2YsQ0FBQztFQUlEQyxpQkFBaUIsaUNBQUczQixPQUFPLElBQUk7SUFDM0IsSUFBSSxDQUFDbUIsTUFBTSxHQUFHbkIsT0FBTyxDQUFDbUIsTUFBTTtJQUM1QixJQUFJLENBQUNDLEtBQUssR0FBR3BCLE9BQU8sQ0FBQ29CLEtBQUs7SUFDMUIsT0FBTyxJQUFJO0VBQ2YsQ0FBQztFQUlEUSxpQkFBaUIsaUNBQUc1QixPQUFPLElBQUk7SUFDM0IsSUFBSSxDQUFDNkIsV0FBVyxHQUFHN0IsT0FBTyxDQUFDNkIsV0FBVztJQUN0QyxPQUFPLElBQUk7RUFDZixDQUFDO0VBSURDLGdCQUFnQixnQ0FBRzlCLE9BQU8sSUFBSTtJQUMxQixJQUFJLENBQUMrQixVQUFVLEdBQUcvQixPQUFPLENBQUMrQixVQUFVO0lBQ3BDLE9BQU8sSUFBSTtFQUNmLENBQUM7RUFBQTtJQUFBO0VBQUE7QUFDTDtBQUVBQyxNQUFNLENBQUNDLE9BQU8sR0FBR0MsTUFBSyJ9