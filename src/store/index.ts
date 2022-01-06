import Vue from "vue";
import { PiniaVuePlugin, createPinia } from "pinia";

export * from "./user.store";

// @Install()
// export class Pinia {

//   setup() {
//     Vue.use(PiniaVuePlugin);
//     const pinia = createPinia();

//     return {
//       pinia
//     };
//   }
// }