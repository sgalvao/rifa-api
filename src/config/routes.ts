import { VerifyPaymentStatusService } from "@/domain/services";
import { MercadoPagoProvider } from "@/infra/providers/mercado-pago";
import { PaymentIntentRepository, RifaRepository } from "@/infra/repositories";
import { Express } from "express";

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

export const setupRoutes = (app: Express): void => {
  app.get("/api/payment_pix", (req, res) => {
    makePaymentVerifyStatus().verify();
    return res.send(200);
  });
};
