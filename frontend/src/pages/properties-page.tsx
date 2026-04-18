import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { EmptyState, LoadingState } from "../components/state";
import { PageHeader } from "../components/page-header";
import { useProperties } from "../features/properties/api";
import { PropertyForm } from "../features/properties/property-form";
import { currency } from "../lib/utils";
import { Button } from "../components/ui/button";

export function PropertiesPage() {
  const { data, isLoading } = useProperties();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Properties"
        description="Manage residential and commercial inventory with filters, media, availability, and map-ready coordinates."
        action={
          <Link to="/properties/new">
            <Button>Add Property</Button>
          </Link>
        }
      />
      <PropertyForm />
      {isLoading ? (
        <LoadingState label="Loading properties..." />
      ) : data?.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.map((property: any) => (
            <Card key={property.id} className="overflow-hidden p-0">
              <div className="h-48 bg-gradient-to-br from-brand/20 via-sand to-coral/20" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to={`/properties/${property.id}`} className="text-lg font-semibold text-ink">
                      {property.title}
                    </Link>
                    <p className="mt-1 text-sm text-slate-500">{property.location}</p>
                  </div>
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    {property.availabilityStatus}
                  </span>
                </div>
                <p className="mt-4 text-xl font-bold">{currency(Number(property.price))}</p>
                <p className="mt-2 text-sm text-slate-500">{property.bedrooms ?? "-"} beds • {property.bathrooms ?? "-"} baths</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="No properties found" description="Create your first listing to start tracking inventory." />
      )}
    </div>
  );
}
