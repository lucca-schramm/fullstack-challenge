import { Contact } from "./contact";

export class User {
    id!: number;
    senha!: string;
    name!: string;
    emails: string[];
    telefone: string[];
    contacts: Contact[];
    createdAt: Date;

    constructor() {
        this.emails = [];
        this.telefone = [];
        this.contacts = [];
        this.createdAt = new Date();
    }
}
