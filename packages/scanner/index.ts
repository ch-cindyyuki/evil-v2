import { isConstructor, isFunction } from "../utils/shared";

export function scanMethodPrototype(
  prototype: Record<string, unknown>
): Map<string, () => any> {
  const names = getAllFilterMethodNames(prototype);
  const map: Map<string, () => any> = new Map();
  return names.reduce((prev, name) => {
    const method = Reflect.get(prototype, name);
    prev.set(name, method);
    return prev;
  }, map);
}

export function getAllFilterMethodNames(
  prototype: Record<string, unknown>
): string[] {
  const names = Object.getOwnPropertyNames(prototype);
  const isMethod = (prop: string) => {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, prop);
    if (!descriptor || descriptor.set || descriptor.get) {
      return false;
    }
    return !isConstructor(prop) && isFunction(Reflect.get(prototype, prop));
  };
  return names.filter((name) => isMethod(name));
}
