import { Card } from "./ui/card";

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="bg-gradient-to-br from-white to-sand/60">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-extrabold text-ink">{value}</p>
    </Card>
  );
}
