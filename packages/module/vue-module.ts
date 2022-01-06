import Vue from "vue";
import { Module, ModuleStatic } from "./module";

import type { TVueModuleOptions } from "./types";

export function VueModule(options: TVueModuleOptions): ClassDecorator {
  function bootstrap(module: any) {
    Module({
      imports: options?.imports,
      providers: options?.providers,
    })(module);

    console.log(111, ModuleStatic.getModule(module));

    const result = options.bootstrap(Vue, {});
    if (result instanceof Vue) {
      Reflect.defineMetadata("$root", result, module);
    }
  }
  return bootstrap;
}
