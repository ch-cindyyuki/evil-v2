import { VueModule } from "packages";

import App from "./App.vue";
import { HomeModule } from "./views/home.module";
import { Test } from "./utils/test";

@VueModule({
  imports: [HomeModule],
  providers: [Test],
  bootstrap(Vue, options) {
    return new Vue({
      ...options,
      render: (h) => h(App),
    }).$mount("#app");
  },
})
export class AppModule {}
