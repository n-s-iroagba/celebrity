type Celebrity = {
    id: number;
    name: string;
    image: string;
  };
  
  type Campaign = {
    title: string;
    description: string;
    minDonation: number;
    currentAmount: number;
    goalAmount: number;
  };
  
export  type CampaignWithCelebrity = {
    celebrity: Celebrity;
    campaign: Campaign;
  };
  