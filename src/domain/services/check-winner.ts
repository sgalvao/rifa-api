import {
  PaymentIntentRepository,
  RifaRepository,
  UsersRepository,
} from "@/infra/repositories";

export class CheckWinnerService {
  constructor(
    private readonly paymentIntentRepository: PaymentIntentRepository,
    private readonly rifaRepository: RifaRepository,
    private readonly usersRepository: UsersRepository
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

    const user = await this.usersRepository.findById(payment.ownerId);

    return user;
  }
}
