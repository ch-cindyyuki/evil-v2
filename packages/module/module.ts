import { RefInjector } from "../injector";
import { MODULE_METADATA, MODULE_METAKEY } from "../utils/constants";
import { filterModule } from "./filter";
import { ComponentStatic } from "../component";

import type { TModuleOptions } from "./types";

let id = 0;

class ModuleFactory {
  private _id: number = ++id;
  private _refInjector: RefInjector;
  parents: ModuleFactory[] = [];
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

  get refInjector(): RefInjector {
    return this._refInjector;
  }

  constructor(options?: TModuleOptions) {
    this.bootstrap = options?.bootstrap;
    const modules = filterModule(options?.imports || []);

    modules.forEach((module) => {
      const instance = ModuleStatic.getModule(module);
      if (instance) {
        instance.parents = this.parents.concat(this);
      }
    });

    this._refInjector = new RefInjector(
      options?.providers || [],
      this.parent?.refInjector.injector
    );
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
