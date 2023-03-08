"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const services_1 = require("@/domain/services");
const mercado_pago_1 = require("@/infra/providers/mercado-pago");
const repositories_1 = require("@/infra/repositories");
const makePaymentVerifyStatus = () => {
    const rifaRepository = new repositories_1.RifaRepository();
    const paymentIntentRepository = new repositories_1.PaymentIntentRepository();
    const mercadoPagoProvider = new mercado_pago_1.MercadoPagoProvider();
    const verifyPaymentStatus = new services_1.VerifyPaymentStatusService(rifaRepository, paymentIntentRepository, mercadoPagoProvider);
    return verifyPaymentStatus;
};
const setupRoutes = (app) => {
    app.get("/api/payment_pix", (req, res) => {
        makePaymentVerifyStatus().verify();
        return res.send(200);
    });
};
exports.setupRoutes = setupRoutes;
//# sourceMappingURL=routes.js.map