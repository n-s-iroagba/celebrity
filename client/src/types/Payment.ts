export type Payment = {
    itemType: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
    price:number
    date:Date
}