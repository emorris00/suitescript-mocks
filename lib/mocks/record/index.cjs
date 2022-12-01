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
const Record = require("./Record.cjs");
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
module.exports = new record();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZWNvcmRTdHViIiwicmVxdWlyZSIsIlN1aXRlU2NyaXB0TW9ja3MiLCJhZGRQcm9taXNlIiwib3B0aW9ucyIsIlJlY29yZCIsInJlY29yZCIsIlR5cGUiLCJhdHRhY2giLCJjb3B5IiwibG9hZCIsImlkIiwiY3JlYXRlIiwidHlwZSIsImlzRHluYW1pYyIsImZpZWxkcyIsImRlZmF1bHRWYWx1ZXMiLCJkZWxldGUiLCJyZWNvcmRzIiwiaGFzIiwiRXJyb3IiLCJkZXRhY2giLCJnZXQiLCJCb29sZWFuIiwic3VibWl0RmllbGRzIiwidmFsdWVzIiwidHJhbnNmb3JtIiwiZnJvbVR5cGUiLCJmcm9tSWQiLCJ0b1R5cGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vY2tzL3JlY29yZC9pbmRleC5janMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmVjb3JkU3R1YiA9IHJlcXVpcmUoXCJzdWl0ZWNsb3VkLXVuaXQtdGVzdGluZy1zdHVicy9zdHVicy9yZWNvcmRcIik7XG5jb25zdCBTdWl0ZVNjcmlwdE1vY2tzID0gcmVxdWlyZShcIi4uLy4uL2luZGV4LmNqc1wiKTtcbmNvbnN0IHsgYWRkUHJvbWlzZSwgb3B0aW9ucyB9ID0gcmVxdWlyZShcIi4uLy4uL2hlbHBlcnMuY2pzXCIpO1xuY29uc3QgUmVjb3JkID0gcmVxdWlyZShcIi4vUmVjb3JkLmNqc1wiKTtcblxuY2xhc3MgcmVjb3JkIHtcbiAgICBSZWNvcmQgPSBSZWNvcmRcblxuICAgIFR5cGUgPSByZWNvcmRTdHViLlR5cGVcblxuICAgIEBhZGRQcm9taXNlKClcbiAgICBAb3B0aW9ucyhcInJlY29yZFwiLCBcInRvXCIsIFwiYXR0cmlidXRlc1wiKVxuICAgIGF0dGFjaCA9IG9wdGlvbnMgPT4ge31cblxuICAgIEBhZGRQcm9taXNlKClcbiAgICBAb3B0aW9ucyhcInR5cGVcIiwgXCJpZFwiLCBcImlzRHluYW1pY1wiLCBcImRlZmF1bHRWYWx1ZXNcIilcbiAgICBjb3B5ID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXMubG9hZChvcHRpb25zKVxuICAgICAgICByZWNvcmQuaWQgPSBudWxsXG4gICAgICAgIHJldHVybiByZWNvcmRcbiAgICB9XG5cbiAgICBAYWRkUHJvbWlzZSgpXG4gICAgQG9wdGlvbnMoXCJ0eXBlXCIsIFwiaXNEeW5hbWljXCIsIFwiZGVmYXVsdFZhbHVlc1wiKVxuICAgIGNyZWF0ZSA9IG9wdGlvbnMgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFJlY29yZCh7XG4gICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IG9wdGlvbnMudHlwZSxcbiAgICAgICAgICAgIGlzRHluYW1pYzogb3B0aW9ucz8uaXNEeW5hbWljLFxuICAgICAgICAgICAgZmllbGRzOiBvcHRpb25zPy5kZWZhdWx0VmFsdWVzXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgQGFkZFByb21pc2UoKVxuICAgIEBvcHRpb25zKFwidHlwZVwiLCBcImlkXCIpXG4gICAgZGVsZXRlID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGlmKCFTdWl0ZVNjcmlwdE1vY2tzLnJlY29yZHMuaGFzKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWNvcmQgZG9lcyBub3QgZXhpc3RcIilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLmRlbGV0ZShvcHRpb25zKSAmJiBvcHRpb25zLmlkIHx8IGZhbHNlXG4gICAgfVxuXG4gICAgQGFkZFByb21pc2UoKVxuICAgIEBvcHRpb25zKFwicmVjb3JkXCIsIFwiZnJvbVwiLCBcImF0dHJpYnV0ZXNcIilcbiAgICBkZXRhY2ggPSBvcHRpb25zID0+IHt9XG5cbiAgICBAYWRkUHJvbWlzZSgpXG4gICAgQG9wdGlvbnMoXCJ0eXBlXCIsIFwiaWRcIiwgXCJpc0R5bmFtaWNcIiwgXCJkZWZhdWx0VmFsdWVzXCIpXG4gICAgbG9hZCA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBsZXQgcmVjb3JkID0gU3VpdGVTY3JpcHRNb2Nrcy5yZWNvcmRzLmdldChvcHRpb25zKVxuICAgICAgICBpZighcmVjb3JkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWNvcmQgZG9lcyBub3QgZXhpc3RcIilcbiAgICAgICAgfVxuICAgICAgICByZWNvcmQgPSBuZXcgUmVjb3JkKHtcbiAgICAgICAgICAgIC4uLnJlY29yZCxcbiAgICAgICAgICAgIGlzRHluYW1pYzogQm9vbGVhbihvcHRpb25zLmlzRHluYW1pYykgfHwgZmFsc2UsXG4gICAgICAgICAgICBmaWVsZHM6IHtcbiAgICAgICAgICAgICAgICAuLi5yZWNvcmQuZmllbGRzLFxuICAgICAgICAgICAgICAgIC4uLihvcHRpb25zLmRlZmF1bHRWYWx1ZXMgfHwge30pXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVjb3JkXG4gICAgfVxuXG4gICAgQGFkZFByb21pc2UoKVxuICAgIEBvcHRpb25zKFwidHlwZVwiLCBcImlkXCIsIFwidmFsdWVzXCIsIFwib3B0aW9uc1wiKVxuICAgIHN1Ym1pdEZpZWxkcyA9IG9wdGlvbnMgPT4ge1xuICAgICAgICBjb25zdCByZWNvcmQgPSBTdWl0ZVNjcmlwdE1vY2tzLnJlY29yZHMuZ2V0KG9wdGlvbnMpXG4gICAgICAgIHJlY29yZC5maWVsZHMgPSB7XG4gICAgICAgICAgICAuLi5yZWNvcmQuZmllbGRzLFxuICAgICAgICAgICAgLi4ub3B0aW9ucy52YWx1ZXNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjb3JkLmlkXG4gICAgfVxuXG4gICAgQGFkZFByb21pc2UoKVxuICAgIEBvcHRpb25zKFwiZnJvbVR5cGVcIiwgXCJmcm9tSWRcIiwgXCJ0b1R5cGVcIiwgXCJpc0R5bmFtaWNcIiwgXCJkZWZhdWx0VmFsdWVzXCIpXG4gICAgdHJhbnNmb3JtID0gb3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXMubG9hZChvcHRpb25zLmZyb21UeXBlLCBvcHRpb25zLmZyb21JZCwgb3B0aW9ucy5pc0R5bmFtaWMsIG9wdGlvbnMuZGVmYXVsdFZhbHVlcylcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBvcHRpb25zLnRvVHlwZVxuICAgICAgICByZWNvcmQuaWQgPSBudWxsXG4gICAgICAgIHJldHVybiByZWNvcmRcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IHJlY29yZCgpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE1BQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDLDRDQUE0QyxDQUFDO0FBQ3hFLE1BQU1DLGdCQUFnQixHQUFHRCxPQUFPLENBQUMsaUJBQWlCLENBQUM7QUFDbkQsTUFBTTtFQUFFRSxVQUFVO0VBQUVDO0FBQVEsQ0FBQyxHQUFHSCxPQUFPLENBQUMsbUJBQW1CLENBQUM7QUFDNUQsTUFBTUksTUFBTSxHQUFHSixPQUFPLENBQUMsY0FBYyxDQUFDO0FBQUMsT0FPbENFLFVBQVUsRUFBRTtBQUFBLFFBQ1pDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQztBQUFBLFFBR3JDRCxVQUFVLEVBQUU7QUFBQSxRQUNaQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDO0FBQUEsUUFPbkRELFVBQVUsRUFBRTtBQUFBLFFBQ1pDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQztBQUFBLFFBVTdDRCxVQUFVLEVBQUU7QUFBQSxRQUNaQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztBQUFBLFFBUXJCRCxVQUFVLEVBQUU7QUFBQSxTQUNaQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUM7QUFBQSxTQUd2Q0QsVUFBVSxFQUFFO0FBQUEsU0FDWkMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFF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