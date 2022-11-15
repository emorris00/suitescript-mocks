var _dec, _dec2, _init_attach, _dec3, _dec4, _init_copy, _dec5, _dec6, _init_create, _dec7, _dec8, _init_delete, _dec9, _dec10, _init_detach, _dec11, _dec12, _init_load, _dec13, _dec14, _init_submitFields, _dec15, _dec16, _init_transform;
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
  Tuple
} = require("@bloomberg/record-tuple-polyfill");
const _record = require("suitecloud-unit-testing-stubs/stubs/record");
const {
  addPromise,
  options
} = require("../../helpers.cjs");
const Record = require("./Record");
_dec = addPromise();
_dec2 = options("record", "to", "attributes");
_dec3 = addPromise();
_dec4 = options("type", "id", "isDynamic", "defaultValues");
_dec5 = addPromise();
_dec6 = options("type", "isDynamic", "defaultValues");
_dec7 = addPromise();
_dec8 = options("type", "id");
_dec9 = addPromise();
_dec10 = options("record", "from", "attributes");
_dec11 = addPromise();
_dec12 = options("type", "id", "isDynamic", "defaultValues");
_dec13 = addPromise();
_dec14 = options("type", "id", "values", "options");
_dec15 = addPromise();
_dec16 = options("fromType", "fromId", "toType", "isDynamic", "defaultValues");
class record {
  static {
    [_init_attach, _init_copy, _init_create, _init_delete, _init_detach, _init_load, _init_submitFields, _init_transform] = _applyDecs(this, [[[_dec, _dec2], 0, "attach"], [[_dec3, _dec4], 0, "copy"], [[_dec5, _dec6], 0, "create"], [[_dec7, _dec8], 0, "delete"], [[_dec9, _dec10], 0, "detach"], [[_dec11, _dec12], 0, "load"], [[_dec13, _dec14], 0, "submitFields"], [[_dec15, _dec16], 0, "transform"]], []);
  }
  Record = Record;
  Type = _record.Type;
  _addRecords = records => {
    records.forEach(record => {
      Record.records.set(Tuple(record.type, record.id), record);
    });
    return this;
  };
  _getSavedRecord = type => {
    let index = 0;
    if (type) {
      index = Record.savedRecords.findIndex(record => record.type === type);
    }
    return Record.savedRecords.splice(index, 1)[0];
  };
  attach = _init_attach(this, options => {});
  copy = _init_copy(this, options => {
    const record = this.load(options);
    record.id = null;
    return record;
  });
  create = _init_create(this, options => {
    return new Record({
      id: null,
      type: options.type,
      isDynamic: options?.isDynamic,
      fields: options?.defaultValues
    });
  });
  delete = _init_delete(this, options => {
    return Record.records.delete(Tuple(options.type, options.id)) && options.id || false;
  });
  detach = _init_detach(this, options => {});
  load = _init_load(this, options => {
    try {
      let record = Record.records.get(Tuple(options.type, options.id));
      if (!record) {
        throw new Error("Record does not exist");
      }
      record = new Record({
        ...record,
        isDynamic: Boolean(options.isDynamic) || false,
        fields: {
          ...record.fields,
          ...(options.defaultValues || {})
        }
      });
      return record;
    } catch (e) {
      console.log("ERROR", e);
    }
  });
  submitFields = _init_submitFields(this, options => {
    const record = Record.records.get(Tuple(options.type, options.id));
    record.fields = {
      ...record.fields,
      ...options.values
    };
    return record.id;
  });
  transform = _init_transform(this, options => {
    const record = this.load(options.fromType, options.fromId, options.isDynamic, options.defaultValues);
    record.type = options.toType;
    record.id = null;
    return record;
  });
}
module.exports = new record();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUdXBsZSIsInJlcXVpcmUiLCJfcmVjb3JkIiwiYWRkUHJvbWlzZSIsIm9wdGlvbnMiLCJSZWNvcmQiLCJyZWNvcmQiLCJUeXBlIiwiX2FkZFJlY29yZHMiLCJyZWNvcmRzIiwiZm9yRWFjaCIsInNldCIsInR5cGUiLCJpZCIsIl9nZXRTYXZlZFJlY29yZCIsImluZGV4Iiwic2F2ZWRSZWNvcmRzIiwiZmluZEluZGV4Iiwic3BsaWNlIiwiYXR0YWNoIiwiY29weSIsImxvYWQiLCJjcmVhdGUiLCJpc0R5bmFtaWMiLCJmaWVsZHMiLCJkZWZhdWx0VmFsdWVzIiwiZGVsZXRlIiwiZGV0YWNoIiwiZ2V0IiwiRXJyb3IiLCJCb29sZWFuIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJzdWJtaXRGaWVsZHMiLCJ2YWx1ZXMiLCJ0cmFuc2Zvcm0iLCJmcm9tVHlwZSIsImZyb21JZCIsInRvVHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9ja3MvcmVjb3JkL2luZGV4LmNqcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFR1cGxlIH0gPSByZXF1aXJlKFwiQGJsb29tYmVyZy9yZWNvcmQtdHVwbGUtcG9seWZpbGxcIik7XHJcbmNvbnN0IF9yZWNvcmQgPSByZXF1aXJlKFwic3VpdGVjbG91ZC11bml0LXRlc3Rpbmctc3R1YnMvc3R1YnMvcmVjb3JkXCIpO1xyXG5jb25zdCB7IGFkZFByb21pc2UsIG9wdGlvbnMgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKTtcclxuY29uc3QgUmVjb3JkID0gcmVxdWlyZShcIi4vUmVjb3JkXCIpO1xyXG5cclxuY2xhc3MgcmVjb3JkIHtcclxuICAgIFJlY29yZCA9IFJlY29yZFxyXG5cclxuICAgIFR5cGUgPSBfcmVjb3JkLlR5cGVcclxuXHJcbiAgICBfYWRkUmVjb3JkcyA9IHJlY29yZHMgPT4ge1xyXG4gICAgICAgIHJlY29yZHMuZm9yRWFjaChyZWNvcmQgPT4ge1xyXG4gICAgICAgICAgICBSZWNvcmQucmVjb3Jkcy5zZXQoVHVwbGUocmVjb3JkLnR5cGUsIHJlY29yZC5pZCksIHJlY29yZClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgX2dldFNhdmVkUmVjb3JkID0gKHR5cGUpID0+IHtcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgaWYodHlwZSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IFJlY29yZC5zYXZlZFJlY29yZHMuZmluZEluZGV4KHJlY29yZCA9PiByZWNvcmQudHlwZSA9PT0gdHlwZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFJlY29yZC5zYXZlZFJlY29yZHMuc3BsaWNlKGluZGV4LCAxKVswXVxyXG4gICAgfVxyXG5cclxuICAgIEBhZGRQcm9taXNlKClcclxuICAgIEBvcHRpb25zKFwicmVjb3JkXCIsIFwidG9cIiwgXCJhdHRyaWJ1dGVzXCIpXHJcbiAgICBhdHRhY2ggPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgQGFkZFByb21pc2UoKVxyXG4gICAgQG9wdGlvbnMoXCJ0eXBlXCIsIFwiaWRcIiwgXCJpc0R5bmFtaWNcIiwgXCJkZWZhdWx0VmFsdWVzXCIpXHJcbiAgICBjb3B5ID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5sb2FkKG9wdGlvbnMpXHJcbiAgICAgICAgcmVjb3JkLmlkID0gbnVsbFxyXG4gICAgICAgIHJldHVybiByZWNvcmRcclxuICAgIH1cclxuXHJcbiAgICBAYWRkUHJvbWlzZSgpXHJcbiAgICBAb3B0aW9ucyhcInR5cGVcIiwgXCJpc0R5bmFtaWNcIiwgXCJkZWZhdWx0VmFsdWVzXCIpXHJcbiAgICBjcmVhdGUgPSBvcHRpb25zID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlY29yZCh7XHJcbiAgICAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBvcHRpb25zLnR5cGUsXHJcbiAgICAgICAgICAgIGlzRHluYW1pYzogb3B0aW9ucz8uaXNEeW5hbWljLFxyXG4gICAgICAgICAgICBmaWVsZHM6IG9wdGlvbnM/LmRlZmF1bHRWYWx1ZXNcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIEBhZGRQcm9taXNlKClcclxuICAgIEBvcHRpb25zKFwidHlwZVwiLCBcImlkXCIpXHJcbiAgICBkZWxldGUgPSBvcHRpb25zID0+IHtcclxuICAgICAgICByZXR1cm4gUmVjb3JkLnJlY29yZHMuZGVsZXRlKFR1cGxlKG9wdGlvbnMudHlwZSwgb3B0aW9ucy5pZCkpICYmIG9wdGlvbnMuaWQgfHwgZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBAYWRkUHJvbWlzZSgpXHJcbiAgICBAb3B0aW9ucyhcInJlY29yZFwiLCBcImZyb21cIiwgXCJhdHRyaWJ1dGVzXCIpXHJcbiAgICBkZXRhY2ggPSBvcHRpb25zID0+IHt9XHJcblxyXG4gICAgQGFkZFByb21pc2UoKVxyXG4gICAgQG9wdGlvbnMoXCJ0eXBlXCIsIFwiaWRcIiwgXCJpc0R5bmFtaWNcIiwgXCJkZWZhdWx0VmFsdWVzXCIpXHJcbiAgICBsb2FkID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IFJlY29yZC5yZWNvcmRzLmdldChUdXBsZShvcHRpb25zLnR5cGUsIG9wdGlvbnMuaWQpKVxyXG4gICAgICAgICAgICBpZighcmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWNvcmQgZG9lcyBub3QgZXhpc3RcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWNvcmQgPSBuZXcgUmVjb3JkKHtcclxuICAgICAgICAgICAgICAgIC4uLnJlY29yZCxcclxuICAgICAgICAgICAgICAgIGlzRHluYW1pYzogQm9vbGVhbihvcHRpb25zLmlzRHluYW1pYykgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBmaWVsZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5yZWNvcmQuZmllbGRzLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLihvcHRpb25zLmRlZmF1bHRWYWx1ZXMgfHwge30pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUlwiLCBlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBAYWRkUHJvbWlzZSgpXHJcbiAgICBAb3B0aW9ucyhcInR5cGVcIiwgXCJpZFwiLCBcInZhbHVlc1wiLCBcIm9wdGlvbnNcIilcclxuICAgIHN1Ym1pdEZpZWxkcyA9IG9wdGlvbnMgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlY29yZCA9IFJlY29yZC5yZWNvcmRzLmdldChUdXBsZShvcHRpb25zLnR5cGUsIG9wdGlvbnMuaWQpKVxyXG4gICAgICAgIHJlY29yZC5maWVsZHMgPSB7XHJcbiAgICAgICAgICAgIC4uLnJlY29yZC5maWVsZHMsXHJcbiAgICAgICAgICAgIC4uLm9wdGlvbnMudmFsdWVzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZWNvcmQuaWRcclxuICAgIH1cclxuXHJcbiAgICBAYWRkUHJvbWlzZSgpXHJcbiAgICBAb3B0aW9ucyhcImZyb21UeXBlXCIsIFwiZnJvbUlkXCIsIFwidG9UeXBlXCIsIFwiaXNEeW5hbWljXCIsIFwiZGVmYXVsdFZhbHVlc1wiKVxyXG4gICAgdHJhbnNmb3JtID0gb3B0aW9ucyA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5sb2FkKG9wdGlvbnMuZnJvbVR5cGUsIG9wdGlvbnMuZnJvbUlkLCBvcHRpb25zLmlzRHluYW1pYywgb3B0aW9ucy5kZWZhdWx0VmFsdWVzKVxyXG4gICAgICAgIHJlY29yZC50eXBlID0gb3B0aW9ucy50b1R5cGVcclxuICAgICAgICByZWNvcmQuaWQgPSBudWxsXHJcbiAgICAgICAgcmV0dXJuIHJlY29yZFxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyByZWNvcmQoKSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0VBQUVBO0FBQU0sQ0FBQyxHQUFHQyxPQUFPLENBQUMsa0NBQWtDLENBQUM7QUFDN0QsTUFBTUMsT0FBTyxHQUFHRCxPQUFPLENBQUMsNENBQTRDLENBQUM7QUFDckUsTUFBTTtFQUFFRSxVQUFVO0VBQUVDO0FBQVEsQ0FBQyxHQUFHSCxPQUFPLENBQUMsbUJBQW1CLENBQUM7QUFDNUQsTUFBTUksTUFBTSxHQUFHSixPQUFPLENBQUMsVUFBVSxDQUFDO0FBQUMsT0FzQjlCRSxVQUFVLEVBQUU7QUFBQSxRQUNaQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUM7QUFBQSxRQUdyQ0QsVUFBVSxFQUFFO0FBQUEsUUFDWkMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQztBQUFBLFFBT25ERCxVQUFVLEVBQUU7QUFBQSxRQUNaQyxPQUFPLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUM7QUFBQSxRQVU3Q0QsVUFBVSxFQUFFO0FBQUEsUUFDWkMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7QUFBQSxRQUtyQkQsVUFBVSxFQUFFO0FBQUEsU0FDWkMsT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDO0FBQUEsU0FHdkNELFVBQVUsRUFBRTtBQUFBLFNBQ1pDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUM7QUFBQSxTQXNCbkRELFVBQVUsRUFBRTtBQUFBLFNBQ1pDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7QUFBQSxTQVUxQ0Qs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