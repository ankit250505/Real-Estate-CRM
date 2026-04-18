import { Link } from "react-router-dom";
import { DataTable } from "../components/data-table";
import { EmptyState, LoadingState } from "../components/state";
import { PageHeader } from "../components/page-header";
import { useClients } from "../features/clients/api";

export function ClientsPage() {
  const { data, isLoading } = useClients();

  return (
    <div className="space-y-6">
      <PageHeader title="Clients" description="Track buyer and seller profiles, preferences, property visits, and timelines tied back to leads and deals." />
      {isLoading ? (
        <LoadingState label="Loading clients..." />
      ) : data?.length ? (
        <DataTable
          columns={["Name", "Phone", "Email", "Type"]}
          rows={data.map((client: any) => [
            <Link className="font-semibold text-brand" to={`/clients/${client.id}`} key={client.id}>
              {client.name}
            </Link>,
            client.phone,
            client.email || "No email",
            client.type
          ])}
        />
      ) : (
        <EmptyState title="No clients available" description="Convert qualified leads into client profiles to enrich the timeline." />
      )}
    </div>
  );
}
