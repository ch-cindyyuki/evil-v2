import Vue from "vue";

import { Module } from "../module/module";
import { filterRouteComponent } from "../component/filter";
import {
  ROUTER_MODULE_METADATA,
  ROUTER_MODULE_METAKEY,
  ROUTE_CONFIG_METAKEY,
  ROUTER_METAKEY,
} from "../utils/constants";
import { isFunction } from "../utils/shared";

import type { RouteConfig } from "vue-router";
import type { TVueRouterOptions } from "../module/types";

export function VueRouter(options: TVueRouterOptions): ClassDecorator {
  const imports = options?.imports || [];
  let routeComponents: any[] = [];
  const asyncRouteComponents: Array<() => Promise<any>> = [];
  imports.forEach((_import) => {
    if (isFunction(_import)) {
      // 异步加载的路由组件
      asyncRouteComponents.push(_import);
    } else {
      // 同步加载的路由组件
      routeComponents.push(_import);
    }
  });
  routeComponents = filterRouteComponent(options?.imports || []);

  return function (module) {
    Module()(module);
    Reflect.defineMetadata(
      ROUTER_MODULE_METAKEY,
      ROUTER_MODULE_METADATA,
      module
    );

    // const routes: RouteConfig[] = [];

    // routeComponents.forEach(component => {
    //   const route = (Reflect.getMetadata(ROUTE_CONFIG_METAKEY, component) as RouteConfig);
    //   if (route) {
    //     route.component = component;
    //   }
    //   routes.push(route);
    // });

    // const router = options.bootstrap(Vue, {
    //   routes,
    // });

    // asyncRouteComponents.forEach(fn => {
    //   fn().then(_import => {
    //     const component = _import.default;
    //     const route = (Reflect.getMetadata(ROUTE_CONFIG_METAKEY, component) as RouteConfig);
    //     if (route) {
    //       route.component = component;
    //     }
    //     router.addRoute(route);
    //   });
    // });

    // Reflect.defineMetadata(ROUTER_METAKEY, router, module);
  };
}
