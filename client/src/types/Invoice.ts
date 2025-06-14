export type Invoice = {
    itemType: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
    price:number
    createdAt:Date;
    paymentDate:Date;
}
