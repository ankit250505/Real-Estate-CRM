import { Download } from "lucide-react";
import { http } from "../api/http";
import { PageHeader } from "../components/page-header";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export function ReportsPage() {
  const downloadReport = async (format: "excel" | "pdf") => {
    const response = await http.get(`/reports/export?format=${format}`, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = format === "pdf" ? "lead-summary.pdf" : "lead-summary.xlsx";
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Export lead summaries and use dashboard analytics to review conversion, deal closures, and agent contribution." />
      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">Excel Export</h2>
          <p className="mt-2 text-sm text-slate-500">Download the lead summary workbook for offline review.</p>
          <Button className="mt-4 gap-2" onClick={() => downloadReport("excel")}><Download className="h-4 w-4" /> Export Excel</Button>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">PDF Export</h2>
          <p className="mt-2 text-sm text-slate-500">Generate a compact PDF snapshot of the lead pipeline.</p>
          <Button className="mt-4 gap-2" onClick={() => downloadReport("pdf")}><Download className="h-4 w-4" /> Export PDF</Button>
        </Card>
      </div>
    </div>
  );
}
