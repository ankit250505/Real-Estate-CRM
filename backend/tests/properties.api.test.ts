import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { propertyService } from "../src/modules/properties/property.service.js";

vi.mock("../src/middlewares/auth.js", () => ({
  authenticate: (req: any, _res: any, next: any) => {
    req.user = { userId: "user-1", email: "admin@example.com", role: "ADMIN" };
    next();
  }
}));

describe("GET /api/properties", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("returns properties", async () => {
    vi.spyOn(propertyService, "list").mockResolvedValue({
      data: [{ id: "prop-1", title: "Palm Residency" }],
      meta: { page: 1, limit: 10, total: 1 }
    } as never);

    const response = await request(createApp()).get("/api/properties");

    expect(response.status).toBe(200);
    expect(response.body.data[0].title).toBe("Palm Residency");
  });
});
