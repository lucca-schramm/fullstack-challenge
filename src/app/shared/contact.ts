export class Contact {
    id!: number;
    name!: string;
    emails: string[];
    telefone: string[];

    constructor() {
        this.emails = [];
        this.telefone = [];
    }
}