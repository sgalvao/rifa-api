import { LoadWinners } from "@/domain/services";
import { WinnersRepository } from "@/infra/repositories";

const makeLoadWinners = () => {
  const winnersRepository = new WinnersRepository();
  const loadWinnersService = new LoadWinners(winnersRepository);
  return loadWinnersService;
};

export default {
  Query: {
    loadWinners: () => makeLoadWinners().load(),
  },
};
