export type CharityCampaign = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    goalAmount: number;
    raisedAmount: number;
    minimumAmount:number;
  }

  
  // Props interface
  export interface CharityCampaignProps {
    campaigns: CharityCampaign[];
  }