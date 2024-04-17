import { Item } from "./Item";

export class Purchase {
    id: number;
    customerName: string;
    price: number;
    weight: number;
    deliveryDate: Date;
    tripId: number;
    items: Item[];  // Añadido para almacenar los items relacionados

    constructor(id: number, customerName: string, price: number, weight: number, deliveryDate: Date, tripId: number, items: Item[] = []) {
        this.id = id;
        this.customerName = customerName;
        this.price = price;
        this.weight = weight;
        this.deliveryDate = deliveryDate;
        this.tripId = tripId;
        this.items = items;
    }

    getTotalPrice(): number {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    getTotalWeight(): number {
        return this.items.reduce((total, item) => total + item.weight, 0);
    }
}
