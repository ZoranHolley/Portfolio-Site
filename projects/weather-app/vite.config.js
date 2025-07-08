import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 👇 tell Vite the *public* path at which your app will live
  base: "/Portfolio-Site/projects/weather-app/",
});

