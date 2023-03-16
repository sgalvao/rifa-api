import { CreateRifaService, LoadRifaById, LoadRifas } from "@/domain/services";
import { CheckWinnerService } from "@/domain/services/check-winner";
import {
  PaymentIntentRepository,
  RifaRepository,
  UsersRepository,
  WinnersRepository,
} from "@/infra/repositories";

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

const makeCheckWinner = () => {
  const rifaRepository = new RifaRepository();
  const paymentIntentRepository = new PaymentIntentRepository();
  const usersRepository = new UsersRepository();
  const winnersRepository = new WinnersRepository();
  const checkWinner = new CheckWinnerService(
    paymentIntentRepository,
    rifaRepository,
    usersRepository,
    winnersRepository
  );
  return checkWinner;
};

export default {
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
    checkWinner: async (_, { rifaId, drawnNumber }) =>
      makeCheckWinner().check(rifaId, drawnNumber),
  },
};
