export interface OrderTransfer {
  id?: number;
  reference: string;
  fromLocationId: number;
  toLocationId: number;
  contactId: number;
  scheduledDate: Date,
  deadline?: Date;
  status: number;
  responsibleId?: number;
  operationTypeId?: number;
}
