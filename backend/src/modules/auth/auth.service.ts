import { ApiError } from "../../utils/api-error.js";
import { comparePassword } from "../../utils/password.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../utils/jwt.js";
import { authRepository } from "./auth.repository.js";

export const authService = {
  async login(email: string, password: string) {
    const user = await authRepository.findByEmail(email);

    if (!user || !(await comparePassword(password, user.password))) {
      throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isActive) {
      throw new ApiError(403, "User account is inactive");
    }

    await authRepository.updateLastLogin(user.id);

    const payload = { userId: user.id, role: user.role, email: user.email };

    return {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload),
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    };
  },

  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    const user = await authRepository.findById(payload.userId);

    if (!user || !user.isActive) {
      throw new ApiError(401, "Invalid refresh token");
    }

    return {
      accessToken: signAccessToken({ userId: user.id, role: user.role, email: user.email }),
      refreshToken: signRefreshToken({ userId: user.id, role: user.role, email: user.email })
    };
  }
};
