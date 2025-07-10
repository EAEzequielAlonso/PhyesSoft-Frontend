export interface Client {
    id: string;
    client: string;
    name: string;
    movil: string;
    phone: string;
    email: string;
    address: string;
    state: string;
    city: string;
    zip: string;
    discount: number;
    cuit: string;
    dni: string;
    condicionIvaId: string; // exento, monotributista, Responsable inscripto, consumidor final
    ticketType: string; // A, B, C
    razonSocial: string;
}