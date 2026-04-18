export type Role = "ADMIN" | "MANAGER" | "AGENT";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email?: string | null;
  source: string;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED" | "LOST";
  preferredLocation?: string | null;
  followUpDate?: string | null;
  assignedAgent?: { firstName: string; lastName: string } | null;
}

export interface Property {
  id: string;
  title: string;
  type: "RESIDENTIAL" | "COMMERCIAL";
  purpose: "SALE" | "RENT";
  price: number;
  location: string;
  availabilityStatus: "AVAILABLE" | "RESERVED" | "SOLD" | "RENTED";
  bedrooms?: number | null;
  bathrooms?: number | null;
  images?: { url: string }[];
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  type: "BUYER" | "SELLER";
}

export interface Deal {
  id: string;
  stage: "INQUIRY" | "NEGOTIATION" | "AGREEMENT" | "CLOSED";
  dealValue: number;
  commissionAmount: number;
  client: { name: string };
  property: { title: string };
  agent: { firstName: string; lastName: string };
}
