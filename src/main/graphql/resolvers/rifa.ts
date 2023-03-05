import { CreateRifaService, LoadRifaById, LoadRifas } from "@/domain/services";
import { RifaRepository } from "@/infra/repositories";

const makeCreateRifa = () => {
  const rifaRepository = new RifaRepository();
  const createRifaservice = new CreateRifaService(rifaRepository);

  return createRifaservice;
};

const makeLoadRifa = () => {
  const rifaRepository = new RifaRepository();
  const loadRifaById = new LoadRifaById(rifaRepository);
  return loadRifaById;
};

const makeLoadRifas = () => {
  const rifaRepository = new RifaRepository();
  const loadRifas = new LoadRifas(rifaRepository);
  return loadRifas;
};

export default {
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
