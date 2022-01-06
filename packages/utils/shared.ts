export const isUndefined = (obj: any) => typeof obj === "undefined";
export const isNil = (obj: any) => isUndefined(obj) || obj === null;
export const isObject = (fn: any) => !isNil(fn) && typeof fn === "object";
export const isPlainObject = (fn: any) => {
  if (!isObject(fn)) {
    return false;
  }
  const proto = Object.getPrototypeOf(fn);
  if (proto === null) {
    return true;
  }
  const ctor =
    Object.prototype.hasOwnProperty.call(proto, "constructor") &&
    proto.constructor;
  return (
    typeof ctor === "function" &&
    ctor instanceof ctor &&
    Function.prototype.toString.call(ctor) ===
      Function.prototype.toString.call(Object)
  );
};
export const validatePath = (path: string) =>
  path && typeof path === "string"
    ? path.charAt(0) !== "/"
      ? "/" + path
      : path
    : "";
export const normalizePath = (path: string) =>
  path
    ? path.startsWith("/")
      ? ("/" + path.replace(/\/+$/, "")).replace(/\/+/g, "/")
      : "/" + path.replace(/\/+$/, "")
    : "/";
export const stripEndSlash = (path: string) =>
  path[path.length - 1] === "/" ? path.slice(0, path.length - 1) : path;
export const isFunction = (fn: any) => typeof fn === "function";
export const isString = (fn: any) => typeof fn === "string";
export const isConstructor = (fn: any) => fn === "constructor";
export const isEmpty = (array: any[]) => !(array && array.length > 0);
export const isSymbol = (fn: any) => typeof fn === "symbol";
export const isPromise = (val: any): boolean => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
