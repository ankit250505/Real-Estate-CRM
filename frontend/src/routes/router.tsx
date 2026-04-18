import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/app-layout";
import { ProtectedRoute } from "./protected-route";
import { LoginPage } from "../pages/login-page";
import { DashboardPage } from "../pages/dashboard-page";
import { LeadsPage } from "../pages/leads-page";
import { LeadDetailPage } from "../pages/lead-detail-page";
import { LeadFormPage } from "../pages/lead-form-page";
import { PropertiesPage } from "../pages/properties-page";
import { PropertyDetailPage } from "../pages/property-detail-page";
import { PropertyFormPage } from "../pages/property-form-page";
import { ClientsPage } from "../pages/clients-page";
import { ClientDetailPage } from "../pages/client-detail-page";
import { DealsPage } from "../pages/deals-page";
import { ReportsPage } from "../pages/reports-page";
import { AgentsPage } from "../pages/agents-page";
import { SettingsPage } from "../pages/settings-page";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "leads", element: <LeadsPage /> },
      { path: "leads/new", element: <LeadFormPage /> },
      { path: "leads/:id/edit", element: <LeadFormPage /> },
      { path: "leads/:id", element: <LeadDetailPage /> },
      { path: "properties", element: <PropertiesPage /> },
      { path: "properties/new", element: <PropertyFormPage /> },
      { path: "properties/:id/edit", element: <PropertyFormPage /> },
      { path: "properties/:id", element: <PropertyDetailPage /> },
      { path: "clients", element: <ClientsPage /> },
      { path: "clients/:id", element: <ClientDetailPage /> },
      { path: "deals", element: <DealsPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "agents", element: <AgentsPage /> },
      { path: "settings", element: <SettingsPage /> }
    ]
  }
]);
