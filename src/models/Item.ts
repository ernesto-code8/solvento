export class Item {
    id: number;
    name: string;
    price: number;
    weight: number;
    purchaseId: number;

    constructor(id: number, name: string, price: number, weight: number, purchaseId: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.weight = weight;
        this.purchaseId = purchaseId;
    }
}
