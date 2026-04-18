import { hashPassword } from "../../utils/password.js";
import { userRepository } from "./user.repository.js";

export const userService = {
  list() {
    return userRepository.findMany();
  },
  async create(payload: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
    role: "ADMIN" | "MANAGER" | "AGENT";
  }) {
    return userRepository.create({
      ...payload,
      password: await hashPassword(payload.password)
    });
  }
};
