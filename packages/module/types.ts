import { VueConstructor } from "vue";
import VueRouter from "vue-router";

import type { RouterOptions } from "vue-router";
import type { TProvider } from "../injector";

export type TModuleOptions = {
  imports?: any[];
  providers?: TProvider[];
  bootstrap?: any;
};

export type TVueModuleOptions = {
  imports?: any[];
  providers?: TProvider[];
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
