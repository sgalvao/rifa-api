"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoProvider = void 0;
const mercadopago_1 = __importDefault(require("mercadopago"));
class MercadoPagoProvider {
    constructor() { }
    connect() {
        mercadopago_1.default.configure({
            access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
        });
        return mercadopago_1.default;
    }
}
exports.MercadoPagoProvider = MercadoPagoProvider;
//# sourceMappingURL=mercado-pago.js.map