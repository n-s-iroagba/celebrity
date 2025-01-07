export interface CelebrityCardProps {
    name: string;
    communications:{communicationType: string;
    status: string;
    }[],
    imageUrl: string;
  }