"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronProvider = void 0;
const services_1 = require("@/domain/services");
const mercado_pago_1 = require("@/infra/providers/mercado-pago");
const repositories_1 = require("@/infra/repositories");
const cron_1 = __importDefault(require("cron"));
const makePaymentVerifyStatus = () => {
    const rifaRepository = new repositories_1.RifaRepository();
    const paymentIntentRepository = new repositories_1.PaymentIntentRepository();
    const mercadoPagoProvider = new mercado_pago_1.MercadoPagoProvider();
    const verifyPaymentStatus = new services_1.VerifyPaymentStatusService(rifaRepository, paymentIntentRepository, mercadoPagoProvider);
    return verifyPaymentStatus;
};
const cronProvider = () => {
    const job = new cron_1.default("*/5 * * * *", makePaymentVerifyStatus().verify());
};
exports.cronProvider = cronProvider;
//# sourceMappingURL=cron-config.js.map