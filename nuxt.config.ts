import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase"],
  components: [{ path: "../components", pathPrefix: false }],
  css: ["./app/assets/css/main.css"],
  supabase: {
    redirect: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
