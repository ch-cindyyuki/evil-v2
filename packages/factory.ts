class VueFactoryStatic {
  rootModule: any;

  create(module: any) {
    const instance = new module();
    this.rootModule = instance;
  }
}

export const vueFactory = new VueFactoryStatic();
