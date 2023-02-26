"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleRepository = void 0;
const prisma_client_1 = require("@/config/prisma-client");
class RuleRepository {
    async create(params) {
        const rule = await prisma_client_1.prisma.rules.create({
            data: {
                name: params.name,
                description: params.description,
                authorId: params.authorId,
            },
            include: {
                author: true,
            },
        });
        return rule;
    }
    async findAll() {
        const rules = await prisma_client_1.prisma.rules.findMany({
            include: {
                author: true,
            },
        });
        return rules;
    }
}
exports.RuleRepository = RuleRepository;
//# sourceMappingURL=RuleRepository.js.map