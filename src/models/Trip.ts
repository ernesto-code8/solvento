import { State } from "../enums/State";

export class Trip {
    id: number;
    departure: Date;
    state: State;
    truckId: number | null;

    constructor(id: number, departure: Date, state: State, truckId: number | null) {
        this.id = id;
        this.departure = departure;
        this.state = state;
        this.truckId = truckId;
    }
}
