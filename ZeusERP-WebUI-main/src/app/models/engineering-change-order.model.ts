import { EcoStage } from "./enums/eco-stage.enum";

export interface EngineeringChangeOrder {
    id?: number;
    summary: string;
    responsibleId: string;
    applyOn: boolean;
    productId: number;
    effectivity: boolean;
    effectivityDate?: Date;
    ecoTagsId?: number;
    note: string;
    approverId: string;
    ecoStage: EcoStage;
}