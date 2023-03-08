"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/domain/services");
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
exports.default = {
    Mutation: {
        createRifa: async (_, args) => {
            console.log(args);
            return makeCreateRifa().create({ ...args });
        },
    },
    Query: {
        loadRifa: async (_, { rifaId }) => {
            return makeLoadRifa().load(rifaId);
        },
        loadRifas: async () => makeLoadRifas().load(),
    },
};
//# sourceMappingURL=rifa.js.map