export interface TransferDetailsDto {
    id?: number;
    fromLocationId: number;
    fromLocationName: string;
    toLocationId: number;
    toLocationName: string;
    contactId: number;
    contactName: number;
    scheduledDate: Date;
    transferStatus: TransferStatus;
    responsibleId?: number;
    operationTypeId?: number;
}

enum TransferStatus {
    DRAFT = 0,
    WAITING = 1,
    READY = 2,
    DONE = 3,
}