import { VerifyPaymentStatusService } from "@/domain/services";
import { MercadoPagoProvider } from "@/infra/providers/mercado-pago";
import { PaymentIntentRepository, RifaRepository } from "@/infra/repositories";
import cron from "cron";
const makePaymentVerifyStatus = () => {
  const rifaRepository = new RifaRepository();
  const paymentIntentRepository = new PaymentIntentRepository();
  const mercadoPagoProvider = new MercadoPagoProvider();
  const verifyPaymentStatus = new VerifyPaymentStatusService(
    rifaRepository,
    paymentIntentRepository,
    mercadoPagoProvider
  );

  return verifyPaymentStatus;
};

export const cronProvider = () => {
  const job = new cron("*/5 * * * *", makePaymentVerifyStatus().verify());
};
