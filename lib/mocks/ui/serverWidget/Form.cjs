var _initClass, _dec, _dec2, _dec3, _init_addButton, _dec4, _dec5, _init_addCredentialField, _dec6, _dec7, _init_addField, _dec8, _dec9, _init_addFieldGroup, _dec10, _dec11, _init_addPageLink, _dec12, _init_addResetButton, _dec13, _dec14, _init_addSecretKeyField, _dec15, _dec16, _init_addSublist, _dec17, _init_addSubmitButton, _dec18, _dec19, _init_addSubtab, _dec20, _dec21, _init_addTab, _dec22, _dec23, _init_getButton, _dec24, _dec25, _init_getField, _dec26, _dec27, _init_getSublist, _dec28, _dec29, _init_getSubtab, _dec30, _dec31, _init_getTab, _dec32, _dec33, _init_insertField, _dec34, _dec35, _init_insertSublist, _dec36, _dec37, _init_insertSubtab, _dec38, _dec39, _init_insertTab, _dec40, _dec41, _init_removeButton;
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
const Field = require("./Field.cjs");
const Button = require("./Button.cjs");
let _Form;
_dec = assignConstructor();
_dec2 = options("id", "label", "functionName");
_dec3 = required("id", "label");
_dec4 = options("id", "label", "restrictToDomains", "restrictToScriptIds", "restrictToCurrentUser", "container");
_dec5 = required("id", "label", "restrictToDomains", "restrictToScriptIds");
_dec6 = options("id", "label", "type", "source", "container");
_dec7 = required("id", "label", "type");
_dec8 = options("id", "label", "tab");
_dec9 = required("id", "label");
_dec10 = options("title", "type", "url");
_dec11 = required("title", "type", "url");
_dec12 = options("label");
_dec13 = options("id", "restrictToScriptIds", "label", "restrictToCurrentUser", "container");
_dec14 = required("id", "restrictToScriptIds", "label");
_dec15 = options("id", "label", "type", "tab");
_dec16 = required("id", "label", "type");
_dec17 = options("label");
_dec18 = options("id", "label", "tab");
_dec19 = required("id", "label");
_dec20 = options("id", "label");
_dec21 = required("id", "label");
_dec22 = options("id");
_dec23 = required("id");
_dec24 = options("id");
_dec25 = required("id");
_dec26 = options("id");
_dec27 = required("id");
_dec28 = options("id");
_dec29 = required("id");
_dec30 = options("id");
_dec31 = required("id");
_dec32 = options("field", "nextfield");
_dec33 = required("field", "nextfield");
_dec34 = options("sublist", "nextsublist");
_dec35 = required("sublist", "nextsublist");
_dec36 = options("subtab", "nextsub");
_dec37 = required("subtab", "nextsub");
_dec38 = options("tab", "nexttab");
_dec39 = required("tab", "nexttab");
_dec40 = options("id");
_dec41 = required("id");
class Form {
  static {
    [_init_addButton, _init_addCredentialField, _init_addField, _init_addFieldGroup, _init_addPageLink, _init_addResetButton, _init_addSecretKeyField, _init_addSublist, _init_addSubmitButton, _init_addSubtab, _init_addTab, _init_getButton, _init_getField, _init_getSublist, _init_getSubtab, _init_getTab, _init_insertField, _init_insertSublist, _init_insertSubtab, _init_insertTab, _init_removeButton, _Form, _initClass] = _applyDecs(this, [[[_dec2, _dec3], 0, "addButton"], [[_dec4, _dec5], 0, "addCredentialField"], [[_dec6, _dec7], 0, "addField"], [[_dec8, _dec9], 0, "addFieldGroup"], [[_dec10, _dec11], 0, "addPageLink"], [_dec12, 0, "addResetButton"], [[_dec13, _dec14], 0, "addSecretKeyField"], [[_dec15, _dec16], 0, "addSublist"], [_dec17, 0, "addSubmitButton"], [[_dec18, _dec19], 0, "addSubtab"], [[_dec20, _dec21], 0, "addTab"], [[_dec22, _dec23], 0, "getButton"], [[_dec24, _dec25], 0, "getField"], [[_dec26, _dec27], 0, "getSublist"], [[_dec28, _dec29], 0, "getSubtab"], [[_dec30, _dec31], 0, "getTab"], [[_dec32, _dec33], 0, "insertField"], [[_dec34, _dec35], 0, "insertSublist"], [[_dec36, _dec37], 0, "insertSubtab"], [[_dec38, _dec39], 0, "insertTab"], [[_dec40, _dec41], 0, "removeButton"]], [_dec]);
  }
  buttons = {};
  fields = {};
  title;
  clientScriptFileId;
  clientScriptModulePath;
  addButton = _init_addButton(this, options => {
    const button = new Button(options);
    this.buttons[options.id] = button;
    return button;
  });
  addCredentialField = _init_addCredentialField(this, options => {});
  addField = _init_addField(this, options => {
    if (!options.id.startsWith("custpage")) {
      throw new Error("Field id must begin with custpage");
    }
    const field = new Field(options);
    this.fields[options.id] = field;
    return field;
  });
  addFieldGroup = _init_addFieldGroup(this, options => {});
  addPageInitMessage = options => {};
  addPageLink = _init_addPageLink(this, options => {});
  addResetButton = _init_addResetButton(this, options => {});
  addSecretKeyField = _init_addSecretKeyField(this, options => {});
  addSublist = _init_addSublist(this, options => {});
  addSubmitButton = _init_addSubmitButton(this, options => {});
  addSubtab = _init_addSubtab(this, options => {});
  addTab = _init_addTab(this, options => {});
  getButton = _init_getButton(this, options => {
    return this.buttons[options.id];
  });
  getField = _init_getField(this, options => {
    return this.fields[options.id];
  });
  getSublist = _init_getSublist(this, options => {});
  getSubtab = _init_getSubtab(this, options => {});
  getTab = _init_getTab(this, options => {});
  getTabs = () => {};
  insertField = _init_insertField(this, options => {});
  insertSublist = _init_insertSublist(this, options => {});
  insertSubtab = _init_insertSubtab(this, options => {});
  insertTab = _init_insertTab(this, options => {});
  removeButton = _init_removeButton(this, options => {});
  updateDefaultValues = values => {};
  static {
    _initClass();
  }
}
module.exports = _Form;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25zIiwicmVxdWlyZWQiLCJhc3NpZ25Db25zdHJ1Y3RvciIsInJlcXVpcmUiLCJGaWVsZCIsIkJ1dHRvbiIsImJ1dHRvbnMiLCJmaWVsZHMiLCJ0aXRsZSIsImNsaWVudFNjcmlwdEZpbGVJZCIsImNsaWVudFNjcmlwdE1vZHVsZVBhdGgiLCJhZGRCdXR0b24iLCJidXR0b24iLCJpZCIsImFkZENyZWRlbnRpYWxGaWVsZCIsImFkZEZpZWxkIiwic3RhcnRzV2l0aCIsIkVycm9yIiwiZmllbGQiLCJhZGRGaWVsZEdyb3VwIiwiYWRkUGFnZUluaXRNZXNzYWdlIiwiYWRkUGFnZUxpbmsiLCJhZGRSZXNldEJ1dHRvbiIsImFkZFNlY3JldEtleUZpZWxkIiwiYWRkU3VibGlzdCIsImFkZFN1Ym1pdEJ1dHRvbiIsImFkZFN1YnRhYiIsImFkZFRhYiIsImdldEJ1dHRvbiIsImdldEZpZWxkIiwiZ2V0U3VibGlzdCIsImdldFN1YnRhYiIsImdldFRhYiIsImdldFRhYnMiLCJpbnNlcnRGaWVsZCIsImluc2VydFN1Ymxpc3QiLCJpbnNlcnRTdWJ0YWIiLCJpbnNlcnRUYWIiLCJyZW1vdmVCdXR0b24iLCJ1cGRhdGVEZWZhdWx0VmFsdWVzIiwidmFsdWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsIkZvcm0iXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9ja3MvdWkvc2VydmVyV2lkZ2V0L0Zvcm0uY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgb3B0aW9ucywgcmVxdWlyZWQsIGFzc2lnbkNvbnN0cnVjdG9yIH0gPSByZXF1aXJlKFwiLi4vLi4vLi4vaGVscGVycy5janNcIik7XG5jb25zdCBGaWVsZCA9IHJlcXVpcmUoXCIuL0ZpZWxkLmNqc1wiKTtcbmNvbnN0IEJ1dHRvbiA9IHJlcXVpcmUoXCIuL0J1dHRvbi5janNcIik7XG5cbkBhc3NpZ25Db25zdHJ1Y3RvcigpXG5jbGFzcyBGb3JtIHtcblx0YnV0dG9ucyA9IHt9O1xuXHRmaWVsZHMgPSB7fTtcblx0dGl0bGU7XG5cdGNsaWVudFNjcmlwdEZpbGVJZDtcblx0Y2xpZW50U2NyaXB0TW9kdWxlUGF0aDtcblxuXHRAb3B0aW9ucyhcImlkXCIsIFwibGFiZWxcIiwgXCJmdW5jdGlvbk5hbWVcIilcblx0QHJlcXVpcmVkKFwiaWRcIiwgXCJsYWJlbFwiKVxuXHRhZGRCdXR0b24gPSAob3B0aW9ucykgPT4ge1xuXHRcdGNvbnN0IGJ1dHRvbiA9IG5ldyBCdXR0b24ob3B0aW9ucyk7XG5cdFx0dGhpcy5idXR0b25zW29wdGlvbnMuaWRdID0gYnV0dG9uO1xuXHRcdHJldHVybiBidXR0b247XG5cdH07XG5cblx0QG9wdGlvbnMoXCJpZFwiLCBcImxhYmVsXCIsIFwicmVzdHJpY3RUb0RvbWFpbnNcIiwgXCJyZXN0cmljdFRvU2NyaXB0SWRzXCIsIFwicmVzdHJpY3RUb0N1cnJlbnRVc2VyXCIsIFwiY29udGFpbmVyXCIpXG5cdEByZXF1aXJlZChcImlkXCIsIFwibGFiZWxcIiwgXCJyZXN0cmljdFRvRG9tYWluc1wiLCBcInJlc3RyaWN0VG9TY3JpcHRJZHNcIilcblx0YWRkQ3JlZGVudGlhbEZpZWxkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBvcHRpb25zKFwiaWRcIiwgXCJsYWJlbFwiLCBcInR5cGVcIiwgXCJzb3VyY2VcIiwgXCJjb250YWluZXJcIilcblx0QHJlcXVpcmVkKFwiaWRcIiwgXCJsYWJlbFwiLCBcInR5cGVcIilcblx0YWRkRmllbGQgPSAob3B0aW9ucykgPT4ge1xuXHRcdGlmICghb3B0aW9ucy5pZC5zdGFydHNXaXRoKFwiY3VzdHBhZ2VcIikpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkZpZWxkIGlkIG11c3QgYmVnaW4gd2l0aCBjdXN0cGFnZVwiKTtcblx0XHR9XG5cdFx0Y29uc3QgZmllbGQgPSBuZXcgRmllbGQob3B0aW9ucyk7XG5cdFx0dGhpcy5maWVsZHNbb3B0aW9ucy5pZF0gPSBmaWVsZDtcblx0XHRyZXR1cm4gZmllbGQ7XG5cdH07XG5cblx0QG9wdGlvbnMoXCJpZFwiLCBcImxhYmVsXCIsIFwidGFiXCIpXG5cdEByZXF1aXJlZChcImlkXCIsIFwibGFiZWxcIilcblx0YWRkRmllbGRHcm91cCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRhZGRQYWdlSW5pdE1lc3NhZ2UgPSAob3B0aW9ucykgPT4ge307XG5cblx0QG9wdGlvbnMoXCJ0aXRsZVwiLCBcInR5cGVcIiwgXCJ1cmxcIilcblx0QHJlcXVpcmVkKFwidGl0bGVcIiwgXCJ0eXBlXCIsIFwidXJsXCIpXG5cdGFkZFBhZ2VMaW5rID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBvcHRpb25zKFwibGFiZWxcIilcblx0YWRkUmVzZXRCdXR0b24gPSAob3B0aW9ucykgPT4ge307XG5cblx0QG9wdGlvbnMoXCJpZFwiLCBcInJlc3RyaWN0VG9TY3JpcHRJZHNcIiwgXCJsYWJlbFwiLCBcInJlc3RyaWN0VG9DdXJyZW50VXNlclwiLCBcImNvbnRhaW5lclwiKVxuXHRAcmVxdWlyZWQoXCJpZFwiLCBcInJlc3RyaWN0VG9TY3JpcHRJZHNcIiwgXCJsYWJlbFwiKVxuXHRhZGRTZWNyZXRLZXlGaWVsZCA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcImlkXCIsIFwibGFiZWxcIiwgXCJ0eXBlXCIsIFwidGFiXCIpXG5cdEByZXF1aXJlZChcImlkXCIsIFwibGFiZWxcIiwgXCJ0eXBlXCIpXG5cdGFkZFN1Ymxpc3QgPSAob3B0aW9ucykgPT4ge307XG5cblx0QG9wdGlvbnMoXCJsYWJlbFwiKVxuXHRhZGRTdWJtaXRCdXR0b24gPSAob3B0aW9ucykgPT4ge307XG5cblx0QG9wdGlvbnMoXCJpZFwiLCBcImxhYmVsXCIsIFwidGFiXCIpXG5cdEByZXF1aXJlZChcImlkXCIsIFwibGFiZWxcIilcblx0YWRkU3VidGFiID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBvcHRpb25zKFwiaWRcIiwgXCJsYWJlbFwiKVxuXHRAcmVxdWlyZWQoXCJpZFwiLCBcImxhYmVsXCIpXG5cdGFkZFRhYiA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcImlkXCIpXG5cdEByZXF1aXJlZChcImlkXCIpXG5cdGdldEJ1dHRvbiA9IChvcHRpb25zKSA9PiB7XG5cdFx0cmV0dXJuIHRoaXMuYnV0dG9uc1tvcHRpb25zLmlkXTtcblx0fTtcblxuXHRAb3B0aW9ucyhcImlkXCIpXG5cdEByZXF1aXJlZChcImlkXCIpXG5cdGdldEZpZWxkID0gKG9wdGlvbnMpID0+IHtcblx0XHRyZXR1cm4gdGhpcy5maWVsZHNbb3B0aW9ucy5pZF07XG5cdH07XG5cblx0QG9wdGlvbnMoXCJpZFwiKVxuXHRAcmVxdWlyZWQoXCJpZFwiKVxuXHRnZXRTdWJsaXN0ID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBvcHRpb25zKFwiaWRcIilcblx0QHJlcXVpcmVkKFwiaWRcIilcblx0Z2V0U3VidGFiID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBvcHRpb25zKFwiaWRcIilcblx0QHJlcXVpcmVkKFwiaWRcIilcblx0Z2V0VGFiID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdGdldFRhYnMgPSAoKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcImZpZWxkXCIsIFwibmV4dGZpZWxkXCIpXG5cdEByZXF1aXJlZChcImZpZWxkXCIsIFwibmV4dGZpZWxkXCIpXG5cdGluc2VydEZpZWxkID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBvcHRpb25zKFwic3VibGlzdFwiLCBcIm5leHRzdWJsaXN0XCIpXG5cdEByZXF1aXJlZChcInN1Ymxpc3RcIiwgXCJuZXh0c3VibGlzdFwiKVxuXHRpbnNlcnRTdWJsaXN0ID0gKG9wdGlvbnMpID0+IHt9O1xuXG5cdEBvcHRpb25zKFwic3VidGFiXCIsIFwibmV4dHN1YlwiKVxuXHRAcmVxdWlyZWQoXCJzdWJ0YWJcIiwgXCJuZXh0c3ViXCIpXG5cdGluc2VydFN1YnRhYiA9IChvcHRpb25zKSA9PiB7fTtcblxuXHRAb3B0aW9ucyhcInRhYlwiLCBcIm5leHR0YWJcIilcblx0QHJlcXVpcmVkKFwidGFiXCIsIFwibmV4dHRhYlwiKVxuXHRpbnNlcnRUYWIgPSAob3B0aW9ucykgPT4ge307XG5cblx0QG9wdGlvbnMoXCJpZFwiKVxuXHRAcmVxdWlyZWQoXCJpZFwiKVxuXHRyZW1vdmVCdXR0b24gPSAob3B0aW9ucykgPT4ge307XG5cblx0dXBkYXRlRGVmYXVsdFZhbHVlcyA9ICh2YWx1ZXMpID0+IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtFQUFFQSxPQUFPO0VBQUVDLFFBQVE7RUFBRUM7QUFBa0IsQ0FBQyxHQUFHQyxPQUFPLENBQUMsc0JBQXNCLENBQUM7QUFDaEYsTUFBTUMsS0FBSyxHQUFHRCxPQUFPLENBQUMsYUFBYSxDQUFDO0FBQ3BDLE1BQU1FLE1BQU0sR0FBR0YsT0FBTyxDQUFDLGNBQWMsQ0FBQztBQUFDO0FBQUEsT0FFdENELGlCQUFpQixFQUFFO0FBQUEsUUFRbEJGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBQztBQUFBLFFBQ3RDQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztBQUFBLFFBT3ZCRCxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSxXQUFXLENBQUM7QUFBQSxRQUN4R0MsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLENBQUM7QUFBQSxRQUduRUQsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUM7QUFBQSxRQUNyREMsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0FBQUEsUUFVL0JELE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQztBQUFBLFFBQzdCQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztBQUFBLFNBS3ZCRCxPQUFPLENB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