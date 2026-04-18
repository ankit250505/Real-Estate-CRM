import { PageHeader } from "../components/page-header";
import { PropertyForm } from "../features/properties/property-form";

export function PropertyFormPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Property Create / Edit" description="Use this screen to add or update inventory records with core listing data." />
      <PropertyForm />
    </div>
  );
}
