import { useParams } from "react-router-dom";
import { Card } from "../components/ui/card";
import { LoadingState } from "../components/state";
import { useLead } from "../features/leads/api";

export function LeadDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useLead(id);

  if (isLoading || !data) return <LoadingState label="Loading lead..." />;

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="font-display text-3xl font-extrabold">{data.fullName}</h1>
        <p className="mt-2 text-sm text-slate-500">{data.phone} • {data.email || "No email"} • {data.status}</p>
        <p className="mt-4 text-sm text-slate-600">{data.notes || "No notes yet."}</p>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold">Activity History</h2>
        <div className="mt-4 space-y-3">
          {data.activities.map((activity: any) => (
            <div key={activity.id} className="rounded-2xl border border-slate-100 p-4">
              <p className="font-medium">{activity.title}</p>
              <p className="mt-1 text-sm text-slate-500">{activity.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
