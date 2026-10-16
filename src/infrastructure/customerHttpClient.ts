import { type Customer } from "../domain/customer.ts";

export class CustomerHttpClient {
    private baseUrl: string
    constructor( baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async listCustomer(): Promise<Customer[]> {
        const res = await fetch(`${this.baseUrl}/customers`)
        return res.json() as Promise<Customer[]>
    }
}