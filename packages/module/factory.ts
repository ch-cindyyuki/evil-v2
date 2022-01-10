import Vue from "vue";
import { ModuleStatic } from "./module";

class VueFactoryStatic {
  create(module: any) {
    const refModule = ModuleStatic.getRefModule(module);

    if (refModule) {
      ModuleStatic.injectRefModuleForVue(refModule);
    }

    const root = refModule?.root || refModule;
    return new Vue({
      render: (h) => h(root?.$options.bootstrap),
    });
  }
}

export const vueFactory = new VueFactoryStatic();
