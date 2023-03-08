export type PaymentIntent = {
  ownerId: string;
  numbers: number[];
  quantity: number;
  transactionId: string;
  rifaId: string;
  value: number;
  totalValue: number;
  qrCode: string;
  copyPasteCode: string;
};
