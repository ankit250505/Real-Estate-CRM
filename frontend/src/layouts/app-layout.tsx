import { Bell, Building2, ChartColumn, Handshake, LayoutDashboard, LogOut, Menu, ShieldCheck, Users } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../app/auth-context";
import { cn } from "../lib/utils";
import { NotificationsDrawer } from "../pages/notifications-drawer";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/properties", label: "Properties", icon: Building2 },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/deals", label: "Deals", icon: Handshake },
  { to: "/reports", label: "Reports", icon: ChartColumn },
  { to: "/agents", label: "Agents", icon: ShieldCheck }
];

export function AppLayout() {
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-mist text-ink">
      <div className="flex min-h-screen">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 transform bg-ink px-5 py-6 text-white transition md:static md:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Link to="/" className="block rounded-3xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-teal-200">Command Center</p>
            <h2 className="mt-2 font-display text-2xl font-bold">Real Estate CRM</h2>
          </Link>

          <nav className="mt-8 space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn("flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition", isActive ? "bg-white text-ink" : "text-slate-200 hover:bg-white/10")
                }
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-30 border-b border-white/70 bg-mist/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
              <button className="rounded-2xl border border-slate-200 p-2 md:hidden" onClick={() => setOpen((value) => !value)}>
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Operations</p>
                <h1 className="font-display text-xl font-bold">Pipeline visibility without spreadsheet chaos</h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-2xl border border-slate-200 p-2" onClick={() => setNotificationsOpen(true)}>
                  <Bell className="h-5 w-5" />
                </button>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-slate-500">{user?.role}</p>
                </div>
                <button className="rounded-2xl border border-slate-200 p-2" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>

      {notificationsOpen && <NotificationsDrawer onClose={() => setNotificationsOpen(false)} />}
    </div>
  );
}
