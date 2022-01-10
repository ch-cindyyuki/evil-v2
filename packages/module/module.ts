import { RefInjector } from "../injector";
import { MODULE_METADATA, MODULE_METAKEY } from "../utils/constants";
import { filterModule } from "./filter";
import { defineReadonlyValue } from "../utils/shared";
import { isModule } from "../utils/validateModule";

import type { TModuleOptions } from "./types";
import Vue from "vue";

let id = 0;

/**
 *
 */
class RefModule {
  private readonly _id: number = ++id;
  private _refInjector: RefInjector;
  private readonly _parents: RefModule[] = [];
  private readonly _childModules: any[];
  readonly $options: TModuleOptions;

  /**
   * 最顶层 root 模块依赖
   */
  get root(): RefModule | null {
    return this._parents[0] || null;
  }

  /**
   * 上一层模块依赖
   */
  get parent(): RefModule | null {
    return this._parents[this._parents.length - 1] || null;
  }

  /**
   * 容器管理类
   */
  get refInjector(): RefInjector {
    return this._refInjector;
  }

  constructor(options?: TModuleOptions) {
    this.$options = {
      imports: options?.imports || [],
      providers: options?.providers || [],
      bootstrap: options?.bootstrap || null,
    };
    this._childModules = filterModule(this.$options.imports || []);

    this._refInjector = new RefInjector(
      options?.providers || [],
      this.parent?.refInjector.injector
    );

    this.created();
  }

  created() {
    this._childModules.forEach((module) => {
      const refModule = ModuleStatic.getRefModule(module);
      if (refModule) {
        refModule.addParent(this);
      }
    });
  }

  /**
   * 添加上一级模块依赖
   * @param parent
   */
  addParent(parent: RefModule) {
    this._parents.push(parent);
  }

  /**
   * 添加最顶层模块依赖
   * @param root
   */
  addRoot(root: RefModule) {
    this._parents.unshift(root);
  }
}

export class ModuleStatic {
  /**
   * 根据 module_token 获取对应的 refModule
   * @param token module_token
   */
  static getRefModule(token: any): RefModule | null {
    if (!isModule(token)) {
      return null;
    }
    return Reflect.getMetadata("$refModule", token) as RefModule;
  }

  /**
   * 根据 module_token 设置对应的 refModule
   * @param refModule refModule 实例
   * @param token module_token
   */
  static setRefModule(refModule: RefModule, token: any) {
    Reflect.defineMetadata("$refModule", refModule, token);
  }

  static injectRefModuleForVue(refModule: RefModule) {
    defineReadonlyValue(Vue.prototype, "$rootRefModule", refModule);
  }

  static getRefModuleForVue(): RefModule | null {
    return (Vue.prototype["$rootRefModule"] as RefModule) || null;
  }
}

/**
 * module 装饰器，在 module 类中创建 refModule 并注入
 * @param options
 * @constructor
 */
export function Module(options?: TModuleOptions): ClassDecorator {
  return function (module) {
    Reflect.defineMetadata(MODULE_METAKEY, MODULE_METADATA, module);

    const refModule = new RefModule(options);
    ModuleStatic.setRefModule(refModule, module);
  };
}
