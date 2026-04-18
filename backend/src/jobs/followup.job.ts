import nodemailer from "nodemailer";
import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined
});

export async function runFollowUpReminderJob() {
  const upcoming = await prisma.lead.findMany({
    where: {
      deletedAt: null,
      followUpDate: {
        lte: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      assignedAgentId: { not: null }
    },
    include: { assignedAgent: true }
  });

  for (const lead of upcoming) {
    if (!lead.assignedAgent?.email) continue;

    await prisma.notification.create({
      data: {
        userId: lead.assignedAgent.id,
        title: "Lead follow-up reminder",
        message: `Follow up with ${lead.fullName} for ${lead.source}.`
      }
    });

    await transporter.sendMail({
      from: env.SMTP_FROM,
      to: lead.assignedAgent.email,
      subject: `Follow-up reminder: ${lead.fullName}`,
      text: `A follow-up is pending for lead ${lead.fullName}.`
    });
  }
}
