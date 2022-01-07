import { VueConstructor } from "vue";
import VueRouter from "vue-router";
import { Provider } from "injection-js";

import type { RouterOptions } from "vue-router";

export type TModuleOptions = {
  imports?: any[];
  providers?: Provider[];
  bootstrap?: any;
};

export type TVueModuleOptions = {
  imports?: any[];
  providers?: Provider[];
  bootstrap: TBootstrap;
};

export type TVueRouterOptions = {
  imports?: any[];
  bootstrap: TRouterBootstrap;
};

export type TBootstrap = (
  vue: VueConstructor,
  options: Record<string, any>
) => any;

export type TRouterBootstrap = (
  vue: VueConstructor,
  options: RouterOptions
) => VueRouter;

export type TInstall = (Vue: VueConstructor) => Record<string, any> | undefined;
