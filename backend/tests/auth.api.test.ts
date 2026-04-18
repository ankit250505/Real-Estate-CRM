import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { authService } from "../src/modules/auth/auth.service.js";

describe("POST /api/auth/login", () => {
  it("returns tokens", async () => {
    vi.spyOn(authService, "login").mockResolvedValue({
      accessToken: "access-token",
      refreshToken: "refresh-token",
      user: {
        id: "user-1",
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        role: "ADMIN"
      }
    });

    const response = await request(createApp()).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "password123"
    });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBe("access-token");
  });
});
