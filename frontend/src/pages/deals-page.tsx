import { Card } from "../components/ui/card";
import { LoadingState } from "../components/state";
import { PageHeader } from "../components/page-header";
import { useDeals } from "../features/deals/api";
import { currency } from "../lib/utils";

const columns = ["INQUIRY", "NEGOTIATION", "AGREEMENT", "CLOSED"] as const;

export function DealsPage() {
  const { data, isLoading } = useDeals();

  if (isLoading || !data) return <LoadingState label="Loading deals..." />;

  return (
    <div className="space-y-6">
      <PageHeader title="Deals Board" description="Visualize transaction flow by stage while keeping commission and value visible to managers and agents." />
      <div className="grid gap-4 xl:grid-cols-4">
        {columns.map((stage) => (
          <Card key={stage} className="min-h-[300px] bg-slate-50">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">{stage}</h2>
            <div className="mt-4 space-y-3">
              {data
                .filter((deal: any) => deal.stage === stage)
                .map((deal: any) => (
                  <div key={deal.id} className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="font-semibold">{deal.client.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{deal.property.title}</p>
                    <p className="mt-3 text-sm">{currency(Number(deal.dealValue))}</p>
                    <p className="mt-1 text-xs text-slate-500">Commission: {currency(Number(deal.commissionAmount))}</p>
                  </div>
                ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
