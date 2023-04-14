import { prisma } from "@/config/prisma-client";

export class AdminRepository {
  async findByEmail(email: string) {
    const admin = await prisma.admin.findUnique({ where: { email } });

    return admin;
  }
}
