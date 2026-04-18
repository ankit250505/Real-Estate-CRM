import { useParams } from "react-router-dom";
import { Card } from "../components/ui/card";
import { LoadingState } from "../components/state";
import { useProperty } from "../features/properties/api";
import { currency } from "../lib/utils";

export function PropertyDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useProperty(id);

  if (isLoading || !data) return <LoadingState label="Loading property..." />;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden p-0">
        <div className="h-72 bg-[linear-gradient(135deg,_rgba(15,118,110,0.2),_rgba(239,108,87,0.25),_rgba(245,237,226,1))]" />
        <div className="p-6">
          <h1 className="font-display text-3xl font-extrabold">{data.title}</h1>
          <p className="mt-2 text-sm text-slate-500">{data.location} • {data.address}</p>
          <p className="mt-4 text-2xl font-bold">{currency(Number(data.price))}</p>
          <p className="mt-3 text-sm text-slate-600">{data.description || "No description yet."}</p>
        </div>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold">Map Placeholder</h2>
        <div className="mt-4 flex h-64 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
          Google Maps-compatible component placeholder
        </div>
      </Card>
    </div>
  );
}
