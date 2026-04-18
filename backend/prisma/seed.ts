import { PrismaClient, Role, LeadStatus, PropertyCategory, PropertyPurpose, AvailabilityStatus, ClientType, DealStage, ActivityType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@realestatecrm.local" },
    update: {},
    create: {
      firstName: "System",
      lastName: "Admin",
      email: "admin@realestatecrm.local",
      phone: "+919999999999",
      password,
      role: Role.ADMIN
    }
  });

  const manager = await prisma.user.upsert({
    where: { email: "manager@realestatecrm.local" },
    update: {},
    create: {
      firstName: "Maya",
      lastName: "Manager",
      email: "manager@realestatecrm.local",
      phone: "+919999999998",
      password,
      role: Role.MANAGER
    }
  });

  const agent = await prisma.user.upsert({
    where: { email: "agent@realestatecrm.local" },
    update: {},
    create: {
      firstName: "Arjun",
      lastName: "Agent",
      email: "agent@realestatecrm.local",
      phone: "+919999999997",
      password,
      role: Role.AGENT
    }
  });

  const property = await prisma.property.create({
    data: {
      title: "Palm Residency Penthouse",
      type: PropertyCategory.RESIDENTIAL,
      purpose: PropertyPurpose.SALE,
      price: 25000000,
      location: "Gurugram",
      address: "Sector 54, Golf Course Road",
      latitude: 28.4392,
      longitude: 77.1015,
      size: 3200,
      bedrooms: 4,
      bathrooms: 4,
      amenities: ["Pool", "Gym", "Clubhouse", "Parking"],
      description: "Luxury penthouse with city views.",
      availabilityStatus: AvailabilityStatus.AVAILABLE,
      assignedAgentId: agent.id,
      images: {
        create: [
          { url: "/uploads/sample-property-1.jpg", altText: "Front elevation" },
          { url: "/uploads/sample-property-2.jpg", altText: "Living room" }
        ]
      }
    }
  });

  const lead = await prisma.lead.create({
    data: {
      fullName: "Rohan Malhotra",
      phone: "+918888888888",
      email: "rohan@example.com",
      source: "Website",
      budgetMin: 18000000,
      budgetMax: 26000000,
      preferredLocation: "Gurugram",
      propertyType: "Penthouse",
      notes: "Interested in premium gated societies.",
      status: LeadStatus.QUALIFIED,
      followUpDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      assignedAgentId: agent.id,
      activities: {
        create: [
          {
            type: ActivityType.CALL,
            title: "Intro call completed",
            description: "Discussed budget and preferred possession timeline."
          }
        ]
      }
    }
  });

  const client = await prisma.client.create({
    data: {
      name: "Rohan Malhotra",
      phone: "+918888888888",
      email: "rohan@example.com",
      type: ClientType.BUYER,
      preferences: "Luxury 4 BHK with premium amenities",
      budget: 24000000,
      linkedLeadId: lead.id,
      visitedProps: {
        connect: [{ id: property.id }]
      },
      interactions: {
        create: [
          {
            type: ActivityType.MEETING,
            title: "Site visit",
            description: "Visited Palm Residency with spouse."
          }
        ]
      }
    }
  });

  await prisma.deal.create({
    data: {
      clientId: client.id,
      propertyId: property.id,
      agentId: agent.id,
      dealValue: 23800000,
      commissionPercent: 2,
      commissionAmount: 476000,
      stage: DealStage.NEGOTIATION,
      expectedCloseDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      notes: "Negotiation underway with final price expected this week."
    }
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: agent.id,
        title: "Follow-up due tomorrow",
        message: "Call Rohan Malhotra to confirm second visit."
      },
      {
        userId: manager.id,
        title: "Negotiation update",
        message: "Palm Residency deal moved to negotiation."
      }
    ]
  });

  await prisma.task.createMany({
    data: [
      {
        assigneeId: agent.id,
        title: "Collect KYC documents",
        description: "Buyer documents required before agreement."
      },
      {
        assigneeId: agent.id,
        title: "Schedule weekend site visit",
        description: "Coordinate with seller and client."
      }
    ]
  });

  console.log(`Seeded users: ${admin.email}, ${manager.email}, ${agent.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
