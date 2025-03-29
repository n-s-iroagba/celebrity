export type Charity = {
    id?: number;
    title: string;
    description: string;
    image: string;
    goalAmount: number;
    raisedAmount: number;
    minimumAmount:number;
  }

  
  // Props interface
  export interface CharityProps {
    campaigns:Charity[];
    name:string;
  }