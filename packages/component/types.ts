import Vue, { ComponentOptions } from "vue";
import type { Component, AsyncComponent } from "vue";

export interface TComponentOptions {
  name?: string;
  components?: {
    [key: string]:
      | Component<any, any, any, any>
      | AsyncComponent<any, any, any, any>;
  };
}

export type TComponent = VueClass<any>;

export declare type VueClass<V> = {
  new (...args: any[]): V & Vue;
} & typeof Vue;
export declare type DecoratedClass = VueClass<Vue> & {
  __decorators__?: ((options: ComponentOptions<Vue>) => void)[];
};
