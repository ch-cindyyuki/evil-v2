import VueRouter from "vue-router";
import { VueRouter as RouterBootstrap } from "packages";

@RouterModule({
  root: true,
  bootstrap(Vue, options) {
    Vue.use(VueRouter);
    const router = new VueRouter({
      mode: "history",
      ...options,
    });
    return router;
  },
})
export class Router {}
