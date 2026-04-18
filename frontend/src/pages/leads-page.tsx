import { Link } from "react-router-dom";
import { DataTable } from "../components/data-table";
import { EmptyState, LoadingState } from "../components/state";
import { LeadForm } from "../features/leads/lead-form";
import { useLeads } from "../features/leads/api";
import { PageHeader } from "../components/page-header";
import { Button } from "../components/ui/button";

export function LeadsPage() {
  const { data, isLoading } = useLeads();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description="Capture, qualify, assign, and follow up on buyers and sellers with clean filters and activity visibility."
        action={
          <Link to="/leads/new">
            <Button>Open Lead Form</Button>
          </Link>
        }
      />
      <LeadForm />
      {isLoading ? (
        <LoadingState label="Loading leads..." />
      ) : data?.data?.length ? (
        <DataTable
          columns={["Name", "Phone", "Source", "Status", "Agent"]}
          rows={data.data.map((lead: any) => [
            <Link className="font-semibold text-brand" to={`/leads/${lead.id}`} key={lead.id}>
              {lead.fullName}
            </Link>,
            lead.phone,
            lead.source,
            lead.status,
            lead.assignedAgent ? `${lead.assignedAgent.firstName} ${lead.assignedAgent.lastName}` : "Unassigned"
          ])}
        />
      ) : (
        <EmptyState title="No leads yet" description="New website captures and manual entries will show up here." />
      )}
    </div>
  );
}
