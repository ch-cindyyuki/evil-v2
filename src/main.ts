import { vueFactory } from "packages";

import { AppModule } from "./app.module";

const app = vueFactory.create(AppModule);
app.$mount("#app");
