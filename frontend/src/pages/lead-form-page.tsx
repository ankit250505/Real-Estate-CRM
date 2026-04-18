import { PageHeader } from "../components/page-header";
import { LeadForm } from "../features/leads/lead-form";

export function LeadFormPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Lead Create / Edit" description="Use this screen for structured lead intake and future edit flows." />
      <LeadForm />
    </div>
  );
}
