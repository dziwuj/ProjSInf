import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const selfDestroying = process.env.SW_DESTROY === "true";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return defineConfig({
    build: {
      sourcemap: process.env.SOURCE_MAP === "true",
    },
    plugins: [
      react(),
      VitePWA({
        mode: "development",
        base: "/",
        srcDir: "src",
        filename: "sw.ts",
        strategies: "injectManifest",
        injectManifest: {
          minify: false,
          enableWorkboxModulesLogs: true,
        },
        registerType: "autoUpdate",
        selfDestroying: selfDestroying,
        manifest: {
          name: "ProjSInf PWA",
          short_name: "ProjSInf",
          description: "App for PK ProjSInf classes.",
          theme_color: "#1864AB",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
            {
              src: "/favicon.svg",
              sizes: "any",
              type: "image/svg+xml",
              purpose: "any",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*"],
          clientsClaim: true,
          skipWaiting: true,
          cleanupOutdatedCaches: true,
        },
        includeAssets: ["**/*"],
        devOptions: {
          enabled: process.env.SW_DEV === "true",
          type: "module",
          navigateFallback: "index.html",
        },
      }),
    ],
    server: {
      https: {
        key: fs.readFileSync(
          path.resolve(__dirname, "src/certs/localhost-key.pem"),
        ),
        cert: fs.readFileSync(
          path.resolve(__dirname, "src/certs/localhost.pem"),
        ),
      },
      host: "0.0.0.0",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@store": path.resolve(__dirname, "src/store"),
        "@screens": path.resolve(__dirname, "src/screens"),
        "@constants": path.resolve(__dirname, "src/constants"),
      },
    },
  });
};
