export type Reservation={
    id: number;
    date:Date,
    address:string
    reservationOptionss:ReservationOption[]
}

enum ReservatioonOptionTypes{
HOTEL = 'HOTEL',
RESTAURANT = 'RESTAURANT',

}

type ReservationOption ={
    id: number;
    type:ReservatioonOptionTypes;
    price:string;
}