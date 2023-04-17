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
function fieldInitDecorator(target) {
  return function (...args) {
    return function (_, context) {
      if (context.kind === "field") {
        return function (value) {
          /* eslint-disable */
          return target(...args).bind(this)(value, context);
        };
      }
    };
  };
}
class Decorators {
  static {
    [_initProto] = _applyDecs(this, [[fieldInitDecorator, 2, "options"], [fieldInitDecorator, 2, "required"], [fieldInitDecorator, 2, "addPromise"], [fieldInitDecorator, 2, "dynamicModeOnly"], [fieldInitDecorator, 2, "standardModeOnly"], [fieldInitDecorator, 2, "addKeyedSetGetSet"]], []);
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
      value.promise = async function (...args) {
        value(...args);
      };
      return value;
    };
  }
  dynamicModeOnly() {
    return function (value) {
      return function (...args) {
        /* eslint-disable */
        if (!this.isDynamic) {
          throw new Error(`cannot be run in standard mode`);
        }
        return value(...args);
      };
    };
  }
  standardModeOnly() {
    return function (value) {
      return function (...args) {
        /* eslint-disable */
        if (this.isDynamic) {
          throw new Error(`cannot be run in dynamic mode`);
        }
        return value(...args);
      };
    };
  }
  addKeyedSetGetSet() {
    return function (value, context) {
      /* eslint-disable */
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
              if (key in this && typeof this[key] !== "function") {
                this[key] = value;
              }
            });
          }
          this?.initialize?.();
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
const decorators = new Decorators();
module.exports = {
  options: decorators.options,
  required: decorators.required,
  addPromise: decorators.addPromise,
  dynamicModeOnly: decorators.dynamicModeOnly,
  standardModeOnly: decorators.standardModeOnly,
  addKeyedSetGetSet: decorators.addKeyedSetGetSet,
  assignConstructor: decorators.assignConstructor,
  UserEventType,
  createUserEventContext
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmaWVsZEluaXREZWNvcmF0b3IiLCJ0YXJnZXQiLCJhcmdzIiwiXyIsImNvbnRleHQiLCJraW5kIiwidmFsdWUiLCJiaW5kIiwiRGVjb3JhdG9ycyIsIm9wdGlvbnMiLCJrZXlzIiwicmVkdWNlIiwiYWNjIiwiY3VyIiwiaSIsInJlcXVpcmVkIiwiZm9yRWFjaCIsImtleSIsInVuZGVmaW5lZCIsIkVycm9yIiwiYWRkUHJvbWlzZSIsInByb21pc2UiLCJkeW5hbWljTW9kZU9ubHkiLCJpc0R5bmFtaWMiLCJzdGFuZGFyZE1vZGVPbmx5IiwiYWRkS2V5ZWRTZXRHZXRTZXQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsIm5hbWUiLCJyZXBsYWNlIiwiZ2V0Iiwic2V0IiwidmFsdWVzIiwiY2xlYXIiLCJhIiwiYWRkIiwiYXNzaWduQ29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvciIsImVudHJpZXMiLCJpbml0aWFsaXplIiwiVXNlckV2ZW50VHlwZSIsIkFQUFJPVkUiLCJDQU5DRUwiLCJDSEFOR0VQQVNTV09SRCIsIkNPUFkiLCJDUkVBVEUiLCJERUxFVEUiLCJEUk9QU0hJUCIsIkVESVQiLCJFRElURk9SRUNBU1QiLCJFTUFJTCIsIk1BUktDT01QTEVURSIsIk9SREVSSVRFTVMiLCJQQUNLIiwiUEFZQklMTFMiLCJQUklOVCIsIlFVSUNLVklFVyIsIlJFQVNTSUdOIiwiUkVKRUNUIiwiU0hJUCIsIlNQRUNJQUxPUkRFUiIsIlRSQU5TRk9STSIsIlZJRVciLCJYRURJVCIsImNyZWF0ZVVzZXJFdmVudENvbnRleHQiLCJ0eXBlIiwib2xkUmVjb3JkIiwibmV3UmVjb3JkIiwiZGVjb3JhdG9ycyIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi9zcmMvaGVscGVycy5janMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmllbGRJbml0RGVjb3JhdG9yKHRhcmdldCkge1xuXHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKF8sIGNvbnRleHQpIHtcblx0XHRcdGlmIChjb250ZXh0LmtpbmQgPT09IFwiZmllbGRcIikge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgKi9cblx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0KC4uLmFyZ3MpLmJpbmQodGhpcykodmFsdWUsIGNvbnRleHQpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG59XG5cbmNsYXNzIERlY29yYXRvcnMge1xuXHRAZmllbGRJbml0RGVjb3JhdG9yXG5cdG9wdGlvbnMoLi4ua2V5cykge1xuXHRcdHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4ub3B0aW9ucykge1xuXHRcdFx0XHRpZiAodHlwZW9mIG9wdGlvbnNbMF0gIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0XHRvcHRpb25zID0gb3B0aW9ucy5yZWR1Y2UoKGFjYywgY3VyLCBpKSA9PiB7XG5cdFx0XHRcdFx0XHRhY2Nba2V5c1tpXV0gPSBjdXI7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYWNjO1xuXHRcdFx0XHRcdH0sIHt9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRvcHRpb25zID0gb3B0aW9uc1swXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsdWUob3B0aW9ucyk7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH1cblxuXHRAZmllbGRJbml0RGVjb3JhdG9yXG5cdHJlcXVpcmVkKC4uLmtleXMpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRcdFx0a2V5cy5mb3JFYWNoKChrZXkpID0+IHtcblx0XHRcdFx0XHRpZiAoIShrZXkgaW4gb3B0aW9ucykgfHwgb3B0aW9uc1trZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgbWlzc2luZyByZXF1aXJlZCBvcHRpb24gJyR7a2V5fSdgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUob3B0aW9ucyk7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH1cblxuXHRAZmllbGRJbml0RGVjb3JhdG9yXG5cdGFkZFByb21pc2UoKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0dmFsdWUucHJvbWlzZSA9IGFzeW5jIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhbHVlKC4uLmFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9O1xuXHR9XG5cblx0QGZpZWxkSW5pdERlY29yYXRvclxuXHRkeW5hbWljTW9kZU9ubHkoKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlICovXG5cdFx0XHRcdGlmICghdGhpcy5pc0R5bmFtaWMpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBiZSBydW4gaW4gc3RhbmRhcmQgbW9kZWApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2YWx1ZSguLi5hcmdzKTtcblx0XHRcdH07XG5cdFx0fTtcblx0fVxuXG5cdEBmaWVsZEluaXREZWNvcmF0b3Jcblx0c3RhbmRhcmRNb2RlT25seSgpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgKi9cblx0XHRcdFx0aWYgKHRoaXMuaXNEeW5hbWljKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgYmUgcnVuIGluIGR5bmFtaWMgbW9kZWApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2YWx1ZSguLi5hcmdzKTtcblx0XHRcdH07XG5cdFx0fTtcblx0fVxuXG5cdEBmaWVsZEluaXREZWNvcmF0b3Jcblx0YWRkS2V5ZWRTZXRHZXRTZXQoKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSwgY29udGV4dCkge1xuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgKi9cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBjb250ZXh0Lm5hbWUucmVwbGFjZShcIiNcIiwgXCJcIiksIHtcblx0XHRcdFx0Z2V0OiAoKSA9PiB2YWx1ZSxcblx0XHRcdFx0c2V0OiAodmFsdWVzKSA9PiB7XG5cdFx0XHRcdFx0dmFsdWUuY2xlYXIoKTtcblx0XHRcdFx0XHRmb3IgKGNvbnN0IGEgb2YgdmFsdWVzKSB7XG5cdFx0XHRcdFx0XHR2YWx1ZS5hZGQoYSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fVxuXG5cdGFzc2lnbkNvbnN0cnVjdG9yKCkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBjb250ZXh0KSB7XG5cdFx0XHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyB0YXJnZXQge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvcih2YWx1ZXMpIHtcblx0XHRcdFx0XHRzdXBlcigpO1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdmFsdWVzID09PSBcIm9iamVjdFwiICYmIHZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZW50cmllcyh2YWx1ZXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoa2V5IGluIHRoaXMgJiYgdHlwZW9mIHRoaXNba2V5XSAhPT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpc1trZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzPy5pbml0aWFsaXplPy4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9O1xuXHR9XG59XG5cbmNvbnN0IFVzZXJFdmVudFR5cGUgPSB7XG5cdEFQUFJPVkU6IFwiYXBwcm92ZVwiLFxuXHRDQU5DRUw6IFwiY2FuY2VsXCIsXG5cdENIQU5HRVBBU1NXT1JEOiBcImNoYW5nZXBhc3N3b3JkXCIsXG5cdENPUFk6IFwiY29weVwiLFxuXHRDUkVBVEU6IFwiY3JlYXRlXCIsXG5cdERFTEVURTogXCJkZWxldGVcIixcblx0RFJPUFNISVA6IFwiZHJvcHNoaXBcIixcblx0RURJVDogXCJlZGl0XCIsXG5cdEVESVRGT1JFQ0FTVDogXCJlZGl0Zm9yZWNhc3RcIixcblx0RU1BSUw6IFwiZW1haWxcIixcblx0TUFSS0NPTVBMRVRFOiBcIm1hcmtjb21wbGV0ZVwiLFxuXHRPUkRFUklURU1TOiBcIm9yZGVyaXRlbXNcIixcblx0UEFDSzogXCJwYWNrXCIsXG5cdFBBWUJJTExTOiBcInBheWJpbGxzXCIsXG5cdFBSSU5UOiBcInByaW50XCIsXG5cdFFVSUNLVklFVzogXCJxdWlja3ZpZXdcIixcblx0UkVBU1NJR046IFwicmVhc3NpZ25cIixcblx0UkVKRUNUOiBcInJlamVjdFwiLFxuXHRTSElQOiBcInNoaXBcIixcblx0U1BFQ0lBTE9SREVSOiBcInNwZWNpYWxvcmRlclwiLFxuXHRUUkFOU0ZPUk06IFwidHJhbnNmb3JtXCIsXG5cdFZJRVc6IFwidmlld1wiLFxuXHRYRURJVDogXCJ4ZWRpdFwiLFxufTtcblxuZnVuY3Rpb24gY3JlYXRlVXNlckV2ZW50Q29udGV4dCh0eXBlLCBvbGRSZWNvcmQsIG5ld1JlY29yZCkge1xuXHRyZXR1cm4ge1xuXHRcdHR5cGUsXG5cdFx0b2xkUmVjb3JkLFxuXHRcdG5ld1JlY29yZCxcblx0XHRVc2VyRXZlbnRUeXBlLFxuXHR9O1xufVxuXG5jb25zdCBkZWNvcmF0b3JzID0gbmV3IERlY29yYXRvcnMoKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdG9wdGlvbnM6IGRlY29yYXRvcnMub3B0aW9ucyxcblx0cmVxdWlyZWQ6IGRlY29yYXRvcnMucmVxdWlyZWQsXG5cdGFkZFByb21pc2U6IGRlY29yYXRvcnMuYWRkUHJvbWlzZSxcblx0ZHluYW1pY01vZGVPbmx5OiBkZWNvcmF0b3JzLmR5bmFtaWNNb2RlT25seSxcblx0c3RhbmRhcmRNb2RlT25seTogZGVjb3JhdG9ycy5zdGFuZGFyZE1vZGVPbmx5LFxuXHRhZGRLZXllZFNldEdldFNldDogZGVjb3JhdG9ycy5hZGRLZXllZFNldEdldFNldCxcblx0YXNzaWduQ29uc3RydWN0b3I6IGRlY29yYXRvcnMuYXNzaWduQ29uc3RydWN0b3IsXG5cdFVzZXJFdmVudFR5cGUsXG5cdGNyZWF0ZVVzZXJFdmVudENvbnRleHQsXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLFNBQVNBLGtCQUFrQixDQUFDQyxNQUFNLEVBQUU7RUFDbkMsT0FBTyxVQUFVLEdBQUdDLElBQUksRUFBRTtJQUN6QixPQUFPLFVBQVVDLENBQUMsRUFBRUMsT0FBTyxFQUFFO01BQzVCLElBQUlBLE9BQU8sQ0FBQ0MsSUFBSSxLQUFLLE9BQU8sRUFBRTtRQUM3QixPQUFPLFVBQVVDLEtBQUssRUFBRTtVQUN2QjtVQUNBLE9BQU9MLE1BQU0sQ0FBQyxHQUFHQyxJQUFJLENBQUMsQ0FBQ0ssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDRCxLQUFLLEVBQUVGLE9BQU8sQ0FBQztRQUNsRCxDQUFDO01BQ0Y7SUFDRCxDQUFDO0VBQ0YsQ0FBQztBQUNGO0FBRUEsTUFBTUksVUFBVSxDQUFDO0VBQUE7SUFBQSxrQ0FDZlIsa0JBQWtCLGtCQWlCbEJBLGtCQUFrQixtQkFjbEJBLGtCQUFrQixxQkFVbEJBLGtCQUFrQiwwQkFhbEJBLGtCQUFrQiwyQkFhbEJBLGtCQUFrQjtFQUFBO0VBQUE7SUFBQTtFQUFBO0VBbEVuQlMsT0FBTyxDQUFDLEdBQUdDLElBQUksRUFBRTtJQUNoQixPQUFPLFVBQVVKLEtBQUssRUFBRTtNQUN2QixPQUFPLFVBQVUsR0FBR0csT0FB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