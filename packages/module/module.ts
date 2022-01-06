import { ReflectiveInjector } from "injection-js";
import { MODULE_METADATA, MODULE_METAKEY } from "../utils/constants";
import { filterModule } from "./filter";

import type { Provider } from "injection-js";
import type { TModuleOptions } from "./types";

class ModuleFactory {
  injector: ReflectiveInjector;
  parents: ModuleFactory[] = [];
  providers: Provider[] = [];

  constructor(options?: TModuleOptions) {
    const providers: Provider[] = options?.providers || [];
    const modules = filterModule(options?.imports || []);

    modules.forEach((module) => {
      const instance = ModuleStatic.getModule(module);
      if (instance) {
        instance.parents.push(this);
      }
    });

    this.providers = providers;
    this.injector = ReflectiveInjector.resolveAndCreate(providers);
  }

  /**
   * 最顶层 root 模块依赖
   */
  get root(): ModuleFactory | null {
    return this.parents[0] || null;
  }

  /**
   * 获取 provider 依赖
   * @param token
   */
  getProvider(token: any) {
    let provider = this.injector.get(token);
    if (!provider) {
      for (let i = 0; i < this.parents.length; i++) {
        const module = this.parents[i];
        const _provider = module.injector.get(token);
        if (_provider) {
          provider = _provider;
          break;
        }
      }
    }
    if (!provider) {
      throw `You haven't registered ${token} service`;
    }
    return provider;
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
