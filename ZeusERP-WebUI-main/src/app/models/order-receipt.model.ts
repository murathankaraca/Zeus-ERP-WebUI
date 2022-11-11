export interface OrderReceipt {
  id?: number;
  reference: string;
  receiveFromId: number;
  scheduledDate: Date;
  receiptOperationsId: number;
}
