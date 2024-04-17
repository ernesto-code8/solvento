export class PurchaseAddress {
    purchaseId: number;
    addressId: number;

    constructor(purchaseId: number, addressId: number) {
        this.purchaseId = purchaseId;
        this.addressId = addressId;
    }
}
