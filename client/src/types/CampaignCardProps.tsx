export default interface CampaignCardProps {
    celebrity: {
      name: string;
      image: string;
    };
    campaign: {
      title: string;
      description: string;
      minDonation: number;
      currentAmount: number;
      goalAmount: number;
    };
  }