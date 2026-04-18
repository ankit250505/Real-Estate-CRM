import { AvailabilityStatus, Prisma, PropertyCategory, PropertyPurpose } from "@prisma/client";
import type { Express } from "express";
import { getPagination } from "../../utils/pagination.js";
import { sanitizeInput } from "../../utils/sanitize.js";
import { storageAdapter } from "../../utils/storage.js";
import { propertyRepository } from "./property.repository.js";

export const propertyService = {
  async list(query: Record<string, unknown>) {
    const { page, limit, skip } = getPagination(Number(query.page ?? 1), Number(query.limit ?? 10));
    const search = String(query.search ?? "").trim();

    const where: Prisma.PropertyWhereInput = {
      deletedAt: null,
      ...(query.location ? { location: { contains: String(query.location), mode: "insensitive" } } : {}),
      ...(query.type ? { type: query.type as PropertyCategory } : {}),
      ...(query.purpose ? { purpose: query.purpose as PropertyPurpose } : {}),
      ...(query.availabilityStatus ? { availabilityStatus: query.availabilityStatus as AvailabilityStatus } : {}),
      ...(query.minPrice || query.maxPrice
        ? {
            price: {
              ...(query.minPrice ? { gte: Number(query.minPrice) } : {}),
              ...(query.maxPrice ? { lte: Number(query.maxPrice) } : {})
            }
          }
        : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { location: { contains: search, mode: "insensitive" } },
              { address: { contains: search, mode: "insensitive" } }
            ]
          }
        : {})
    };

    const [rows, total] = await Promise.all([
      propertyRepository.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { images: true, assignedAgent: true }
      }),
      propertyRepository.count(where)
    ]);

    return { data: rows, meta: { page, limit, total } };
  },

  getById(id: string) {
    return propertyRepository.findById(id);
  },

  async create(payload: Record<string, unknown>, files: Express.Multer.File[] = []) {
    const uploadedUrls = await Promise.all(files.map((file) => storageAdapter.upload(file)));

    return propertyRepository.create({
      title: String(payload.title),
      type: payload.type as PropertyCategory,
      purpose: payload.purpose as PropertyPurpose,
      price: Number(payload.price),
      location: String(payload.location),
      address: String(payload.address),
      latitude: payload.latitude ? Number(payload.latitude) : undefined,
      longitude: payload.longitude ? Number(payload.longitude) : undefined,
      size: payload.size ? Number(payload.size) : undefined,
      bedrooms: payload.bedrooms ? Number(payload.bedrooms) : undefined,
      bathrooms: payload.bathrooms ? Number(payload.bathrooms) : undefined,
      amenities: Array.isArray(payload.amenities) ? (payload.amenities as string[]) : [],
      description: sanitizeInput(String(payload.description ?? "")) || undefined,
      availabilityStatus: (payload.availabilityStatus as AvailabilityStatus | undefined) ?? AvailabilityStatus.AVAILABLE,
      assignedAgent: payload.assignedAgentId ? { connect: { id: String(payload.assignedAgentId) } } : undefined,
      images: uploadedUrls.length
        ? {
            create: uploadedUrls.map((url) => ({ url }))
          }
        : undefined
    });
  },

  update(id: string, payload: Record<string, unknown>) {
    return propertyRepository.update(id, {
      ...("title" in payload ? { title: String(payload.title) } : {}),
      ...("type" in payload ? { type: payload.type as PropertyCategory } : {}),
      ...("purpose" in payload ? { purpose: payload.purpose as PropertyPurpose } : {}),
      ...("price" in payload ? { price: Number(payload.price) } : {}),
      ...("location" in payload ? { location: String(payload.location) } : {}),
      ...("address" in payload ? { address: String(payload.address) } : {}),
      ...("latitude" in payload ? { latitude: payload.latitude ? Number(payload.latitude) : null } : {}),
      ...("longitude" in payload ? { longitude: payload.longitude ? Number(payload.longitude) : null } : {}),
      ...("size" in payload ? { size: payload.size ? Number(payload.size) : null } : {}),
      ...("bedrooms" in payload ? { bedrooms: payload.bedrooms ? Number(payload.bedrooms) : null } : {}),
      ...("bathrooms" in payload ? { bathrooms: payload.bathrooms ? Number(payload.bathrooms) : null } : {}),
      ...("amenities" in payload ? { amenities: payload.amenities as string[] } : {}),
      ...("description" in payload ? { description: sanitizeInput(String(payload.description ?? "")) } : {}),
      ...("availabilityStatus" in payload ? { availabilityStatus: payload.availabilityStatus as AvailabilityStatus } : {}),
      ...("assignedAgentId" in payload
        ? {
            assignedAgent: payload.assignedAgentId
              ? { connect: { id: String(payload.assignedAgentId) } }
              : { disconnect: true }
          }
        : {})
    });
  }
};
