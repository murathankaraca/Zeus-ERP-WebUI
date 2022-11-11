import { DeliverOperation } from '../delivery-operation.model';

export interface DeliveryDetailsDto {
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
    deliveryOperations: Array<DeliverOperation>;
}