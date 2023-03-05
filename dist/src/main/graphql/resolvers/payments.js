"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_payment_1 = require("@/domain/services/create-payment");
const mercado_pago_1 = require("@/infra/providers/mercado-pago");
const repositories_1 = require("@/infra/repositories");
const repositories_2 = require("@/infra/repositories");
const makeCreatePayment = () => {
    const rifaRepository = new repositories_1.RifaRepository();
    const usersRepository = new repositories_1.UsersRepository();
    const paymentIntentRepository = new repositories_2.PaymentIntentRepository();
    const mercadoPagoProvider = new mercado_pago_1.MercadoPagoProvider();
    const createPayment = new create_payment_1.CreatePaymentService(rifaRepository, usersRepository, paymentIntentRepository, mercadoPagoProvider);
    return createPayment;
};
exports.default = {
    Mutation: {
        createPayment: (_, args, { userId }) => {
            console.log("🚀 ~ file: payments.ts:20 ~ userId:", args);
            return makeCreatePayment().create({ ...args, ownerId: userId });
        },
    },
};
//# sourceMappingURL=payments.js.map