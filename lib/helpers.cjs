var _initProto;
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
function fieldInitDecorator(target) {
  return function (...args) {
    return function (_, context) {
      if (context.kind === "field") {
        return function (value) {
          return target(...args).bind(this)(value, context);
        };
      }
    };
  };
}
class Decorators {
  static {
    [_initProto] = _applyDecs(this, [[fieldInitDecorator, 2, "options"], [fieldInitDecorator, 2, "required"], [fieldInitDecorator, 2, "addPromise"], [fieldInitDecorator, 2, "dynamicModeOnly"], [fieldInitDecorator, 2, "standardModeOnly"], [fieldInitDecorator, 2, "keyedSetGetSet"]], []);
  }
  constructor(...args) {
    _initProto(this);
  }
  options(...keys) {
    return function (value) {
      return function (...options) {
        if (typeof options[0] !== "object") {
          options = options.reduce((acc, cur, i) => {
            acc[keys[i]] = cur;
            return acc;
          }, {});
        } else {
          options = options[0];
        }
        return value(options);
      };
    };
  }
  required(...keys) {
    return function (value) {
      return function (options) {
        keys.forEach(key => {
          if (!(key in options) || options[key] === undefined) {
            throw new Error(`missing required option '${key}'`);
          }
        });
        return value(options);
      };
    };
  }
  addPromise() {
    return function (value) {
      value.promise = async function () {
        value(...arguments);
      };
      return value;
    };
  }
  dynamicModeOnly() {
    return function (value) {
      return function () {
        if (!this.isDynamic) {
          throw new Error(`cannot be run in standard mode`);
        }
        return value(...arguments);
      };
    };
  }
  standardModeOnly() {
    return function (value) {
      return function () {
        if (this.isDynamic) {
          throw new Error(`cannot be run in dynamic mode`);
        }
        return value(...arguments);
      };
    };
  }
  keyedSetGetSet() {
    return function (value, context) {
      Object.defineProperty(this, context.name.replace("#", ""), {
        get: () => value,
        set: values => {
          value.clear();
          for (const a of values) {
            value.add(a);
          }
        }
      });
      return value;
    };
  }
  assignConstructor() {
    return function (target, context) {
      return class extends target {
        constructor(values) {
          super();
          if (typeof values === "object" && values !== undefined) {
            Object.entries(values).forEach(([key, value]) => {
              if (key in this) {
                this[key] = value;
              }
            });
          }
        }
      };
    };
  }
}
const UserEventType = {
  APPROVE: "approve",
  CANCEL: "cancel",
  CHANGEPASSWORD: "changepassword",
  COPY: "copy",
  CREATE: "create",
  DELETE: "delete",
  DROPSHIP: "dropship",
  EDIT: "edit",
  EDITFORECAST: "editforecast",
  EMAIL: "email",
  MARKCOMPLETE: "markcomplete",
  ORDERITEMS: "orderitems",
  PACK: "pack",
  PAYBILLS: "paybills",
  PRINT: "print",
  QUICKVIEW: "quickview",
  REASSIGN: "reassign",
  REJECT: "reject",
  SHIP: "ship",
  SPECIALORDER: "specialorder",
  TRANSFORM: "transform",
  VIEW: "view",
  XEDIT: "xedit"
};
function createUserEventContext(type, oldRecord, newRecord) {
  return {
    type,
    oldRecord,
    newRecord,
    UserEventType
  };
}
function toRecord(obj) {
  return Record.fromEntries(Object.entries(obj).filter(([_, value]) => !["object", "function"].includes(typeof value)));
}
const decorators = new Decorators();
module.exports = {
  options: decorators.options,
  required: decorators.required,
  addPromise: decorators.addPromise,
  dynamicModeOnly: decorators.dynamicModeOnly,
  standardModeOnly: decorators.standardModeOnly,
  keyedSetGetSet: decorators.keyedSetGetSet,
  assignConstructor: decorators.assignConstructor,
  mock: decorators.mock,
  UserEventType,
  createUserEventContext,
  toRecord: toRecord
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWNvcmQiLCJyZXF1aXJlIiwiZmllbGRJbml0RGVjb3JhdG9yIiwidGFyZ2V0IiwiYXJncyIsIl8iLCJjb250ZXh0Iiwia2luZCIsInZhbHVlIiwiYmluZCIsIkRlY29yYXRvcnMiLCJvcHRpb25zIiwia2V5cyIsInJlZHVjZSIsImFjYyIsImN1ciIsImkiLCJyZXF1aXJlZCIsImZvckVhY2giLCJrZXkiLCJ1bmRlZmluZWQiLCJFcnJvciIsImFkZFByb21pc2UiLCJwcm9taXNlIiwiYXJndW1lbnRzIiwiZHluYW1pY01vZGVPbmx5IiwiaXNEeW5hbWljIiwic3RhbmRhcmRNb2RlT25seSIsImtleWVkU2V0R2V0U2V0IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJuYW1lIiwicmVwbGFjZSIsImdldCIsInNldCIsInZhbHVlcyIsImNsZWFyIiwiYSIsImFkZCIsImFzc2lnbkNvbnN0cnVjdG9yIiwiY29uc3RydWN0b3IiLCJlbnRyaWVzIiwiVXNlckV2ZW50VHlwZSIsIkFQUFJPVkUiLCJDQU5DRUwiLCJDSEFOR0VQQVNTV09SRCIsIkNPUFkiLCJDUkVBVEUiLCJERUxFVEUiLCJEUk9QU0hJUCIsIkVESVQiLCJFRElURk9SRUNBU1QiLCJFTUFJTCIsIk1BUktDT01QTEVURSIsIk9SREVSSVRFTVMiLCJQQUNLIiwiUEFZQklMTFMiLCJQUklOVCIsIlFVSUNLVklFVyIsIlJFQVNTSUdOIiwiUkVKRUNUIiwiU0hJUCIsIlNQRUNJQUxPUkRFUiIsIlRSQU5TRk9STSIsIlZJRVciLCJYRURJVCIsImNyZWF0ZVVzZXJFdmVudENvbnRleHQiLCJ0eXBlIiwib2xkUmVjb3JkIiwibmV3UmVjb3JkIiwidG9SZWNvcmQiLCJvYmoiLCJmcm9tRW50cmllcyIsImZpbHRlciIsImluY2x1ZGVzIiwiZGVjb3JhdG9ycyIsIm1vZHVsZSIsImV4cG9ydHMiLCJtb2NrIl0sInNvdXJjZXMiOlsiLi4vc3JjL2hlbHBlcnMuY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgUmVjb3JkIH0gPSByZXF1aXJlKFwiQGJsb29tYmVyZy9yZWNvcmQtdHVwbGUtcG9seWZpbGxcIilcblxuZnVuY3Rpb24gZmllbGRJbml0RGVjb3JhdG9yKHRhcmdldCkge1xuICAgIHJldHVybiBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihfLCBjb250ZXh0KSB7XG4gICAgICAgICAgICBpZihjb250ZXh0LmtpbmQgPT09IFwiZmllbGRcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRhcmdldCguLi5hcmdzKS5iaW5kKHRoaXMpKSh2YWx1ZSwgY29udGV4dClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIERlY29yYXRvcnMge1xuICAgIEBmaWVsZEluaXREZWNvcmF0b3JcbiAgICBvcHRpb25zKC4uLmtleXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oLi4ub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBvcHRpb25zWzBdICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zLnJlZHVjZSgoYWNjLCBjdXIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY1trZXlzW2ldXSA9IGN1clxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgICAgICAgICAgICAgICB9LCB7fSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zWzBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZShvcHRpb25zKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQGZpZWxkSW5pdERlY29yYXRvclxuICAgIHJlcXVpcmVkKC4uLmtleXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZighKGtleSBpbiBvcHRpb25zKSB8fCBvcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBtaXNzaW5nIHJlcXVpcmVkIG9wdGlvbiAnJHtrZXl9J2ApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZShvcHRpb25zKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQGZpZWxkSW5pdERlY29yYXRvclxuICAgIGFkZFByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUucHJvbWlzZSA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhbHVlKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQGZpZWxkSW5pdERlY29yYXRvclxuICAgIGR5bmFtaWNNb2RlT25seSgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNEeW5hbWljKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGJlIHJ1biBpbiBzdGFuZGFyZCBtb2RlYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBmaWVsZEluaXREZWNvcmF0b3JcbiAgICBzdGFuZGFyZE1vZGVPbmx5KCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzRHluYW1pYykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBiZSBydW4gaW4gZHluYW1pYyBtb2RlYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBmaWVsZEluaXREZWNvcmF0b3JcbiAgICBrZXllZFNldEdldFNldCgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBjb250ZXh0KSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgY29udGV4dC5uYW1lLnJlcGxhY2UoXCIjXCIsIFwiXCIpLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiAoKSA9PiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBzZXQ6ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuY2xlYXIoKVxuICAgICAgICAgICAgICAgICAgICBmb3IoY29uc3QgYSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLmFkZChhKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXNzaWduQ29uc3RydWN0b3IoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0YXJnZXQsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIHRhcmdldCB7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IodmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKClcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHZhbHVlcyA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXModmFsdWVzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihrZXkgaW4gdGhpcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IFVzZXJFdmVudFR5cGUgPSB7XG4gICAgQVBQUk9WRSAgICAgICAgOiBcImFwcHJvdmVcIixcbiAgICBDQU5DRUwgICAgICAgICA6IFwiY2FuY2VsXCIsXG4gICAgQ0hBTkdFUEFTU1dPUkQgOiBcImNoYW5nZXBhc3N3b3JkXCIsXG4gICAgQ09QWSAgICAgICAgICAgOiBcImNvcHlcIixcbiAgICBDUkVBVEUgICAgICAgICA6IFwiY3JlYXRlXCIsXG4gICAgREVMRVRFICAgICAgICAgOiBcImRlbGV0ZVwiLFxuICAgIERST1BTSElQICAgICAgIDogXCJkcm9wc2hpcFwiLFxuICAgIEVESVQgICAgICAgICAgIDogXCJlZGl0XCIsXG4gICAgRURJVEZPUkVDQVNUICAgOiBcImVkaXRmb3JlY2FzdFwiLFxuICAgIEVNQUlMICAgICAgICAgIDogXCJlbWFpbFwiLFxuICAgIE1BUktDT01QTEVURSAgIDogXCJtYXJrY29tcGxldGVcIixcbiAgICBPUkRFUklURU1TICAgICA6IFwib3JkZXJpdGVtc1wiLFxuICAgIFBBQ0sgICAgICAgICAgIDogXCJwYWNrXCIsXG4gICAgUEFZQklMTFMgICAgICAgOiBcInBheWJpbGxzXCIsXG4gICAgUFJJTlQgICAgICAgICAgOiBcInByaW50XCIsXG4gICAgUVVJQ0tWSUVXICAgICAgOiBcInF1aWNrdmlld1wiLFxuICAgIFJFQVNTSUdOICAgICAgIDogXCJyZWFzc2lnblwiLFxuICAgIFJFSkVDVCAgICAgICAgIDogXCJyZWplY3RcIixcbiAgICBTSElQICAgICAgICAgICA6IFwic2hpcFwiLFxuICAgIFNQRUNJQUxPUkRFUiAgIDogXCJzcGVjaWFsb3JkZXJcIixcbiAgICBUUkFOU0ZPUk0gICAgICA6IFwidHJhbnNmb3JtXCIsXG4gICAgVklFVyAgICAgICAgICAgOiBcInZpZXdcIixcbiAgICBYRURJVCAgICAgICAgICA6IFwieGVkaXRcIixcbn1cblxuZnVuY3Rpb24gY3JlYXRlVXNlckV2ZW50Q29udGV4dCh0eXBlLCBvbGRSZWNvcmQsIG5ld1JlY29yZCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIG9sZFJlY29yZCxcbiAgICAgICAgbmV3UmVjb3JkLFxuICAgICAgICBVc2VyRXZlbnRUeXBlXG4gICAgfVxufVxuXG5mdW5jdGlvbiB0b1JlY29yZChvYmopIHtcbiAgICByZXR1cm4gUmVjb3JkLmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKG9iaikuZmlsdGVyKChbXywgdmFsdWVdKSA9PiAhW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIl0uaW5jbHVkZXModHlwZW9mIHZhbHVlKSkpXG59XG5cbmNvbnN0IGRlY29yYXRvcnMgPSBuZXcgRGVjb3JhdG9ycygpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG9wdGlvbnM6IGRlY29yYXRvcnMub3B0aW9ucyxcbiAgICByZXF1aXJlZDogZGVjb3JhdG9ycy5yZXF1aXJlZCxcbiAgICBhZGRQcm9taXNlOiBkZWNvcmF0b3JzLmFkZFByb21pc2UsXG4gICAgZHluYW1pY01vZGVPbmx5OiBkZWNvcmF0b3JzLmR5bmFtaWNNb2RlT25seSxcbiAgICBzdGFuZGFyZE1vZGVPbmx5OiBkZWNvcmF0b3JzLnN0YW5kYXJkTW9kZU9ubHksXG4gICAga2V5ZWRTZXRHZXRTZXQ6IGRlY29yYXRvcnMua2V5ZWRTZXRHZXRTZXQsXG4gICAgYXNzaWduQ29uc3RydWN0b3I6IGRlY29yYXRvcnMuYXNzaWduQ29uc3RydWN0b3IsXG4gICAgbW9jazogZGVjb3JhdG9ycy5tb2NrLFxuICAgIFVzZXJFdmVudFR5cGUsXG4gICAgY3JlYXRlVXNlckV2ZW50Q29udGV4dCxcbiAgICB0b1JlY29yZDogdG9SZWNvcmRcbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtFQUFFQTtBQUFPLENBQUMsR0FBR0MsT0FBTyxDQUFDLGtDQUFrQyxDQUFDO0FBRTlELFNBQVNDLGtCQUFrQixDQUFDQyxNQUFNLEVBQUU7RUFDaEMsT0FBTyxVQUFTLEdBQUdDLElBQUksRUFBRTtJQUNyQixPQUFPLFVBQVNDLENBQUMsRUFBRUMsT0FBTyxFQUFFO01BQ3hCLElBQUdBLE9BQU8sQ0FBQ0MsSUFBSSxLQUFLLE9BQU8sRUFBRTtRQUN6QixPQUFPLFVBQVNDLEtBQUssRUFBRTtVQUNuQixPQUFRTCxNQUFNLENBQUMsR0FBR0MsSUFBSSxDQUFDLENBQUNLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBRUQsS0FBSyxFQUFFRixPQUFPLENBQUM7UUFDdkQsQ0FBQztNQUNMO0lBQ0osQ0FBQztFQUNMLENBQUM7QUFDTDtBQUVBLE1BQU1JLFVBQVUsQ0FBQztFQUFBO0lBQUEsa0NBQ1pSLGtCQUFrQixrQkFrQmxCQSxrQkFBa0IsbUJBY2xCQSxrQkFBa0IscUJBVWxC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