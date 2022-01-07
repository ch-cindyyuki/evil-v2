import type { Component, AsyncComponent } from "vue";

export interface TComponentOptions {
  name?: string;
  components?: {
    [key: string]:
      | Component<any, any, any, any>
      | AsyncComponent<any, any, any, any>;
  };
}
