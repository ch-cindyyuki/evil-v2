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

export function Component(options?: TComponentOptions) {
  return function (component: any) {
    Module()(component);

    Reflect.defineMetadata(COMPONENT_METAKEY, COMPONENT_METADATA, component);

    if (options?.route) {
      Reflect.defineMetadata(
        ROUTE_COMPONENT_METAKEY,
        ROUTE_COMPONENT_METADATA,
        component
      );
      Reflect.defineMetadata(ROUTE_CONFIG_METAKEY, options?.route, component);
    }

    return VueComponent({
      name: options?.name || component.name,
      components: options?.components || {},
    })(component);
  };
}
