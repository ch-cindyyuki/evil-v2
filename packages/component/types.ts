import type { Component, AsyncComponent } from "vue";
import type { RouteConfig } from "vue-router";

export interface TComponentOptions {
  name?: string;
  route?: RouteConfig;
  components?: {
    [key: string]:
      | Component<any, any, any, any>
      | AsyncComponent<any, any, any, any>;
  };
}
