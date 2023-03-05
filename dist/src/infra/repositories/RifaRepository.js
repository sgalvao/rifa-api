"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RifaRepository = void 0;
const prisma_client_1 = require("@/config/prisma-client");
class RifaRepository {
    constructor() { }
    async create(params) {
        const rifa = await prisma_client_1.prisma.rifa.create({
            data: {
                name: params.name,
                authorId: params.authorId,
                price: params.price,
                image: params.image,
                status: "OPEN",
                winnerNumber: null,
                participants: 0,
            },
        });
        return rifa;
    }
    async loadById(id) {
        const rifa = await prisma_client_1.prisma.rifa.findUnique({ where: { id } });
        return rifa;
    }
    async loadAll() {
        const rifas = await prisma_client_1.prisma.rifa.findMany();
        return rifas;
    }
    async delete() { }
    async update() { }
    async finish(params) {
        const rifa = await prisma_client_1.prisma.rifa.update({
            where: { id: params.id },
            data: {
                status: "CLOSED",
                winnerNumber: params.winnerNumber,
            },
        });
        return rifa;
    }
    async verifyNumber(num, id) {
        const rifa = await prisma_client_1.prisma.rifa.findFirst({
            where: { id },
            select: { soldNumbers: true },
        });
        if (rifa.soldNumbers) {
            return Boolean(rifa.soldNumbers.find((el) => el === num));
        }
        return false;
    }
    async addSoldNumber(rifaId, numbers) {
        const soldNumbers = await prisma_client_1.prisma.rifa.findUnique({
            where: { id: rifaId },
        });
        const newNumbers = soldNumbers.soldNumbers.concat(numbers);
        console.log(newNumbers);
        return await prisma_client_1.prisma.rifa.update({
            where: { id: rifaId },
            data: {
                soldNumbers: newNumbers,
            },
        });
    }
}
exports.RifaRepository = RifaRepository;
//# sourceMappingURL=RifaRepository.js.map