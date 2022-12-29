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
  title;
  clientScriptFileId;
  clientScriptModulePath;
  addButton = _init_addButton(this, options => {
    return new Button(options);
  });
  addCredentialField = _init_addCredentialField(this, options => {});
  addField = _init_addField(this, options => {
    if (!options.id.startsWith("custpage")) {
      throw new Error("Field id must begin with custpage");
    }
    return new Field(options);
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
  getButton = _init_getButton(this, options => {});
  getField = _init_getField(this, options => {});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvcHRpb25zIiwicmVxdWlyZWQiLCJhc3NpZ25Db25zdHJ1Y3RvciIsInJlcXVpcmUiLCJGaWVsZCIsIkJ1dHRvbiIsInRpdGxlIiwiY2xpZW50U2NyaXB0RmlsZUlkIiwiY2xpZW50U2NyaXB0TW9kdWxlUGF0aCIsImFkZEJ1dHRvbiIsImFkZENyZWRlbnRpYWxGaWVsZCIsImFkZEZpZWxkIiwiaWQiLCJzdGFydHNXaXRoIiwiRXJyb3IiLCJhZGRGaWVsZEdyb3VwIiwiYWRkUGFnZUluaXRNZXNzYWdlIiwiYWRkUGFnZUxpbmsiLCJhZGRSZXNldEJ1dHRvbiIsImFkZFNlY3JldEtleUZpZWxkIiwiYWRkU3VibGlzdCIsImFkZFN1Ym1pdEJ1dHRvbiIsImFkZFN1YnRhYiIsImFkZFRhYiIsImdldEJ1dHRvbiIsImdldEZpZWxkIiwiZ2V0U3VibGlzdCIsImdldFN1YnRhYiIsImdldFRhYiIsImdldFRhYnMiLCJpbnNlcnRGaWVsZCIsImluc2VydFN1Ymxpc3QiLCJpbnNlcnRTdWJ0YWIiLCJpbnNlcnRUYWIiLCJyZW1vdmVCdXR0b24iLCJ1cGRhdGVEZWZhdWx0VmFsdWVzIiwidmFsdWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsIkZvcm0iXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9ja3MvdWkvc2VydmVyV2lkZ2V0L0Zvcm0uY2pzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgeyBvcHRpb25zLCByZXF1aXJlZCwgYXNzaWduQ29uc3RydWN0b3IgfSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9oZWxwZXJzLmNqc1wiKTtcbmNvbnN0IEZpZWxkID0gcmVxdWlyZShcIi4vRmllbGQuY2pzXCIpO1xuY29uc3QgQnV0dG9uID0gcmVxdWlyZShcIi4vQnV0dG9uLmNqc1wiKTtcblxuQGFzc2lnbkNvbnN0cnVjdG9yKClcbmNsYXNzIEZvcm0ge1xuICAgIHRpdGxlXG4gICAgY2xpZW50U2NyaXB0RmlsZUlkXG4gICAgY2xpZW50U2NyaXB0TW9kdWxlUGF0aFxuXG4gICAgQG9wdGlvbnMoXCJpZFwiLCBcImxhYmVsXCIsIFwiZnVuY3Rpb25OYW1lXCIpXG4gICAgQHJlcXVpcmVkKFwiaWRcIiwgXCJsYWJlbFwiKVxuICAgIGFkZEJ1dHRvbiA9IG9wdGlvbnMgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbihvcHRpb25zKVxuICAgIH1cblxuICAgIEBvcHRpb25zKFwiaWRcIiwgXCJsYWJlbFwiLCBcInJlc3RyaWN0VG9Eb21haW5zXCIsIFwicmVzdHJpY3RUb1NjcmlwdElkc1wiLCBcInJlc3RyaWN0VG9DdXJyZW50VXNlclwiLCBcImNvbnRhaW5lclwiKVxuICAgIEByZXF1aXJlZChcImlkXCIsIFwibGFiZWxcIiwgXCJyZXN0cmljdFRvRG9tYWluc1wiLCBcInJlc3RyaWN0VG9TY3JpcHRJZHNcIilcbiAgICBhZGRDcmVkZW50aWFsRmllbGQgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAb3B0aW9ucyhcImlkXCIsIFwibGFiZWxcIiwgXCJ0eXBlXCIsIFwic291cmNlXCIsIFwiY29udGFpbmVyXCIpXG4gICAgQHJlcXVpcmVkKFwiaWRcIiwgXCJsYWJlbFwiLCBcInR5cGVcIilcbiAgICBhZGRGaWVsZCA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBpZighb3B0aW9ucy5pZC5zdGFydHNXaXRoKFwiY3VzdHBhZ2VcIikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZpZWxkIGlkIG11c3QgYmVnaW4gd2l0aCBjdXN0cGFnZVwiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgRmllbGQob3B0aW9ucylcbiAgICB9XG5cbiAgICBAb3B0aW9ucyhcImlkXCIsIFwibGFiZWxcIiwgXCJ0YWJcIilcbiAgICBAcmVxdWlyZWQoXCJpZFwiLCBcImxhYmVsXCIpXG4gICAgYWRkRmllbGRHcm91cCA9IG9wdGlvbnMgPT4ge31cblxuICAgIGFkZFBhZ2VJbml0TWVzc2FnZSA9IG9wdGlvbnMgPT4ge31cblxuICAgIEBvcHRpb25zKFwidGl0bGVcIiwgXCJ0eXBlXCIsIFwidXJsXCIpXG4gICAgQHJlcXVpcmVkKFwidGl0bGVcIiwgXCJ0eXBlXCIsIFwidXJsXCIpXG4gICAgYWRkUGFnZUxpbmsgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAb3B0aW9ucyhcImxhYmVsXCIpXG4gICAgYWRkUmVzZXRCdXR0b24gPSBvcHRpb25zID0+IHt9XG5cbiAgICBAb3B0aW9ucyhcImlkXCIsIFwicmVzdHJpY3RUb1NjcmlwdElkc1wiLCBcImxhYmVsXCIsIFwicmVzdHJpY3RUb0N1cnJlbnRVc2VyXCIsIFwiY29udGFpbmVyXCIpXG4gICAgQHJlcXVpcmVkKFwiaWRcIiwgXCJyZXN0cmljdFRvU2NyaXB0SWRzXCIsIFwibGFiZWxcIilcbiAgICBhZGRTZWNyZXRLZXlGaWVsZCA9IG9wdGlvbnMgPT4ge31cblxuICAgIEBvcHRpb25zKFwiaWRcIiwgXCJsYWJlbFwiLCBcInR5cGVcIiwgXCJ0YWJcIilcbiAgICBAcmVxdWlyZWQoXCJpZFwiLCBcImxhYmVsXCIsIFwidHlwZVwiKVxuICAgIGFkZFN1Ymxpc3QgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAb3B0aW9ucyhcImxhYmVsXCIpXG4gICAgYWRkU3VibWl0QnV0dG9uID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgQG9wdGlvbnMoXCJpZFwiLCBcImxhYmVsXCIsIFwidGFiXCIpXG4gICAgQHJlcXVpcmVkKFwiaWRcIiwgXCJsYWJlbFwiKVxuICAgIGFkZFN1YnRhYiA9IG9wdGlvbnMgPT4ge31cblxuICAgIEBvcHRpb25zKFwiaWRcIiwgXCJsYWJlbFwiKVxuICAgIEByZXF1aXJlZChcImlkXCIsIFwibGFiZWxcIilcbiAgICBhZGRUYWIgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAb3B0aW9ucyhcImlkXCIpXG4gICAgQHJlcXVpcmVkKFwiaWRcIilcbiAgICBnZXRCdXR0b24gPSBvcHRpb25zID0+IHt9XG5cbiAgICBAb3B0aW9ucyhcImlkXCIpXG4gICAgQHJlcXVpcmVkKFwiaWRcIilcbiAgICBnZXRGaWVsZCA9IG9wdGlvbnMgPT4ge31cblxuICAgIEBvcHRpb25zKFwiaWRcIilcbiAgICBAcmVxdWlyZWQoXCJpZFwiKVxuICAgIGdldFN1Ymxpc3QgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAb3B0aW9ucyhcImlkXCIpXG4gICAgQHJlcXVpcmVkKFwiaWRcIilcbiAgICBnZXRTdWJ0YWIgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAb3B0aW9ucyhcImlkXCIpXG4gICAgQHJlcXVpcmVkKFwiaWRcIilcbiAgICBnZXRUYWIgPSBvcHRpb25zID0+IHt9XG5cbiAgICBnZXRUYWJzID0gKCkgPT4ge31cblxuICAgIEBvcHRpb25zKFwiZmllbGRcIiwgXCJuZXh0ZmllbGRcIilcbiAgICBAcmVxdWlyZWQoXCJmaWVsZFwiLCBcIm5leHRmaWVsZFwiKVxuICAgIGluc2VydEZpZWxkID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgQG9wdGlvbnMoXCJzdWJsaXN0XCIsIFwibmV4dHN1Ymxpc3RcIilcbiAgICBAcmVxdWlyZWQoXCJzdWJsaXN0XCIsIFwibmV4dHN1Ymxpc3RcIilcbiAgICBpbnNlcnRTdWJsaXN0ID0gb3B0aW9ucyA9PiB7fVxuXG4gICAgQG9wdGlvbnMoXCJzdWJ0YWJcIiwgXCJuZXh0c3ViXCIpXG4gICAgQHJlcXVpcmVkKFwic3VidGFiXCIsIFwibmV4dHN1YlwiKVxuICAgIGluc2VydFN1YnRhYiA9IG9wdGlvbnMgPT4ge31cblxuICAgIEBvcHRpb25zKFwidGFiXCIsIFwibmV4dHRhYlwiKVxuICAgIEByZXF1aXJlZChcInRhYlwiLCBcIm5leHR0YWJcIilcbiAgICBpbnNlcnRUYWIgPSBvcHRpb25zID0+IHt9XG5cbiAgICBAb3B0aW9ucyhcImlkXCIpXG4gICAgQHJlcXVpcmVkKFwiaWRcIilcbiAgICByZW1vdmVCdXR0b24gPSBvcHRpb25zID0+IHt9XG5cbiAgICB1cGRhdGVEZWZhdWx0VmFsdWVzID0gdmFsdWVzID0+IHt9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybSJdLCJt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