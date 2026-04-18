import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { buildExcelReport, buildPdfReport } from "../../utils/export.js";
import { prisma } from "../../lib/prisma.js";

export const reportController = {
  export: asyncHandler(async (req: Request, res: Response) => {
    const format = String(req.query.format ?? "excel");
    const leads = await prisma.lead.findMany({
      where: { deletedAt: null },
      include: { assignedAgent: true }
    });

    const rows = leads.map((lead) => ({
      fullName: lead.fullName,
      source: lead.source,
      status: lead.status,
      assignedAgent: lead.assignedAgent ? `${lead.assignedAgent.firstName} ${lead.assignedAgent.lastName}` : "Unassigned"
    }));

    await prisma.reportLog.create({
      data: {
        userId: req.user!.userId,
        name: "Lead Summary",
        format
      }
    });

    if (format === "pdf") {
      const buffer = await buildPdfReport("Lead Summary", rows);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=lead-summary.pdf");
      res.send(buffer);
      return;
    }

    const workbook = await buildExcelReport(rows, "Lead Summary");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=lead-summary.xlsx");
    res.send(Buffer.from(workbook));
  })
};
