import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { leadService } from "../src/modules/leads/lead.service.js";

vi.mock("../src/middlewares/auth.js", () => ({
  authenticate: (req: any, _res: any, next: any) => {
    req.user = { userId: "user-1", email: "admin@example.com", role: "ADMIN" };
    next();
  }
}));

describe("GET /api/leads", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns paginated leads", async () => {
    vi.spyOn(leadService, "list").mockResolvedValue({
      data: [{ id: "lead-1", fullName: "John Doe" }],
      meta: { page: 1, limit: 10, total: 1 }
    });

    const response = await request(createApp()).get("/api/leads");

    expect(response.status).toBe(200);
    expect(response.body.meta.total).toBe(1);
  });
});
