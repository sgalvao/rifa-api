import { MercadoPagoProvider } from "@/infra/providers/mercado-pago";
import { RifaRepository, UsersRepository } from "@/infra/repositories";
import { PaymentIntentRepository } from "@/infra/repositories/PaymentIntentRepository";
import { PaymentIntent } from "../entities";
import { addMinutes } from "date-fns";
export class CreatePaymentService {
  constructor(
    private readonly rifaRepository: RifaRepository,
    private readonly userRepository: UsersRepository,
    private readonly paymentIntentRepository: PaymentIntentRepository,
    private readonly mercadoPagoProvider: MercadoPagoProvider
  ) {}

  async create(
    params: CreatePaymentService.Params
  ): Promise<CreatePaymentService.Result> {
    const list = [];
    console.time("create payment service");

    const rifa = await this.rifaRepository.loadById(params.rifaId);
    const user = await this.userRepository.findById(params.ownerId);

    if (rifa.isFinished) {
      throw new Error("Ação ja foi finalizada!");
    }

    for (let i = 0; i < params.quantity; i++) {
      const number = Math.floor(Math.random() * 99999) + 1;
      const isSold = await this.rifaRepository.verifyNumber(
        number,
        params.rifaId
      );

      if (!isSold) {
        list.push(number);
      } else {
        i--;
      }
    }

    const mercadoPago = await this.mercadoPagoProvider
      .connect()
      .payment.create({
        transaction_amount: params.quantity * rifa.price,
        description: "E-Book Premios",
        payment_method_id: "pix",
        installments: 1,
        date_of_expiration: addMinutes(Date.now(), 10).toISOString(),
        payer: {
          email: user.email,
          first_name: user.name,
        },
      });

    const paymentIntent = await this.paymentIntentRepository.create({
      transactionId: mercadoPago.response.id.toString(),
      numbers: list,
      ownerId: params.ownerId,
      rifaId: params.rifaId,
      quantity: params.quantity,
      copyPasteCode:
        mercadoPago.body.point_of_interaction.transaction_data.qr_code,
      qrCode: mercadoPago.body.point_of_interaction.transaction_data.qr_code,
      totalValue: params.quantity * rifa.price,
      value: rifa.price,
    });

    await this.rifaRepository.addSoldNumber(params.rifaId, list);
    console.timeEnd("create payment service");

    return paymentIntent;
  }
}

export namespace CreatePaymentService {
  export type Params = {
    ownerId: string;
    quantity: number;
    rifaId: string;
    qrCode: string;
    copyPasteCode: string;
    totalValue: number;
    value: number;
  };

  export type Result = PaymentIntent;
}
