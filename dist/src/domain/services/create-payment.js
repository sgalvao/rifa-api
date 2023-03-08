"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentService = void 0;
const date_fns_1 = require("date-fns");
class CreatePaymentService {
    constructor(rifaRepository, userRepository, paymentIntentRepository, mercadoPagoProvider) {
        this.rifaRepository = rifaRepository;
        this.userRepository = userRepository;
        this.paymentIntentRepository = paymentIntentRepository;
        this.mercadoPagoProvider = mercadoPagoProvider;
    }
    async create(params) {
        const list = [];
        const rifa = await this.rifaRepository.loadById(params.rifaId);
        const user = await this.userRepository.findById(params.ownerId);
        for (let i = 0; i < params.quantity; i++) {
            const number = Math.floor(Math.random() * 99999) + 1;
            const isSold = await this.rifaRepository.verifyNumber(number, params.rifaId);
            if (!isSold) {
                list.push(number);
            }
            else {
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
            date_of_expiration: (0, date_fns_1.addMinutes)(Date.now(), 1).toISOString(),
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
        });
        await this.rifaRepository.addSoldNumber(params.rifaId, list);
        return paymentIntent;
    }
}
exports.CreatePaymentService = CreatePaymentService;
//# sourceMappingURL=create-payment.js.map