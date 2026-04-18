import { useParams } from "react-router-dom";
import { Card } from "../components/ui/card";
import { LoadingState } from "../components/state";
import { useClient } from "../features/clients/api";

export function ClientDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useClient(id);

  if (isLoading || !data) return <LoadingState label="Loading client..." />;

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="font-display text-3xl font-extrabold">{data.name}</h1>
        <p className="mt-2 text-sm text-slate-500">{data.type} • {data.phone} • {data.email || "No email"}</p>
        <p className="mt-4 text-sm text-slate-600">{data.preferences || "No preferences captured yet."}</p>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold">Timeline</h2>
        <div className="mt-4 space-y-3">
          {data.interactions.map((interaction: any) => (
            <div key={interaction.id} className="rounded-2xl border border-slate-100 p-4">
              <p className="font-medium">{interaction.title}</p>
              <p className="mt-1 text-sm text-slate-500">{interaction.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
