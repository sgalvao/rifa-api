import MercadoPago from "mercadopago";

export class MercadoPagoProvider {
  constructor() {}

  connect() {
    MercadoPago.configure({
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    });
    return MercadoPago;
  }
}
