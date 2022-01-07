import { Component as VueComponent } from "vue-property-decorator";
import { Injectable } from "injection-js";
import { Module } from "../module";
import {
  COMPONENT_METAKEY,
  COMPONENT_METADATA,
  ROUTE_COMPONENT_METAKEY,
  ROUTE_COMPONENT_METADATA,
  ROUTE_CONFIG_METAKEY,
} from "../utils/constants";

import type { TComponentOptions } from "./types";

let id = 0;

class ComponentFactory {
  _id: number = ++id;
  name: string = "";
  components: Array<TComponentOptions['components']> = [];

  constructor(options?: TComponentOptions) {
    this.name = options?.name || "";
    this.components = options?.components || [];
  }
}

export class ComponentStatic {
  static getComponent(token: any): ComponentFactory | null {
    return (Reflect.getMetadata("$component", token) as ComponentFactory) || null;
  }
}

export function Component(options?: TComponentOptions) {
  return function (component: any) {
    Module({
      imports: options?.components ? Object.values(options.components) : [],
    })(Injectable()(component));
    Reflect.defineMetadata(COMPONENT_METAKEY, COMPONENT_METADATA, component);

    const instance = new ComponentFactory({
      ...options,
      name: options?.name || component.name,
    });
    Reflect.defineMetadata("$component", instance, component);

    return VueComponent({
      name: options?.name || component.name,
      components: options?.components || {},
    })(component);
  };
}
