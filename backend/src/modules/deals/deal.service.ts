import { DealStage } from "@prisma/client";
import type { Express } from "express";
import { storageAdapter } from "../../utils/storage.js";
import { sanitizeInput } from "../../utils/sanitize.js";
import { dealRepository } from "./deal.repository.js";

const computeCommission = (dealValue: number, commissionPercent: number) =>
  Number(((dealValue * commissionPercent) / 100).toFixed(2));

export const dealService = {
  list() {
    return dealRepository.findMany();
  },
  async create(payload: Record<string, unknown>, files: Express.Multer.File[] = []) {
    const uploadedUrls = await Promise.all(files.map((file) => storageAdapter.upload(file)));
    const dealValue = Number(payload.dealValue);
    const commissionPercent = Number(payload.commissionPercent);

    return dealRepository.create({
      client: { connect: { id: String(payload.clientId) } },
      property: { connect: { id: String(payload.propertyId) } },
      agent: { connect: { id: String(payload.agentId) } },
      dealValue,
      commissionPercent,
      commissionAmount: computeCommission(dealValue, commissionPercent),
      stage: (payload.stage as DealStage | undefined) ?? DealStage.INQUIRY,
      expectedCloseDate: payload.expectedCloseDate ? new Date(String(payload.expectedCloseDate)) : undefined,
      notes: sanitizeInput(String(payload.notes ?? "")) || undefined,
      documents: uploadedUrls.length
        ? {
            create: uploadedUrls.map((fileUrl, index) => ({
              name: `Deal Document ${index + 1}`,
              fileUrl
            }))
          }
        : undefined
    });
  },
  async update(id: string, payload: Record<string, unknown>) {
    const existingDeal = await dealRepository.findById(id);
    const dealValue = "dealValue" in payload ? Number(payload.dealValue) : undefined;
    const commissionPercent = "commissionPercent" in payload ? Number(payload.commissionPercent) : undefined;
    const resolvedDealValue = dealValue ?? Number(existingDeal?.dealValue ?? 0);
    const resolvedCommissionPercent = commissionPercent ?? Number(existingDeal?.commissionPercent ?? 0);

    return dealRepository.update(id, {
      ...("clientId" in payload ? { client: { connect: { id: String(payload.clientId) } } } : {}),
      ...("propertyId" in payload ? { property: { connect: { id: String(payload.propertyId) } } } : {}),
      ...("agentId" in payload ? { agent: { connect: { id: String(payload.agentId) } } } : {}),
      ...(dealValue !== undefined ? { dealValue } : {}),
      ...(commissionPercent !== undefined ? { commissionPercent } : {}),
      ...(dealValue !== undefined || commissionPercent !== undefined
        ? {
            commissionAmount: computeCommission(resolvedDealValue, resolvedCommissionPercent)
          }
        : {}),
      ...("stage" in payload ? { stage: payload.stage as DealStage } : {}),
      ...("expectedCloseDate" in payload
        ? { expectedCloseDate: payload.expectedCloseDate ? new Date(String(payload.expectedCloseDate)) : null }
        : {}),
      ...("notes" in payload ? { notes: sanitizeInput(String(payload.notes ?? "")) } : {})
    });
  }
};
