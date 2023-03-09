import { MercadoPagoProvider } from "@/infra/providers/mercado-pago";
import { PaymentIntentRepository, RifaRepository } from "@/infra/repositories";

export class VerifyPaymentStatusService {
  constructor(
    private readonly rifaRepository: RifaRepository,
    private readonly paymentIntentRepository: PaymentIntentRepository,
    private readonly mercadoPagoProvider: MercadoPagoProvider
  ) {}

  async verify() {
    const paymentIntent = await this.paymentIntentRepository.verify();
    const mercadoPago = this.mercadoPagoProvider.connect();

    if (!paymentIntent) return;

    for (let i = 0; i < paymentIntent.length; i++) {
      const result = await mercadoPago.payment.get(
        parseInt(paymentIntent[i].transactionId)
      );

      const isExpired = Boolean(
        new Date(result.body.date_of_expiration) < new Date()
      );

      if (result.body.status === "pending" && isExpired) {
        console.log("expirou");
        const soldNumbers = await this.rifaRepository.loadById(
          paymentIntent[i].rifaId
        );
        const removedNumbers = soldNumbers.soldNumbers.filter(
          (num) => !paymentIntent[i].numbers.includes(num)
        );
        this.rifaRepository.removeNumbers(
          paymentIntent[i].rifaId,
          removedNumbers
        );

        return this.paymentIntentRepository.updateStatus(
          paymentIntent[i].id,
          "expired"
        );
      }

      if (result.body.status === "approved") {
        console.log("approved");
        return this.paymentIntentRepository.updateStatus(
          paymentIntent[i].id,
          "approved"
        );
      }
    }
  }
}
