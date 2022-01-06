import Vue from "vue";

import type { TInstall } from "./types";

export const install: TInstall = function (cb) {
  return cb(Vue);
};
