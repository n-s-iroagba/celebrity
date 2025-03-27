import { useState, useEffect } from "react";

interface BookedTour {
  celebrity: string;
  cost: string;
  arrivalDate: string;
  location: string;
  touristId: string;
  duration: string;
  perks: string[];
}

export function useBookedTours (id:number) {
  const [tours, setTours] = useState<BookedTour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        const response = await fetch('');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: BookedTour[] = await response.json();
        setTours(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  return { tours, loading, error };
}
