import { PaymentIntentRepository, RifaRepository } from "@/infra/repositories";

export class LoadPurchasedNumbers {
  constructor(
    private readonly paymentIntentRepository: PaymentIntentRepository,
    private readonly rifaRepository: RifaRepository
  ) {}

  async load(userId: string) {
    const purchased = await this.paymentIntentRepository.loadByOwnerId(userId);

    let purchasedNumbers = [];

    for (let i = 0; i < purchased.length; i++) {
      const rifa = await this.rifaRepository.loadById(purchased[i].rifaId);

      purchasedNumbers.push({
        numbers: purchased[i].numbers,
        rifaId: purchased[i].rifaId,
        name: rifa.name,
        status: rifa.status,
        image: rifa.image,
      });
    }

    return purchasedNumbers;
  }
}
