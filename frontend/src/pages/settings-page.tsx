import { Card } from "../components/ui/card";
import { PageHeader } from "../components/page-header";
import { useAuth } from "../app/auth-context";

export function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader title="Profile & Settings" description="Manage your account context and review CRM environment details." />
      <Card>
        <h2 className="text-lg font-semibold">Current User</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Name</p>
            <p className="mt-2 font-semibold">{user?.firstName} {user?.lastName}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Role</p>
            <p className="mt-2 font-semibold">{user?.role}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
