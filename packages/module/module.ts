import { ReflectiveInjector } from "injection-js";
import { MODULE_METADATA, MODULE_METAKEY } from "../utils/constants";
import { filterModule } from "./filter";
import { ComponentStatic } from "../component";

import type { Provider } from "injection-js";
import type { TModuleOptions } from "./types";

let id = 0;

class ModuleFactory {
  _id: number = ++id;
  injector: ReflectiveInjector;
  parents: ModuleFactory[] = [];
  providers: Provider[] = [];
  bootstrap: any;

  /**
   * 最顶层 root 模块依赖
   */
   get root(): ModuleFactory | null {
    return this.parents[0] || null;
  }

  /**
   * 上一层模块依赖
   */
  get parent(): ModuleFactory | null {
    return this.parents[this.parents.length - 1] || null;
  }

  constructor(options?: TModuleOptions) {
    const providers: Provider[] = options?.providers || [];
    this.bootstrap = options?.bootstrap;
    const modules = filterModule(options?.imports || []);

    modules.forEach((module) => {
      const instance = ModuleStatic.getModule(module);
      if (instance) {
        instance.parents = this.parents.concat(this);
      }
    });

    this.providers = providers;
    const timer = setTimeout(() => {
      clearTimeout(timer);
      if (this.parent) {
        this.injector = ReflectiveInjector.resolveAndCreate(providers, this.parent.injector);
        console.log(providers);
        console.log(this.injector);
      }
    });
    this.injector = ReflectiveInjector.resolveAndCreate(providers);
  }
}

export class ModuleStatic {
  static getModule(token: any): ModuleFactory | null {
    return (Reflect.getMetadata("$module", token) as ModuleFactory) || null;
  }
}

export function Module(options?: TModuleOptions): ClassDecorator {
  return function (module) {
    Reflect.defineMetadata(MODULE_METAKEY, MODULE_METADATA, module);

    const instance = new ModuleFactory(options);
    Reflect.defineMetadata("$module", instance, module);
  };
}
