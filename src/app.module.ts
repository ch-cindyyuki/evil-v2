import { Module } from "packages";

import App from "./App.vue";
import { RouterModule } from "./router";

@Module({
  imports: [RouterModule, App],
  providers: [],
  bootstrap: App,
})
export class AppModule {}
