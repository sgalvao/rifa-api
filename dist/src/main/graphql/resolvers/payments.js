"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/domain/services");
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
const makeLoadPaymentById = () => {
    const paymentIntentRepository = new repositories_2.PaymentIntentRepository();
    const loadPaymentById = new services_1.LoadPaymentById(paymentIntentRepository);
    return loadPaymentById;
};
const makeLoadPurchasedNumbers = () => {
    const paymentIntentRepository = new repositories_2.PaymentIntentRepository();
    const rifaRepository = new repositories_1.RifaRepository();
    const loadPurchasedNumbers = new services_1.LoadPurchasedNumbers(paymentIntentRepository, rifaRepository);
    return loadPurchasedNumbers;
};
exports.default = {
    Mutation: {
        createPayment: (_, args, { userId }) => {
            return makeCreatePayment().create({ ...args, ownerId: userId });
        },
    },
    Query: {
        loadPaymentById: (_, { id }) => makeLoadPaymentById().load(id),
        loadPurchasedNumbers: (_, args, { userId }) => makeLoadPurchasedNumbers().load(userId),
    },
};
//# sourceMappingURL=payments.js.map