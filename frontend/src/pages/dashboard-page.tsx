import { BarChart, Bar, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "../components/page-header";
import { LoadingState } from "../components/state";
import { StatCard } from "../components/stat-card";
import { Card } from "../components/ui/card";
import { useDashboard } from "../features/dashboard/api";
import { currency } from "../lib/utils";

export function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) return <LoadingState label="Loading dashboard..." />;

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Track pipeline health, agent performance, and deal flow in one responsive workspace." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Leads" value={data.cards.totalLeads} />
        <StatCard label="Qualified Leads" value={data.cards.qualifiedLeads} />
        <StatCard label="Active Deals" value={data.cards.activeDeals} />
        <StatCard label="Closed Deals" value={data.cards.closedDeals} />
        <StatCard label="Revenue" value={currency(data.cards.revenue)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="h-[360px]">
          <h2 className="text-lg font-semibold">Monthly Leads</h2>
          <div className="mt-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyLeads}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" fill="#0f766e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-[360px]">
          <h2 className="text-lg font-semibold">Conversions</h2>
          <div className="mt-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.conversions} dataKey="value" nameKey="label" innerRadius={65} outerRadius={95}>
                  {data.conversions.map((entry: { label: string }, index: number) => (
                    <Cell key={entry.label} fill={index === 0 ? "#ef6c57" : "#0f766e"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold">Agent Performance</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {data.agentPerformance.map((agent: { agent: string; deals: number; revenue: number }) => (
            <div key={agent.agent} className="rounded-2xl border border-slate-100 p-4">
              <p className="font-semibold">{agent.agent}</p>
              <p className="mt-2 text-sm text-slate-500">{agent.deals} deals</p>
              <p className="mt-1 text-sm text-slate-500">{currency(agent.revenue)}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
