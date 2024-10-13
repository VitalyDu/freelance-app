/* eslint-disable no-undef */
import react from "@vitejs/plugin-react";
import path from "path";
import stringHash from "string-hash";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  plugins: [react()],
  css: {
    modules: {
      // generateScopedName: "[name]_[local]__[hash:5]",
      generateScopedName: function (name, filename, css) {
        var file = path.basename(
          filename,
          process.env.NODE_ENV === "development"
            ? ".module.css"
            : ".module.css?used"
        );
        const hash = stringHash(css).toString(36).substr(0, 5);

        return `${file}_${name}__${hash}`;
      },
      localsConvention: null,
    },
  },
});
