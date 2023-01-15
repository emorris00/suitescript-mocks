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
const recordStub = require("suitecloud-unit-testing-stubs/stubs/record");
const SuiteScriptMocks = require("../../index.cjs");
const {
  addPromise,
  options
} = require("../../helpers.cjs");
const _Record = require("./Record.cjs");
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
class Record {
  static {
    [_init_attach, _init_copy, _init_create, _init_delete, _init_detach, _init_load, _init_submitFields, _init_transform] = _applyDecs(this, [[[_dec, _dec2], 0, "attach"], [[_dec3, _dec4], 0, "copy"], [[_dec5, _dec6], 0, "create"], [[_dec7, _dec8], 0, "delete"], [[_dec9, _dec10], 0, "detach"], [[_dec11, _dec12], 0, "load"], [[_dec13, _dec14], 0, "submitFields"], [[_dec15, _dec16], 0, "transform"]], []);
  }
  Record = _Record;
  Type = recordStub.Type;
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
    if (!SuiteScriptMocks.records.has(options)) {
      throw new Error("Record does not exist");
    }
    return SuiteScriptMocks.records.delete(options) && options.id || false;
  });
  detach = _init_detach(this, options => {});
  load = _init_load(this, options => {
    let record = SuiteScriptMocks.records.get(options);
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
  });
  submitFields = _init_submitFields(this, options => {
    const record = SuiteScriptMocks.records.get(options);
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
module.exports = new Record();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZWNvcmRTdHViIiwicmVxdWlyZSIsIlN1aXRlU2NyaXB0TW9ja3MiLCJhZGRQcm9taXNlIiwib3B0aW9ucyIsIl9SZWNvcmQiLCJSZWNvcmQiLCJUeXBlIiwiYXR0YWNoIiwiY29weSIsInJlY29yZCIsImxvYWQiLCJpZCIsImNyZWF0ZSIsInR5cGUiLCJpc0R5bmFtaWMiLCJmaWVsZHMiLCJkZWZhdWx0VmFsdWVzIiwiZGVsZXRlIiwicmVjb3JkcyIsImhhcyIsIkVycm9yIiwiZGV0YWNoIiwiZ2V0IiwiQm9vbGVhbiIsInN1Ym1pdEZpZWxkcyIsInZhbHVlcyIsInRyYW5zZm9ybSIsImZyb21UeXBlIiwiZnJvbUlkIiwidG9UeXBlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2Nrcy9yZWNvcmQvaW5kZXguY2pzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHJlY29yZFN0dWIgPSByZXF1aXJlKFwic3VpdGVjbG91ZC11bml0LXRlc3Rpbmctc3R1YnMvc3R1YnMvcmVjb3JkXCIpO1xuY29uc3QgU3VpdGVTY3JpcHRNb2NrcyA9IHJlcXVpcmUoXCIuLi8uLi9pbmRleC5janNcIik7XG5jb25zdCB7IGFkZFByb21pc2UsIG9wdGlvbnMgfSA9IHJlcXVpcmUoXCIuLi8uLi9oZWxwZXJzLmNqc1wiKTtcbmNvbnN0IF9SZWNvcmQgPSByZXF1aXJlKFwiLi9SZWNvcmQuY2pzXCIpO1xuXG5jbGFzcyBSZWNvcmQge1xuXHRSZWNvcmQgPSBfUmVjb3JkO1xuXG5cdFR5cGUgPSByZWNvcmRTdHViLlR5cGU7XG5cblx0QGFkZFByb21pc2UoKVxuXHRAb3B0aW9ucyhcInJlY29yZFwiLCBcInRvXCIsIFwiYXR0cmlidXRlc1wiKVxuXHRhdHRhY2ggPSAob3B0aW9ucykgPT4ge307XG5cblx0QGFkZFByb21pc2UoKVxuXHRAb3B0aW9ucyhcInR5cGVcIiwgXCJpZFwiLCBcImlzRHluYW1pY1wiLCBcImRlZmF1bHRWYWx1ZXNcIilcblx0Y29weSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgcmVjb3JkID0gdGhpcy5sb2FkKG9wdGlvbnMpO1xuXHRcdHJlY29yZC5pZCA9IG51bGw7XG5cdFx0cmV0dXJuIHJlY29yZDtcblx0fTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwidHlwZVwiLCBcImlzRHluYW1pY1wiLCBcImRlZmF1bHRWYWx1ZXNcIilcblx0Y3JlYXRlID0gKG9wdGlvbnMpID0+IHtcblx0XHRyZXR1cm4gbmV3IFJlY29yZCh7XG5cdFx0XHRpZDogbnVsbCxcblx0XHRcdHR5cGU6IG9wdGlvbnMudHlwZSxcblx0XHRcdGlzRHluYW1pYzogb3B0aW9ucz8uaXNEeW5hbWljLFxuXHRcdFx0ZmllbGRzOiBvcHRpb25zPy5kZWZhdWx0VmFsdWVzLFxuXHRcdH0pO1xuXHR9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0QG9wdGlvbnMoXCJ0eXBlXCIsIFwiaWRcIilcblx0ZGVsZXRlID0gKG9wdGlvbnMpID0+IHtcblx0XHRpZiAoIVN1aXRlU2NyaXB0TW9ja3MucmVjb3Jkcy5oYXMob3B0aW9ucykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlJlY29yZCBkb2VzIG5vdCBleGlzdFwiKTtcblx0XHR9XG5cdFx0cmV0dXJuIChTdWl0ZVNjcmlwdE1vY2tzLnJlY29yZHMuZGVsZXRlKG9wdGlvbnMpICYmIG9wdGlvbnMuaWQpIHx8IGZhbHNlO1xuXHR9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0QG9wdGlvbnMoXCJyZWNvcmRcIiwgXCJmcm9tXCIsIFwiYXR0cmlidXRlc1wiKVxuXHRkZXRhY2ggPSAob3B0aW9ucykgPT4ge307XG5cblx0QGFkZFByb21pc2UoKVxuXHRAb3B0aW9ucyhcInR5cGVcIiwgXCJpZFwiLCBcImlzRHluYW1pY1wiLCBcImRlZmF1bHRWYWx1ZXNcIilcblx0bG9hZCA9IChvcHRpb25zKSA9PiB7XG5cdFx0bGV0IHJlY29yZCA9IFN1aXRlU2NyaXB0TW9ja3MucmVjb3Jkcy5nZXQob3B0aW9ucyk7XG5cdFx0aWYgKCFyZWNvcmQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlJlY29yZCBkb2VzIG5vdCBleGlzdFwiKTtcblx0XHR9XG5cdFx0cmVjb3JkID0gbmV3IFJlY29yZCh7XG5cdFx0XHQuLi5yZWNvcmQsXG5cdFx0XHRpc0R5bmFtaWM6IEJvb2xlYW4ob3B0aW9ucy5pc0R5bmFtaWMpIHx8IGZhbHNlLFxuXHRcdFx0ZmllbGRzOiB7XG5cdFx0XHRcdC4uLnJlY29yZC5maWVsZHMsXG5cdFx0XHRcdC4uLihvcHRpb25zLmRlZmF1bHRWYWx1ZXMgfHwge30pLFxuXHRcdFx0fSxcblx0XHR9KTtcblx0XHRyZXR1cm4gcmVjb3JkO1xuXHR9O1xuXG5cdEBhZGRQcm9taXNlKClcblx0QG9wdGlvbnMoXCJ0eXBlXCIsIFwiaWRcIiwgXCJ2YWx1ZXNcIiwgXCJvcHRpb25zXCIpXG5cdHN1Ym1pdEZpZWxkcyA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgcmVjb3JkID0gU3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLmdldChvcHRpb25zKTtcblx0XHRyZWNvcmQuZmllbGRzID0ge1xuXHRcdFx0Li4ucmVjb3JkLmZpZWxkcyxcblx0XHRcdC4uLm9wdGlvbnMudmFsdWVzLFxuXHRcdH07XG5cdFx0cmV0dXJuIHJlY29yZC5pZDtcblx0fTtcblxuXHRAYWRkUHJvbWlzZSgpXG5cdEBvcHRpb25zKFwiZnJvbVR5cGVcIiwgXCJmcm9tSWRcIiwgXCJ0b1R5cGVcIiwgXCJpc0R5bmFtaWNcIiwgXCJkZWZhdWx0VmFsdWVzXCIpXG5cdHRyYW5zZm9ybSA9IChvcHRpb25zKSA9PiB7XG5cdFx0Y29uc3QgcmVjb3JkID0gdGhpcy5sb2FkKG9wdGlvbnMuZnJvbVR5cGUsIG9wdGlvbnMuZnJvbUlkLCBvcHRpb25zLmlzRHluYW1pYywgb3B0aW9ucy5kZWZhdWx0VmFsdWVzKTtcblx0XHRyZWNvcmQudHlwZSA9IG9wdGlvbnMudG9UeXBlO1xuXHRcdHJlY29yZC5pZCA9IG51bGw7XG5cdFx0cmV0dXJuIHJlY29yZDtcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUmVjb3JkKCk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsTUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsNENBQTRDLENBQUM7QUFDeEUsTUFBTUMsZ0JBQWdCLEdBQUdELE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUNuRCxNQUFNO0VBQUVFLFVBQVU7RUFBRUM7QUFBUSxDQUFDLEdBQUdILE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztBQUM1RCxNQUFNSSxPQUFPLEdBQUdKLE9BQU8sQ0FBQyxjQUFjLENBQUM7QUFBQyxPQU90Q0UsVUFBVSxFQUFFO0FBQUEsUUFDWkMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDO0FBQUEsUUFHckNELFVBQVUsRUFBRTtBQUFBLFFBQ1pDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUM7QUFBQSxRQU9uREQsVUFBVSxFQUFFO0FBQUEsUUFDWkMsT0FBTyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDO0FBQUEsUUFVN0NELFVBQVUsRUFBRTtBQUFBLFFBQ1pDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO0FBQUEsUUFRckJELFVBQVUsRUFBRTtBQUFBLFNBQ1pDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQztBQUFBLFNBR3ZDRCxVQUFVLEVBQUU7QUFBQSxTQUNaQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDO0FBQUEsU0FpQm5ERCxVQUFVLEVBQUU7QUFBQSxTQUNaQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO0FBQUEsU0FVMUNELFVBQVUsRUFBRTtBQUFBLFNBQ1pDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVB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