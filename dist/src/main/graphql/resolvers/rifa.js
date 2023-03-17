"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/domain/services");
const check_winner_1 = require("@/domain/services/check-winner");
const repositories_1 = require("@/infra/repositories");
const makeCreateRifa = () => {
    const rifaRepository = new repositories_1.RifaRepository();
    const createRifaservice = new services_1.CreateRifaService(rifaRepository);
    return createRifaservice;
};
const makeLoadRifa = () => {
    const rifaRepository = new repositories_1.RifaRepository();
    const loadRifaById = new services_1.LoadRifaById(rifaRepository);
    return loadRifaById;
};
const makeLoadRifas = () => {
    const rifaRepository = new repositories_1.RifaRepository();
    const loadRifas = new services_1.LoadRifas(rifaRepository);
    return loadRifas;
};
const makeCheckWinner = () => {
    const rifaRepository = new repositories_1.RifaRepository();
    const paymentIntentRepository = new repositories_1.PaymentIntentRepository();
    const usersRepository = new repositories_1.UsersRepository();
    const winnersRepository = new repositories_1.WinnersRepository();
    const checkWinner = new check_winner_1.CheckWinnerService(paymentIntentRepository, rifaRepository, usersRepository, winnersRepository);
    return checkWinner;
};
exports.default = {
    Mutation: {
        createRifa: async (_, args) => {
            return makeCreateRifa().create({ ...args });
        },
    },
    Query: {
        loadRifa: async (_, { rifaId }) => {
            return makeLoadRifa().load(rifaId);
        },
        loadRifas: async () => makeLoadRifas().load(),
        checkWinner: async (_, { rifaId, drawnNumber }) => makeCheckWinner().check(rifaId, drawnNumber),
    },
};
//# sourceMappingURL=rifa.js.map