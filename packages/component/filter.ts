import { isComponent, isRouteComponent } from "../utils/validateModule";

function filterFn(modules: any[], filter: (module: any) => boolean) {
  return modules.filter(filter);
}

export function filterComponent(components: any[]) {
  return filterFn(components, (component) => {
    return isComponent(component);
  });
}

export function filterRouteComponent(components: any[]) {
  return filterFn(components, (component) => {
    return isRouteComponent(component);
  });
}
