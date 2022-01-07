import Vue from "vue";
import { ModuleStatic } from "./module";

class VueFactoryStatic {
  rootModule: any;

  create(module: any) {
    const instance = ModuleStatic.getModule(module);
    const root = instance?.root || instance;
    return new Vue({
      render: (h) => h(root?.bootstrap),
    });
  }
}

export const vueFactory = new VueFactoryStatic();
