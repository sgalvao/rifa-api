import {
  PaymentIntentRepository,
  RifaRepository,
  UsersRepository,
  WinnersRepository,
} from "@/infra/repositories";

export class CheckWinnerService {
  constructor(
    private readonly paymentIntentRepository: PaymentIntentRepository,
    private readonly rifaRepository: RifaRepository,
    private readonly usersRepository: UsersRepository,
    private readonly winnersRepository: WinnersRepository
  ) {}

  async check(rifaId: string, drawnNumber: number) {
    const isSold = await this.rifaRepository.verifyNumber(drawnNumber, rifaId);

    if (!isSold) {
      throw new Error("Número não foi vendido");
    }

    const payment = await this.paymentIntentRepository.verifyWinner(
      rifaId,
      drawnNumber
    );

    if (!payment) {
      throw new Error("Numero não foi pago!");
    }

    const user = await this.usersRepository.findById(payment.ownerId);

    const rifaWinner = await this.rifaRepository.finish({
      rifaId,
      drawnNumber,
      winnerId: user.id,
      winnerName: user.name,
    });

    const winnerParams = {
      rifaId: rifaWinner.id,
      rifaImage: rifaWinner.image,
      winnerId: rifaWinner.winnerId,
      winnerName: rifaWinner.winnerName,
      winnerNumber: rifaWinner.winnerNumber,
    };

    const createWinner = await this.winnersRepository.create(winnerParams);

    return {
      winnerName: createWinner.winnerName,
      winnerDate: createWinner.createdAt,
      rifaImage: createWinner.rifaImage,
      rifaName: createWinner.rifaName,
    };
  }
}

export namespace CheckWinnerService {
  export type Params = {
    rifaId: string;
    drawnNumber: number;
    winnerName: string;
    winnerId: string;
  };
}
