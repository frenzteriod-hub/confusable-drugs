import { installSignOut, requireAccount } from "./auth.js?v=20260812-3";
import { installThemeToggle } from "./modules/theme.js?v=20260811-1";
installThemeToggle();

await requireAccount(["admin"]);
installSignOut();

const navigation = document.querySelector(".site-nav");
if (navigation && !navigation.querySelector("[data-admin-dashboard-link]")) {
  const link = document.createElement("a");
  link.href = "admin-dashboard.html";
  link.textContent = "Admin dashboard";
  link.dataset.adminDashboardLink = "";
  navigation.append(link);
}
