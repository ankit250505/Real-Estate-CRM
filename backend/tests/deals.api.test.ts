import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { dealService } from "../src/modules/deals/deal.service.js";

vi.mock("../src/middlewares/auth.js", () => ({
  authenticate: (req: any, _res: any, next: any) => {
    req.user = { userId: "user-1", email: "admin@example.com", role: "ADMIN" };
    next();
  }
}));

describe("GET /api/deals", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("returns deals", async () => {
    vi.spyOn(dealService, "list").mockResolvedValue([
      {
        id: "deal-1",
        stage: "NEGOTIATION",
        client: { name: "Buyer One" },
        property: { title: "Skyline Towers" },
        agent: { firstName: "Maya", lastName: "Manager" },
        dealValue: 1000000,
        commissionAmount: 20000
      }
    ] as never);

    const response = await request(createApp()).get("/api/deals");

    expect(response.status).toBe(200);
    expect(response.body.data[0].stage).toBe("NEGOTIATION");
  });
});
