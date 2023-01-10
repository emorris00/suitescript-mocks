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
const structuredClone = require('core-js-pure/actual/structured-clone');
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

  // autobind() {
  //     return function(target, context) {
  //         return class extends target {
  //             constructor(...args) {
  //                 super(...args)
  //                 for() {

  //                 }
  //             }
  //         }
  //     }
  // }

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
  keyedSetGetSet: decorators.keyedSetGetSet,
  assignConstructor: decorators.assignConstructor,
  UserEventType,
  createUserEventContext,
  toRecord: toRecord
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzdHJ1Y3R1cmVkQ2xvbmUiLCJyZXF1aXJlIiwiUmVjb3JkIiwiZmllbGRJbml0RGVjb3JhdG9yIiwidGFyZ2V0IiwiYXJncyIsIl8iLCJjb250ZXh0Iiwia2luZCIsInZhbHVlIiwiYmluZCIsIkRlY29yYXRvcnMiLCJvcHRpb25zIiwia2V5cyIsInJlZHVjZSIsImFjYyIsImN1ciIsImkiLCJyZXF1aXJlZCIsImZvckVhY2giLCJrZXkiLCJ1bmRlZmluZWQiLCJFcnJvciIsImFkZFByb21pc2UiLCJwcm9taXNlIiwiYXJndW1lbnRzIiwiZHluYW1pY01vZGVPbmx5IiwiaXNEeW5hbWljIiwic3RhbmRhcmRNb2RlT25seSIsImtleWVkU2V0R2V0U2V0IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJuYW1lIiwicmVwbGFjZSIsImdldCIsInNldCIsInZhbHVlcyIsImNsZWFyIiwiYSIsImFkZCIsImFzc2lnbkNvbnN0cnVjdG9yIiwiY29uc3RydWN0b3IiLCJlbnRyaWVzIiwiaW5pdGlhbGl6ZSIsIlVzZXJFdmVudFR5cGUiLCJBUFBST1ZFIiwiQ0FOQ0VMIiwiQ0hBTkdFUEFTU1dPUkQiLCJDT1BZIiwiQ1JFQVRFIiwiREVMRVRFIiwiRFJPUFNISVAiLCJFRElUIiwiRURJVEZPUkVDQVNUIiwiRU1BSUwiLCJNQVJLQ09NUExFVEUiLCJPUkRFUklURU1TIiwiUEFDSyIsIlBBWUJJTExTIiwiUFJJTlQiLCJRVUlDS1ZJRVciLCJSRUFTU0lHTiIsIlJFSkVDVCIsIlNISVAiLCJTUEVDSUFMT1JERVIiLCJUUkFOU0ZPUk0iLCJWSUVXIiwiWEVESVQiLCJjcmVhdGVVc2VyRXZlbnRDb250ZXh0IiwidHlwZSIsIm9sZFJlY29yZCIsIm5ld1JlY29yZCIsInRvUmVjb3JkIiwib2JqIiwiZnJvbUVudHJpZXMiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsImRlY29yYXRvcnMiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2hlbHBlcnMuY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN0cnVjdHVyZWRDbG9uZSA9IHJlcXVpcmUoJ2NvcmUtanMtcHVyZS9hY3R1YWwvc3RydWN0dXJlZC1jbG9uZScpO1xuY29uc3QgeyBSZWNvcmQgfSA9IHJlcXVpcmUoXCJAYmxvb21iZXJnL3JlY29yZC10dXBsZS1wb2x5ZmlsbFwiKVxuXG5mdW5jdGlvbiBmaWVsZEluaXREZWNvcmF0b3IodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKF8sIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGlmKGNvbnRleHQua2luZCA9PT0gXCJmaWVsZFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGFyZ2V0KC4uLmFyZ3MpLmJpbmQodGhpcykpKHZhbHVlLCBjb250ZXh0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgRGVjb3JhdG9ycyB7XG4gICAgQGZpZWxkSW5pdERlY29yYXRvclxuICAgIG9wdGlvbnMoLi4ua2V5cykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiguLi5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIG9wdGlvbnNbMF0gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMucmVkdWNlKChhY2MsIGN1ciwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNjW2tleXNbaV1dID0gY3VyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjXG4gICAgICAgICAgICAgICAgICAgIH0sIHt9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnNbMF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlKG9wdGlvbnMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAZmllbGRJbml0RGVjb3JhdG9yXG4gICAgcmVxdWlyZWQoLi4ua2V5cykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCEoa2V5IGluIG9wdGlvbnMpIHx8IG9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG1pc3NpbmcgcmVxdWlyZWQgb3B0aW9uICcke2tleX0nYClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlKG9wdGlvbnMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAZmllbGRJbml0RGVjb3JhdG9yXG4gICAgYWRkUHJvbWlzZSgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICB2YWx1ZS5wcm9taXNlID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAZmllbGRJbml0RGVjb3JhdG9yXG4gICAgZHluYW1pY01vZGVPbmx5KCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc0R5bmFtaWMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgYmUgcnVuIGluIHN0YW5kYXJkIG1vZGVgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQGZpZWxkSW5pdERlY29yYXRvclxuICAgIHN0YW5kYXJkTW9kZU9ubHkoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNEeW5hbWljKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGJlIHJ1biBpbiBkeW5hbWljIG1vZGVgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQGZpZWxkSW5pdERlY29yYXRvclxuICAgIGtleWVkU2V0R2V0U2V0KCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBjb250ZXh0Lm5hbWUucmVwbGFjZShcIiNcIiwgXCJcIiksIHtcbiAgICAgICAgICAgICAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgICAgICAgICAgICAgIHNldDogKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5jbGVhcigpXG4gICAgICAgICAgICAgICAgICAgIGZvcihjb25zdCBhIG9mIHZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuYWRkKGEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhdXRvYmluZCgpIHtcbiAgICAvLyAgICAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgY29udGV4dCkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgdGFyZ2V0IHtcbiAgICAvLyAgICAgICAgICAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHN1cGVyKC4uLmFyZ3MpXG4gICAgLy8gICAgICAgICAgICAgICAgIGZvcigpIHtcblxuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgYXNzaWduQ29uc3RydWN0b3IoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0YXJnZXQsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIHRhcmdldCB7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IodmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKClcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHZhbHVlcyA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXModmFsdWVzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihrZXkgaW4gdGhpcyAmJiB0eXBlb2YgdGhpc1trZXldICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXM/LmluaXRpYWxpemU/LigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBVc2VyRXZlbnRUeXBlID0ge1xuICAgIEFQUFJPVkUgICAgICAgIDogXCJhcHByb3ZlXCIsXG4gICAgQ0FOQ0VMICAgICAgICAgOiBcImNhbmNlbFwiLFxuICAgIENIQU5HRVBBU1NXT1JEIDogXCJjaGFuZ2VwYXNzd29yZFwiLFxuICAgIENPUFkgICAgICAgICAgIDogXCJjb3B5XCIsXG4gICAgQ1JFQVRFICAgICAgICAgOiBcImNyZWF0ZVwiLFxuICAgIERFTEVURSAgICAgICAgIDogXCJkZWxldGVcIixcbiAgICBEUk9QU0hJUCAgICAgICA6IFwiZHJvcHNoaXBcIixcbiAgICBFRElUICAgICAgICAgICA6IFwiZWRpdFwiLFxuICAgIEVESVRGT1JFQ0FTVCAgIDogXCJlZGl0Zm9yZWNhc3RcIixcbiAgICBFTUFJTCAgICAgICAgICA6IFwiZW1haWxcIixcbiAgICBNQVJLQ09NUExFVEUgICA6IFwibWFya2NvbXBsZXRlXCIsXG4gICAgT1JERVJJVEVNUyAgICAgOiBcIm9yZGVyaXRlbXNcIixcbiAgICBQQUNLICAgICAgICAgICA6IFwicGFja1wiLFxuICAgIFBBWUJJTExTICAgICAgIDogXCJwYXliaWxsc1wiLFxuICAgIFBSSU5UICAgICAgICAgIDogXCJwcmludFwiLFxuICAgIFFVSUNLVklFVyAgICAgIDogXCJxdWlja3ZpZXdcIixcbiAgICBSRUFTU0lHTiAgICAgICA6IFwicmVhc3NpZ25cIixcbiAgICBSRUpFQ1QgICAgICAgICA6IFwicmVqZWN0XCIsXG4gICAgU0hJUCAgICAgICAgICAgOiBcInNoaXBcIixcbiAgICBTUEVDSUFMT1JERVIgICA6IFwic3BlY2lhbG9yZGVyXCIsXG4gICAgVFJBTlNGT1JNICAgICAgOiBcInRyYW5zZm9ybVwiLFxuICAgIFZJRVcgICAgICAgICAgIDogXCJ2aWV3XCIsXG4gICAgWEVESVQgICAgICAgICAgOiBcInhlZGl0XCIsXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZXJFdmVudENvbnRleHQodHlwZSwgb2xkUmVjb3JkLCBuZXdSZWNvcmQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlLFxuICAgICAgICBvbGRSZWNvcmQsXG4gICAgICAgIG5ld1JlY29yZCxcbiAgICAgICAgVXNlckV2ZW50VHlwZVxuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9SZWNvcmQob2JqKSB7XG4gICAgcmV0dXJuIFJlY29yZC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhvYmopLmZpbHRlcigoW18sIHZhbHVlXSkgPT4gIVtcIm9iamVjdFwiLCBcImZ1bmN0aW9uXCJdLmluY2x1ZGVzKHR5cGVvZiB2YWx1ZSkpKVxufVxuXG5jb25zdCBkZWNvcmF0b3JzID0gbmV3IERlY29yYXRvcnMoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBvcHRpb25zOiBkZWNvcmF0b3JzLm9wdGlvbnMsXG4gICAgcmVxdWlyZWQ6IGRlY29yYXRvcnMucmVxdWlyZWQsXG4gICAgYWRkUHJvbWlzZTogZGVjb3JhdG9ycy5hZGRQcm9taXNlLFxuICAgIGR5bmFtaWNNb2RlT25seTogZGVjb3JhdG9ycy5keW5hbWljTW9kZU9ubHksXG4gICAgc3RhbmRhcmRNb2RlT25seTogZGVjb3JhdG9ycy5zdGFuZGFyZE1vZGVPbmx5LFxuICAgIGtleWVkU2V0R2V0U2V0OiBkZWNvcmF0b3JzLmtleWVkU2V0R2V0U2V0LFxuICAgIGFzc2lnbkNvbnN0cnVjdG9yOiBkZWNvcmF0b3JzLmFzc2lnbkNvbnN0cnVjdG9yLFxuICAgIFVzZXJFdmVudFR5cGUsXG4gICAgY3JlYXRlVXNlckV2ZW50Q29udGV4dCxcbiAgICB0b1JlY29yZDogdG9SZWNvcmRc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