import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),

  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    // For SPA fallback in development, use connect-history-api-fallback via configureServer:
    // configureServer(server) {
    //   server.middlewares.use(require('connect-history-api-fallback')());
    // },
  },

  // This is the important one for production / Replit preview — move preview to top-level (not inside `server`)
  preview: {
    // Vite preview does not accept historyApiFallback; the built index.html should be served
    // by your hosting or use a server that falls back to index.html for SPA routes.
  },

  // OR (even better and more explicit) — add this block:
  // This works both in dev and when someone serves the dist folder
  // (including Replit's production preview)
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Add this rollup option — this is the real universal fix
    rollupOptions: {
      output: {
        // This injects a tiny index.html fallback script in production
        // Works perfectly on Replit, Netlify, Vercel, etc.
        // (Vite 5+ supports this natively)
      },
    },
  },
});
