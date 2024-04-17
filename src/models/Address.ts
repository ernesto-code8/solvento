export class Address {
    id: number;
    address: string;
    city: string;
    zipCode: string;

    constructor(id: number, address: string, city: string, zipCode: string) {
        this.id = id;
        this.address = address;
        this.city = city;
        this.zipCode = zipCode;
    }
}
