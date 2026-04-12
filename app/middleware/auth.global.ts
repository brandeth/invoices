export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  const publicRoutes = ["/", "/login", "/register"];
  const isPublic =
    publicRoutes.includes(to.path) || to.path.startsWith("/demo");

  if (!user.value && !isPublic) {
    return navigateTo("/login");
  }

  if (user.value && (to.path === "/login" || to.path === "/register")) {
    return navigateTo("/dashboard");
  }
});
