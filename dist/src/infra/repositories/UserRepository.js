"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const prisma_client_1 = require("@/config/prisma-client");
class UsersRepository {
    async create(params) {
        const user = await prisma_client_1.prisma.user.create({
            data: {
                email: params.email,
                name: params.name,
                phone: params.phone,
            },
        });
        return user;
    }
    async findByEmail(email) {
        const user = await prisma_client_1.prisma.user.findFirst({
            where: {
                email,
            },
        });
        return user;
    }
    async findByPhone(phone) {
        const user = await prisma_client_1.prisma.user.findFirst({
            where: {
                phone,
            },
        });
        return user;
    }
    async findById(id) {
        const user = await prisma_client_1.prisma.user.findUnique({
            where: { id },
        });
        return user;
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=UserRepository.js.map