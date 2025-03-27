
export interface PaidClubMembership {
    id: number;
    membership:{
      tier:string;
      isHighesTier?:boolean
      dateOfSubscription:string;
    }
    perks:string[
    ]
    price:number
    
  }