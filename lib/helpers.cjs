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
          return target(...args)(value, context);
        };
      }
    };
  };
}
class Decorators {
  static {
    [_initProto] = _applyDecs(this, [[fieldInitDecorator, 2, "options"], [fieldInitDecorator, 2, "addPromise"]], []);
  }
  constructor(...args) {
    _initProto(this);
  }
  mock() {
    return function (target, context) {
      console.log();
    };
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
  addPromise() {
    return function (value) {
      value.promise = async function () {
        value(...arguments);
      };
      return value;
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
  addPromise: decorators.addPromise,
  mock: decorators.mock,
  UserEventType,
  createUserEventContext
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmaWVsZEluaXREZWNvcmF0b3IiLCJ0YXJnZXQiLCJhcmdzIiwiXyIsImNvbnRleHQiLCJraW5kIiwidmFsdWUiLCJEZWNvcmF0b3JzIiwibW9jayIsImNvbnNvbGUiLCJsb2ciLCJvcHRpb25zIiwia2V5cyIsInJlZHVjZSIsImFjYyIsImN1ciIsImkiLCJhZGRQcm9taXNlIiwicHJvbWlzZSIsImFyZ3VtZW50cyIsIlVzZXJFdmVudFR5cGUiLCJBUFBST1ZFIiwiQ0FOQ0VMIiwiQ0hBTkdFUEFTU1dPUkQiLCJDT1BZIiwiQ1JFQVRFIiwiREVMRVRFIiwiRFJPUFNISVAiLCJFRElUIiwiRURJVEZPUkVDQVNUIiwiRU1BSUwiLCJNQVJLQ09NUExFVEUiLCJPUkRFUklURU1TIiwiUEFDSyIsIlBBWUJJTExTIiwiUFJJTlQiLCJRVUlDS1ZJRVciLCJSRUFTU0lHTiIsIlJFSkVDVCIsIlNISVAiLCJTUEVDSUFMT1JERVIiLCJUUkFOU0ZPUk0iLCJWSUVXIiwiWEVESVQiLCJjcmVhdGVVc2VyRXZlbnRDb250ZXh0IiwidHlwZSIsIm9sZFJlY29yZCIsIm5ld1JlY29yZCIsImRlY29yYXRvcnMiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL2hlbHBlcnMuY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZpZWxkSW5pdERlY29yYXRvcih0YXJnZXQpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiguLi5hcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKF8sIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgaWYoY29udGV4dC5raW5kID09PSBcImZpZWxkXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoLi4uYXJncykodmFsdWUsIGNvbnRleHQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIERlY29yYXRvcnMge1xyXG4gICAgbW9jaygpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQGZpZWxkSW5pdERlY29yYXRvclxyXG4gICAgb3B0aW9ucyguLi5rZXlzKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiguLi5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlb2Ygb3B0aW9uc1swXSAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zLnJlZHVjZSgoYWNjLCBjdXIsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjW2tleXNbaV1dID0gY3VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2NcclxuICAgICAgICAgICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zWzBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUob3B0aW9ucylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBAZmllbGRJbml0RGVjb3JhdG9yXHJcbiAgICBhZGRQcm9taXNlKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YWx1ZS5wcm9taXNlID0gYXN5bmMgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBVc2VyRXZlbnRUeXBlID0ge1xyXG4gICAgQVBQUk9WRSAgICAgICAgOiBcImFwcHJvdmVcIixcclxuICAgIENBTkNFTCAgICAgICAgIDogXCJjYW5jZWxcIixcclxuICAgIENIQU5HRVBBU1NXT1JEIDogXCJjaGFuZ2VwYXNzd29yZFwiLFxyXG4gICAgQ09QWSAgICAgICAgICAgOiBcImNvcHlcIixcclxuICAgIENSRUFURSAgICAgICAgIDogXCJjcmVhdGVcIixcclxuICAgIERFTEVURSAgICAgICAgIDogXCJkZWxldGVcIixcclxuICAgIERST1BTSElQICAgICAgIDogXCJkcm9wc2hpcFwiLFxyXG4gICAgRURJVCAgICAgICAgICAgOiBcImVkaXRcIixcclxuICAgIEVESVRGT1JFQ0FTVCAgIDogXCJlZGl0Zm9yZWNhc3RcIixcclxuICAgIEVNQUlMICAgICAgICAgIDogXCJlbWFpbFwiLFxyXG4gICAgTUFSS0NPTVBMRVRFICAgOiBcIm1hcmtjb21wbGV0ZVwiLFxyXG4gICAgT1JERVJJVEVNUyAgICAgOiBcIm9yZGVyaXRlbXNcIixcclxuICAgIFBBQ0sgICAgICAgICAgIDogXCJwYWNrXCIsXHJcbiAgICBQQVlCSUxMUyAgICAgICA6IFwicGF5YmlsbHNcIixcclxuICAgIFBSSU5UICAgICAgICAgIDogXCJwcmludFwiLFxyXG4gICAgUVVJQ0tWSUVXICAgICAgOiBcInF1aWNrdmlld1wiLFxyXG4gICAgUkVBU1NJR04gICAgICAgOiBcInJlYXNzaWduXCIsXHJcbiAgICBSRUpFQ1QgICAgICAgICA6IFwicmVqZWN0XCIsXHJcbiAgICBTSElQICAgICAgICAgICA6IFwic2hpcFwiLFxyXG4gICAgU1BFQ0lBTE9SREVSICAgOiBcInNwZWNpYWxvcmRlclwiLFxyXG4gICAgVFJBTlNGT1JNICAgICAgOiBcInRyYW5zZm9ybVwiLFxyXG4gICAgVklFVyAgICAgICAgICAgOiBcInZpZXdcIixcclxuICAgIFhFRElUICAgICAgICAgIDogXCJ4ZWRpdFwiLFxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVVc2VyRXZlbnRDb250ZXh0KHR5cGUsIG9sZFJlY29yZCwgbmV3UmVjb3JkKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgICAgb2xkUmVjb3JkLFxyXG4gICAgICAgIG5ld1JlY29yZCxcclxuICAgICAgICBVc2VyRXZlbnRUeXBlXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGRlY29yYXRvcnMgPSBuZXcgRGVjb3JhdG9ycygpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG9wdGlvbnM6IGRlY29yYXRvcnMub3B0aW9ucyxcclxuICAgIGFkZFByb21pc2U6IGRlY29yYXRvcnMuYWRkUHJvbWlzZSxcclxuICAgIG1vY2s6IGRlY29yYXRvcnMubW9jayxcclxuICAgIFVzZXJFdmVudFR5cGUsXHJcbiAgICBjcmVhdGVVc2VyRXZlbnRDb250ZXh0XHJcbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0Esa0JBQWtCLENBQUNDLE1BQU0sRUFBRTtFQUNoQyxPQUFPLFVBQVMsR0FBR0MsSUFBSSxFQUFFO0lBQ3JCLE9BQU8sVUFBU0MsQ0FBQyxFQUFFQyxPQUFPLEVBQUU7TUFDeEIsSUFBR0EsT0FBTyxDQUFDQyxJQUFJLEtBQUssT0FBTyxFQUFFO1FBQ3pCLE9BQU8sVUFBU0MsS0FBSyxFQUFFO1VBQ25CLE9BQU9MLE1BQU0sQ0FBQyxHQUFHQyxJQUFJLENBQUMsQ0FBQ0ksS0FBSyxFQUFFRixPQUFPLENBQUM7UUFDMUMsQ0FBQztNQUNMO0lBQ0osQ0FBQztFQUNMLENBQUM7QUFDTDtBQUVBLE1BQU1HLFVBQVUsQ0FBQztFQUFBO0lBQUEsa0NBT1pQLGtCQUFrQixrQkFrQmxCQSxrQkFBa0I7RUFBQTtFQUFBO0lBQUE7RUFBQTtFQXhCbkJRLElBQUksR0FBRztJQUNILE9BQU8sVUFBU1AsTUFBTSxFQUFFRyxPQUFPLEVBQUU7TUFDN0JLLE9BQU8sQ0FBQ0MsR0FBRyxFQUFFO0lBQ2pCLENBQUM7RUFDTDtFQUdBQyxPQUFPLENBQUMsR0FBR0MsSUFBSSxFQUFFO0lBQ2IsT0FBTyxVQUFTTixLQUFLLEVBQUU7TUFDbkIsT0FBTyxVQUFTLEdBQUdLLE9BQU8sRUFBRTtRQUN4QixJQUFHLE9BQU9BLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7VUFDL0JBLE9BQU8sR0FBR0EsT0FBTyxDQUFDRSxNQUFNLENBQUMsQ0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLENBQUMsS0FBSztZQUN0Q0YsR0FBRyxDQUFDRixJQUFJLENBQUNJLENBQUMsQ0FBQyxDQUFDLEdBQUdELEdBQUc7WUFDbEIsT0FBT0QsR0FBRztVQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNWLENBQUMsTUFDSTtVQUNESCxPQUFPLEdBQUdBLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDeEI7UUFDQSxPQUFPTCxLQUFLLENBQUNLLE9BQU8sQ0FBQztNQUN6QixDQUFDO0lBQ0wsQ0FBQztFQUNMO0VBR0FNLFVBQVUsR0FBRztJQUNULE9BQU8sVUFBU1gsS0FBSyxFQUFFO01BQ25CQSxLQUFLLENBQUNZLE9BQU8sR0FBRyxrQkFBaUI7UUFDN0JaLEtBQUssQ0FBQyxHQUFHYSxTQUFTLENBQUM7TUFDdkIsQ0FBQztNQUNELE9BQU9iLEtBQUs7SUFDaEIsQ0FBQztFQUNMO0FBQ0o7QUFFQSxNQUFNYyxhQUFhLEdBQUc7RUFDbEJDLE9BQU8sRUFBVSxTQUFTO0VBQzFCQyxNQUFNLEVBQVcsUUFBUTtFQUN6QkMsY0FBYyxFQUFHLGdCQUFnQjtFQUNqQ0MsSUFBSSxFQUFhLE1BQU07RUFDdkJDLE1BQU0sRUFBVyxRQUFRO0VBQ3pCQyxNQUFNLEVBQVcsUUFBUTtFQUN6QkMsUUFBUSxFQUFTLFVBQVU7RUFDM0JDLElBQUksRUFBYSxNQUFNO0VBQ3ZCQyxZQUFZLEVBQUssY0FBYztFQUMvQkMsS0FBSyxFQUFZLE9BQU87RUFDeEJDLFlBQVksRUFBSyxjQUFjO0VBQy9CQyxVQUFVLEVBQU8sWUFBWTtFQUM3QkMsSUFBSSxFQUFhLE1BQU07RUFDdkJDLFFBQVEsRUFBUyxVQUFVO0VBQzNCQyxLQUFLLEVBQVksT0FBTztFQUN4QkMsU0FBUyxFQUFRLFdBQVc7RUFDNUJDLFFBQVEsRUFBUyxVQUFVO0VBQzNCQyxNQUFNLEVBQVcsUUFBUTtFQUN6QkMsSUFBSSxFQUFhLE1BQU07RUFDdkJDLFlBQVksRUFBSyxjQUFjO0VBQy9CQyxTQUFTLEVBQVEsV0FBVztFQUM1QkMsSUFBSSxFQUFhLE1BQU07RUFDdkJDLEtBQUssRUFBWTtBQUNyQixDQUFDO0FBRUQsU0FBU0Msc0JBQXNCLENBQUNDLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7RUFDeEQsT0FBTztJQUNIRixJQUFJO0lBQ0pDLFNBQVM7SUFDVEMsU0FBUztJQUNUM0I7RUFDSixDQUFDO0FBQ0w7QUFFQSxNQUFNNEIsVUFBVSxHQUFHLElBQUl6QyxVQUFVLEVBQUU7QUFFbkMwQyxNQUFNLENBQUNDLE9BQU8sR0FBRztFQUNidkMsT0FBTyxFQUFFcUMsVUFBVSxDQUFDckMsT0FBTztFQUMzQk0sVUFBVSxFQUFFK0IsVUFBVSxDQUFDL0IsVUFBVTtFQUNqQ1QsSUFBSSxFQUFFd0MsVUFBVSxDQUFDeEMsSUFBSTtFQUNyQlksYUFBYTtFQUNid0I7QUFDSixDQUFDIn0=