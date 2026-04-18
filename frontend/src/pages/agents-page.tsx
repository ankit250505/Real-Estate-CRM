import { DataTable } from "../components/data-table";
import { EmptyState, LoadingState } from "../components/state";
import { PageHeader } from "../components/page-header";
import { useUsers } from "../features/users/api";

export function AgentsPage() {
  const { data, isLoading } = useUsers();

  return (
    <div className="space-y-6">
      <PageHeader title="Agent Management" description="Admins can review user roles, operational coverage, and staffing across the sales funnel." />
      {isLoading ? (
        <LoadingState label="Loading users..." />
      ) : data?.length ? (
        <DataTable
          columns={["Name", "Email", "Phone", "Role"]}
          rows={data.map((user: any) => [
            `${user.firstName} ${user.lastName}`,
            user.email,
            user.phone || "-",
            user.role
          ])}
        />
      ) : (
        <EmptyState title="No team members found" description="Seed data or admin-created users will appear here." />
      )}
    </div>
  );
}
