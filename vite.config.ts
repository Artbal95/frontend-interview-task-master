import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

const getPath = (path: string): string => resolve(__dirname, `src/${path}`);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: "/frontend-interview-task-master/",
  resolve: {
    alias: {
      "@assets": getPath("assets"),
      "@core": getPath("core"),
      "@modules": getPath("modules"),
      "@pages": getPath("pages"),
      "@appTypes": getPath("types"),
      "@widgets": getPath("widgets"),
      "@shared/components": getPath("shared/components"),
      "@shared/context": getPath("shared/context"),
      "@shared/providers": getPath("shared/providers"),
      "@shared/containers": getPath("shared/containers"),
      "@shared/dialogs": getPath("shared/dialogs"),
      "@shared/entities": getPath("shared/entities"),
      "@shared/enums": getPath("shared/enums"),
      "@shared/hooks": getPath("shared/hooks"),
      "@shared/layouts": getPath("shared/layouts"),
    },
  },
});
