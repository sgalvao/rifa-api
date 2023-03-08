import { LoadPaymentById } from "@/domain/services";
import { CreatePaymentService } from "@/domain/services/create-payment";
import { MercadoPagoProvider } from "@/infra/providers/mercado-pago";
import { RifaRepository, UsersRepository } from "@/infra/repositories";
import { PaymentIntentRepository } from "@/infra/repositories";

const makeCreatePayment = () => {
  const rifaRepository = new RifaRepository();
  const usersRepository = new UsersRepository();
  const paymentIntentRepository = new PaymentIntentRepository();
  const mercadoPagoProvider = new MercadoPagoProvider();
  const createPayment = new CreatePaymentService(
    rifaRepository,
    usersRepository,
    paymentIntentRepository,
    mercadoPagoProvider
  );

  return createPayment;
};

const makeLoadPaymentById = () => {
  const paymentIntentRepository = new PaymentIntentRepository();
  const loadPaymentById = new LoadPaymentById(paymentIntentRepository);
  return loadPaymentById;
};

export default {
  Mutation: {
    createPayment: (_, args, { userId }) => {
      return makeCreatePayment().create({ ...args, ownerId: userId });
    },
  },
  Query: {
    loadPaymentById: (_, { id }) => makeLoadPaymentById().load(id),
  },
};
