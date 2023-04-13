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
  addKeyedSetGetSet: decorators.addKeyedSetGetSet,
  assignConstructor: decorators.assignConstructor,
  UserEventType,
  createUserEventContext,
  toRecord: toRecord
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWNvcmQiLCJyZXF1aXJlIiwiZmllbGRJbml0RGVjb3JhdG9yIiwidGFyZ2V0IiwiYXJncyIsIl8iLCJjb250ZXh0Iiwia2luZCIsInZhbHVlIiwiYmluZCIsIkRlY29yYXRvcnMiLCJvcHRpb25zIiwia2V5cyIsInJlZHVjZSIsImFjYyIsImN1ciIsImkiLCJyZXF1aXJlZCIsImZvckVhY2giLCJrZXkiLCJ1bmRlZmluZWQiLCJFcnJvciIsImFkZFByb21pc2UiLCJwcm9taXNlIiwiZHluYW1pY01vZGVPbmx5IiwiaXNEeW5hbWljIiwic3RhbmRhcmRNb2RlT25seSIsImFkZEtleWVkU2V0R2V0U2V0IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJuYW1lIiwicmVwbGFjZSIsImdldCIsInNldCIsInZhbHVlcyIsImNsZWFyIiwiYSIsImFkZCIsImFzc2lnbkNvbnN0cnVjdG9yIiwiY29uc3RydWN0b3IiLCJlbnRyaWVzIiwiaW5pdGlhbGl6ZSIsIlVzZXJFdmVudFR5cGUiLCJBUFBST1ZFIiwiQ0FOQ0VMIiwiQ0hBTkdFUEFTU1dPUkQiLCJDT1BZIiwiQ1JFQVRFIiwiREVMRVRFIiwiRFJPUFNISVAiLCJFRElUIiwiRURJVEZPUkVDQVNUIiwiRU1BSUwiLCJNQVJLQ09NUExFVEUiLCJPUkRFUklURU1TIiwiUEFDSyIsIlBBWUJJTExTIiwiUFJJTlQiLCJRVUlDS1ZJRVciLCJSRUFTU0lHTiIsIlJFSkVDVCIsIlNISVAiLCJTUEVDSUFMT1JERVIiLCJUUkFOU0ZPUk0iLCJWSUVXIiwiWEVESVQiLCJjcmVhdGVVc2VyRXZlbnRDb250ZXh0IiwidHlwZSIsIm9sZFJlY29yZCIsIm5ld1JlY29yZCIsInRvUmVjb3JkIiwib2JqIiwiZnJvbUVudHJpZXMiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImRlY29yYXRvcnMiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2hlbHBlcnMuY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgUmVjb3JkIH0gPSByZXF1aXJlKFwiQGJsb29tYmVyZy9yZWNvcmQtdHVwbGUtcG9seWZpbGxcIik7XG5cbmZ1bmN0aW9uIGZpZWxkSW5pdERlY29yYXRvcih0YXJnZXQpIHtcblx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChfLCBjb250ZXh0KSB7XG5cdFx0XHRpZiAoY29udGV4dC5raW5kID09PSBcImZpZWxkXCIpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlICovXG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldCguLi5hcmdzKS5iaW5kKHRoaXMpKHZhbHVlLCBjb250ZXh0KTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xufVxuXG5jbGFzcyBEZWNvcmF0b3JzIHtcblx0QGZpZWxkSW5pdERlY29yYXRvclxuXHRvcHRpb25zKC4uLmtleXMpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLm9wdGlvbnMpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zWzBdICE9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMucmVkdWNlKChhY2MsIGN1ciwgaSkgPT4ge1xuXHRcdFx0XHRcdFx0YWNjW2tleXNbaV1dID0gY3VyO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGFjYztcblx0XHRcdFx0XHR9LCB7fSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0b3B0aW9ucyA9IG9wdGlvbnNbMF07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZhbHVlKG9wdGlvbnMpO1xuXHRcdFx0fTtcblx0XHR9O1xuXHR9XG5cblx0QGZpZWxkSW5pdERlY29yYXRvclxuXHRyZXF1aXJlZCguLi5rZXlzKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0XHRcdGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdFx0aWYgKCEoa2V5IGluIG9wdGlvbnMpIHx8IG9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYG1pc3NpbmcgcmVxdWlyZWQgb3B0aW9uICcke2tleX0nYCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHZhbHVlKG9wdGlvbnMpO1xuXHRcdFx0fTtcblx0XHR9O1xuXHR9XG5cblx0QGZpZWxkSW5pdERlY29yYXRvclxuXHRhZGRQcm9taXNlKCkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHZhbHVlLnByb21pc2UgPSBhc3luYyBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YWx1ZSguLi5hcmdzKTtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fTtcblx0fVxuXG5cdEBmaWVsZEluaXREZWNvcmF0b3Jcblx0ZHluYW1pY01vZGVPbmx5KCkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXHRcdFx0XHRpZiAoIXRoaXMuaXNEeW5hbWljKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgYmUgcnVuIGluIHN0YW5kYXJkIG1vZGVgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsdWUoLi4uYXJncyk7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH1cblxuXHRAZmllbGRJbml0RGVjb3JhdG9yXG5cdHN0YW5kYXJkTW9kZU9ubHkoKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlICovXG5cdFx0XHRcdGlmICh0aGlzLmlzRHluYW1pYykge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgY2Fubm90IGJlIHJ1biBpbiBkeW5hbWljIG1vZGVgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsdWUoLi4uYXJncyk7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH1cblxuXHRAZmllbGRJbml0RGVjb3JhdG9yXG5cdGFkZEtleWVkU2V0R2V0U2V0KCkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAodmFsdWUsIGNvbnRleHQpIHtcblx0XHRcdC8qIGVzbGludC1kaXNhYmxlICovXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgY29udGV4dC5uYW1lLnJlcGxhY2UoXCIjXCIsIFwiXCIpLCB7XG5cdFx0XHRcdGdldDogKCkgPT4gdmFsdWUsXG5cdFx0XHRcdHNldDogKHZhbHVlcykgPT4ge1xuXHRcdFx0XHRcdHZhbHVlLmNsZWFyKCk7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBhIG9mIHZhbHVlcykge1xuXHRcdFx0XHRcdFx0dmFsdWUuYWRkKGEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH07XG5cdH1cblxuXHRhc3NpZ25Db25zdHJ1Y3RvcigpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgY29udGV4dCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzIGV4dGVuZHMgdGFyZ2V0IHtcblx0XHRcdFx0Y29uc3RydWN0b3IodmFsdWVzKSB7XG5cdFx0XHRcdFx0c3VwZXIoKTtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlcyA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmVudHJpZXModmFsdWVzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKGtleSBpbiB0aGlzICYmIHR5cGVvZiB0aGlzW2tleV0gIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXNba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcz8uaW5pdGlhbGl6ZT8uKCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fTtcblx0fVxufVxuXG5jb25zdCBVc2VyRXZlbnRUeXBlID0ge1xuXHRBUFBST1ZFOiBcImFwcHJvdmVcIixcblx0Q0FOQ0VMOiBcImNhbmNlbFwiLFxuXHRDSEFOR0VQQVNTV09SRDogXCJjaGFuZ2VwYXNzd29yZFwiLFxuXHRDT1BZOiBcImNvcHlcIixcblx0Q1JFQVRFOiBcImNyZWF0ZVwiLFxuXHRERUxFVEU6IFwiZGVsZXRlXCIsXG5cdERST1BTSElQOiBcImRyb3BzaGlwXCIsXG5cdEVESVQ6IFwiZWRpdFwiLFxuXHRFRElURk9SRUNBU1Q6IFwiZWRpdGZvcmVjYXN0XCIsXG5cdEVNQUlMOiBcImVtYWlsXCIsXG5cdE1BUktDT01QTEVURTogXCJtYXJrY29tcGxldGVcIixcblx0T1JERVJJVEVNUzogXCJvcmRlcml0ZW1zXCIsXG5cdFBBQ0s6IFwicGFja1wiLFxuXHRQQVlCSUxMUzogXCJwYXliaWxsc1wiLFxuXHRQUklOVDogXCJwcmludFwiLFxuXHRRVUlDS1ZJRVc6IFwicXVpY2t2aWV3XCIsXG5cdFJFQVNTSUdOOiBcInJlYXNzaWduXCIsXG5cdFJFSkVDVDogXCJyZWplY3RcIixcblx0U0hJUDogXCJzaGlwXCIsXG5cdFNQRUNJQUxPUkRFUjogXCJzcGVjaWFsb3JkZXJcIixcblx0VFJBTlNGT1JNOiBcInRyYW5zZm9ybVwiLFxuXHRWSUVXOiBcInZpZXdcIixcblx0WEVESVQ6IFwieGVkaXRcIixcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZXJFdmVudENvbnRleHQodHlwZSwgb2xkUmVjb3JkLCBuZXdSZWNvcmQpIHtcblx0cmV0dXJuIHtcblx0XHR0eXBlLFxuXHRcdG9sZFJlY29yZCxcblx0XHRuZXdSZWNvcmQsXG5cdFx0VXNlckV2ZW50VHlwZSxcblx0fTtcbn1cblxuZnVuY3Rpb24gdG9SZWNvcmQob2JqKSB7XG5cdHJldHVybiBSZWNvcmQuZnJvbUVudHJpZXMoXG5cdFx0T2JqZWN0LmVudHJpZXMob2JqKS5maWx0ZXIoKFtfLCB2YWx1ZV0pID0+ICFbXCJvYmplY3RcIiwgXCJmdW5jdGlvblwiXS5pbmNsdWRlcyh0eXBlb2YgdmFsdWUpKVxuXHQpO1xufVxuXG5jb25zdCBkZWNvcmF0b3JzID0gbmV3IERlY29yYXRvcnMoKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdG9wdGlvbnM6IGRlY29yYXRvcnMub3B0aW9ucyxcblx0cmVxdWlyZWQ6IGRlY29yYXRvcnMucmVxdWlyZWQsXG5cdGFkZFByb21pc2U6IGRlY29yYXRvcnMuYWRkUHJvbWlzZSxcblx0ZHluYW1pY01vZGVPbmx5OiBkZWNvcmF0b3JzLmR5bmFtaWNNb2RlT25seSxcblx0c3RhbmRhcmRNb2RlT25seTogZGVjb3JhdG9ycy5zdGFuZGFyZE1vZGVPbmx5LFxuXHRhZGRLZXllZFNldEdldFNldDogZGVjb3JhdG9ycy5hZGRLZXllZFNldEdldFNldCxcblx0YXNzaWduQ29uc3RydWN0b3I6IGRlY29yYXRvcnMuYXNzaWduQ29uc3RydWN0b3IsXG5cdFVzZXJFdmVudFR5cGUsXG5cdGNyZWF0ZVVzZXJFdmVudENvbnRleHQsXG5cdHRvUmVjb3JkOiB0b1JlY29yZCxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtFQUFFQTtBQUFPLENBQUMsR0FBR0MsT0FBTyxDQUFDLGtDQUFrQyxDQUFDO0FBRTlELFNBQVNDLGtCQUFrQixDQUFDQyxNQUFNLEVBQUU7RUFDbkMsT0FBTyxVQUFVLEdBQUdDLElBQUksRUFBRTtJQUN6QixPQUFPLFVBQVVDLENBQUMsRUFBRUMsT0FBTyxFQUFFO01BQzVCLElBQUlBLE9BQU8sQ0FBQ0MsSUFBSSxLQUFLLE9BQU8sRUFBRTtRQUM3QixP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