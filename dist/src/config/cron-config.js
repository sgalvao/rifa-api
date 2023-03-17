"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronProvider = void 0;
const services_1 = require("@/domain/services");
const mercado_pago_1 = require("@/infra/providers/mercado-pago");
const repositories_1 = require("@/infra/repositories");
const cron_1 = require("cron");
const makePaymentVerifyStatus = () => {
    const rifaRepository = new repositories_1.RifaRepository();
    const paymentIntentRepository = new repositories_1.PaymentIntentRepository();
    const mercadoPagoProvider = new mercado_pago_1.MercadoPagoProvider();
    const verifyPaymentStatus = new services_1.VerifyPaymentStatusService(rifaRepository, paymentIntentRepository, mercadoPagoProvider);
    return verifyPaymentStatus;
};
const cronProvider = () => {
    console.log("Verificando Status");
    const job = new cron_1.CronJob("*/2 * * * *", makePaymentVerifyStatus().verify());
    return job;
};
exports.cronProvider = cronProvider;
//# sourceMappingURL=cron-config.js.map