import { DeliverOperation } from '../delivery-operation.model';

export interface DeliveryListDto {
    id: number;
    deliveryAddressId: number;
    deliveryAddressName: string;
    sourceLocationId: number;
    sourceLocationName: string;
    contactId: number;
    contactName: string;
    responsibleId: number;
    responsibleName: string;
    scheduledDate: Date;
    deliveryStatus: string;
}
  