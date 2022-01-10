import { Injector } from "@wendellhu/redi";

import type { TProvider } from "./type";

export class RefInjector {
  private _injector: Injector | null = null;
  private _parentInjector?: Injector | null = null;
  private _childrenInjectors: Injector[] = [];
  private _providers: TProvider[] = [];

  get injector(): Injector {
    if (this._injector) {
      return this._injector;
    }
    return this.createInjector();
  }

  get childInjectors(): Injector[] {
    return this._childrenInjectors;
  }

  constructor(providers: TProvider[], parent?: Injector) {
    this._providers = providers;
    this._parentInjector = parent || null;
    this.createInjector([], parent);
  }

  createInjector(providers?: TProvider[], parent?: Injector): Injector {
    const _providers = this._providers.concat(providers || []);
    this._injector = new Injector(_providers, parent);
    return this.injector;
  }

  createChildInjector(providers?: TProvider[]): Injector {
    const injector = this.injector.createChild(providers);
    this._childrenInjectors.push(injector);
    return injector;
  }
}
