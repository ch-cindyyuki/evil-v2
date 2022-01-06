import path from "path";
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import { vitePluginCommonjs } from "vite-plugin-commonjs";
import { dynamicImport } from "vite-plugin-dynamic-import";
import viteRequireContext from "@originjs/vite-plugin-require-context";
import htmlTemplate from "vite-plugin-html-template";

export default defineConfig(({ command }) => ({
  plugins:
    command === "build"
      ? []
      : [
          /**
           * vue2 项目兼容
           */
          createVuePlugin({
            jsx: true,
            vueTemplateOptions: {
              compilerOptions: {
                whitespace: "preserve",
              },
            },
          }),
          /**
           * 处理 webpack 项目中 require 写法
           */
          vitePluginCommonjs(),
          /**
           * 兼容 import('@views/' + path)
           */
          dynamicImport(),
          /**
           * 处理 webpack 项目中 require.context 写法
           */
          viteRequireContext(),
          /**
           * 默认使用 public/index.html 模板
           */
          htmlTemplate({
            pages: {
              index: {
                template: "./index.html",
                title: "HomePage",
              },
            },
          }),
        ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      packages: path.resolve(__dirname, "./packages"),
    },
    extensions: [".vue", ".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  build: {
    target: "es2015",
    lib: {
      entry: "packages/index.ts",
      name: "evil-v2",
      fileName: (format) => `evil-v2.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue"],
    },
    minify: false,
  },
  define: {
    "process.env": process.env,
  },
}));
