import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [tailwindcss(), reactRouter()],
    resolve: {
      tsconfigPaths: true,
      dedupe: ["react", "react-dom"],
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-router", "@tanstack/react-query"],
    },
    build: {
      minify: isProd ? "terser" : undefined,
      terserOptions: isProd
        ? {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        }
        : undefined,
    },
    server: {
      proxy: {
        "/api": {
          target: "https://suhba-backend-dev.tazkiah.me",
          changeOrigin: true,
        },
      },
    },
  };
});
