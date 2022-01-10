import { vueFactory, ModuleStatic } from "packages";

import { AppModule } from "./app.module";

const app = vueFactory.create(AppModule);
app.$mount("#app");

const refModule = ModuleStatic.getRefModuleForVue();
console.log(refModule);
