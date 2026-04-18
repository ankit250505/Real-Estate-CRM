import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { prisma } from "../../lib/prisma.js";
import { DealStage, LeadStatus } from "@prisma/client";

export const dashboardController = {
  summary: asyncHandler(async (_req: Request, res: Response) => {
    const [totalLeads, qualifiedLeads, activeDeals, closedDeals, deals, users] = await Promise.all([
      prisma.lead.count({ where: { deletedAt: null } }),
      prisma.lead.count({ where: { status: LeadStatus.QUALIFIED, deletedAt: null } }),
      prisma.deal.count({ where: { stage: { not: DealStage.CLOSED } } }),
      prisma.deal.count({ where: { stage: DealStage.CLOSED } }),
      prisma.deal.findMany({ include: { agent: true } }),
      prisma.user.findMany({ where: { deletedAt: null } })
    ]);

    const revenue = deals.reduce((sum, deal) => sum + Number(deal.dealValue), 0);
    const agentPerformance = users.map((user) => {
      const userDeals = deals.filter((deal) => deal.agentId === user.id);
      return {
        agent: `${user.firstName} ${user.lastName}`,
        deals: userDeals.length,
        revenue: userDeals.reduce((sum, deal) => sum + Number(deal.dealValue), 0)
      };
    });

    res.json({
      data: {
        cards: { totalLeads, qualifiedLeads, activeDeals, closedDeals, revenue },
        monthlyLeads: [
          { month: "Jan", leads: 14 },
          { month: "Feb", leads: 21 },
          { month: "Mar", leads: 18 },
          { month: "Apr", leads: 27 }
        ],
        conversions: [
          { label: "Qualified", value: qualifiedLeads },
          { label: "Closed", value: closedDeals }
        ],
        agentPerformance
      }
    });
  })
};
