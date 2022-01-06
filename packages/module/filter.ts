import { isRouterModule, isModule } from "../utils/validateModule";

function filterFn(modules: any[], filter: (module: any) => boolean) {
  return modules.filter(filter);
}

export function filterRouterModule(modules: any[]) {
  return filterFn(modules, (module) => {
    return isRouterModule(module);
  });
}

export function filterModule(modules: any[]) {
  return filterFn(modules, (module) => {
    return isModule(module);
  });
}
