import { componentFactory } from "./factory";
import {
  COMPONENT_METAKEY,
  COMPONENT_METADATA,
  ROUTE_COMPONENT_METAKEY,
  ROUTE_COMPONENT_METADATA,
  ROUTE_CONFIG_METAKEY,
} from "../utils/constants";

import type { TComponentOptions, TComponent } from "./types";

class ComponentFactory {
  name: string = "";

  constructor(options?: TComponentOptions) {
    this.name = options?.name || "";
  }
}

export class ComponentStatic {
  static getComponent(token: any): ComponentFactory | null {
    return (Reflect.getMetadata("$component", token) as ComponentFactory) || null;
  }
}

export function Component(options?: TComponentOptions) {
  return function (component: TComponent) {
    Reflect.defineMetadata(COMPONENT_METAKEY, COMPONENT_METADATA, component);

    const instance = new ComponentFactory({
      ...options,
      name: options?.name || component.name,
    });
    Reflect.defineMetadata("$component", instance, component);

    return componentFactory(component, {
      name: options?.name || component.name,
      components: options?.components || {},
    });
  };
}
