"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberRepository = void 0;
const prisma_client_1 = require("@/config/prisma-client");
class NumberRepository {
    constructor() { }
    async addNumber(params) {
        const number = await prisma_client_1.prisma.numbers.create({
            data: {
                number: params.number,
                ownerId: params.ownerId,
                rifaId: params.rifaId,
            },
        });
        return number;
    }
    async findByRifaId(rifaId) {
        const number = await prisma_client_1.prisma.numbers.findUnique({ where: { id: rifaId } });
        return number;
    }
}
exports.NumberRepository = NumberRepository;
//# sourceMappingURL=NumberRepository.js.map