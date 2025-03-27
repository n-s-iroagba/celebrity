import { useState, useEffect } from "react";
import { CampaignWithCelebrity } from "../types/CampaignWithCelebrity";

// Define the return type explicitly
type UseCampaignsResult = {
  campaigns: CampaignWithCelebrity[];
  loading: boolean;
  error: string | null;
};

export function useCampaigns(id:number): UseCampaignsResult {
  const [campaigns, setCampaigns] = useState<CampaignWithCelebrity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        setLoading(true);
        const response = await fetch("https://api.example.com/campaigns"); // Replace with your actual API
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: CampaignWithCelebrity[] = await response.json();
        setCampaigns(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  return { campaigns, loading, error };
}
