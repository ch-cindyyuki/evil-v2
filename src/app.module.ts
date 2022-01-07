import { Module } from "packages";

import App from "./App.vue";
import { RouterModule } from "./router";
import { HomeModule } from "./views/home.module";
import { Test } from "./utils/test";

@Module({
  imports: [RouterModule, HomeModule, App],
  providers: [Test],
  bootstrap: App,
})
export class AppModule {}
