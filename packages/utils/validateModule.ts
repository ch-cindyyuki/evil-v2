import {
  MODULE_METAKEY,
  MODULE_METADATA,
  ROUTER_MODULE_METAKEY,
  ROUTER_MODULE_METADATA,
  CONTROLLER_METAKEY,
  CONTROLLER_METADATA,
  ROUTERCONTROLLER_METAKEY,
  ROUTERCONTROLLER_METADATA,
  ROUTE_COMPONENT_METAKEY,
  ROUTE_COMPONENT_METADATA,
  COMPONENT_METADATA,
  COMPONENT_METAKEY,
} from "./constants";

const INVALID_MODULE_CONFIG_MESSAGE = (text: any, property: any) =>
  `Invalid property '${property}' passed into the @Module() decorator.`;

export function isModule(module: any) {
  return Reflect.getMetadata(MODULE_METAKEY, module) === MODULE_METADATA;
}

export function isRouterModule(module: any) {
  return (
    Reflect.getMetadata(ROUTER_MODULE_METAKEY, module) ===
    ROUTER_MODULE_METADATA
  );
}

export function isController(controller: any) {
  return (
    Reflect.getMetadata(CONTROLLER_METAKEY, controller) === CONTROLLER_METADATA
  );
}

export function isRouterController(controller: any) {
  return (
    Reflect.getMetadata(ROUTERCONTROLLER_METAKEY, controller) ===
    ROUTERCONTROLLER_METADATA
  );
}

export function isRouteComponent(component: any) {
  return (
    Reflect.getMetadata(ROUTE_COMPONENT_METAKEY, component) ===
    ROUTE_COMPONENT_METADATA
  );
}

export function isComponent(component: any) {
  return (
    Reflect.getMetadata(COMPONENT_METAKEY, component) ===
    COMPONENT_METADATA
  );
}

export function validateModule(module: any) {
  if (!isModule(module)) {
    throw new Error(INVALID_MODULE_CONFIG_MESSAGE`${module}`);
  }
  return true;
}
