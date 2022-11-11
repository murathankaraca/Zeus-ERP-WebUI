import { EcoStage } from "../enums/eco-stage.enum";

export interface EcoDetailsDto {
    id?: number;
    summary: string;
    responsibleId: string;
    responsibleName: string;
    applyOn: boolean;
    productId: number;
    productName: string;
    effectivity: boolean;
    effectivityDate?: Date;
    ecoTagsId?: number;
    note: string;
    approverId: string;
    approverName: string;
    ecoStage: EcoStage;
}