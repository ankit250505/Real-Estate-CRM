import { describe, expect, it, vi } from "vitest";
import { authService } from "../src/modules/auth/auth.service.js";
import { authRepository } from "../src/modules/auth/auth.repository.js";
import * as password from "../src/utils/password.js";

describe("authService.login", () => {
  it("returns tokens when credentials are valid", async () => {
    vi.spyOn(authRepository, "findByEmail").mockResolvedValue({
      id: "user-1",
      firstName: "A",
      lastName: "B",
      email: "admin@example.com",
      phone: null,
      password: "hashed",
      role: "ADMIN",
      isActive: true,
      avatarUrl: null,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    } as never);
    vi.spyOn(authRepository, "updateLastLogin").mockResolvedValue({} as never);
    vi.spyOn(password, "comparePassword").mockResolvedValue(true);

    const result = await authService.login("admin@example.com", "password123");

    expect(result.accessToken).toBeTruthy();
    expect(result.refreshToken).toBeTruthy();
    expect(result.user.email).toBe("admin@example.com");
  });
});
