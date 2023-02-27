import { NumberRepository, RifaRepository } from "@/infra/repositories";
import { PaymentIntentRepository } from "@/infra/repositories/PaymentIntentRepository";

export class CreatePaymentService {
  constructor(
    private readonly rifaRepository: RifaRepository,
    private readonly paymentIntentRepository: PaymentIntentRepository,
    private readonly numberRepository: NumberRepository
  ) {}

  async create(params) {}
}
