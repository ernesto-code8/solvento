import { WorkDays } from "../enums/WorkDays";

export class Truck {
    id: number;
    plateNumber: string;
    maxWeightCapacity: number;
    workDays: WorkDays;

    constructor(id: number, plateNumber: string, maxWeightCapacity: number, workDays: WorkDays) {
        this.id = id;
        this.plateNumber = plateNumber;
        this.maxWeightCapacity = maxWeightCapacity;
        this.workDays = workDays;
    }
}
